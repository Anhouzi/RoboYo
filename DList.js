/************************************
    DList  
    
    Usage
   ^^^^^^^
    var L = new DList() creates empty list
    
    L.size() returns number of elements in L
    L.getIndex() returns cursor index of L, negative implies invalid cursor
    L.front() returns first element of L, Precondition: size() > 0
    L.back() returns last element of L, Precondition: size() > 0
    L.getElement() returns cursor element of L, Precondition: getIndex() >= 0
    L.equals(RHS) returns true iff L is equal to RHS, Precondition: RHS instanceof DList
    
    L.moveTo(i) sets cursor to ith element of L, Precondition: 0 <= i < L.size()
    L.movePrev() decrements cursor position of L, Precondition: getIndex() >= 0
    L.moveNext() increments cursor position of L, Precondition: getIndex() >= 0
    
    L.prepend(data) inserts new element at front of L
    L.append(data) inserts new element at back of L
    L.insertBefore(data) inserts new element before cursor element of L
    L.insertAfter(data) inserts new element after cursor element of L
    
    L.clear() sets L to empty state
    L.removeFront() removes first element of L, Precondition: size() > 0
    L.removeBack() removes last element of L, Precondition: size() > 0
    L.remove() removes cursor element of L, Precondition: getIndex() >= 0
    
    L.copy() returns new List equal to L
    L.concat(RHS) returns new List equal to L followed by RHS, Precondition: RHS instanceof DList
    
************************************/
function DList() {
    
    function Node(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
        
        this.equals = function(RHS) { return data === RHS; }
    }
    
    var _front = null;
    var _back = null;
    var _cursor = null;
    var _cursorIndex = -1;
    var _length = 0;
    
    this.size = function() { return _length; }
    this.getIndex = function() { return _cursorIndex; }
    
    // front() & back() Precondition: size() > 0
    this.front = function() { if(_length > 0) return _front.data; }
    this.back = function() { if(_length > 0) return _back.data; }
    
    // getElement() Precondition: getIndex() >= 0
    this.getElement = function() { if(_cursorIndex >= 0) return _cursor.data; }
    
    // equals(RHS) Precondition: RHS instanceof DList
    this.equals = function(RHS) {
        if(RHS instanceof DList) {
            if(_length != RHS.size()) {
                return false;
            }
            var iterL = _front;
            for(RHS.moveTo(0); RHS.getIndex() >= 0; RHS.moveNext()) {
                if(!iterL.equals(RHS.getElement())) {
                    return false;
                }
                iterL = iterL.next;
            }
            return true;
        }
    }
    
    this.clear = function() {
        _front = _back = _cursor = null;
        _cursorIndex = -1;
        _length = 0;
    }
    
    // moveTo(i) Precondition: 0 <= i < L.size()
    this.moveTo = function(i) {
        var end = _length - 1;
        if(i < 0 || i > end) {
            _cursor = null;
            _cursorIndex = -1;
        } else if(i == 0) {
            _cursor = _front;
            _cursorIndex = 0;
        } else if(i == end) {
            _cursor = _back;
            _cursorIndex = end;
        } else {
            var dist = Math.abs(i - _cursorIndex);
            if(_cursorIndex == -1) {
                if(i <= end / 2) {
                    _cursor = _front;
                    _cursorIndex = 0;
                } else {
                    _cursor = _back;
                    _cursorIndex = end;
                }
            } else if(dist > i) {
                _cursor = _front;
                _cursorIndex = 0;
            } else if(dist > (end - i)) {
                _cursor = _back;
                _cursorIndex = end;
            }
            while(_cursorIndex != i) {
                //console.log(_cursorIndex); // TEMP
                if(i - _cursorIndex > 0) {
                    _cursor = _cursor.next;
                    ++_cursorIndex;
                } else {
                    _cursor = _cursor.prev;
                    --_cursorIndex;
                }
            }
        }
    }
    
    // movePrev() Precondition: getIndex() >= 0
    this.movePrev = function() {
        if(_cursorIndex <= 0) {
            _cursor = null;
            _cursorIndex = -1;
        } else {
            _cursor = _cursor.prev;
            --_cursorIndex;
        }
    }
    
    // moveNext() Precondition: getIndex() >= 0
    this.moveNext = function() {
        if(_cursorIndex < 0 || _cursorIndex >= _length - 1) {
            _cursor = null;
            _cursorIndex = -1;
        } else {
            _cursor = _cursor.next;
            ++_cursorIndex;
        }
    }

    this.prepend = function(data) {
        var n = new Node(data);
        if(_length == 0) {
            _front = _back = n;
        } else {
            _front.prev = n;
            n.next = _front;
            _front = n;
            if(_cursorIndex >= 0) {
                ++_cursorIndex;
            }
        }
        ++_length;
    }
    
    this.append = function(data) {
        var n = new Node(data);
        if(_length == 0) {
            _front = _back = n;
        } else {
            _back.next = n;
            n.prev = _back;
            _back = n;
        }
        ++_length;
    }

    // insertBefore(data) Precondition: getIndex() >= 0
    this.insertBefore = function(data) {
        if(_cursorIndex >= 0) {
            var n = new Node(data);
            var prev = _cursor.prev;
            n.prev = prev;
            n.next = _cursor;
            _cursor.prev = n;
            if(prev != null) {
                prev.next = n;
            } else {
                _front = n;
            }
            ++_cursorIndex;
            ++_length;
        }
    }

    // insertAfter(data) Precondition: getIndex() >= 0
    this.insertAfter = function(data) {
        if(_cursorIndex >= 0) {
            var n = new Node(data);
            var next = _cursor.next;
            n.prev = _cursor;
            n.next = next;
            _cursor.next = n;
            if(next != null) {
                next.prev = n;
            } else {
                _back = n;
            }
            ++_length;
        }
    }
    
    // removeFront() Precondition: size() > 0
    this.removeFront = function() {
        if(_length > 0) {
            if(_cursorIndex == 0) {
                _cursor = null;
                _cursorIndex = -1;
            } else if(_cursorIndex > 0) {
                --_cursorIndex;
            }
            if(_length > 1) {
                _front = _front.next;
                _front.prev = null;
            } else {
                _front = _back = null;
            }
            --_length;
        }
    }
    
    // removeBack() Precondition: size() > 0
    this.removeBack = function() {
        if(_length > 0) {
            if(_cursorIndex == length - 1) {
                _cursor = null;
                _cursorIndex = -1;
            }
            if(_length > 1) {
                _back = _back.prev;
                _back.next = null;
            } else {
                _front = _back = null;
            }
            --_length;
        }
    }
    
    // remove() Precondition: getIndex() >= 0
    this.remove = function () {
        if(_cursorIndex >= 0) {
            if(_length > 1) {
                var prev = _cursor.prev;
                var next = _cursor.next;
                if(prev == null) {
                    next.prev = null;
                    _front = next;
                } else if(next == null) {
                    prev.next = null;
                    _back = prev;
                } else {
                    prev.next = next;
                    next.prev = prev;
                }
            } else {
                _front = _back = null;
            }
            _cursor = null;
            _cursorIndex = -1;
            --_length;
        }
    }
    
    this.copy = function() {
        var ret = new DList();
        for(var iter = _front; iter != null; iter = iter.next) {
            ret.append(iter.data);
        }
        return ret;
    }
    
    // concat(RHS) Precondition: RHS instanceof DList
    this.concat = function(RHS) {
        if(RHS instanceof DList) {
            var ret = this.copy();
            for(RHS.moveTo(0); RHS.getIndex() >= 0; RHS.moveNext()) {
                ret.append(RHS.getElement());
            }
            return ret;
        }
    }
}
/***********************************/
