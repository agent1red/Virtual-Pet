// This game will have 1 state


var GameState = {
  init: function() {
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
    this.background = this.game.add.sprite(0, 0, 'backyard');
    // enabling background to be selectable to have items place anywhere on the game background
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.placeItem, this); // event listener using a new function placeItem


    this.pet = this.game.add.sprite(100, 400, 'pet', 0);
    this.pet.anchor.setTo(0.5);

    // create animation for consuming items placed on the background
    this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 10, false) // refere to the spritesheet and give it a key name, then array list of the number frames in any sequence, then frames per second, false for no looping (just play once)



    // setting up custom paramaters for the pet like health and happiness levels

    this.pet.customParams = {
      health: 100,
      fun: 100
    };

    //drag and drop objects
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();


    // bottom elements of game
    this.apple = this.game.add.sprite(53, 570, 'apple');
    this.apple.anchor.setTo(0.5);
    this.apple.inputEnabled = true; // initializing input
    this.apple.customParams = {
      health: 20
    };
    this.apple.events.onInputDown.add(this.pickItem, this); // allowing the item to be selected utilizing a new function created called pickItem

    this.candy = this.game.add.sprite(223, 570, 'candy');
    this.candy.anchor.setTo(0.5);
    this.candy.inputEnabled = true;
    this.candy.customParams = {
      health: -10,
      fun: 10
    };
    this.candy.events.onInputDown.add(this.pickItem, this);

    this.toy = this.game.add.sprite(133, 570, 'toy');
    this.toy.anchor.setTo(0.5);
    this.toy.inputEnabled = true;
    this.toy.customParams = {
      fun: 20
    };
    this.toy.events.onInputDown.add(this.pickItem, this);

    this.rotate = this.game.add.sprite(323, 570, 'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);

    // adding buttons to the object sprites in an array

    this.buttons = [this.apple, this.candy, this.toy, this.rotate];

    // nothing selected

    this.selectedItem = null;

    // ui area is not blaocked at beggining of game
    this.uiBlocked = false;

    // added game stats to background
    var style = {
      font: '20px Arial',
      fill: '#fff'
    }; // define style for statistics text

    var style2 = {
      font: '25px Arial',
      fill: '#111'
    }; // define style for statistics text


    this.game.add.text(10, 60, 'Heath:', style); // add to background at x,y location
    this.game.add.text(110, 60, 'Fun:', style);

    // text data for updated helth and fun
    this.healthText = this.game.add.text(70, 60, '', style);
    this.funText = this.game.add.text(155, 60, '', style);

    this.refreshStats(); // function that updates pets custom paramaters stats

    this.game.add.text(50,20, "Reanna's Virtual Pet Game", style2 );

    // decrease the health of the pet every 5 seconds - through a counting loop using Phaser Timer times 5 the reduceProperties function will execute
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);

  },

  // New function pick item passing the sprite object and event listener
  pickItem: function(sprite, event) {
    // check for blocked UI interface
    if (!this.uiBlocked) { // if the game ui is blocked
      console.log('item picked'); // verify this is working
      this.clearSelection(); // run clearSelection function to clear item
      sprite.alpha = 0.4; // This makes sprite more transparent indicating selection
      this.selectedItem = sprite;
    }

  },

  placeItem: function(sprite, event) {
    // Iff item is selcted and the ui is not blocked then get the position where we touched on the background through an x and y coordinate..

    if (this.selectedItem && !this.uiBlocked) {
      var x = event.position.x;
      var y = event.position.y;

      // call sprite to be added to that position

      var newItem = this.game.add.sprite(x, y, this.selectedItem.key); // creating new item from sprite last selected item using the key variable it will know what the last item in memory is and place that name in memory to be used to call the new sprite
      newItem.anchor.setTo(0.5);
      newItem.customParams = this.selectedItem.customParams; // pass teh paramaters of the sprite buttons to the new object item created

      // move pet to new item placed on the background ----

      // block ui while pet is moving
      this.uiBlocked = true;
      // created tween animation using variable petMovement then tell pet to move to the current x and y locations that were last stored and the duration of time in milliseconds to get there
      var petMovement = this.game.add.tween(this.pet);
      petMovement.to({
        x: x,
        y: y
      }, 700);
      petMovement.onComplete.add(function() {
        newItem.destroy();
        this.pet.animations.play('funnyfaces'); // refernce line 34 for pet animation code
        this.uiBlocked = false;

        // create statistics for the pet here
        var stat; // variable stat initiated
        for (stat in newItem.customParams) { // taking custom paramaters that were created for pet and putting them in variable stat
          if (newItem.customParams.hasOwnProperty(stat)) { // if new item created has custom stat created then the pet stats will be added from stat - this allows only custom paramaters to be used for the pet and not all data created for pet like other than statistics of health or happiness - new data is then added or subtracted from stats

            console.log(stat);
            this.pet.customParams[stat] += newItem.customParams[stat];
          }

        }

        this.refreshStats();

      }, this);




    }
    // initiate the petMovment here
    petMovement.start();

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
      petRotation.to({
        angle: '+2880'
      }, 800);
      petRotation.onComplete.add(function() {
        this.uiBlocked = false;
        sprite.alpha = 1;
        this.pet.customParams.fun += 10;
        this.refreshStats();
      }, this);
      // initiate the pet rotation
      petRotation.start();

    }
  },
  // clearing function
  clearSelection: function() {
    //for loop with a default function passing the element of the buttons array will set transparency back to opaque
    this.buttons.forEach(function(element, index) {
      element.alpha = 1;

    });
    // changing selected item back to unselected
    this.selectedItem = null;
  },

  refreshStats: function() {
    this.healthText.text = this.pet.customParams.health;
    this.funText.text = this.pet.customParams.fun;
  },
// function to reduce custom stats
  reduceProperties: function(){
    this.pet.customParams.health -= 10;
    this.pet.customParams.fun -= 15;
    this.refreshStats();

  },

  update: function() {

    // if custom params health is lessthan or equal to zero then update pet frame to #4 which is kill frame then set ui to block everything
    if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {

      this.pet.frame =4;
      this.uiBlocked = true;
      // adding timer event to trigger at death and run gameOver function
      this.game.time.events.add(2000, this.gameOver, this);
    }

  },

gameOver: function() {
  this.game.state.restart();
}
  


};

//initiate the Phaser Framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
