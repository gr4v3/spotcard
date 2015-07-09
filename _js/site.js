/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var site = {
    show:{
        companies:function(category_id) {
            spotcard.companies(category_id, function(response) {
                console.log(response);
                
                var $service_area = $('#service_area'); 
                    $service_area.empty();
                    response.name = response.items[0].category_id.name;
                    $.get('templates/companies.mst', function(template) {
                        $service_area.html(Mustache.render(template, response));
                        $service_area.find('select').each(function() {
                            new SelectFx(this);
                        });
                    });

            });
        }
    },
    reset:{
        login:function() {
            $.get('templates/login.mst', function(template) {
                $('.user').html(template);
                site.reset.categories();
            });
        },
        categories:function() {
            spotcard.login('client%40admedia.pt', 'qwe123asd123', function(response) {
                spotcard.token = response.user.token;
                spotcard.categories(function (content) {

                    if (content.items) {
                        var $service_area = $('#service_area'); 
                            $service_area.empty();
                        var div = document.createElement('div');
                            div.className = 'container';
                            $service_area.append(div);
                        var $container = $(div);
                        $.get('templates/category.mst', function(template) {

                            content.items.forEach(function(item) {
                                if (item.parent) return;
                                item.img = spotcard.img + item.media_id.gallery_id.path + item.media_id.name;
                                item.name = spotcard.htmlDecode(item.name);
                                $container.append(Mustache.render(template, item));
                            });
                            //calculatePadding("#service_area");

                        });    
                    }     
                });
            });
            
        }
    }
};