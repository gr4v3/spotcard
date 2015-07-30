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
            var $spot = $service_area.find('.nine.columns');
            pendentBg();
            spotcard.companies(category_id, function (response) {
                $spot.empty();
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
                        efectCompaniesResponsive();
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
        },
        company: function (client_id) {
            var $service_area = $('#service_area');
            spotcard.company(client_id, function (response) {
                $.get('templates/company.mst', function (template) {
                    $service_area.empty();
                    console.log(response);
                    $service_area.html(Mustache.render(template, response));
                    efectCompanyResponsive();
                    var backgroundimg = response.admediaimgpath + response.company.info.media_id.gallery_id.path + response.company.info.media_id.name;
                    pendentBg(backgroundimg);
                    $.get('templates/company_description.mst', function (template) {
                        $service_area.find('.content-aside_cat2 .nine .container .row').html(Mustache.render(template, response));
                    });
                    goTarget(response, function(tag) {
                        switch(tag) {
                            case 'menu':
                                    var $tabs = $service_area.find('.tab span');
                                    if ($tabs.length) $tabs.first().trigger('click');
                                break;
                            case 'discount':
                                    
                                break;
    
                        }
                        
                        
                    });
                });

            });
        },
        menu: function(element) {
            var $service_area = $('#service_area');
            var $all_tab_triggers = $service_area.find('.menu_type.tab .menu_ret');
                $all_tab_triggers.removeClass('selected');
            var $element= $(element.parentNode);
                $element.addClass('selected');
            var $all_tab_target = $service_area.find('.menu_type.content ul');
                $all_tab_target.removeClass('visible');
            var $tab_target = $service_area.find('.menu_type.content .menu-' + element.dataset.index);
                $tab_target.addClass('visible');
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
                if (!content.items.length) return;
                var $service_area = $('#service_area');
                    $service_area.empty();
                var div = document.createElement('div');
                div.className = 'container';
                $service_area.append(div);
                var $container = $(div);
                $container.prepend("<div class='responsive_item'><a href='#section2'>Pedir cartão</a></div>");
                $.get('templates/categories.mst', function (template) {
                    content.items.forEach(function (item) {
                        item.img = spotcard.img + 'img-medium/' + item.media_id.gallery_id.path + item.media_id.name;
                        $container.append(Mustache.render(template, item));
                    });
                    $container.append("<div class='responsive_item'><a href='#section3'>Contatos</a></div>");
                });
                $.get('templates/categories_filter.mst', function (template) {
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
        }
    }
};
function efectCompaniesResponsive() {
    if (window.isMobile.any()) {
        var $three = $('#service_area .content-aside_list_cat .three.columns');
        var $toggle_itens_companies = $('#toggle_itens_companies');
        var $nine = $('#service_area .content-aside_list_cat .nine');
        var $discount = $('.content-aside_list_cat .nine .one:last-child');

        $('#service_area .content-aside_list_cat .nav_list_cat nav ul li a').click(function () {
            toggleElemts();
        });
        $toggle_itens_companies.click(function () {
            toggleElemts();
        });
        function toggleElemts() {
            var tThree = $three.is(':visible') ? $three.hide() : $three.show();
            var tNine = $nine.hasClass('width_100') ? $nine.removeClass('width_100') : $nine.addClass('width_100');
            var tDiscount = $discount.is(':visible') ? $discount.hide() : $discount.show();
            var tToggle_itens = $toggle_itens_companies.is(':visible') ? $toggle_itens_companies.hide() : $toggle_itens_companies.show();
        }
    }
}
function efectCompanyResponsive() {
    if (window.isMobile.any()) {
        var $three = $('#service_area .content-aside_cat2 .three.columns');
        var $toggle_itens_company = $('#toggle_itens_company');
        var $nine = $('#service_area .content-aside_cat2 .nine');
        var $slidePhotosCompanyResponsive = $('.content-aside_cat2 .right span.flaticon-camera3');

        $('#service_area .content-aside_cat2 .three.columns nav').click(function () {
            toggleElemts();
        });
        $toggle_itens_company.click(function () {
            toggleElemts();
        });
        function toggleElemts() {
            var tThree = $three.hasClass("itens_companies") ?
                    ($three.removeClass("itens_companies"),
                            $('.content-aside_cat2 .right').hasClass('slidePhotosCompanyResponsive') ?
                            $('.content-aside_cat2 .right').removeClass('slidePhotosCompanyResponsive') : false
                            )
                    : $three.addClass("itens_companies");
            var tNine = $nine.is(':visible') ? ($nine.hasClass('width_95') ? $nine.removeClass('width_95') : $nine.addClass('width_95')) : $nine.show();
            var tToggle_itens = $toggle_itens_company.is(':visible') ? $toggle_itens_company.hide() : $toggle_itens_company.show();
        }
        $slidePhotosCompanyResponsive.click(function () {
            $('.content-aside_cat2 .right').addClass('slidePhotosCompanyResponsive');
            toggleElemts();
            tNine = $nine.is(':visible') ? ($nine.hide(), $nine.hasClass('width_95') ? $nine.removeClass('width_95') : $nine.addClass('width_95')) : $nine.show();
        });
    }
}
function pendentBg(imageUrl) {
    var $section1 = $('#section1');
    var $asideBg = $section1.find('.fp-tableCell');
    var $mobile = $section1.find('.content-aside_cat2');
    var _returnToggle = window.isMobile.any() ? ( !$mobile.length ? true : false)  :  (!$asideBg.length ? true : false);
    if (_returnToggle)
        return false;
    if (imageUrl) {
        if (window.isMobile.any()) {
            $mobile.css({
                'background-image': 'url(' + imageUrl + ')',
                'background-size': 'cover'
            });
        } else {
            $asideBg.css({
                'background-image': 'url(' + imageUrl + ')',
                'background-size': 'cover'
            });
        }
    } else
        var status = window.isMobile.any() ? $mobile[0].style.cssText = '' : $asideBg[0].style.cssText = '';
    //ajaxInternal("nav_categoria/nav_cat_home.html", ".content-aside_cat2 .nine .container .row", 'right');
    
}

function goTarget(response, callback) {
    
    $(".link_cat").on('click', function (event) {
        event.preventDefault();
        var $this = $(this);
        var $contentaside = $('.content-aside_cat2');
        var $columns = $contentaside.find('.nine.columns');
            $columns.addClass("display_none");
        var tag = $this.attr('href').replace("#", '');
        if ($this.hasClass('active_link')) {
            $columns.addClass("display_none");
            $this.removeClass('active_link');
        } else if (!$this.hasClass('active_link')) {
            $(".link_cat").removeClass('active_link');
            if ($columns.hasClass("display_none")) {
                $columns.removeClass("display_none");
                $this.addClass("active_link");
                
                $.get('templates/company_'+tag+'.mst', function (template) {
                    var $container = $('.content-aside_cat2 .nine .container');
                        $container.html(Mustache.render(template, response));
                        if (callback) callback(tag);
                });
            }
        }
        
        
        
    });
    /*
    var last = "";
    var start = 0;
    //$( ".content-aside_cat2 .nine.columns" ).addClass( "display_none" );
    $(".link_cat").on('click', function (event) {
        event.preventDefault();
        $(".content-aside_cat2 .nine.columns").addClass("display_none");
        var tag = $(this).attr('href').replace("#", '');
        last = tag;
        var target = "nav_cat_" + tag + ".html";

        if ($(this).hasClass('active_link')) {
            $(".content-aside_cat2 .nine.columns").addClass("display_none");
            $(this).removeClass('active_link');
        } else if (!$(this).hasClass('active_link')) {
            $(".link_cat").removeClass('active_link');
            if ($(".content-aside_cat2 .nine.columns").hasClass("display_none")) {
                $(".content-aside_cat2 .nine.columns").removeClass("display_none");
                $(this).addClass("active_link");
                ajaxInternal("nav_categoria/" + target, ".content-aside_cat2 .nine .container", 'right');
            }
        }
    });*/
}