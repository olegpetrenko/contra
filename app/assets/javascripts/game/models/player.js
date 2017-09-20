var Player = function(game, sprite) {
  this.game = game;
  this.sprite = sprite;
  this.unit;
  this.jumpTimer = 0;
}

Player.DEFAULT_MOVE_SPEED = 200;
Player.DEFAULT_JUMP_SPEED = 350;
Player.DEFAULT_FACING = 'right';

Player.prototype.create = function(positionX, positionY) {
  this.unit = this.game.add.sprite(positionX, positionY, this.sprite);
  this.game.physics.enable(this.unit, Phaser.Physics.ARCADE);
  this.unit.body.collideWorldBounds = true;
  this.unit.body.bounce.y = 0.2;
  this.unit.body.gravity.y = DEFAULT_GRAVITY;
  this.facing = Player.DEFAULT_FACING;
  this.unit.animations.add('right', [1, 2, 3, 4, 5, 6, 7, 8], 10, true);
  this.unit.animations.add('turn', [4], 20, true);
  this.unit.animations.add('left', [16, 15, 14, 13, 12, 11, 10, 9], 10, true);
  this.unit.body.setSize(80, 185, 15, 0);
  this.game.camera.follow(this.unit);
  return this.unit;
}

Player.prototype.x = function() {
  return this.unit.x;
}

Player.prototype.y = function() {
  return this.unit.y;
}

Player.prototype.on_floor = function() {
  return this.unit.body.onFloor();
}

Player.prototype.set_weapon = function(weapon) {
  this.weapon = weapon;
  this.weapon.trackUnit(this.unit);
}

Player.prototype.nullify_velocity = function() {
  this.unit.body.velocity.x = 0;
}

Player.prototype.move_left = function() {
  this.unit.body.velocity.x = - Player.DEFAULT_MOVE_SPEED;
  this.unit.animations.play('left');
  this.facing = 'left';
  this.weapon.set_fire_angle(Phaser.ANGLE_LEFT);
}

Player.prototype.move_right = function() {
  this.unit.body.velocity.x = Player.DEFAULT_MOVE_SPEED;
  this.unit.animations.play('right');
  this.facing = 'right';
  this.weapon.set_fire_angle(Phaser.ANGLE_RIGHT);
}

Player.prototype.stop = function() {
  this.unit.animations.stop();
  if (this.facing == 'right') {
    this.unit.frame = 0;
  }
  else {
    this.unit.frame = 17;
  }
}

Player.prototype.fire = function() {
  this.weapon.fire()
}

Player.prototype.jump = function() {
  this.unit.body.velocity.y = - Player.DEFAULT_JUMP_SPEED;
  this.jumpTimer = this.game.time.now + 750;
}
