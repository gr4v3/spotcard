/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var site = {
    show: {
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
                site.reset.categories();
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
            });
        },
        categories: function () {
            spotcard.login('client%40admedia.pt', 'qwe123asd123', function (response) {
                spotcard.token = response.user.token;
                spotcard.categories(function (content) {

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
                                if (item.parent)
                                    return;
                                item.img = spotcard.img + item.media_id.gallery_id.path + item.media_id.name;
                                item.name = spotcard.htmlDecode(item.name);
                                $container.append(Mustache.render(template, item));
                            });
                            //calculatePadding("#service_area");
                            $container.append( "<div class='responsive_item'><a href='#4thpage'>Contatos</a></div>");
                        });
                    }
                });
            });
        }
    }
};
