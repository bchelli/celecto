define(function(){
  'use strict';
  
  var _cacheTemplates = {};
  function getTemplate(name){
    if(!_cacheTemplates[name]) {
      _cacheTemplates[name] = $('#'+name).html();
    }
    return _cacheTemplates[name];
  }

  return {

    render:function(opt){
      var template = getTemplate(opt.template);
      opt.$el.html(
        Mustache.to_html(
          template,
          opt.data || {}
        )
      );
    }

  };
});
