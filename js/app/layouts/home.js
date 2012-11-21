define(['libs/template'], function(tmpl){
  'use strict';

  var HomeLayout = Backbone.View.extend({

    render:function(opt){

      tmpl.render({
        $el:this.$el,
        template:'threads-list',
        data:{
          threads:opt.model.toJSON()
        }
      });

    }

  });
  
  return new HomeLayout({el:'#page'});
});
