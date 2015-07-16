$(document).ready(function () {
    last = "";
    $(".styled-select").click(function () {
        detectHeight();
    });
    next();
    nextcat();
    nextcatitem();
    //scrollAnimated();
    //detectHeightElement();
    //detectHeightElementNav("#cartao");
    /* center area card horizontal*/
    //detectHeightElementNav1("#cartao" ,"#cartao .content-aside .container");

    //$( ".content-aside_cat2 .right a:last-child span" ).addClass( "rotation-180" );
    //calculatePadding("#service_area");
    //calculatePadding("#cartao");
    //goTarget();

    function detectHeight() {
        var browser = $(window).height();   // altura do browser
        var position = $(window).scrollTop() + (browser / 2);

        //alert("w"+window.innerHeight+"\n S:"+browser);

        if (browser >= position && $(window).width() > 990) {
            $(".styled-select div div").removeClass("toggle-cs-optionsdown").addClass("toggle-cs-options");
            //return true;
        } else {
            $(".styled-select div div").removeClass("toggle-cs-options").addClass("toggle-cs-optionsdown");
            //return false;
        }
    }

    $('#icon_search').click(function () {
        $('#search').toggle("slideUp");
    });
    
    $('#icon_menu').click(function () {
        $('#private_area').toggle("slide");
    });
    
   $('#private_area').click(function () {
        $(this).hide();
    });

});

function showHeight(element, height) {
    alert("The height for the " + element + " is " + height + "px.");
}

function calculatePadding(elemM) {
    var status = upHeightBrowser(elemM);
    if (status) {
        $(elemM + " > div:first-child").addClass("section");
    } else
        heightElement = detectHeightElementNav(elemM);
}

function upHeightBrowser(elemM) {
    var browser = $(window).height();   // altura. do browser
    var height_containers = $(elemM + "> div:first-child").outerHeight();
    var height_fixed = 0;
    //alert("Browser :"+browser+ "\n" +"Height_containers :"+ height_containers + "\n" + "Height_fixed :"+height_fixed);
    if (elemM === "#service_area .content-aside_cat2" || elemM == "#service_area") {
        height_fixed = $("#search").outerHeight();
    } else
        height_fixed = $("#search").outerHeight() + $("#menu_bar").outerHeight();
    //alert("1-Elem:"+elemM+ "\n" +"Browser :"+browser+ "\n" +"Height_containers :"+ height_containers + "\n" + "Height_fixed :"+height_fixed);
    height_containers += height_fixed;
    if (browser <= height_containers)
        return true;
    else
        return false;
}

function detectHeightElementNav(elemM) {
    var browser = $(window).height();   // alt. do browser
    var height_containers = $(elemM + "> div:first-child").outerHeight();
    var height_fixed = 0;
    if (elemM === "#service_area .content-aside_cat2" || elemM == "#service_area") {
        height_fixed = $("#menu_bar").outerHeight();
    } else {
        height_fixed = $("#search").outerHeight() + $("#menu_bar").outerHeight();
        //alert("2");
    }

    //alert("2-Elem:"+elemM+ "\n" +"Browser :"+browser+ "\n" +"Height_containers :"+ height_containers + "\n" + "Height_fixed :"+height_fixed);

    height_containers += height_fixed;
    //alert("container:"+height_containers);
    //alert("bros:"+browser);
    var calc_padding = (browser - height_containers) / 2;
    //alert("2 PADDING:"+calc_padding);
    var styles = {
        paddingBottom: calc_padding + "px",
        paddingTop: calc_padding + "px"
    };
    if (elemM === "#service_area .content-aside_cat2") {
        //calc_padding = (browser - (height_containers + height_fixed)) / 2;
        styles = {
            paddingBottom: "53.5px",
            paddingTop: "53.5px"
        };
        $(elemM + ' .container').css(styles);
    } else {
        $(elemM + ' .container').css(styles);
    }
}

function detectHeightElementNav2(elemM, elem1, elem2) {
    var browser = $(window).height();   // comp. do browser
    var height_containers = $(elem1).outerHeight() + $(elem2).outerHeight();
    var height_fixed = $("#search").outerHeight() + $("#menu_bar").outerHeight();
    height_containers += height_fixed
    //var height_section = $(cartao).outerHeight() ;

    //var all_elements = height_containers + height_content_aside3 + height_rodape;
    //showHeight( "all_elements", all_elements );

    var calc_padding = (browser - height_containers) / 2;
    //showHeight( "calc_padding", calc_padding );
    var styles = {
        paddingBottom: calc_padding + "px",
        paddingTop: calc_padding + "px"
    };
    $(elemM).css(styles);
}


function detectHeightElement() {
    var browser = $(window).height();   // comp. do browser
    var height_containers = $("#contatos .container:first-child").outerHeight() + $("#contatos .container:last-child").outerHeight();
    var height_section = $("#contatos").outerHeight();
    var height_content_aside3 = $(".content-aside3").outerHeight();
    var height_rodape = $("#rodape").outerHeight();

    var all_elements = height_containers + height_content_aside3 + height_rodape;
    //showHeight( "all_elements", all_elements );

    var calc_padding = (browser - all_elements) / 2;
    //showHeight( "calc_padding", calc_padding );
    var styles = {
        paddingBottom: calc_padding + "px",
        paddingTop: calc_padding + "px"
    };
    $("section.content-aside2").css(styles);

    //showHeight( "contatos .container:first-child", $( "#contatos .container:first-child" ).height() );
}

