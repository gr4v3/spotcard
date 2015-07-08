var browser = $(window).height();   // comp. do browser
$(window).scroll(function () {
    var menu_bar = $("#menu_bar").outerHeight();
    var topo_page = $("#section1").outerHeight();
    if ($(window).scrollTop() >= topo_page - 20) {
        //$("#menu_bar").addClass('fixed-header');
        $("#search").addClass('fixed-header').css("top", menu_bar);
        //$("#menu_bar").fadeIn( "slow" );
        if ($("#menu_bar").hasClass('fixed-header')) {
            //$("#search").css("top",menu_bar+1);
        } else {
            $("#menu_bar").addClass('fixed-header').fadeIn("fast");
            $("#search").addClass('fixed-header').css("top", menu_bar);
            $("#menu_bar div.logo_pin_main").addClass("logo_pin_main_actived");
            $("#menu_bar div.logo_pin_main").show('slide', {direction: 'left'}, 1000);
        }
    } else {
        $('#menu_bar').removeClass('fixed-header');
        $('#menu_bar div.logo_pin_main').removeClass("logo_pin_main_actived");
        $('#search').removeClass('fixed-header');
    }
});
