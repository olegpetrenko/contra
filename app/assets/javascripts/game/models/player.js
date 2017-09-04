var Player = function(game, sprite) {
	this.game = game;
	this.sprite = sprite;
	this.unit;
	this.jumpTimer = 0;
}

Player.DEFAULT_MOVE_SPEED = 200;
Player.DEFAULT_JUMP_SPEED = 250;
Player.DEFAULT_FACING = 'right';

Player.prototype.create = function(positionX, positionY) {
	this.unit = this.game.add.sprite(positionX, positionY, this.sprite);
	this.game.physics.enable(this.unit, Phaser.Physics.ARCADE);
	this.unit.body.collideWorldBounds = true;
    this.unit.body.bounce.y = 0.2;
    this.unit.body.gravity.y = DEFAULT_GRAVITY;
    this.facing = Player.DEFAULT_FACING;
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

Player.prototype.nullify_velocity = function() {
	this.unit.body.velocity.x = 0;
}

Player.prototype.move_left = function() {
	this.unit.body.velocity.x = - Player.DEFAULT_MOVE_SPEED;
	this.facing = 'left';
}

Player.prototype.move_right = function() {
	this.unit.body.velocity.x = Player.DEFAULT_MOVE_SPEED;
	this.facing = 'right';
}

Player.prototype.jump = function() {
	this.unit.body.velocity.y = - Player.DEFAULT_JUMP_SPEED;
    this.jumpTimer = this.game.time.now + 750;
}