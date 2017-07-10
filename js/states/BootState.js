var BootState = {

  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },

  preload: function() {
    // Load bootstate images (logo of game image and loading bar image)
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadBar', 'assets/images/bar.png');


  },

  create: function() {

    // set the background to white
    this.game.stage.backgroundColor = '#fff';
    // Show the loading screen
    this.state.start('PreloadState');
  }

};
