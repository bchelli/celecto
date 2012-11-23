define(['libs/template', 'app/models/member', 'app/views/login', 'libs/page'], function(tmpl, member, loginView, page){
  'use strict';

  var HeaderView = Backbone.View.extend({
  
    events:{
      'click .signin':'signin',
      'click .signout':'signout'
    },

    initialize: function(){
      var self = this
        ;
      member.on('change:Id', self.render, self);
      page.listenChange(function(){
        self.render();
      });
      self.render();
    },

    signout:function(ev){
      ev.preventDefault();
      member.signout();
    },

    signin:function(ev){
      ev.preventDefault();
      loginView.open();
    },

    render:function(){
    
      tmpl.render({
        $el:this.$el,
        template:'header-tmpl',
        data:{
          member:member.toJSON(),
          isLogged:member.isLogged(),
          pages:[
            {
              label:'Offres du jour',
              id:'offres-du-jour',
              url:'#'
            },
            {
              label:'A propos',
              id:'about',
              url:'#/about'
            }
          ],
          isPageSelected:function(){
            return this.id == page.getPage();
          }
        }
      });

    }

  });
  
  return new HeaderView({el:'#header'});
});
