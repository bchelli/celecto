define(function(){
  'use strict';

  return Backbone.Model.extend({
    url:'/api/membership/signup',
    validate: function(attrs) {
      var error = {}
        , hasError = false
        ;
      if (attrs.Password == '') {
        hasError = true;
        error.passwordsMandatory = true;
      }      

      if (attrs.Password != attrs.RePassword) {
        hasError = true;
        error.passwordsMismatch = true;
      }
      if(attrs.Nickname == ''){
        hasError = true;
        error.nickNameMandatory = true;
      }
      
      if (attrs.Email == '') {
        hasError = true;
        error.emailMandatory = true;
      }
      
      if (attrs.Email !== '' && attrs.Email.indexOf("@") == -1) {
        hasError = true;
        error.emailInvalid = true;
      }
      if(hasError) return error;
    }
  });
});
