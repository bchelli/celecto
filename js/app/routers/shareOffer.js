define(function(){
    'use strict';

    return Backbone.Router.extend({

        routes: {
            "partager-une-offre" : "offerShare",
        },

        offerShare:function(){
            require(['app/layouts/shareOffer', 'app/models/shareOffer'], function (shareOfferLayout, ShareOffer) {
               // var shareOffer = new ShareOffer();
                shareOfferLayout.render({
                    model: ShareOffer,
                    page: 'partager-une-offre'
                })
            });
        },
    });
});
