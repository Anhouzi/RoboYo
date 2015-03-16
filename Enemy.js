/************************************
    Enemy
************************************/
function Enemy(/*id, */pos, type) {
    //var _id = id;
    var _e = new Entity(pos, type);
    var _controller = new Controller(_e); // to do

    
    // temp frame 
    _e.sprite.frameWidth = ENEMY_FRAME_WIDTH;
    _e.sprite.frameHeight = ENEMY_FRAME_HEIGHT;
    _e.sprite.frameRate = Math.ceil(1 / _e.speed * FRAME_TIME);
    _e.sprite.frameCount = ENEMY_FRAME_COUNT;

    //this.id = function() { return _id; }
    this.sprite = function() { return _e.sprite; }
    this.condition = function() { return _e.condition; }
    this.modifyCondition = function(delta) { _e.condition += delta; }
    this.damage = function() { return _e.damage; }
    
    this.update = function(dt) {
        _controller.update(dt);
        if(_controller.walking()) {
            _e.sprite.x -= _e.speed * dt; // keep moving
        } else if(_controller.collided()) {
            if(_e.sprite.x = HOUSE_BOTTOM_CORNER() + TILE_OFFSET_PER_ROW * (CANVAS_HEIGHT - _e.sprite.y) / TILE_HEIGHT) {
                console.log('HAUS');
            }
        }
        // if near house, explode
    }
    
    
    this.collides = function() {
        _controller.collides();
    }
    
    this.attacking = function() {
        return _controller.attacking();
    }
    
    
    this.despawn = function() {
        scrap.generate({x: _e.sprite.x, y: _e.sprite.y});
        _e.removeSprite();
    }
    
}
/***********************************/




/************************************
    Enemy Types
************************************/
var NORMBOT = new Type("Assets/norm_bot.png", ENEMY_INDEX, ENEMY_SPRITE_WIDTH, ENEMY_SPRITE_HEIGHT, NORMBOT_CONDITION, NORMBOT_DAMAGE, NORMBOT_SPEED);
var FASTBOT = new Type("Assets/fast_bot.png", ENEMY_INDEX, ENEMY_SPRITE_WIDTH, ENEMY_SPRITE_HEIGHT, FASTBOT_CONDITION, FASTBOT_DAMAGE, FASTBOT_SPEED);
var TANKBOT = new Type("Assets/tank_bot.png", ENEMY_INDEX, ENEMY_SPRITE_WIDTH, ENEMY_SPRITE_HEIGHT, TANKBOT_CONDITION, TANKBOT_DAMAGE, TANKBOT_SPEED);
/***********************************/




/************************************
    Enemy Controller
************************************/
function Controller(entity) {
    
    var WALKING = 0;
    var EXPLODING = 1;
    var ATTACKING = 2;
    var HURTING = 3;
    
    /************************************
        Game State
    ************************************/
    function EnemyState(id, sprite) {
        
        //var _timeInState = 0;
        var _id = id;
        var _initialFrame = id * ENEMY_FRAMES_PER_STATE;
        var _sprite = sprite
        _sprite.frame = _initialFrame;
        
        this.id = function() { return _id; }
        
        this.update = function(dt) {
            //_timeInState += dt;
            _sprite.frame += dt * _e.speed / FRAME_TIME;
            if(_sprite.frame >= _initialFrame + ENEMY_FRAMES_PER_STATE) {
                _sprite.frame = _initialFrame;
            }
        }
    }
    /***********************************/
    
    
    var _e = entity;
    var _state = new EnemyState(WALKING, _e.sprite);
    
    this.walking = function() { return _state.id() == WALKING; }
    this.collided = function() { return _state.id() == EXPLODING || _state.id() == ATTACKING; }
    
    this.collides = function() {
        // transition to either exploding or attacking
    }
    
    this.update = function(dt) {
        _state.update(dt);
        //transition if necessary
    }
}
/***********************************/





























// temp for presentation (ugly spaghetti) 
var timeSinceLastEnemy = 0;
var enemySpawnInterval = ENEMY_SPAWN_INTERVAL();

function generateEnemies(dt) {
    timeSinceLastEnemy += dt;
    var type;
    var r = rand(0, 5);
    switch(r) {
        case 0:
        case 1:
        case 2:
            type = NORMBOT;
            break;
        case 3:
        case 4:
            type = FASTBOT;
            break;
        case 5:
            type = TANKBOT;
            break;
    }
    if(enemies.size() < 2 + (gameTime / 3) || timeSinceLastEnemy > enemySpawnInterval) {
        r = rand(1, 5);
        enemies.append(new Enemy({x: CANVAS_WIDTH + TILE_WIDTH, y: CANVAS_HEIGHT - (r * TILE_HEIGHT)}, type));
        timeSinceLastEnemy = 0;
        if(enemySpawnInterval > 0.1) {
            enemySpawnInterval /= 1.05;
        } else {
            enemySpawnInterval = 0.1
        }
    }
}
