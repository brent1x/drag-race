(function() {
  var ChristmasTree = function() {
    // this class manages the xmas tree
    // get a reference to the pre stage lights html element
    this.$preStageLights = document.getElementById('pre-stage');
    // reset the christmas tree every time it's initialized
    this.reset();
  };
  
  ChristmasTree.prototype.reset = function() {
    // append the css on class to the pre stage lights
    // so that they show up as yellow
    this.$preStageLights.className += " on";
  };
  
  var RaceTrack         = function() {
    // this class manages the race track
  };
  var Dragster          = function() {
    // grab the car element
    this.$el = document.getElementById('dragster');
    // set the starting position of the dragster
    this.$el.style.left = "0px";
  };
  var Game              = function() {
    // this class manages game state
    // initialize a christmas tree
    this.tree = new ChristmasTree();
    // initialize the race track
    this.track = new RaceTrack();
    // initialize the player dragster
    this.dragster = new Dragster();

    this.attachListeners();
  };

  Game.prototype.attachListeners = function() {
    var self = this;
    // listen for user input, specifically
    // for the user pressing the right arrow key
    window.addEventListener('keyup', function(event) {
      if (event.keyCode === 39) {
        self.dragster.advance();
      }
    });
  };

  Dragster.prototype.advance = function() {
    // this should move the car across the screen 1px at a time
    this.$el.style.left = parseInt(this.$el.style.left, 10) + 1 + "px";
  };

  new Game();
})();
