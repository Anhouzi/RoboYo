/************************************
    Main
************************************/
var gameStateManager;
var inputHandler;
var stage;
var turrets;
var projectiles;
var enemies;
var collisionHandler;
var scrap;

var gameOver;
var gameTime;
var houseCondition;
var scrapCount;

// ...
var scrapText = new TextBox();
scrapText.index = 0;
scrapText.x = CANVAS_WIDTH - 220;
scrapText.y = 70;
scrapText.fontSize = 21;
scrapText.color = "#C23C08";


var houseText = new TextBox();
houseText.index = 0;
houseText.x = 2;
houseText.y = CANVAS_HEIGHT / 2 - 40;
houseText.fontSize = 18;
houseText.color = "#FFFFFF";

function Main() {
    
    initGameStateManager();
    initInput();
    
    function newGame() {
        console.log('new game');
        initStage();
        /*
        initEntities(turrets);
        initEntities(projectiles);
        initEntities(enemies);
        */
        initTurrets();
        initProjectiles();
        initEnemies();
        initCollision();
        initScrap();
        gameTime = 0;
        houseCondition = STARTING_HOUSE_CONDITION;
        scrapCount = STARTING_SCRAP_COUNT;
        gameStateManager.gameStage().addChild(scrapText);
        gameStateManager.gameStage().addChild(houseText);
    }
    
    function brineUpdate(time) {
        canvas.scaleX = canvas.offsetWidth/canvas.width;
        canvas.scaleY = canvas.offsetHeight/canvas.height;
        
        if(!oldTime){ oldTime = time; }
        var delta = (time-oldTime)/MSPF;
        oldTime = time;
        delta = Math.min(1,delta);
        if(useStates){
            console.log('!');
            States.update(delta);
        }
        
        world.update(delta);
        
        draw();
        
        return delta;
    }
    
    function gameUpdate(dt) {
        dt = dt * MSPF / 1000;
        gameTime += dt;
        if(gameStateManager.inGame()) { // only update when looking at game
            if(!gameOver) {
                // clear dead
                clearEntities(turrets);
                clearEntities(enemies);
                // update game
                updateEntities(turrets, dt);
                updateEntities(projectiles, dt);
                updateEntities(enemies, dt);
                // check for lose condition
                generateEnemies(dt); // bad, but works well enough for now
                collisionHandler.update(dt);
                scrap.update();
                scrapText.text = "Scrap: " + scrapCount;
                houseText.text = "Condition: " + houseCondition;
                if(houseCondition <= 0) {
                    gameOver = true;
                }
            } else {
                gameStateManager.gameStage().removeChild(scrapText);
                gameStateManager.gameStage().removeChild(houseText);
                newGame();
                gameOver = false;
            }
        }
    }
    
    
    update = function(time) {
        var delta = brineUpdate(time);
        
        gameUpdate(delta);
        
        gameLoop = requestAnimationFrame(update);
    }
}


/***********************************/
