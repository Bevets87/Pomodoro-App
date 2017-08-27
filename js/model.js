(function (window) {
  'use strict'

  function Model () {
    var self = this;
    self.state = {
      initSessionMinutes: 25,
      initBreakMinutes: 5,
      sessionMinutes: 25,
      sessionSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      start: false,
      type: 'SESSION'
    }
  }

  Model.prototype.setState = function (newState, cb) {
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
  }

  window.app = window.app || {};
  window.app.Model = Model;

}(window))
