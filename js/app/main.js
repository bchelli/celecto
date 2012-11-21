define(['app/routers/home', 'app/routers/thread'], function(HomeRouter, ThreadRouter){
  "use strict";

  return {

    routers: {
      home: new HomeRouter(),
      thread: new ThreadRouter()
    },

    initialize: function () {
      this.startRouting();
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
