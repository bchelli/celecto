define(['libs/template', 'app/models/page'], function(tmpl, page){
  'use strict';

  var HomeLayout = Backbone.View.extend({

    render:function(){

      tmpl.render({
        $el:this.$el,
        template:'about'
      });
      
      page.setPage('about');

    }

  });
  
  return new HomeLayout({el:'#page'});
});
