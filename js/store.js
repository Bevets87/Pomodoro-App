(function (window) {
  'use strict'

  function Store () {
    this.state = {
      session: 25,
      brk: 5,
      elapsedMins: 25,
      elapsedSecs: 0,
      startTick: false,
      type: 'session'
    }
  }

  Store.prototype.setState = function (newState, cb) {
    var self = this;
    self.state = Object.assign(
      {},
      self.state,
      newState
    )
    if (cb) {
      cb({...self.state})
    }
    return self.state
  }

  window.app = window.app || {};
  window.app.Store = Store;

}(window))
