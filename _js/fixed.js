var browser =$(window).height();   // comp. do browser
$(window).scroll(function(){
var res = detectHeight();
var menu_bar=$( "#menu_bar" ).outerHeight();
var topo_page = $( "#topo_page" ).outerHeight();
var search = $("#search").outerHeight();
var all_fixed = search + menu_bar;
//var height_containers = $( "#topo_page" ).outerHeight() - $( "#menu_bar" ).outerHeight();
var height_containers = topo_page + search;
	//if(res){
		if ($(window).scrollTop() >= topo_page) {
					//$("#menu_bar").addClass('fixed-header');
					$("#search").addClass('fixed-header').css("top",menu_bar);
					//$("#menu_bar").fadeIn( "slow" );
					if($("#menu_bar").hasClass('fixed-header')){
						//$("#search").css("top",menu_bar+1);
					}else{
						$("#menu_bar").hide().addClass('fixed-header').fadeIn( "fast" );
						$("#menu_bar div.logo_pin_main").addClass("logo_pin_main_actived");
						$("#menu_bar div.logo_pin_main").show('slide', {direction: 'left'}, 1000);
						
						var styles = {
											paddingTop: all_fixed+"px",
										};
						$('#service_area').css( styles);
					//$("#menu_bar").show('slide', {direction: 'left'}, 1000);
					}
		}else{
				$('#menu_bar').removeClass('fixed-header');
				$('#menu_bar div.logo_pin_main').removeClass("logo_pin_main_actived");
			    $('#search').removeClass('fixed-header');
				//$("#menu_bar").hide('slide', {direction: 'right'}, 1000);
				//$("#menu_bar").hide();
				var styles = {
									paddingTop: "0px",
								};
				$('#service_area').css( styles);
	}
});

function auto(){
		$('#menu_bar').removeClass('fixed-header');
	}
	

function detectHeight() {
   if(browser <= 250) {
     return true;
   } else {
     return false;
   }
}