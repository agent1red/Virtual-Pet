var HomeState = {

init: function(message) {
  this.message = message; // creating message holder for game over message
},


create: function(){
  var background = this.game.add.sprite(0,0,'backyard');
  background.inputEnabled = true;

  background.events.onInputDown.add(function(){

    this.state.start('GameState');
  }, this);

  var style = {font: '27px Arial', fill: '#111'};
  var style2 = {font: '30px Arial', fill: '#111'};
  this.game.add.text(50, this.game.world.centerY + 200, 'Touch To Start', style);

  if(this.message) {
  this.game.add.text(50, this.game.world.centerY - 200, this.message, style2);
  }

}







};
