var mainState = {
  preload: function () {
    game.load.image('devahoy', 'assets/logo.png');
    game.load.image('ground', 'assets/ground.png');

    game.load.spritesheet('player', 'assets/p2_walk.png', 66, 92);
  },

  create: function () {
    game.stage.backgroundColor = '#a8e8ff';
    game.add.sprite(0, 0, 'devahoy').anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    var world = game.add.group();

    world.enableBody = true;

    var ground = world.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var left = world.create(0, 500 - 32, 'ground');

    var right = world.create(400, 400 - 32, 'ground');

    var middle = world.create(250, 300 - 32, 'ground');


    this.player = game.add.sprite(32, 200, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.5;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('walk', [0, 1, 4], 10, true);
    this.player.body.gravity.y = 100;

    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 100;
      this.player.animations.play('walk');
    }

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -100;
      this.player.animations.play('walk');
    }
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');