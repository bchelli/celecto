define(['app/models/thread'], function(Thread){
  'use strict';

  var ThreadsCollection = Backbone.Collection.extend({
    url:'api/thread/all',
    model: Thread
  });

  return new ThreadsCollection();

});
