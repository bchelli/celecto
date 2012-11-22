define(function(){
  'use strict';

  var Page = Backbone.Model.extend({
    setPage:function(page){
      this.set('page', page);
    },
    getPage:function(){
      return this.get('page');
    }
  });

  return new Page();

});
