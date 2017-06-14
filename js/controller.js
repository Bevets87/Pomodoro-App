(function (window) {

  'use strict'


  function Controller (model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.start;
    self.type = 'SESSION_CONTROLLER';

    self.view.bind('increaseBreakTime', function () {
      clearInterval(self.start);
      self.model.read(function (timer) {
        timer.breakMinutes += 1;
        self.model.update({
          initialBreakMinutes: timer.breakMinutes,
          breakMinutes: timer.breakMinutes,
          state: 'OFF'
        }, function (timer) {
          self.view.render('displayBreakTime', {
            breakMinutes: timer.breakMinutes
          });

          self.view.render('displayTime', {
            type: 'SESSION',
            minutes: timer.initialSessionMinutes,
            seconds: 0
          })
        })
      })
    })

    self.view.bind('decreaseBreakTime', function () {
      clearInterval(self.start);
      self.model.read(function (timer) {
        timer.breakMinutes -= 1;
        self.model.update({
          initialBreakMinutes: timer.breakMinutes,
          breakMinutes: timer.breakMinutes,
          state: 'OFF'
        }, function (timer) {
          self.view.render('displayBreakTime', {
            breakMinutes: timer.breakMinutes
          });
          self.view.render('displayTime', {
            type: 'SESSION',
            minutes: timer.initialSessionMinutes,
            seconds: 0
          })
        })
      })
    })

    self.view.bind('increaseSessionTime', function () {
      clearInterval(self.start);
      self.model.read(function (timer) {
        timer.sessionMinutes += 1;
        self.model.update({
          initialSessionMinutes: timer.sessionMinutes,
          sessionMinutes: timer.sessionMinutes,
          state: 'OFF'
        }, function (timer) {
          self.view.render('displaySessionTime', {
            sessionMinutes: timer.sessionMinutes
          })
          self.view.render('displayTime', {
            type: 'SESSION',
            minutes: timer.initialSessionMinutes,
            seconds: 0
          })
        })
      })
    })

    self.view.bind('decreaseSessionTime', function () {
      clearInterval(self.start);
      self.model.read(function (timer) {
        timer.sessionMinutes -= 1;
        self.model.update({
          initialSessionMinutes: timer.sessionMinutes,
          sessionMinutes: timer.sessionMinutes,
          state: 'OFF'
        }, function (timer) {
          self.view.render('displaySessionTime', {
            sessionMinutes: timer.sessionMinutes
          })
          self.view.render('displayTime', {
            type: 'SESSION',
            minutes: timer.initialSessionMinutes,
            seconds: 0
          })
        })
      })
    })

    self.view.bind('timer', function () {

      self.model.read(function (timer) {
        timer.state = timer.state === 'OFF' ? 'ON' : 'OFF';

        self.model.update({state: timer.state}, function (timer) {
          if (timer.state === 'ON') {
            self.start = setInterval(function () {
              if (timer.sessionMinutes == 0 && timer.sessionSeconds == 0) {
                self.type ='BREAK_CONTROLLER';
                timer.sessionMinutes = timer.initialSessionMinutes;
                timer.sessionSeconds = 0;
              }
              if (timer.breakMinutes == 0 && timer.breakSeconds == 0) {
                self.type = 'SESSION_CONTROLLER';
                timer.breakMinutes = timer.initialBreakMinutes;
                timer.breakMinutes = 0;
              }

              if (self.type == 'SESSION_CONTROLLER') {
                timer.sessionSeconds--;
                timer.sessionSeconds = timer.sessionSeconds < 0 ? 59 : timer.sessionSeconds;
                timer.sessionMinutes -= timer.sessionSeconds == 59 ? 1 : 0;
                self.view.render('displayTime', {
                  type: 'SESSION',
                  minutes: timer.sessionMinutes,
                  seconds: timer.sessionSeconds,
                  totalTime: timer.initialSessionMinutes
                })
              }

             if (self.type == 'BREAK_CONTROLLER') {
               timer.breakSeconds--;
               timer.breakSeconds = timer.breakSeconds < 0 ? 59 : timer.breakSeconds;
               timer.breakMinutes -= timer.breakSeconds == 59 ? 1 : 0;
               self.view.render('displayTime', {
                type: 'BREAK',
                minutes: timer.breakMinutes,
                seconds: timer.breakSeconds,
                totalTime: timer.initialBreakMinutes
              })
             }


            },1000)
          } else {
            clearInterval(self.start)
          }
        })
      })
    })
  }









  window.app = window.app || {};
  window.app.Controller = Controller;

}(window))
