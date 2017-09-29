var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var groundLayer;
var enemiesGroup;

function preload() {
  game.load.image('bg', 'assets/images/background/bg.jpg');
  game.load.image('forest_gr_center', 'assets/images/background/forest/WaveForest_Square.png');
  game.load.image('forest_gr_bottom', 'assets/images/background/forest/WaveForest_MudSquare.png');
  game.load.spritesheet('unit', 'assets/images/units/player.png', 214, 200);
  game.load.image('enemy1', 'assets/images/units/enemy1.png');
  game.load.image('bullet1', 'assets/images/items/bullet1.png');
  game.load.tilemap('level1_tile', 'assets/tiles/level1.json', null, Phaser.Tilemap.TILED_JSON);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bg = game.add.sprite(0, 0, 'bg');
  bg.fixedToCamera = true;

  var map = game.add.tilemap('level1_tile');
  map.addTilesetImage('forest_ground_center', 'forest_gr_center');
  map.addTilesetImage('forest_ground_bottom', 'forest_gr_bottom');

  var backgroundlayer = map.createLayer('BackgroundLayer');
  groundLayer = map.createLayer('GroundLayer');

  map.setCollisionBetween(1, 1, true, groundLayer);

  //Change the world size to match the size of this layer
  groundLayer.resizeWorld();

  player = new Player(game, 150, 100);

  var weapon = new Weapon(game, 'bullet1');
  weapon.create(40);

  player.set_weapon(weapon);

  enemiesGroup = game.add.group();
  enemiesGroup.add(new Enemy(game, 500, 124, 1, 70));
}

function update() {
  game.physics.arcade.overlap(player.weapon.object.bullets, enemiesGroup, collisionHandler, null, this);
}

function collisionHandler (bullet, enemy) {
  bullet.kill()
  enemy.kill()
  enemiesGroup.add(new Enemy(game, 500, 124, 1, 70));
}
