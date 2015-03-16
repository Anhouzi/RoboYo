/************************************
    Entity
************************************/
function Entity(pos, type) {
    this.sprite = initSprite(pos, type, gameStateManager.gameStage());
    this.condition = type.condition;
    this.damage = type.damage;
    this.speed = type.speed;
    
    this.updateSprite = function(delta) {
        this.sprite.x += delta.x;
        this.sprite.y += delta.y;
    }
    
    this.removeSprite = function() {
        gameStateManager.gameStage().removeChild(this.sprite);
    }
}
/************************************/
