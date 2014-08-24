var mainState = {
	preload: function() {
		game.load.image('devahoy', 'logo.png');
	},

	create: function() {
		game.stage.backgroundColor = '#e26a6b';
		game.add.sprite(0, 0, 'devahoy').anchor.setTo(0.5, 0.5);
	},

	update: function() {

	}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');