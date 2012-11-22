define(['libs/template', 'app/models/member'], function(tmpl, member){
  'use strict';

  var LoginModel = Backbone.View.extend({
    events:{
      'submit .form-login':'submitLogin'
    },

    initialize: function(){
      var self = this
        ;
      member.on('login-error', function(){
        self.render({
          login: self.$login.val(),
          error:true
        });
      });
      member.on('login-success', function(){
        self.close();
      });
    },

    submitLogin: function(ev){
      ev.preventDefault();
      member.signin({
        email: this.$login.val(),
        password: this.$password.val()
      });
    },

    open:function(){
      this.$el.modal();
    },

    close:function(){
      this.$el.modal({
        show:false
      });
    },

    render:function(opt){
    
      opt = opt || {};

      tmpl.render({
        $el:this.$el,
        template:'login',
        data:{
          login:opt.login || '',
          error:opt.error || false
        }
      });

      this.$login = this.$el.find('#loginEmail');
      this.$password = this.$el.find('#loginPassword');

    }

  });
  
  return new LoginModel({el:'#loginPopup'});
});
