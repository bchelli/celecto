define(['libs/template'], function(tmpl){
  'use strict';

  var HomeLayout = Backbone.View.extend({
  
    events:{
      'click .star':'changeStarState'
    },

    render:function(opt){

      if(!opt) opt = {};
      if(!opt.model) opt.model = this.model;
      this.model = opt.model;

      tmpl.render({
        $el:this.$el,
        template:'thread-detail',
        data:{
          thread:opt.model.toJSON(),
          isStared:function(){
            return _.contains(this.Stars, 'MarieId');
          }
        }
      });

    },

    changeStarState: function(ev){
      var $star = $(ev.currentTarget)
        , state = $star.hasClass('stared')
        , commentId = $star.attr('data-comment-id')
        ;
      this.model.setCommentStared(commentId, 'MarieId', !state);
      this.render();
    }

  });
  
  return new HomeLayout({el:'#page'});
});
