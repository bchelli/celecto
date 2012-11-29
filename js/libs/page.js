define(function(){
  'use strict';
  
  var _view = {}
    , _page = ''
    , _cbs = []
    ;

  return {
    setPage:function(page, view){
      var triggerChange = _view!==view || _page!==page;

      _view=view;
      _page=page;

      // google analytics
      window._gaq.push(['_trackPageview', location.hash.substr(1), ]);

      if(triggerChange) this.triggerChange();
    },

    getPage:function(){
      return _page;
    },

    isViewActive:function(view){
      return _view === view;
    },
    
    listenChange:function(cb){
      _cbs.push(cb);
    },
    
    triggerChange:function(){
      _.each(_cbs, function(cb){
        cb();
      });
    }
  };

});
