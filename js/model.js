(function (window) {
  'use strict'

  function Model () {
    var self = this;

    self.initialSessionMinutes = 25;
    self.initialBreakMinutes = 5;

    self.sessionMinutes = 25;
    self.sessionSeconds = 0;

    self.breakMinutes = 5;
    self.breakSeconds = 0;

    self.state = 'OFF';
  }



  Model.prototype.read = function (cb) {
    var self = this;
    cb({
      initialSessionMinutes: self.initialSessionMinutes,
      initialBreakMinutes: self.initialBreakMinutes,
      sessionMinutes: self.sessionMinutes,
      sessionSeconds: self.sessionSeconds,
      breakMinutes: self.breakMinutes,
      breakSeconds: self.breakSeconds,
      state: self.state
    })
  }

  Model.prototype.update = function (client, cb) {
    var self = this;
    self.sessionMinutes = client.sessionMinutes || self.sessionMinutes;
    self.sessionSeconds = client.sessionSeconds || self.sessionSeconds;
    self.breakMinutes = client.breakMinutes || self.breakMinutes;
    self.breakSeconds = client.breakSeconds || self.breakSeconds;
    self.initialSessionMinutes = client.initialSessionMinutes || self.initialSessionMinutes;
    self.initialBreakMinutes = client.initialBreakMinutes || self.initialBreakMinutes;
    self.state = client.state || self.state;

    cb({
      initialSessionMinutes: self.initialSessionMinutes,
      initialBreakMinutes: self.initialBreakMinutes,
      sessionMinutes: self.sessionMinutes,
      sessionSeconds: self.sessionSeconds,
      breakMinutes: self.breakMinutes,
      breakSeconds: self.breakSeconds,
      state: self.state
    })
  }


  window.app = window.app || {};
  window.app.Model = Model;

}(window))
