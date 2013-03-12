define(['libs/template', 'libs/page','app/models/member', 'app/models/shareOffer'], function (tmpl, page, member,shareOffer) {
    'use strict';

    var HomeLayout = Backbone.View.extend({

    events:{
        'submit .share-offer-comment': 'shareOffer',
        'input #link': 'tryGetMetadata',
    },

    initialize: function () {
        var self = this
        ;
        shareOffer.on('share-error', function (error) {
            self.render({
                template: 'partager-une-offre',
                title: self.$title.val(),
                url: self.$url.val(),
                img: self.$img.attr("src"),
                providerName: self.$providerName.text(),
                description: self.$description.val(),
                error: error
            });
        });
        shareOffer.on('share-success', function () {
            window.location.href = "/#offres-du-jour";
        });

    },

    tryGetMetadata : function(ev) {
        var self = this
        , $loader = self.$el.find("#loader").first()
        , link = escape(self.$url.val())
        , targetUrl = "http://api.embed.ly/1/oembed?key=f911cbce99be49aaa3740b98d7608233&url=" + link 
        ;
        
        $loader[0].style.visibility = 'visible';

        $.ajax({
            url: targetUrl,
            dataType: 'jsonp',
            success: function (data) {
                if (!data.error_code) {
                    if (data.thumbnail_url) {
                        self.$img.attr("src", data.thumbnail_url);
                    }
                    if (data.description) {
                        self.$description.text(data.description); 
                    }
                    //if (data.url) {
                    //    self.$url.text(data.url);
                    //}
                    self.$providerName.html(data.provider_name);
                } else {
                    self.$img.attr("src", "/static/img/1x1-pixel.png");
                    self.$providerName.html("");
                }
                $loader[0].style.visibility = 'hidden';
            }
        });
    },

    shareOffer: function (ev) {
        ev.preventDefault();
        var self = this
        , title = self.$title.val()
        , url = self.$url.val()
        , img = self.$img.attr("src")
        , providerName = self.$providerName.text()
        , description = self.$description.val()
        ;

        member.needLoggedMember(function () {
            shareOffer.shareOffer({ Title: title, Description: description, Img: img, ProviderName: providerName, Link: url });
        });
    },


    render:function(opt){
    
        opt = opt || {};

        tmpl.render({
            $el:this.$el,
            template: opt.template || 'partager-une-offre',
            data:{
                title: opt.title || '',
                url: opt.url || '',
                description: opt.description || '',
                img : opt.img || '',
                providerName : opt.providerName || '',
                error:opt.error || false
            }
        });
        page.setPage(opt.page, this);

        this.$title = this.$el.find("#title");
        this.$url = this.$el.find("#link");
        this.$description = this.$el.find("#description");
        this.$img = this.$el.find("#thumbnail_url");
        this.$providerName = this.$el.find("#provider_name");
        if (!opt.img) {
            this.$img.attr("src", "/static/img/1x1-pixel.png");
        }
    }

});

    return new HomeLayout({ el: '#page' });
});
