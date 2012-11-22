define(['app/models/star'], function(Star){
  'use strict';

  return Backbone.Model.extend({
    idAttribute:'Id',

    urlRoot:'/api/thread/Id/',

    setCommentStared: function(commentId, memberId, state){
      var self = this
        , comments = self.get('Comments')
        , comment = _.find(comments, function(com){return com.Id==commentId})
        ;

      // update the model locally
      if(state) {
        comment.Stars.push(memberId)
        comment.Stars = _.uniq(comment.Stars);
      } else comment.Stars = _.without(comment.Stars, memberId);
      
      // update the model server side
      var star = new Star({
        SubjectId:self.get('Subject').SubjectId,
        CommentId:commentId,
        MemberId:memberId,
        IsPutStar:state
      });
      star.save();
    }
  });

});
