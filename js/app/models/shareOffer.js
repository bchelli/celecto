define(function () {
    'use strict';

    var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|www.|http:\/\/|https:\/\/){1}([0-9A-Za-z]+\.)");

    var ShareOffer = Backbone.Model.extend({
        url: '/api/thread/CreateThread'
        ,
        shareOffer: function(data){
            var self = this
            ;
            self.on('error', function (model, error) {
                self.trigger('share-error', error);
            }).on('sync', function () {
                self.trigger('share-success');
            });
            self.save(data);
        },

        validate: function(attrs) {
        var error = {}
          , hasError = false
        ;

        if (attrs.Title == '') {
            hasError = true;
            error.titleMandatory = true;
        }      

        if (attrs.Description =='') {
            hasError = true;
            error.descriptionMandatory = true;
        }
      
        if (attrs.Link == '') {
            hasError = true;
            error.linkMandatory = true;
        }

        
        if (!urlregex.test(attrs.Link)) {
            hasError = true;
            error.invalidLink = true;
        }
        

        if(hasError) return error;

        }      
    });
    var shareOffer = new ShareOffer();
    return shareOffer;
});
