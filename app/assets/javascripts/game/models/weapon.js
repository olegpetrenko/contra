var Weapon = function(game, model) {
  this.game = game;
  this.model = model;
}

Weapon.prototype.create = function(bulletsTotal) {
  var object = game.add.weapon(bulletsTotal, this.model);
  object.setBulletFrames(0, 80, true);
  object.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  object.bulletSpeed = DEFAULT_BULLET_SPEED;
  object.fireRate = 300;
  this.object = object;
}

Weapon.prototype.set_fire_angle = function(angle) {
  this.object.fireAngle = angle;
}

Weapon.prototype.trackUnit = function(unit) {
  this.object.trackSprite(unit, 0, 0, false);
}

Weapon.prototype.fire = function() {
  this.object.fire();
}
