/************************************
    Game States Manager
************************************/
function GameStateManager() {

    var MENU_SCREEN_ID = 0;
    var GAME_SCREEN_ID = 1;
    var PAUSE_SCREEN_ID = 2;

    /************************************
        Game State
    ************************************/
    function GameState(id, stage) {
        var _id = id;
        var _stage = stage;
        
        this.id = function() { return _id; }
        this.stage = function() { return _stage; }
        
        this.transition = function(state) {
            if(_id != GAME_SCREEN_ID) {
                world.removeChild(_stage);
            }
            world.addChild(state.stage());
        }
    }
    /***********************************/

    var _currentState;
    var _stateStack;
    
    initStateStack();
    
    function initStateStack() {
        var id = MENU_SCREEN_ID;
        _currentState = new GameState(id, stage(id));
        _currentState.transition(_currentState);
        _stateStack = new DList();
        _stateStack.append(_currentState);
    }
    
    function stage(id) {
        switch(id) {
            case MENU_SCREEN_ID:
                if(!this.menu) { // menu stage uninitialized
                    this.menu = new Sprite();
                    var background = initSprite(ORIGIN, TITLE_SCREEN, this.menu);
                    var newGameBtn = initSprite(BUTTON_POS(), NEW_GAME_BUTTON, this.menu);
                }
                return this.menu;
            case GAME_SCREEN_ID:
                if(!this.game) { // game stage uninitialized
                    this.game = new Sprite();
                    var background = initSprite(ORIGIN, GAME_SCREEN, this.game);
                    // do more stuff if necessary
                }
                return this.game;
            case PAUSE_SCREEN_ID:
                if(!this.pause) {
                    this.pause = new Sprite();
                    var background = initSprite(ORIGIN, PAUSE_SCREEN, this.pause);
                    background.alpha = 0.8;
                    var menuBtn = initSprite(BUTTON_POS(), MAIN_MENU_BUTTON, this.pause);
                    var resumeBtn = initSprite(SECOND_BUTTON_POS(), RESUME_GAME_BUTTON, this.pause);
                }
                return this.pause;
        }
    }
    
    this.gameStage = function() { return stage(GAME_SCREEN_ID); }
    
    this.handlePause = function() {
        var id;
        var back;
        switch(_currentState.id()) {
            case PAUSE_SCREEN_ID:
                _stateStack.removeBack();
                break;
            case GAME_SCREEN_ID:
                id = PAUSE_SCREEN_ID;
                _stateStack.append(new GameState(id, stage(id)));
                break;
        }
        back = _stateStack.back();
        _currentState.transition(back);
        _currentState = back;
    }
    
    this.handleExit = function() {
        var id;
        var back;
        switch(_currentState.id()) {
            case PAUSE_SCREEN_ID:
                initStateStack();
                gameOver = true;
                break;
            case GAME_SCREEN_ID:
                id = PAUSE_SCREEN_ID;
                _stateStack.append(new GameState(id, stage(id)));
                back = _stateStack.back();
                _currentState.transition(back);
                _currentState = back;
                break;
        }
    }
    
    this.handleInput = function(mouseDownPosition) {
        var id;
        var back;
        switch(_currentState.id()) {
            case MENU_SCREEN_ID:
                if(contains(mouseDownPosition, BUTTON_SPRITE())) {
                    id = GAME_SCREEN_ID;
                    _stateStack.append(new GameState(id, stage(id)));
                    gameOver = true; // resets game in world.update()
                }
                break;
            case PAUSE_SCREEN_ID:
                if(contains(mouseDownPosition, BUTTON_SPRITE())) {
                    initStateStack();
                    gameOver = true;
                    return; // continuing unnecessary
                } else if(contains(mouseDownPosition, SECOND_BUTTON_SPRITE())) {
                    _stateStack.removeBack();
                }
                break;
            
        }
        back = _stateStack.back();
        _currentState.transition(back);
        _currentState = back;
    }
    
    
    this.inGame = function() { return _currentState.id() == GAME_SCREEN_ID; }

}
/***********************************/
