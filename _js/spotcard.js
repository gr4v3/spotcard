/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var spotcard = {
    root:'http://api.spotcard-dev.pt/',
    token:'2d764dc83b2840357432c93ac00e8b26',
    img:'http://img-dev.admedia.pt/img-medium/',
    login:function(callback) {
        $.ajax({
            url:spotcard.root + 'login/index/fabio/Dofasol123/sp'
        }).done(function(content) {
            if (callback) callback(content);
        });
    },
    companies: function() {
        $.ajax({
            url:spotcard.root + 'companies/index/0/1/' + spotcard.token
        }).done(function(content) {
            console.log(content);
        });
    },
    categories: function() {
        spotcard.login(function(response) {
           
            
            $.ajax({
                url:spotcard.root + 'categories/index/' + response.user.token
            }).done(function(content) {
                if (content.items) {
                    var $container = $('#service_area .container');
                    content.items.forEach(function(item) {
                        if (item.parent) return;
                        $container.append('<div class="three columns itens">' + 
                        '<a href="list_categories.html">' + 
                                '<figure class="foto-legenda"> <img src="' + spotcard.img + item.media_id.gallery_id.path + item.media_id.name + '" alt="texto alternativo">' + 
                                       '<figcaption>' + 
                                       '<h3 class="red_font">'+item.name+'</h3>' + 
                                       '</figcaption>' + 
                               '</figure>' + 
                               '</a>' + 
                        '</div>');
                    });
                }
            });
        });
        
    }
};