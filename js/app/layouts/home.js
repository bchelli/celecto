define(['libs/template', 'libs/page'], function(tmpl, page){
  'use strict';

  var HomeLayout = Backbone.View.extend({

    initialize:function(){
      var self = this
        ;
    },

    render:function(opt){

      tmpl.render({
        $el:this.$el,
        template:opt.page,
        data:{
          threads:opt.model.toJSON()
        }
      });
      
      page.setPage(opt.page, this);

    }

  });
  
  return new HomeLayout({el:'#page'});
});
