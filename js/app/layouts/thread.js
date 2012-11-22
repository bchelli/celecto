define(['libs/template', 'app/models/member'], function(tmpl, member){
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
            return _.contains(this.Stars, member.get('Id'));
          }
        }
      });

    },

    changeStarState: function(ev){
      var self = this
        , $star = $(ev.currentTarget)
        , state = $star.hasClass('stared')
        , commentId = $star.attr('data-comment-id')
        ;
      member.needLoggedMember(function(){
        self.model.setCommentStared(commentId, !state);
        self.render();
      });
    }

  });
  
  return new HomeLayout({el:'#page'});
});
