Enemy = function (game, x, y, direction, speed) {
  Phaser.Sprite.call(this, game, x, y, "enemy1");
  this.anchor.setTo(0.5);
  this.scale.setTo(2);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.xSpeed = direction*speed;
  game.add.existing(this);
  this.body.gravity.y = DEFAULT_GRAVITY;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  game.physics.arcade.collide(this, groundLayer, this.move);
};

Enemy.prototype.move = function(enemy, platform) {
  enemy.body.velocity.x = enemy.xSpeed;
  enemy_falling_left = enemy.x < platform.left && platform.layer.data[platform.y][platform.x - 1].index < 0;
  enemy_falling_right = enemy.x > platform.right && platform.layer.data[platform.y][platform.x + 1].index < 0;
  if(enemy_falling_left && enemy.xSpeed < 0 || enemy_falling_right && enemy.xSpeed > 0){
    enemy.xSpeed *= -1;
  }
}
