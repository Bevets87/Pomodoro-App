(function () {

  'use strict'

  function App () {
    var self = this;

    self.store = new app.Store()
    self.view = new app.View()
    self.controller = new app.Controller(self.store, self.view)
  }

  new App()


}())
