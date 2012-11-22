define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
      "about": "about"
    },

    about: function () {
      require(['app/layouts/about'], function(aboutLayout) {
        aboutLayout.render();
      });
    }

  });
});
