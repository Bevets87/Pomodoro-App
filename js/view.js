(function (window) {

  'use strict'

  function View () {
    this.$breakMinus = document.getElementById('break-minus');
    this.$breakPlus = document.getElementById('break-plus');
    this.$breakDisplay = document.getElementById('break-display');

    this.$sessionMinus = document.getElementById('session-minus');
    this.$sessionPlus = document.getElementById('session-plus');
    this.$sessionDisplay = document.getElementById('session-display');

    this.$timer = document.getElementById('timer');
    this.$timerType = document.getElementById('timer-type');
    this.$minutesDisplay = document.getElementById('minutes');
    this.$secondsDisplay = document.getElementById('seconds');

    this.$filler = document.querySelectorAll('.filler');


  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'increaseBreakTime') {
      self.$breakPlus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'decreaseBreakTime') {
      self.$breakMinus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'increaseSessionTime') {
      self.$sessionPlus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'decreaseSessionTime') {
      self.$sessionMinus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'startTimer') {
      self.$timer.addEventListener('click', function () {
        handler()
      })
    }


  }

  View.prototype.render = function (cmd, param) {
    var self = this;
    var viewCommands = {
      'displayBreakTime': function () {
        self.$breakDisplay.innerText = '';
        self.$breakDisplay.innerText = self.parseTime(param.breakMinutes);
      },
      'displaySessionTime': function () {
        self.$sessionDisplay.innerText = '';
        self.$sessionDisplay.innerText = self.parseTime(param.sessionMinutes);
      },
      'displayTime': function () {
          var totalSeconds = param.totalMinutes * 60;
          var minutesElapsed = param.totalMinutes - param.minutes;
          var secondsElapsed = 60 - param.seconds;
          var timeElapsed = (60 * (minutesElapsed - 1)) + secondsElapsed;
          var percentageComplete = (timeElapsed/totalSeconds);
          switch (param.type) {
          case 'SESSION':
            self.$filler[0].style.height = (percentageComplete * 100) +'%';
            self.$filler[0].style.backgroundColor = 'darkgreen';
            break;
          case 'BREAK':
            self.$filler[0].style.height = (percentageComplete * 100) +'%';
            self.$filler[0].style.backgroundColor = 'darkred';
            break;
          }

        self.$timerType.innerText = '';
        self.$timerType.innerText = param.type.toLowerCase();
        self.$minutesDisplay.innerText = '';
        self.$minutesDisplay.innerText = self.parseTime(param.minutes);
        self.$secondsDisplay.innerText = '';
        self.$secondsDisplay.innerText = self.parseTime(param.seconds);
      }
    }
    viewCommands[cmd]();
  }

  View.prototype.parseTime = function (time) {
    time = time.toString();
    if (time.length == 1) {
      time = '0' + time;
    }
    return time;
  }

  window.app = window.app || {};
  window.app.View = View;
}(window))
