/************************************
    Projectile
************************************/
function Projectile(pos, dir, type) {
    var _e = new Entity(pos, type);
    var _direction = dir;   
    
    this.sprite = function() { return _e.sprite; }
    //this.condition = function() { return _e.condition; }
    //this.modifyCondition = function(delta) { _e.condition += delta; }
    this.damage = function() { return _e.damage; }
    
    this.update = function(dt) {
        var delta = new Vector();
        delta.x = _e.speed * _direction.x * dt;
        delta.y = _e.speed * _direction.y * dt;
        _e.updateSprite(delta);
    }
    
    this.despawn = function() {
        _e.removeSprite();
    }
}
/***********************************/



/************************************
    Projectile Types
************************************/

/***********************************/
