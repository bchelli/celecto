define(['app/models/member/signin', 'app/models/member/signout'], function(MemberSignin, MemberSignout){
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

    signout: function(){
      var self = this
        , ms = new MemberSignout()
        ;
      ms.on('error', function(){
        self.trigger('signout-error');
      }).on('sync', function(){
        self.clear();
        self.trigger('signout-success');
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
        if(cb) self.pushCallback(cb);
        self.trigger('need-login');
      }
    }
  });

  var member = new Member();
  member.fetch();

  return member;
});
