define(function(){
  'use strict';

  return Backbone.Model.extend({
    idAttribute:'Id',
    urlRoot:'/api/thread/Id/'
  });

});
