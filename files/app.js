(function() {
  var ChristmasTree = function() {
    this.$preStageLights = document.getElementById('pre-stage');
    this.$preStageLights.className = "lights";
  };

  ChristmasTree.prototype.reset = function() {
    this.$preStageLights = document.getElementById('pre-stage');
    this.$preStageLights.className = "lights";
    this.$stageLights = document.getElementById('stage');
    this.$stageLights.className = "lights";
    this.$startLights1 = document.getElementById('start-lights1');
    this.$startLights1.className = "lights";
    this.$startLights2 = document.getElementById('start-lights2');
    this.$startLights2.className = "lights";
    this.$startLights3 = document.getElementById('start-lights3');
    this.$startLights3.className = "lights";
    this.$goLights = document.getElementById('go-lights');
    this.$goLights.className = "lights";
    this.$falseLights = document.getElementById('false-lights');
    this.$falseLights.className = "lights";
  };

  ChristmasTree.prototype.falseStart = function() {
    this.$falseLights = document.getElementById('false-lights');
    this.$falseLights.className = "lights on";
  };
  
  var RaceTrack = function() {
    this.$absDiv = document.getElementById('dragster');
  };

  var Dragster = function() {
    this.$absDiv = document.getElementById('dragster');
    this.$absDiv.style.left = "25px";     
  };

  Dragster.prototype.reset = function() {
    this.$absDiv = document.getElementById('dragster');
    this.$absDiv.style.left = "25px"; 
  };

  Dragster.prototype.startup = function() {
    // fires sfx
    var snd = new Audio("files/sfx.wav");
    snd.play();
    // turn pre-staging lights on
    this.$preStageLights = document.getElementById('pre-stage');
    this.$preStageLights.className = "lights on";
    // window.open('http://google.com','_self',false);
  };

  Dragster.prototype.advance = function() {
    this.$absDiv = document.getElementById('dragster');
    this.$absDiv.style.left = parseInt(this.$absDiv.style.left, 10) + 10 + "px";
  };

  var Game = function() {
    this.tree = new ChristmasTree();
    this.track = new RaceTrack();
    this.dragster = new Dragster();
    this.attachListeners();
  };

  Game.prototype.attachListeners = function() {
    var self = this;
    var counter = 0;

    // listen for startup event using 'S'
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === 83) {
        Dragster.prototype.startup();
      } 
    });

    // listen for advance event using 'G' and 'H'
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === 71 || event.keyCode === 72) {
        counter = counter + 1;
        console.log(counter);

        // turn off prestage lights, turn on staging lights        
        if (counter === 4) {
          ChristmasTree.prototype.reset();
          this.$preStageLights = document.getElementById('pre-stage');
          this.$preStageLights.className = "lights";
          this.$stageLights = document.getElementById('stage');
          this.$stageLights.className = "lights on";
        }

        // start coundown sound, turn on starting lights in order

        if (counter === 12) {
          this.fsA = performance.now();
          console.log(this.fsA);
          setTimeout(function() {
            var snd = new Audio("files/countdown.wav");
            snd.play();
            ChristmasTree.prototype.reset();
            this.$startLights1 = document.getElementById('start-lights1');
            this.$startLights1.className = "lights on";
          }, 500);
          setTimeout(function() {
            ChristmasTree.prototype.reset();
            this.$startLights2 = document.getElementById('start-lights2');
            this.$startLights2.className = "lights on";
          }, 1500);
          setTimeout(function() {
            ChristmasTree.prototype.reset();
            this.$startLights3 = document.getElementById('start-lights3');
            this.$startLights3.className = "lights on";
          }, 2500);
          setTimeout(function() {
            ChristmasTree.prototype.reset();
            this.startTiming = performance.now();
            this.$goLights = document.getElementById('go-lights');
            this.$goLights.className = "lights on";
            var snd = new Audio("files/gotime.wav");
            snd.play();
          }, 3500);
        }

        if (counter === 16) {
            this.fsB = performance.now();
            this.fsC = this.fsB - this.fsA;
            if (this.fsC < 3000) {
              ChristmasTree.prototype.reset();
              this.$falseLights = document.getElementById('false-lights');
              this.$falseLights.className = "lights on";
              alert("RAT FINK DOES NOT LIKE FALSE STARTS!");
              location.reload();
            }
        }
        
        if (counter === 97) {
          this.stopTiming = performance.now();
          var totalTime = this.stopTiming - this.startTiming;
          alert("Not bad! Your total time is " + ((Math.round((totalTime + 0.001) * 100) / 1000) / 100) + " seconds."); 
        }

      Dragster.prototype.advance();
      
      } 
    });

    // hard restarts game using 'Q'
    window.addEventListener('keydown', function(event) {
      if (event.keyCode === 81) {
        location.reload();
      }
    });

  };

  new Game();
})();