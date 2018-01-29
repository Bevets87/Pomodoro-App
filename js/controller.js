(function (window) {

  'use strict'

  function Controller (store, view) {
    var self = this;

    self.store = store;
    self.view = view;

    self.view.bind('decreaseSessionTime', function () {
      var { session, startTick } = self.store.state

      if (!startTick) {
        self._setSessionTime(session > 1 ? --session : session)
      }
    })

    self.view.bind('increaseSessionTime', function () {
      var { session, startTick } = self.store.state

      if (!startTick) {
        self._setSessionTime(session < 999 ? ++session : session)
      }
    })

    self.view.bind('increaseBrkTime', function () {
      var { brk, startTick } = self.store.state

      if (!startTick) {
        self._setBrkTime(brk < 999 ? ++brk : brk)
      }
    })

    self.view.bind('decreaseBrkTime', function () {
      var { brk, startTick } = self.store.state

      if (!startTick) {
        self._setBrkTime(brk > 1 ? --brk : brk)
      }
    })

    self.view.bind('toggleTimer', function () {
      var { startTick } = self.store.state

      if (startTick) {
        clearInterval(startTick)
        self.store.setState({startTick: false})
      } else {
        self._tick()
      }
    })

  }

  Controller.prototype._setSessionTime = function (sessionTime) {
    var self = this, { type, elapsedMins, elapsedSecs} = self.store.state
    self.store.setState({
      session: sessionTime,
      elapsedMins: type === 'session' ? sessionTime : elapsedMins,
      elapsedSecs: type === 'session' ? 0 : elapsedSecs
    }, function ({ session }) {
      self.view.render('sessionTime', {session: session})
    })
  }

  Controller.prototype._setBrkTime = function (brkTime) {
    var self = this, { type, elapsedMins, elapsedSecs } = self.store.state
    self.store.setState({
      brk: brkTime,
      elapsedMins: type === 'brk' ? brkTime : elapsedMins,
      elapsedSecs: type === 'brk' ? 0 : elapsedSecs
    }, function ({ brk }) {
      self.view.render('brkTime', {brk: brk})
    })
  }

  Controller.prototype._tick = function () {
    var self = this,
    handler = setInterval(function () {
      var { elapsedMins, elapsedSecs, type } = self.store.state;
      if (!elapsedMins && !elapsedSecs) {
        var { elapsedMins, elapsedSecs, type } = self._switchSession()
      }
      self.store.setState({
        elapsedMins: elapsedSecs == 0 && elapsedMins > 0 ? --elapsedMins : elapsedMins,
        elapsedSecs: elapsedSecs == 0 ? 59 : --elapsedSecs,
        startTick: handler,
        type: type
      },
      function ({ elapsedMins, elapsedSecs, type }) {
        self.view.render('tickerTime', {
          elapsedMins: elapsedMins,
          elapsedSecs: elapsedSecs,
          type: type,
          percComplete: self._calcPercComplete(elapsedMins, elapsedSecs)
        })
      })
    }, 300)
  }

  Controller.prototype._switchSession = function () {
    var self = this,
    { session, brk, type } = self.store.state,
    newState = self.store.setState({
      elapsedMins: type == 'session' ? brk : session,
      elapsedSecs: 0,
      type: type == 'session' ? 'brk' : 'session'
    })
    return newState
  }

  Controller.prototype._calcPercComplete = function (elapsedMins, elapsedSecs) {
    var self = this,
    { type, session, brk } = self.store.state,
    totalTime = type == 'session' ? session * 60 : brk * 60,
    totalElapsed = totalTime - ((elapsedMins * 60) + elapsedSecs)
    return (totalElapsed/totalTime) * 100
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

}(window))
