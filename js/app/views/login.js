define(['libs/template', 'app/models/member'], function(tmpl, member){
  'use strict';

  var LoginView = Backbone.View.extend({
    events:{
      'click .open-signup':'openSignup',
      'submit .form-login':'submitLogin',
      'submit .form-signup':'submitSignup'
    },

    initialize: function(){
      var self = this
        ;
      member.on('login-error', function(){
        self.render({
          login: self.$email.val(),
          error:true
        });
      });
      member.on('login-success', function(){
        self.close();
      });
      member.on('signup-error', function(error){
        self.render({
          template: 'signup',
          nickname: self.$signupNickname.val(),
          email: self.$signupEmail.val(),
          error:error
        });
      });
      member.on('signup-success', function(){
        self.close();
      });
      self.render();
    },

    submitLogin: function(ev){
      ev.preventDefault();
      member.signin({
        email: this.$email.val(),
        password: this.$password.val()
      });
    },

    openSignup:function(ev){
      ev.preventDefault();
      this.render({
        template:'signup'
      });
    },

    submitSignup: function(ev){
      ev.preventDefault();
      member.signup({
        Nickname: this.$signupNickname.val(),
        Email: this.$signupEmail.val(),
        Password: this.$signupPassword.val(),
        RePassword: this.$signupRePassword.val()
      });
    },

    open:function(){
      this.render();
      this.$el.modal();
    },

    close:function(){
      this.$el.modal('hide');
    },

    render:function(opt){
    
      opt = opt || {};

      tmpl.render({
        $el:this.$el,
        template:opt.template || 'login',
        data:{
          nickname:opt.nickname || '',
          email:opt.email || '',
          login:opt.login || '',
          error:opt.error || false
        }
      });

      this.$email = this.$el.find('#loginEmail');
      this.$password = this.$el.find('#loginPassword');

      this.$signupNickname = this.$el.find('#signupNickname');
      this.$signupEmail = this.$el.find('#signupEmail');
      this.$signupPassword = this.$el.find('#signupPassword');
      this.$signupRePassword = this.$el.find('#signupRePassword');

    }

  });
  
  return new LoginView({el:'#loginPopup'});
});
