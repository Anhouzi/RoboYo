/************************************
    Turret
************************************/
function Turret(/*id, */pos, type) {
    //var _id = id;
    var _e = new Entity(pos, type);
    var _state;
    
    
    // temp frame
    _e.sprite.frameWidth = TURRET_FRAME_WIDTH;
    _e.sprite.frameHeight = TURRET_FRAME_HEIGHT;
    _e.sprite.frameRate = Math.ceil(1 / _e.speed * FRAME_TIME);
    _e.sprite.frameCount = TURRET_FRAME_COUNT;
    
    
    
    //his.id = function() { return _id; }
    this.sprite = function() { return _e.sprite; }
    this.condition = function() { return _e.condition; }
    this.modifyCondition = function(delta) { _e.condition += delta; }
    this.damage = function() { return _e.damage; }
    
    this.update = function(dt) {
        //_state.update(dt);
    }
    
    this.despawn = function() {
        _e.removeSprite();
    }
}
/***********************************/




/************************************
    Turret Types
************************************/
var KNIFESTER = new Type("Assets/knifester.png", TURRET_INDEX, TURRET_SPRITE_WIDTH, TURRET_SPRITE_HEIGHT, KNIFESTER_CONDITION, KNIFESTER_DAMAGE, KNIFESTER_SPEED);
/***********************************/



/************************************
    Turret States
************************************/
function TurretState() {
    
    var _time = 0;
    
    this.update = function(dt) {
        _time += dt;
        if(_time >= _e.speed) {
            // shoot
        }
    }
}
/***********************************/
