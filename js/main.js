// This game will have 1 state


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
      // enabling background to be selectable to have items place anywhere on the game background
      this.background.inputEnabled = true;
      this.background.events.onInputDown.add(this.placeItem, this); // event listener using a new function placeItem


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
      this.apple.inputEnabled = true;// initializing input
      this.apple.customParams = {health: 20};
      this.apple.events.onInputDown.add(this.pickItem, this);// allowing the item to be selected utilizing a new function created called pickItem

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

      // nothing selected

      this.selectedItem = null;
      this.uiBlocked = false;


   },

// New function pick item passing the sprite object and event listener
   pickItem: function(sprite, event) {
      // check for blocked UI interface
if (!this.uiBlocked) { // if the game ui is blocked
   console.log('item picked');// verify this is working
   this.clearSelection();// run clearSelection function to clear item
   sprite.alpha = 0.4; // This makes sprite more transparent indicating selection
   this.selectedItem = sprite;
}

   },

placeItem: function(sprite, event){
// get position where we touched on the background through an x and y coordinate

   var x = event.position.x;
   var y = event.position.y;

// call sprite to be added to that position

   var newItem = this.game.add.sprite(x,y, this.selectedItem.key);// creating new item from sprite last selected item using the key variable it will know what the last item in memory is and place that name in memory to be used to call the new sprite




},
      // New function pick item passing the sprite object and event listener
         rotatePet: function(sprite, event) {
            // if ui is blocked then do this
            if (!this.uiBlocked) {
               console.log('object rotated');
               this.uiBlocked = true;
               this.clearSelection();
               sprite.alpha = 0.4; // This makes sprite more transparent indicating selection

               // pet rotation
               var petRotation = this.game.add.tween(this.pet);
               // change pet angle to 720 for multiple rotation
               petRotation.to({angle: '+2880'}, 800);
               petRotation.onComplete.add(function(){
                  this.uiBlocked = false;
                  sprite.alpha = 1;
                  this.pet.customParams.fun += 10;
                  console.log(this.pet.customParams.fun);
               },this);
               // initiate the pet rotation
               petRotation.start();
            }
         },
         // clearing function
         clearSelection: function() {
           //for loop with a default function passing the element of the buttons array will set transparency back to opaque
            this.buttons.forEach(function(element, index){
               element.alpha = 1;

            });
            // changing selected item back to unselected
            this.selectedItem = null;
         },

   update: function() {

   }


 };

 //initiate the Phaser Framework
 var game = new Phaser.Game(360, 640, Phaser.AUTO);

 game.state.add('GameState', GameState);
 game.state.start('GameState');
