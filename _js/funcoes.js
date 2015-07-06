$(document).ready(function () {
    $(".styled-select").click(function () {
        detectHeight();
    });
    next();
    nextcat();
    nextcatitem();
    scrollAnimated();
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

        if (browser >= position) {
            $(".styled-select div div").removeClass("toggle-cs-optionsdown").addClass("toggle-cs-options");
            //return true;
        } else {
            $(".styled-select div div").removeClass("toggle-cs-options").addClass("toggle-cs-optionsdown");
            //return false;
        }
    }

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
    if (elemM === "#service_area .content-aside_cat2" || elemM === "#service_area") {
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
    if (elemM === "#service_area .content-aside_cat2" || elemM === "#service_area") {
        height_fixed = $("#search").outerHeight();
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
        var $form = $(this),
                url = $form.attr("action");
        url = "nav_cartao/" + url;
        event.preventDefault();
        //var olink = $(this).attr("href");
        //var olink = "nav_cartao/nav_home2.html";
        $.ajax({
            method: "post",
            url: url,
            beforeSend: function () {
                // Mostra a mensagem de carregando
                //$("#carregando").show("fast");
                $("#conteudo").hide('slide', {direction: 'left'}, 300);
                /*  $("#conteudo").fadeOut(1000);*/
            },
            // O que deve acontecer quando o processo estiver completo
            complete: function () {
                // Oculta a mensagem carregando
                // $("#carregando").hide("slow");
                // $("#conteudo").show('slide', {direction: 'right'}, 1000);
            },
            success: function (conteudo) {
                $("#cartao").html(conteudo).show('slide', {direction: 'right'}, 300);
            }
        });
        return false;
    });

}

function nextcat() {
    $(".link_category").on('click', function (event) {
        var $form = $(this),
                url = $form.attr("href");
        url = "nav_categoria/" + url;
        event.preventDefault();
        //var olink = $(this).attr("href");
        //var olink = "nav_cartao/nav_home2.html";
        $.ajax({
            method: "post",
            url: url,
            beforeSend: function () {
                // Mostra a mensagem de carregando
                $("#carregando").show("fast");
                $("#service_area .container").hide('slide', {direction: 'left'}, 300);
                /*  $("#conteudo").fadeOut(1000);*/
            },
            // O que deve acontecer quando o processo estiver completo
            complete: function () {
                // Oculta a mensagem carregando
                $("#carregando").hide("slow");
                // $("#conteudo").show('slide', {direction: 'right'}, 1000);
            },
            success: function (conteudo) {
                $("#service_area .container").hide().html(conteudo).show('slide', {direction: 'right'}, 300);
            }
        });
        return false;
    });

}

function nextcatitem() {
    $(".link_category_item").on('click', function (event) {
        var $form = $(this),
                url = $form.attr("href");
        url = "nav_categoria/" + url;
        event.preventDefault();
        //var olink = $(this).attr("href");
        //var olink = "nav_cartao/nav_home2.html";
        $.ajax({
            method: "post",
            url: url,
            beforeSend: function () {
                // Mostra a mensagem de carregando
                $("#carregando").show("fast");
                $("#service_area").hide('slide', {direction: 'left'}, 300);
                /*  $("#conteudo").fadeOut(1000);*/
            },
            // O que deve acontecer quando o processo estiver completo
            complete: function () {
                // Oculta a mensagem carregando
                $("#carregando").hide("slow");
                // $("#conteudo").show('slide', {direction: 'right'}, 1000);
            },
            success: function (conteudo) {
                //$("#service_area").addClass("content-aside_cat2");
                $("#service_area").hide().html(conteudo).show('slide', {direction: 'right'}, 300);

            }
        });
        return false;
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
            var offset = $($(this).attr('href')).offset();
            var top = offset.top;
            top = top - height_fixed;
            e.preventDefault();
            $("body, html").animate({
                //scrollTop: $( $(this).attr('href') ).offset().top }, 600);
                scrollTop: top}, 600);
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

function ajaxInternal(url, content, direction) {
    //$("#conteudo").load("nav_cartao/nav_home.html");
    $.ajax({
        method: "POST",
        url: url,
        beforeSend: function () {
            // Mostra a mensagem de carregando
            $("#carregando").show("fast");
            //$("#cartao").hide('slide', {direction: 'left'}, 300);
            /*  $("#conteudo").fadeOut(1000);*/
        },
        // O que deve acontecer quando o processo estiver completo
        complete: function () {
            // Oculta a mensagem carregando
            $("#carregando").hide("slow");
            // $("#conteudo").show('slide', {direction: 'right'}, 1000);
        },
        success: function (conteudo) {
            //$(content).html(conteudo).show('slide', {direction: direction}, 2000);
            //$(content).html(conteudo).hide();
            //$(content).show('slide', {direction: direction}, 600);
            //$(content).hide('slide', {direction: 'left'}, 200);
            $('.content-aside_cat2 .nine.columns').hide().fadeIn('slow');
            $(content).html(conteudo).show('slide', {direction: direction}, 500);
        }
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






(function () {
    $(document).on('mousewheel DOMMouseScroll', function (event) {
        // event.preventDefault();
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


window.onload = function () {
    var wheelDistance = function (evt) {
        if (!evt)
            evt = event;
        var w = evt.wheelDelta, d = evt.detail;
        if (d) {
            if (w)
                return w / d / 40 * d > 0 ? 1 : -1; // Opera
            else
                return -d / 3;              // Firefox;         TODO: do not /3 for OS X
        } else
            return w / 120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
    };
    var wheelDirection = function (evt) {
        if (!evt)
            evt = event;
        return (evt.detail < 0) ? 1 : (evt.wheelDelta > 0) ? 1 : -1;
    };
    var test = document.getElementById('body');
    //var results = document.getElementById('results');
    function showResults(evt) {
        var distance = wheelDistance(evt);
        var direction = wheelDirection(evt);
        //alert("event.wheelDelta: "+evt.wheelDelta+"<br>event.detail: "+evt.detail+"<br>Normalized Wheel Distance: "+distance+"<br>Wheel Direction: "+direction);
        //results.innerHTML = "event.wheelDelta: "+evt.wheelDelta+"<br>event.detail: "+evt.detail+"<br>Normalized Wheel Distance: "+distance+"<br>Wheel Direction: "+direction;
    }

    if (test.addEventListener) {
        test.addEventListener('mousewheel', showResults, false);     // Chrome/Safari/Opera
        test.addEventListener('DOMMouseScroll', showResults, false); // Firefox
    } else if (test.attachEvent) {
        test.attachEvent('onmousewheel', showResults);                  // IE
    }
}
	