/************************************
    Stage
************************************/
function Stage() {
    
    function Tile(x, y) {
        var _x = x; // x position of bottom left corner
        var _y = y; // y position of bottom left corner
        var _members = new DList();
        
        this.x = function() { return _x; }
        this.y = function() { return _y; }
        
        this.add = function(member) { _members.append(member); }
        this.remove = function(member) {
            var current;
            for(_members.moveTo(0); _members.getIndex() >= 0; _members.moveNext()) {
                current = _members.getElement();
                if(member == current) {
                    _members.remove();
                    return true;
                }
            }
            return false;
        }
        
        this.contains = function(point) {
            var pX = point.x;
            var pY = point.y;
            var remainder = (y - pY) / TILE_SLOPE;
            return (pY < _y && pY > y - TILE_HEIGHT) &&
                   (pX > _x + remainder && pX < _x + TILE_WIDTH + remainder);
        }
    }
    
    var _grid = new Array(NUM_ROWS * NUM_COLS);
    
    initGrid();
    
    function initGrid() {
        var tile;
        var x;
        var y;
        var offset;
        for(i = 0; i < NUM_ROWS; ++i) {
            offset = HOUSE_BOTTOM_CORNER() + (i * TILE_OFFSET_PER_ROW);
            for(j = 0; j < NUM_COLS; ++j) {
                x = offset + (j * TILE_WIDTH);
                y = CANVAS_HEIGHT - (i * TILE_HEIGHT);
                tile = new Tile(x, y);
                setTile(i, j, tile);
            }
        }
    }
    
    
    function setTile(i, j, tile) { _grid[j * NUM_COLS + i] = tile; }
    function getTile(i, j) { return _grid[j * NUM_COLS + i]; }
    
    
    this.buildAtCoords = function(i, j, type) {
        var tile = getTile(i, j);
        var pos = {x: tile.x() + TILE_WIDTH / 2 - type.spriteWidth / 2, y: tile.y() - type.spriteHeight};
        var turret = new Turret(pos, type);
        //tile.add(turret);
        turrets.append(turret);
    }
    
    
    
    this.handleInput = function(mouseDownPosition) {        
        var row;
        var col;
        
        for(i = 0; i < NUM_ROWS; ++i) {
            row = i;
            for(j = 0; j < NUM_COLS; ++j) {
                col = j;
                if(getTile(i, j).contains(mouseDownPosition)) {
                    return {i: row, j: col};
                }
            }
        }
        return null; // not in a valid tile
    }
}
/***********************************/
