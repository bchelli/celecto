define(['app/routers/about', 'app/routers/home', 'app/routers/thread', 'app/routers/shareOffer','app/routers/intro',  'app/models/member', 'app/views/login', 'app/views/header'], function (AboutRouter, HomeRouter, ThreadRouter,ShareOfferRouter, IntroRouter, member, loginView, headerView) {
  "use strict";

  return {

    routers: {
      about: new AboutRouter(),
      home: new HomeRouter(),
      thread: new ThreadRouter(),
      shareOfferRouter: new ShareOfferRouter(),
      introRouter : new IntroRouter()
    },

    initialize: function () {
      this.startRouting();
      member.on('need-login', function(){
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
