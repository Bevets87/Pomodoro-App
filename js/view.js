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
    this.$type = document.getElementById('timer-type');
    this.$minutesDisplay = document.getElementById('minutes');
    this.$secondsDisplay = document.getElementById('seconds');

    this.$filler = document.querySelectorAll('.filler');
  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'increaseSessionTime') {
      self.$sessionPlus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'increaseBrkTime') {
      self.$breakPlus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'decreaseSessionTime') {
      self.$sessionMinus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'decreaseBrkTime') {
      self.$breakMinus.addEventListener('click', function () {
        handler()
      })
    }
    if (event === 'toggleTimer') {
      self.$timer.addEventListener('click', function () {
        handler()
      })
    }
  }

  View.prototype.render = function (cmd, param) {
    var self = this;
    var viewCommands = {
      'brkTime': function () {
        var { brk } = param

        self.$breakDisplay.innerText = '';
        self.$breakDisplay.innerText = self.parseTime(brk);
      },
      'sessionTime': function () {
        var { session } = param

        self.$sessionDisplay.innerText = '';
        self.$sessionDisplay.innerText = self.parseTime(session);
      },
      'tickerTime': function () {
        var { elapsedMins, elapsedSecs, timerMode, percComplete } = param

        self.$filler[0].style.height = percComplete +'%';
        self.$filler[0].style.backgroundColor = timerMode === 'session' ? 'darkgreen' : 'darkred';
        self.$type.innerText = '';
        self.$type.innerText = timerMode === 'session' ? 'session' : 'break';
        self.$minutesDisplay.innerText = '';
        self.$minutesDisplay.innerText = self.parseTime(elapsedMins);
        self.$secondsDisplay.innerText = '';
        self.$secondsDisplay.innerText = self.parseTime(elapsedSecs);
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
