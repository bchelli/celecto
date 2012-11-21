// start to execute on load the application
$(function(){

  /*
   * CONFIGURE RequireJS
   */
  require.config({
    baseUrl: 'js',
//    urlArgs: 'bustCache=' +  (new Date()).getTime(),
    paths:{}
  });
  
  /*
   * START THE MAIN APPLICATION
   */
  require(['app/main'], function(app){
    'use strict';
    app.initialize();
  });

});