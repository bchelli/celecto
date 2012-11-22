define(['app/models/star'], function(Star){
  'use strict';

  return Backbone.Model.extend({
    url:'/api/thread/Star'
  });

});
