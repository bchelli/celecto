define(['app/models/member/signin'], function(MemberSignin){
  'use strict';

  var Member = Backbone.Model.extend({
    url:'/api/membership/member',

    initialize: function(){
      var self = this
        ;
      self.on('change:Id', function(){
        var cb = false
          , isLogged = self.isLogged()
          ;
        while(cb = self.getCallback()){
          isLogged && cb();
        }
      });
    },

    signin: function(data){
      var self = this
        , ms = new MemberSignin(data)
        ;
      ms.on('error', function(){
        self.trigger('login-error');
      }).on('sync', function(){
        self.set(ms.toJSON());
        self.trigger('login-success');
      });
      ms.save();
    },

    isLogged: function(){
      return !!this.get('Id');
    },

    pushCallback: function(cb){
      if(!this.cbs) this.cbs = [];
      this.cbs.push(cb);
    },

    getCallback: function(){
      if(!this.cbs || this.cbs.length==0) return false;
      return this.cbs.shift();
    },

    needLoggedMember:function(cb){
      var self = this
        ;
      if(self.isLogged()){
        // is logged
        cb && cb();
      } else {
        // not logged
        self.pushCallback(cb);
        self.trigger('need-login');
      }
    }
  });

  var member = new Member();
  member.fetch();

  return member;
});
