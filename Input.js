/************************************
    Input Handler
************************************/
function InputHandler() {

    var _downPos;
    var _upPos;
    var _upOffsetX;
    var _upOffsetY;
    
    function position() { return {x: gInput.mouse.x, y: gInput.mouse.y}; }
    
    this.mouseX = function() { return gInput.mouse.x; }
    this.mouseY = function() { return gInput.mouse.y; }
    
    this.onMouseUp = function() {
        _upPos = position();
        _upOffsetX = _upPos.x - _downPos.x;
        _upOffsetY = _upPos.y - _downPos.y;
    }
    
    this.onMouseDown = function() {
        var tile;
        _downPos = position();
        if(!gameStateManager.inGame()) {
            gameStateManager.handleInput(_downPos);
        } else {
            tile = stage.handleInput(_downPos);
            if(tile && tile.j < NUM_PLACEABLE_COLS && scrapCount >= TURRET_COST) {
                stage.buildAtCoords(tile.i, tile.j, KNIFESTER);
                scrapCount -= TURRET_COST;
            }
        }
    }
    
    this.onKeyDown = function(key) { // must be initialized after gameStateManager
        console.log("key: " + key);
        switch(key) {
            case PAUSE_KEY:
                gameStateManager.handlePause();
                break;
            case ESCAPE_KEY:
                gameStateManager.handleExit();
                break;
            default:
                return;
        }
    }
    
    this.onKeyPress = function() {} // necessary to keep brine happy
}
/***********************************/




/************************************
    Input Constants
************************************/
var PAUSE_KEY = 80; // p
var ESCAPE_KEY = 27; // esc

/***********************************/
