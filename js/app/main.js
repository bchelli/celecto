define(['app/routers/home', 'app/routers/thread', 'app/models/member', 'app/views/login'], function(HomeRouter, ThreadRouter, member, loginView){
  "use strict";

  return {

    routers: {
      home: new HomeRouter(),
      thread: new ThreadRouter()
    },

    initialize: function () {
      this.startRouting();
      member.on('need-login', function(){
        loginView.render();
        loginView.open();
      });
    },

    startRouting: function(){
      // backbone history.start() should only be called once, when it is called multiple times
      // it throws an exception
      try {
        // start history
        Backbone.history.start();
      } catch(e) {}
    }

  };

});
