(function (window) {

  'use strict'

  function Controller (model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('increaseBreakTime', function () {
      clearInterval(self.model.state.start)
      var initBreakMinutes = self.model.state.initBreakMinutes;
      if (initBreakMinutes < 999) {
        initBreakMinutes += 1;
      }
      self.model.setState({
        initBreakMinutes: initBreakMinutes,
        breakMinutes: initBreakMinutes,
        breakSeconds: 0,
        start: false
      }, function (newState) {
        self.view.render('displayBreakTime', {
          breakMinutes: newState.initBreakMinutes
        });
      })
    })

    self.view.bind('decreaseBreakTime', function () {
      clearInterval(self.model.state.start)
      var initBreakMinutes = self.model.state.initBreakMinutes;
      if (initBreakMinutes > 1) {
        initBreakMinutes -= 1;
      }
      self.model.setState({
        initBreakMinutes: initBreakMinutes,
        breakMinutes: initBreakMinutes,
        breakSeconds: 0,
        start: false
      }, function (newState) {
        self.view.render('displayBreakTime', {
          breakMinutes: newState.initBreakMinutes
        });
      })
    })

    self.view.bind('increaseSessionTime', function () {
      clearInterval(self.model.state.start)
      var initSessionMinutes = self.model.state.initSessionMinutes;
      if (initSessionMinutes < 999) {
        initSessionMinutes += 1;
      }
      self.model.setState({
        initSessionMinutes: initSessionMinutes,
        sessionMinutes: initSessionMinutes,
        sessionSeconds: 0,
        start: false
      }, function (newState) {
        self.view.render('displaySessionTime', {
          sessionMinutes: newState.initSessionMinutes
        });
      })

    })

    self.view.bind('decreaseSessionTime', function () {
      clearInterval(self.model.state.start)
      var initSessionMinutes = self.model.state.initSessionMinutes
      if (initSessionMinutes > 1) {
        initSessionMinutes -= 1;
      }
      self.model.setState({
        initSessionMinutes: initSessionMinutes,
        sessionMinutes: initSessionMinutes,
        sessionSeconds: 0,
        start: false
      }, function (newState) {
        self.view.render('displaySessionTime', {
          sessionMinutes: newState.initSessionMinutes
        });
      })

    })

    self.view.bind('startTimer', function () {
      var start = self.model.state.start ? false : true;
      if (start) {
        self.model.state.start = setInterval(function () {
          if (self.model.state.sessionMinutes < 1 && self.model.state.sessionSeconds === 0) {
            self.model.setState({
              type:'BREAK',
              sessionMinutes: self.model.state.initSessionMinutes,
              sessionSeconds: 0
            })
          }
          if (self.model.state.breakMinutes < 1 && self.model.state.breakSeconds === 0) {
            self.model.setState({
              type:'SESSION',
              breakMinutes: self.model.state.initBreakMinutes,
              breakSeconds: 0
            })
          }
          if (self.model.state.type === 'SESSION') {
            var sessionMinutes = self.model.state.sessionMinutes;
            var sessionSeconds = self.model.state.sessionSeconds;
            sessionMinutes = sessionSeconds === 0 ? sessionMinutes -= 1 : sessionMinutes;
            sessionSeconds = sessionSeconds === 0 ? sessionSeconds += 59 : sessionSeconds -= 1;
            self.model.setState({
              sessionSeconds: sessionSeconds,
              sessionMinutes: sessionMinutes
            }, function (newState) {
              self.view.render('displayTime', {
                totalMinutes: newState.initSessionMinutes,
                seconds: newState.sessionSeconds,
                minutes: newState.sessionMinutes,
                type: 'SESSION'
              })
            })
          } else {
            var breakMinutes = self.model.state.breakMinutes;
            var breakSeconds = self.model.state.breakSeconds;
            breakMinutes = breakSeconds === 0 ? breakMinutes -= 1 : breakMinutes ;
            breakSeconds = breakSeconds === 0 ? breakSeconds += 59 : breakSeconds -= 1;
            self.model.setState({
              breakMinutes: breakMinutes,
              breakSeconds: breakSeconds,
            }, function (newState) {
              self.view.render('displayTime', {
                totalMinutes: newState.initBreakMinutes,
                seconds: newState.breakSeconds,
                minutes: newState.breakMinutes,
                type: 'BREAK'
              })
            })
          }
        }, 1000)
        self.model.setState({start: self.model.state.start})
      } else {
        clearInterval(self.model.state.start)
        self.model.setState({start: false})
      }
    })

  }











  window.app = window.app || {};
  window.app.Controller = Controller;

}(window))