/* function invoked in na_home2*/
function validation() {
    $(document).ready(function () {
        $("#payment_card").hide();
        $(".radios").on('click', function () {
            if ($(this).is("fieldset input[value='card']")) {
                $("#payment_card").fadeIn();
            } else {
                $("#payment_card").hide();
            }
        });
    });
}

function next() {
    $("#searchForm").submit(function (event) {
        var $form = $(this), url = $form.attr("action");
        url = "nav_cartao/" + url;
        event.preventDefault();
        ajaxInternal(url, "#cartao", 'right');
        return false;
    });
}

function nextcat() {
    /*
     $(".link_category").on('click', function (event) {
     var $form = $(this), url = $form.attr("href");
     url = "nav_categoria/" + url;
     event.preventDefault();
     ajaxInternal(url, "#service_area .container", 'right');
     return false;
     });
     */
}

function nextcatitem() {
    /*
     $(".link_category_item").on('click', function (event) {
     var $form = $(this), url = $form.attr("href");
     url = "nav_categoria/" + url;
     event.preventDefault();
     ajaxInternal(url, "#service_area", 'right');
     return false;
     });
     */
}

function ajaxInternal(url, content, direction) {
    //$("#conteudo").load("nav_cartao/nav_home.html");
    //alert('url,'+ url +'content,'+ content +'direction' + direction);
    $.ajax({
        method: "POST",
        url: url,
        beforeSend: function () {
            // Mostra a mensagem de carregando
            $("#carregando").show("fast");
        },
        // O que deve acontecer quando o processo estiver completo
        complete: function () {
            // Oculta a mensagem carregando
            $("#carregando").hide("slow");
        },
        success: function (conteudo) {
            $('.content-aside_cat2 .nine.columns').hide().fadeIn('slow');
            $(content).html(conteudo).show('slide', {direction: direction}, 500);
        }
    });
}

function verifyCheckbox(tag) {
    var clean = tag.replace('#', '');
    var target = "input[value='" + clean + "']";
    $(tag).hide();
    $(".checkbox").on('click', function () {
        if ($(this).is(target)) {
            if ($(this).is(":checked")) {
                $(tag).fadeIn();
            } else {
                $(tag).hide();
            }
        }
    });
}

function scrollAnimated() {
    $(document).ready(function () {
        var height_fixed = $("#search").outerHeight() + $("#menu_bar").outerHeight();
        $(".link").on("click", function (e) {
            e.preventDefault();
            /* BEGIN */
            var href = $(this).attr('href');
            offset = $($(this).attr('href')).offset();
            if (offset) {
                var top = offset.top;
                if (href === "#service_area" && (last == "#cartao" || last == "#contatos")) {
                    last = href;
                } else if (href === "#service_area") {
                    top -= $("#menu_bar").outerHeight() - 1;
                    last = href;
                } else if ((href === "#cartao") && last == "") {
                    top -= $("#search").outerHeight() - 1;
                    last = href;
                } else if (((href === "#cartao") || (href === "#contatos")) && (last == "#service_area" || last == "#contatos" || last == "#cartao")) {
                    top -= height_fixed - 1;
                    last = href;
                } else if ((href === "#contatos") && last == "") {
                    top -= $("#search").outerHeight() - 1;
                    last = href;
                } else {
                    top -= height_fixed;
                    alert(last);
                    last = "";
                }
                /* END */
                $("body, html").animate({
                    scrollTop: top}, 600);
            }
        });
    });
}

function goBack(target) {
    $('.previous span').click(function (event) {
        event.preventDefault();
        ajaxInternal("nav_cartao/" + target, "#cartao", 'left');
        return false;
    });
}

function goTarget() {
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
                ajaxInternal("nav_categoria/" + target, ".content-aside_cat2 .nine .overflow .container", 'right');
            }
        }
    });
}

/* 
 mousewheel// Chrome/Safari/Opera
 DOMMouseScroll // Firefox
 onmousewheel // IE
 */
(function () {
    var delay = false;
    $(document).on('mousewheel DOMMouseScroll', function (event) {
        // event.preventDefault();
        if (delay)
            return;
        delay = true;
        setTimeout(function () {
            delay = false
        }, 200)
        last = "";
        var offset;
        var top;

        var wheelDirection = (-event.originalEvent.detail < 0) ? 1 : (event.originalEvent.wheelDelta > 0) ? 1 : -1;

        var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
        var height_fixed = $("#search").outerHeight() + $("#menu_bar").outerHeight();

        var a = document.getElementsByClassName('target');
        if (wd < 0) {
            for (var i = 0; i < a.length; i++) {
                var t = a[i].getClientRects()[0].top;
                if (t >= height_fixed)
                    break;
            }
        }
        else {
            for (var i = a.length - 1; i >= 0; i--) {
                var t = a[i].getClientRects()[0].top;
                if (t < -height_fixed)
                    break;
            }
        }

        offset = $(a[i]).offset();
        if ($(window).scrollTop())
            top = offset.top;

        if (wd < 0) {
            if (i == 1) {
                top = offset.top;
            } else
                top -= height_fixed - 1;
        } else {
            if (i == 2)
                top = offset.top;
            else
                top -= height_fixed - 1;
        }
        /*
         if(wheelDirection>=0){	
         if(i ==1)
         top=offset.top;
         else
         top-=height_fixed-1;
         }else if(wheelDirection<0){
         if(i ==2){
         top=offset.top;
         }else
         top-=height_fixed -1;
         }*/

        var isHovered = $('#service_area').is(":hover");
        //alert(isHovered);
        if (!isHovered)
            $('html,body').animate({scrollTop: top});
    });
})();
