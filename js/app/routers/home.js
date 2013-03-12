define(function(){
  'use strict';

  return Backbone.Router.extend({

    routes: {
        "offres-du-jour": "listSales",
        "offres-precedentes": "listPreviousSales"
    },

    listSales: function () {
      require(['app/layouts/home', 'app/collections/threads'], function(homeLayout, threadsCollection) {
        threadsCollection.fetch({
          success:function(){
            homeLayout.render({
              page:'offres-du-jour',
              model:threadsCollection
            });
          }
        })
      });
    },
    	
	listPreviousSales: function()  {
	  require(['app/layouts/home', 'app/collections/previous_threads'], function(homeLayout, threadsCollection) {
        threadsCollection.fetch({
          success:function(){
            homeLayout.render({
              page:'offres-precedentes',
              model:threadsCollection
            });
          }
        })
      });
    }

  });
});
