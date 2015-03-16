/************************************
    Scrap
************************************/
function Scrap() {
    
    var scrap = new DList();
    
    this.generate = function(pos) {
        var type = SCRAP1;
        if(rand(0,1)) {
            type = SCRAP2;
        }
        //adjust pos
        scrap.append(initSprite(pos, type, gameStateManager.gameStage()));
    }
    
    this.update = function() {
        var pos = {x: inputHandler.mouseX(), y: inputHandler.mouseY()};
        var consumed = new DList();
        var current;
        for(scrap.moveTo(0); scrap.getIndex() >= 0; scrap.moveNext()) {
            current = scrap.getElement();
            if(contains(pos, current)) {
                consumed.append(scrap.getIndex());
            }
        }
        for(consumed.moveTo(consumed.size() - 1); consumed.getIndex() >= 0; consumed.movePrev()) {
            scrap.moveTo(consumed.getElement());
            gameStateManager.gameStage().removeChild(scrap.getElement());
            scrap.remove();
            scrapCount += rand(2, 4);
            console.log(scrapCount);
        }
    }
    
    this.cleanUp = function() {
        for(scrap.moveTo(0); scrap.getIndex() >= 0; scrap.moveNext()) {
            gameStateManager.gameStage().removeChild(scrap.getElement());
        }
    }
}
/***********************************/




/************************************
    Enemy Types
************************************/
var SCRAP1 = new Type("Assets/scrap1.png", SCRAP_INDEX, SCRAP_WIDTH, SCRAP_HEIGHT);
var SCRAP2 = new Type("Assets/scrap2.png", SCRAP_INDEX, SCRAP_WIDTH, SCRAP_HEIGHT);
/***********************************/
