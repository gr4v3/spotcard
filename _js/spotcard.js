/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var spotcard = {
    root:'http://api.admedia.pt/',
    token:'c868be1151208dd4e5ebe7483022c1ed',
    img:'http://img.admedia.pt/img-medium/',
    login:function(email,pass,callback) {
        $.ajax({
            url:this.root + 'login/index/'+email+'/'+pass+'/sp'
        }).done(function(content) {
            if (callback) callback(content);
        });
    },
    logout:function(callback) {
        $.ajax({
            url:this.root + 'login/out/' + this.token
        }).done(function(content) {
            if (callback) callback(content);
        });
    },
    companies: function() {
        $.ajax({
            url:this.root + 'companies/index/0/1/' + this.token
        }).done(function(content) {
            console.log(content);
        });
    },
    categories: function(callback) {
        var that = this;
        $.ajax({
            url:this.root + 'categories/index/' + this.token
        }).done(function(content) {
            if (content.items) {
                var $service_area = $('#service_area'); 
                    $service_area.empty();
                var $container = $service_area.find('.container');
                if (!$container.length) {
                    var div = document.createElement('div');
                        div.className = 'container';
                        $service_area.append(div);
                        $container = $(div);
                }

                content.items.forEach(function(item) {
                    if (item.parent) return;
                    $container.append('<div class="three columns itens">' + 
                    '<a href="list_categories.html" class="link_category">' + 
                            '<figure class="foto-legenda"> <img src="' + that.img + item.media_id.gallery_id.path + item.media_id.name + '" alt="texto alternativo">' + 
                                   '<figcaption>' + 
                                   '<h3 class="red_font">'+item.name+'</h3>' + 
                                   '</figcaption>' + 
                           '</figure>' + 
                           '</a>' + 
                    '</div>');
                });
            }
            if (callback) callback();
        });
    }
};