define(['libs/template', 'app/models/member', 'libs/page'], function(tmpl, member, page){
  'use strict';

  var HomeLayout = Backbone.View.extend({

    events:{
      'submit .form-comment':'addComment',
      'click .star':'changeStarState'
    },

    initialize:function(){
      var self = this
        ;
      member.on('change:Id', function(){
        if(page.isViewActive(self)) self.render();
      });
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

      page.setPage('offres-du-jour', this);

    },

    addComment: function(ev){
      ev.preventDefault();
      var self = this
        , $comment = self.$el.find('#add-comment')
        , comment = $comment.val()
        ;
      member.needLoggedMember(function(){
        self.model.addComment(comment);
        self.render();
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
