var Player = function (game, x, y, direction, speed) {
  this.jumpTimer = 0;
  this.cursors = game.input.keyboard.createCursorKeys();
  this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.X);

  Phaser.Sprite.call(this, game, x, y, 'unit');

  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;
  this.body.bounce.y = 0.2;
  this.body.gravity.y = DEFAULT_GRAVITY;
  this.facing = Player.DEFAULT_FACING;
  this.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 13, true);
  this.animations.add('stand', [10, 11, 12, 13], 5, true);
  this.scale.setTo(Player.DEFAULT_SCALE);
  this.anchor.setTo(0.5);
  this.body.setSize(80, 185, 15, 0);

  game.add.existing(this);
  game.camera.follow(this);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.DEFAULT_MOVE_SPEED = 200;
Player.DEFAULT_JUMP_SPEED = 350;
Player.DEFAULT_FACING = 'right';
Player.DEFAULT_SCALE = 0.6;

Player.prototype.update = function() {
  game.physics.arcade.collide(this, groundLayer);

  this.body.velocity.x = 0;

  if (this.cursors.left.isDown)
  {
    this.move_left();
  }
  else if (this.cursors.right.isDown)
  {
    this.move_right();
  }
  else {
    this.stop();
  }

  if (this.fireButton.isDown)
  {
    this.fire();
  }

  if (this.jumpButton.isDown && this.body.onFloor() && game.time.now > this.jumpTimer)
  {
    this.jump();
  }
}

Player.prototype.set_weapon = function(weapon) {
  this.weapon = weapon;
  this.weapon.trackUnit(this, 60, 10);
  this.weapon.set_fire_angle(Phaser.ANGLE_RIGHT);
}

Player.prototype.move_left = function() {
  this.body.velocity.x = - Player.DEFAULT_MOVE_SPEED;
  this.animations.play('move');
  if (this.facing != 'left') {
    this.facing = 'left';
    this.scale.x = - Player.DEFAULT_SCALE;
  }
  this.weapon.set_fire_angle(Phaser.ANGLE_LEFT);
  this.weapon.setFireFrom(-60, 10);
}

Player.prototype.move_right = function() {
  this.body.velocity.x = Player.DEFAULT_MOVE_SPEED;
  this.animations.play('move');
  if (this.facing != 'right') {
    this.facing = 'right';
    this.scale.x = Player.DEFAULT_SCALE;
  }
  this.weapon.set_fire_angle(Phaser.ANGLE_RIGHT);
  this.weapon.setFireFrom(60, 10);
}

Player.prototype.stop = function() {
  this.animations.play('stand');
}

Player.prototype.fire = function() {
  this.weapon.fire()
}

Player.prototype.jump = function() {
  this.body.velocity.y = - Player.DEFAULT_JUMP_SPEED;
  this.jumpTimer = game.time.now + 750;
}
