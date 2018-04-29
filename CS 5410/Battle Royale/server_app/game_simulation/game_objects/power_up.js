module.exports = function (
    CollisionDetector,
    GameObject
) {

const RESPAWN_RATE = 0.5 * 60 * 1000;
const TRANSFORM_WIDTH = 20;
const TRANSFORM_HEIGHT = 20;

return function PowerUp(location, type) {

   let countdown;

   const transform = {
       x: location.x,
       y: location.y,
       theta: 0,
       width: TRANSFORM_WIDTH,
       height: TRANSFORM_HEIGHT
   };

   const self = GameObject( transform );

   self.update = () => {};

   self.data = function() { return { type: type, transform: transform } };

   const updateCountdown = function(elapsedTime) {
       countdown -= elapsedTime;
       if (countdown > 0) return;
       self.update = () => {};
       self.doCollisionWithPlayer = givePowerUp;
       self.data = function() { return { type: type, transform: transform } };
   };

   const givePowerUp = self.doCollisionWithPlayer = function(player) {
       const detector = CollisionDetector( transform, player.getTransform() );
       if (!detector.collisionOccurred()) return;
       countdown = RESPAWN_RATE;
       self.update = updateCountdown;
       self.doCollisionWithPlayer = () => {};
       self.data = () => null;
       switch( type ) {
           case "missile":
               return player.addMissile();
           case "bullets":
               return player.addBullets();
           case "health":
               return player.heal();
       }
   };

   return self;

};

};
