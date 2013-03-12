define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
        "about": "about"
    },


    about: function (thread) {
        require(['app/layouts/thread', 'app/models/thread'], function(threadLayout, Thread) {
            //50e217617ff65219c4792f4c
            var th = new Thread({ 'Id': "50e2281e3f6987139089b91d" });
            th.on('change', function () {
                threadLayout.setLayout('about', 'about');
                threadLayout.render({
                    model:th
                });
            });
            th.fetch();
        });
    }
  });
});
