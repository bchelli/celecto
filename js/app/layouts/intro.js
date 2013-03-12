define(['libs/template', 'libs/page'], function(tmpl, page){
  'use strict';

  var HomeLayout = Backbone.View.extend({

    initialize:function(){
      var self = this
        ;
    },

    render:function(){

      tmpl.render({
        $el:this.$el,
        template:'intro'
      });
      
      page.setPage('', this);

    }

  });
  
  return new HomeLayout({el:'#page'});
});
