(function (window) {
  'use strict'

  function Store () {
    this.state = {
      session: 25,
      brk: 5,
      elapsedMins: 25,
      elapsedSecs: 0,
      tickIntervalID: null,
      timerMode: 'session'
    }
  }

  Store.prototype.setState = function (newState, cb) {
    var self = this;
    cb = cb || null;
    self.state = Object.assign(
      {},
      self.state,
      newState
    )
    if (cb) {
      cb(self.state)
    }
    return self.state
  }

  window.app = window.app || {};
  window.app.Store = Store;

}(window))
