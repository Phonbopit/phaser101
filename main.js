var mainState = {
  preload: function () {
    // game.load.image('name', 'path/to/filename');
    game.load.image('devahoy', 'assets/logo.png');
    game.load.image('ground', 'assets/ground.png');

    // game.load.spritesheet('name', 'path/to/filename', width, height)  optional : frame count.
    game.load.spritesheet('player', 'assets/warrior_m.png', 32, 36);
    game.load.spritesheet('coin', 'assets/coins.png', 40, 44, 4);
  },

  create: function () {

    this.score = 0;
    this.scoreText;

        // text(x, y, text, style);
    this.scoreText = game.add.text(16, 16, 'Score : ' + this.score, {
      fontSize: '20px',
      fill: '#ed3465'
    });

    game.stage.backgroundColor = '#a8e8ff';
//    game.add.sprite(0, 0, 'devahoy').anchor.setTo(0.5, 0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.myWorld = game.add.group();

    this.myWorld.enableBody = true;

    // Group.create(x, y, image);
    var ground = this.myWorld.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var left = this.myWorld.create(0, 450 - 32, 'ground');
    left.body.immovable = true;

    var right = this.myWorld.create(450, 350 - 32, 'ground');
    right.body.immovable = true;

    var middle = this.myWorld.create(250, 250 - 32, 'ground');
    middle.scale.setTo(0.3, 1);
    middle.body.immovable = true;

    var top = this.myWorld.create(100, 150 -32, 'ground');
    top.scale.setTo(0.2, 1);
    top.body.immovable = true;

    this.player = game.add.sprite(0, 450, 'player');
    game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.25;
    this.player.body.gravity.y = 980;
    this.player.body.collideWorldBounds = true;

    // animations.add(name, frames, frame rate, loop);
    this.player.animations.add('right', [3, 4, 5], 10, true);
    this.player.animations.add('left', [9, 10, 11], 10, true);
    this.player.frame = 6;

    this.coins = game.add.group();
    this.coins.enableBody = true;
    // random spawn coins
    this.spawnCoins();



    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {

    game.physics.arcade.collide(this.player, this.myWorld);
    game.physics.arcade.collide(this.coins, this.myWorld);

    // // check if player overlap coin
    game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);

    // reset player velocity
    this.player.body.velocity.x = 0;
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
      this.player.animations.play('right');
    } else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
      this.player.animations.play('left');
    } else {
      this.player.animations.stop();
      this.player.frame = 6;
    }

    // // Allow player to jump if player touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -500;
    }

  },

  spawnCoins: function() {
    for (var i = 0; i < 10; i++) {

      var x = this.rnd.integerInRange(0, game.world.width - 40);
      var y = this.rnd.integerInRange(0, game.world.height - 100);

      this.coins.create(x, y, 'coin');
      this.coins.forEach(function(coin) {
        coin.animations.add('effect', [0, 1, 2, 3], 5, true);
        coin.animations.play('effect');
        game.physics.arcade.enable(coin);
        coin.scale.setTo(0.5, 0.5);
        coin.body.gravity.y = 200;
        coin.body.bounce.y = 0.5;
      });

    }
  },

  collectCoin: function(player, coin) {
    coin.destroy();
    this.score += 10;
    this.scoreText.text = 'Score : ' + this.score;
  }
};

// Phaser.Game(width, height, renderer, HTML Element);
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');