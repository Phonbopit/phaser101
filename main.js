var mainState = {
	preload: function() {

	},

	create: function() {
		game.stage.backgroundColor = '#e26a6b';
	},

	update: function() {

	}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('main', mainState);
game.state.start('main');