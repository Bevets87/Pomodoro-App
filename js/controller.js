(function (window) {

  'use strict'

  function Controller (store, view) {
    var self = this;

    self.store = store;
    self.view = view;

    self.view.bind('decreaseSessionTime', function () {
      var { session, tickIntervalID } = self.store.state

      if (!tickIntervalID) {
        self.setSessionTime(session > 1 ? --session : session)
      }
    })

    self.view.bind('increaseSessionTime', function () {
      var { session, tickIntervalID } = self.store.state

      if (!tickIntervalID) {
        self.setSessionTime(session < 999 ? ++session : session)
      }
    })

    self.view.bind('increaseBrkTime', function () {
      var { brk, tickIntervalID } = self.store.state

      if (!tickIntervalID) {
        self.setBrkTime(brk < 999 ? ++brk : brk)
      }
    })

    self.view.bind('decreaseBrkTime', function () {
      var { brk, tickIntervalID } = self.store.state

      if (!tickIntervalID) {
        self.setBrkTime(brk > 1 ? --brk : brk)
      }
    })

    self.view.bind('toggleTimer', function () {
      var { tickIntervalID } = self.store.state

      if (tickIntervalID) {
        clearInterval(tickIntervalID)
        self.store.setState({tickIntervalID: false})
      } else {
        self.setTick()
      }
    })

  }

  Controller.prototype.setSessionTime = function (sessionTime) {
    var self = this, { timerMode, elapsedMins, elapsedSecs } = self.store.state;
    self.store.setState({
      session: sessionTime,
      elapsedMins: timerMode == 'session' ? sessionTime : elapsedMins,
      elapsedSecs: timerMode == 'session' ? 0 : elapsedSecs
    }, function ({ session }) {
      self.view.render('sessionTime', {session: session})
    })
  }

  Controller.prototype.setBrkTime = function (brkTime) {
    var self = this, { timerMode, elapsedMins, elapsedSecs } = self.store.state;
    self.store.setState({
      brk: brkTime,
      elapsedMins: timerMode == 'brk' ? brkTime : elapsedMins,
      elapsedSecs: timerMode == 'brk' ? 0 : elapsedSecs
    }, function ({ brk }) {
      self.view.render('brkTime', {brk: brk})
    })
  }

  Controller.prototype.setTick = function () {
    var self = this, handler = setInterval(function () {
      var { elapsedMins, elapsedSecs } = self._getTime(self.store.state);
      self.store.setState({
        elapsedMins: elapsedSecs == 0 && elapsedMins > 0 ? --elapsedMins : elapsedMins,
        elapsedSecs: elapsedSecs == 0 ? 59 : --elapsedSecs, tickIntervalID: handler
      },
      function (newState) {
        self.view.render('tickerTime', { ...newState, percComplete: self._calcPercComplete({ ...newState }) })
      })
    }, 1000)
  }

  Controller.prototype._toggleTimerMode = function ({ timerMode }) {
    var self = this;
    return self.store.setState({
      timerMode: timerMode == 'session' ? 'brk' : 'session'
    })
  }

  Controller.prototype._initializeTimer = function ({ timerMode, session, brk }) {
    var self = this;
    if (timerMode == 'session') {
      return self.store.setState({ elapsedMins: session, elapsedSecs: 0})
    } else {
      return self.store.setState({ elapsedMins: brk, elapsedSecs: 0 })
    }
  }

  Controller.prototype._getTime = function ({ elapsedMins, elapsedSecs, timerMode }) {
    var self = this;
    if (!elapsedMins && !elapsedSecs) {
       return self._initializeTimer(self._toggleTimerMode({ timerMode }))
    } else {
      return { elapsedMins, elapsedSecs }
    }
  }

  Controller.prototype._calcPercComplete = function ({ elapsedMins, elapsedSecs, timerMode, session, brk }) {
    var self = this,
    totalTime = timerMode === 'session' ? session * 60 : brk * 60,
    totalElapsed = totalTime - ((elapsedMins * 60) + elapsedSecs)
    return (totalElapsed/totalTime) * 100;
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

}(window))
