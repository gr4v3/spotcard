/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var site = {
    init: function (callback) {
        console.log('site initialized!');
        spotcard.login('client%40admedia.pt', 'qwe123asd123', function (response) {
            spotcard.token = response.user.token;
            if (callback)
                callback(response);
        });
    },
    show: {
        banners: function () {
            spotcard.banners(function (response) {
                response.source = spotcard.img;
                $.get('templates/banner.mst', function (template) {
                    var banner_area = document.getElementById('banner_area');
                    banner_area.innerHTML = Mustache.render(template, response);
                    window.setInterval(function () {
                        var current = banner_area.getElementsByClassName('current')[0];
                        if (current.nextElementSibling)
                            current.nextElementSibling.className = 'current';
                        else
                            banner_area.firstElementChild.className = 'current';
                        current.className = '';
                    }, 10000);
                });
            });
        },
        login: function (email, pass) {
            spotcard.login(email.replace('@', '%40'), pass, function (response) {
                $('.window .close').click();
                spotcard.token = response.user.token;
                site.reset.categories();
                $.get('templates/logout.mst', function (template) {
                    var $user = $('.user');
                    $user.html(Mustache.render(template, response));
                });
            });
        },
        companies: function (category_id) {
            var $service_area = $('#service_area');
            spotcard.companies(category_id, function (response) {
                if (!response.items.length)
                    return;
                $service_area.empty();
                response.name = response.items[0].category_id.name;
                response.category_id = response.items[0].category_id.category_id;
                $.get('templates/companies.mst', function (template) {
                    $service_area.html(Mustache.render(template, response));
                    var $subcategory = $service_area.find('#menu-subcategory');
                    $subcategory.empty();
                    var allsubcategories = [];
                    response.items.forEach(function (element) {
                        if (element.category_id.childs.forEach)
                            element.category_id.childs.forEach(function (el) {
                                allsubcategories[el.category_id] = el;
                            });
                    });
                    var items = [];
                    for (i in allsubcategories) {
                        items.push(allsubcategories[i]);
                    }
                    $.get('templates/subcategory.mst', function (template) {
                        var params = {'items': items};
                        $subcategory.html(Mustache.render(template, params));
                    });
                    $service_area.find('select').each(function () {
                        new SelectFx(this);
                    });
                });
            }, function (response) {
                $.get('templates/companies_empty.mst', function (template) {
                    $service_area.find('.row_list').html(Mustache.render(template, response));
                });

            });

            if (window.isMobile.any()) {
                var $three = $('#service_area .content-aside_list_cat .three.columns');
                var $toggle_itens_companies = $('#toggle_itens_companies');
                var $nine = $('#service_area .content-aside_list_cat .nine');
                var $discount = $('.content-aside_list_cat .nine .one:last-child');

                $('#menu-subcategory > li').click(function () {
                    if ($three.is(':visible'))
                        toggleElemtsOn();
                    else
                        toggleElemtsOff();
                });
                $toggle_itens_companies.click(function () {
                    toggleElemtsOff();
                });
                function toggleElemtsOff() {
                    $three.show("slide");
                    $nine.removeClass('width_100');
                    $discount.hide();
                    $toggle_itens_companies.hide();
                }
                function toggleElemtsOn() {
                    $three.hide("slide");
                    $nine.addClass('width_100');
                    $discount.show();
                    $toggle_itens_companies.show();
                }
            }
        },
        company: function (client_id) {
            var $service_area = $('#service_area');
            spotcard.company(client_id, function (response) {
                $.get('templates/company.mst', function (template) {
                    $service_area.empty();
                    console.log(response);
                    $service_area.html(Mustache.render(template, response));
                });
            });
        }
    },
    reset: {
        login: function () {
            $.get('templates/login.mst', function (template) {
                var $user = $('.user');
                $user.html(template);
                $user.find('#login').click(function (e) {
                    e.preventDefault();
                    /* Lock BODY */
                    $('body').on('wheel.modal mousewheel.modal', function () {
                        return false;
                    });

                    var $id = $('#dialog');
                    var maskHeight = $(document).height();
                    var maskWidth = $(window).width();

                    var $mask = $('#mask');
                    $mask.css({'width': maskWidth, 'height': maskHeight});
                    $mask.fadeIn(1000);
                    $mask.fadeTo("slow", 0.8);	//opacity 80%

                    //Get the window height and width
                    var winH = $(window).height();
                    var winW = $(window).width();

                    $id.css('top', (winH / 2 - $id.height() / 2) - 20);
                    $id.css('left', winW / 2 - $id.width() / 2);
                    $id.fadeIn(2000);

                    var form = document.getElementById('form_login');
                    var $form = $(form);
                    // $form.find('input[type=text]').keyup(function (e) {
                    $id.keyup(function (e) {
                        e.preventDefault();
                        if (e.keyCode == 13) {
                            $form.submit(); //enter
                        }
                        if (e.keyCode == 27)
                            $('.window .close').click();// esc
                    });
                    form.onsubmit = function () {
                        site.show.login(this.elements.email.value, this.elements.password.value);
                        return false;
                    };
                });
                $('.window .close').click(function (e) {
                    e.preventDefault();
                    $('#mask').hide();
                    $('.window').hide();
                    /* UnLock BODY */
                    $('body').off('wheel.modal mousewheel.modal');
                });
                $('#mask').click(function () {
                    $(this).hide();
                    $('.window').hide();
                    /* UnLock BODY */
                    $('body').off('wheel.modal mousewheel.modal');
                });

                site.reset.categories();
            });
        },
        categories: function () {
            spotcard.categories(function (content) {
                if (!content.items.length)
                    return;
                var $service_area = $('#service_area');
                $service_area.empty();
                var div = document.createElement('div');
                div.className = 'container';
                $service_area.append(div);
                var $container = $(div);
                $container.prepend("<div class='responsive_item'><a href='#section2'>Pedir cartão</a></div>");
                $.get('templates/category.mst', function (template) {
                    content.items.forEach(function (item) {
                        item.img = spotcard.img + 'img-medium/' + item.media_id.gallery_id.path + item.media_id.name;
                        item.name = spotcard.htmlDecode(item.name);
                        $container.append(Mustache.render(template, item));
                    });
                    $container.append("<div class='responsive_item'><a href='#section3'>Contatos</a></div>");
                });
                $.get('templates/category_filter.mst', function (template) {
                    var $categoryfilter = $('.category-filter');
                    $categoryfilter.html(Mustache.render(template, content));
                    var select = $categoryfilter.find('select');
                    new SelectFx(select[0]);
                });
            });
            spotcard.regions(function (content) {
                if (!content.items.length)
                    return;
                $.get('templates/region_filter.mst', function (template) {
                    var $regionfilter = $('.region-filter');
                    $regionfilter.html(Mustache.render(template, content));
                    var select = $regionfilter.find('select');
                    new SelectFx(select[0]);
                });
            });
            site.show.banners();
            /*    
             spotcard.regions(function (content) {
             if (!content.items.length) return;
             content.items.forEach(function (item) {
             
             });
             
             $.get('templates/region_filter.mst', function (template) {
             var $regionfilter = $('.region-filter');
             $regionfilter.html(Mustache.render(template, content));
             var select = $regionfilter.find('select');
             new SelectFx(select[0]);
             if (content.items) {
             var $service_area = $('#service_area');
             $service_area.empty();
             var div = document.createElement('div');
             div.className = 'container';
             $service_area.append(div);
             var $container = $(div);
             
             
             var divr = document.createElement('div');
             divr.className = 'responsive_item';
             var a = document.createElement('a');
             var linkText = document.createTextNode("Pedir cartão");
             a.appendChild(linkText);
             a.href = "#3rdPage";
             var $containerr = $(divr);
             $containerr.append(a);
             
             // $container.prepend( "<div class='responsive_item'><a href='#3rdPage'>Pedir cartão</a></div>" );
             $container.prepend($containerr);
             
             $.get('templates/category.mst', function (template) {
             content.items.forEach(function (item) {
             if (item.parent) return;
             if (item.media_id) {
             item.img = spotcard.img + item.media_id.gallery_id.path + item.media_id.name;
             item.name = spotcard.htmlDecode(item.name);
             $container.append(Mustache.render(template, item));
             }
             
             });
             //calculatePadding("#service_area");
             $container.append( "<div class='responsive_item'><a href='#4thpage'>Contatos</a></div>");
             });
             }
             });
             });*/
        }
    }
};
