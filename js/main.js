// This game will have 1 state

 var GameState = {
   preload: function() {

   },

   create: function() {

   },

   update: function() {

   },
 };

 var GameState = {
   init: function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
   },
   preload: function() {
// Load the game assets here before the game will start
      this.load.image('backyard', 'assets/images/backyard.png');
      this.load.image('apple', 'assets/images/apple.png');
      this.load.image('candy', 'assets/images/candy.png');
      this.load.image('rotate', 'assets/images/rotate.png');
      this.load.image('arrow', 'assets/images/arrow.png');
      this.load.image('toy', 'assets/images/rubber_duck.png');
      this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1);


   },

   create: function() {
      this.background = this.game.add.sprite(0,0,'backyard');



      this.pet = this.game.add.sprite(100, 400, 'pet');
      this.pet.anchor.setTo(0.5);

      // setting up custom paramaters for the pet like health and happiness levels

      this.pet.customParams = {health: 100, fun: 100};

      //drag and drop objects
      this.pet.inputEnabled = true;
      this.pet.input.enableDrag();


      // bottom elements of game
      this.apple = this.game.add.sprite(53, 570, 'apple');
      this.apple.anchor.setTo(0.5);
      this.apple.inputEnabled = true;
      this.apple.customParams = {health: 20};
      this.apple.events.onInputDown.add(this.pickItem, this);

      this.candy = this.game.add.sprite(223, 570, 'candy');
      this.candy.anchor.setTo(0.5);
      this.candy.inputEnabled = true;
      this.candy.customParams = {health: -10, fun: 10};
      this.candy.events.onInputDown.add(this.pickItem, this);

      this.toy = this.game.add.sprite(133, 570, 'toy');
      this.toy.anchor.setTo(0.5);
      this.toy.inputEnabled = true;
      this.toy.customParams = {fun: 20};
      this.toy.events.onInputDown.add(this.pickItem, this);

      this.rotate = this.game.add.sprite(323, 570, 'rotate');
      this.rotate.anchor.setTo(0.5);
      this.rotate.inputEnabled = true;
      this.rotate.events.onInputDown.add(this.rotatePet, this);

      // adding buttons to the object sprites in an array

      this.buttons = [this.apple, this.candy, this.toy, this.rotate];
      

   },

// New function pick item passing the sprite object and event listener
   pickItem: function(sprite, event) {

      console.log('item picked');

   },

      // New function pick item passing the sprite object and event listener
         rotatePet: function(sprite, event) {

            console.log('Object rotated');
         },

   update: function() {

   }


 };

 //initiate the Phaser Framework
 var game = new Phaser.Game(360, 640, Phaser.AUTO);

 game.state.add('GameState', GameState);
 game.state.start('GameState');
