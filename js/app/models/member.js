define(function(){
  'use strict';

  var Member = Backbone.Model.extend({
    url:'/api/membership/member'
  });

  var member = new Member();
  member.fetch();

  return member;
});
