var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var groundLayer;
var cursors;
var jumpButton;
var bulletTime = 0;
var fireButton;
var weapon;

function preload() {
	game.load.image('bg', 'assets/images/background/bg.jpg');
	game.load.image('forest_gr_center', 'assets/images/background/forest/WaveForest_Square.png');
	game.load.image('unit', 'assets/images/units/Blue_Right1.png');
	game.load.image('bullet1', 'assets/images/items/bullet1.png');
	game.load.tilemap('level1_tile', 'assets/tiles/level1.json', null, Phaser.Tilemap.TILED_JSON);
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'bg');

	var map = game.add.tilemap('level1_tile');
	map.addTilesetImage('forest_ground_center', 'forest_gr_center');

	var backgroundlayer = map.createLayer('BackgroundLayer');
	groundLayer = map.createLayer('GroundLayer');

	map.setCollisionBetween(1, 100, true, groundLayer);
 
    //Change the world size to match the size of this layer
    groundLayer.resizeWorld();

    player = new Player(game, 'unit')
    player.create(150, 100);

    game.camera.follow(player.unit);

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(40, 'bullet1');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
    weapon.setBulletFrames(0, 80, true);

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
    weapon.fireRate = 300;

    weapon.trackSprite(player.unit, 0, 0, false);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
}

function update() {
	game.physics.arcade.collide(player.unit, groundLayer);

	player.nullify_velocity();

    if (cursors.left.isDown)
    {
        player.move_left();
    }
    else if (cursors.right.isDown)
    {
        player.move_right();
    }

    if (fireButton.isDown)
    {
        if (player.facing == 'left')
        {
            weapon.fireAngle = Phaser.ANGLE_LEFT;
        }
        else if (player.facing == 'right')
        {
            weapon.fireAngle = Phaser.ANGLE_RIGHT;
        }
        weapon.fire();
    }

    
    if (jumpButton.isDown && player.on_floor() && game.time.now > player.jumpTimer)
    {
        player.jump();
    }
}