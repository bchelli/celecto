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
        template:'threads-list',
        data:{
          threads:opt.model.toJSON()
        }
      });
      
      page.setPage('offres-du-jour', this);

    }

  });
  
  return new HomeLayout({el:'#page'});
});
