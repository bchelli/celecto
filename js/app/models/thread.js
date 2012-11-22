define(['app/models/thread/star', 'app/models/thread/comment', 'app/models/member'], function(Star, Comment, member){
  'use strict';

  return Backbone.Model.extend({
    idAttribute:'Id',

    urlRoot:'/api/thread/Id/',

    addComment: function(comment){
      var self = this
        , comments = self.get('Comments')
        ;

      // update the model server side
      var com = new Comment({
        SubjectId:self.get('Subject').SubjectId,
        Body:comment
      });
      com.on('sync', function(){
        comments.push(com.toJSON());
        self.set({'Comments': comments});
        self.trigger('change');
      });
      com.save();
    },

    setCommentStared: function(commentId, state){
      var self = this
        , comments = self.get('Comments')
        , comment = _.find(comments, function(com){return com.Id==commentId})
        ;

      // update the model locally
      if(state) {
        comment.Stars.push(member.get('Id'))
        comment.Stars = _.uniq(comment.Stars);
      } else comment.Stars = _.without(comment.Stars, member.get('Id'));
      
      // update the model server side
      var star = new Star({
        SubjectId:self.get('Subject').SubjectId,
        CommentId:commentId,
        IsPutStar:state
      });
      star.save();
    }
  });

});
