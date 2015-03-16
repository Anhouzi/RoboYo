/************************************
    Collision Handler
************************************/
function CollisionHandler() {

    function collision(left, right) {
        var a = left.sprite();
        var b = right.sprite();
        
        /* // square collision
        return !(a.x + a.width < b.x || a.x > b.x + b.width) &&
               !(a.y + a.height < b.y || a.y > b.y + b.height);
        */
        
        var centerA = {x: a.x + a.width / 2, y: a.y + a.height / 2};
        var centerB = {x: b.x + b.width / 2, y: b.y + b.height / 2};
        var radiusA = Math.min(a.width, a.height) / 2;
        var radiusB = Math.min(b.width, b.height) / 2;
        
        return dist(centerA, centerB) <= radiusA + radiusB;
    }
    
    function houseCollision(enemy) {
        var sprite = enemy.sprite();
        var threshold = HOUSE_BOTTOM_CORNER() + ((CANVAS_HEIGHT - sprite.y) / TILE_HEIGHT) * TILE_OFFSET_PER_ROW;
        threshold -= sprite.width / 3;
        
        return sprite.x < threshold;
    }
    
    
    this.update = function() {
        var enemy;
        var current;
        for(enemies.moveTo(0); enemies.getIndex() >= 0; enemies.moveNext()) {
            enemy = enemies.getElement();
            for(projectiles.moveTo(0); projectiles.getIndex() >= 0; projectiles.moveNext()) {
                current = projectiles.getElement();
                if(collision(enemy, current)) {
                    enemy.modifyCondition(-current.damage());
                    current.despawn();
                    projectiles.remove();
                    projectiles.moveTo(0);
                }
            }
            for(turrets.moveTo(0); turrets.getIndex() >= 0; turrets.moveNext()) {
                current = turrets.getElement();
                if(collision(enemy, current)) {
                    // for presentation purposes only, until projectiles are added again
                    enemy.modifyCondition(-999);
                    current.modifyCondition(-999);
                    
                    // enemy.collided();
                    // if(enemy.attacking();) {
                    //    current.modifyCondition(-enemy.damage());
                    // }
                }
            }
            if(houseCollision(enemy)) {
                enemy.modifyCondition(-999); // temp
                houseCondition -= enemy.damage();
            }
        }
    }

}
/***********************************/
