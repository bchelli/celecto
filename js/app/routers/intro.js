define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
        "": "intro"
    },

    intro: function () {
        require(['app/layouts/intro'], function (introLayout) {
           
            introLayout.render({
                        page: ''
                    });
                }
            )
        }
  });
});
