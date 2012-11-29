define(['libs/template', 'app/models/member', 'libs/page'], function(tmpl, member, page){
  'use strict';

  var maxLength = 160;

  var HomeLayout = Backbone.View.extend({

    events:{
      'submit .form-comment':'addComment',
      'keyup #add-comment':'updateCounter',
      'click .star':'changeStarState',
      'click .btn-visit':'trackVisit'
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
      this.updateCounter();

    },

    addComment: function(ev){
      ev.preventDefault();
      var self = this
        , $comment = self.$el.find('#add-comment')
        , comment = $comment.val()
        , len = comment.length
        ;
      if(len<=maxLength) {
        member.needLoggedMember(function(){
          self.model.addComment(comment);
          self.render();
        });
      }
    },

    updateCounter:function(){
      var self = this
        , $comment = self.$el.find('#add-comment')
        , $commentLimit = self.$el.find('.comment-limit')
        , $addCommentBtn = self.$el.find('.add-comment-btn')
        , comment = $comment.val()
        , len = comment.length
        ;

      $commentLimit.html(len+'/'+maxLength);
      if(len>maxLength) {
        $commentLimit.addClass('text-error');
        $addCommentBtn.attr('disabled', 'disabled');
      } else {
        $commentLimit.removeClass('text-error');
        $addCommentBtn.removeAttr('disabled');
      }
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
    },
    trackVisit: function(ev){
      var self = this
        ;
      self.model.trackVisit();
    }

  });
  
  return new HomeLayout({el:'#page'});
});
