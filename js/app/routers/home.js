define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
      "": "listSales"
    },

    listSales: function () {
      require(['app/layouts/home', 'app/collections/threads'], function(homeLayout, threadsCollection) {
        threadsCollection.fetch({
          success:function(){
            homeLayout.render({
              model:threadsCollection
            });
          }
        })
      });
    }

  });
});
