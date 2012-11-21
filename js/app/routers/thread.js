define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
      "thread/:thread": "openThread"
    },

    openThread: function (thread) {
      require(['app/layouts/thread', 'app/models/thread'], function(threadLayout, Thread) {
        var th = new Thread({'Id':thread});
        th.fetch({
          success:function(){
            threadLayout.render({
              model:th
            });
          }
        })
      });
    }

  });
});
