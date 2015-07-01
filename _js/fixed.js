var browser =$(window).height();   // comp. do browser
$(window).scroll(function(){
//var res = detectWidth();
var menu_bar=$( "#menu_bar" ).outerHeight();
//var height_containers = $( "#topo_page" ).outerHeight() - $( "#menu_bar" ).outerHeight();
var height_containers = $( "#topo_page" ).outerHeight()+ $("#search").outerHeight();
	//if(res){
		if ($(window).scrollTop() >= height_containers) {
					//$("#menu_bar").addClass('fixed-header');
					$("#search").addClass('fixed-header').css("top",menu_bar+1);
					//$("#menu_bar").fadeIn( "slow" );
					if($("#menu_bar").hasClass('fixed-header')){
						
					}else{
						$("#menu_bar").addClass('fixed-header');
						$("#menu_bar div.logo_pin_main").addClass("logo_pin_main_actived");
						$("#menu_bar div.logo_pin_main").show('slide', {direction: 'left'}, 1000);
					//$("#menu_bar").show('slide', {direction: 'left'}, 1000);
					}
		}else{
				$('#menu_bar').removeClass('fixed-header');
				$('#menu_bar div.logo_pin_main').removeClass("logo_pin_main_actived");
			    $('#search').removeClass('fixed-header');
				//$("#menu_bar").hide('slide', {direction: 'right'}, 1000);
				//$("#menu_bar").hide();
	}
});

function auto(){
		$('#menu_bar').removeClass('fixed-header');
	}
	
/*
function detectWidth() {
   if(window.innerWidth <= 250) {
     return true;
   } else {
     return false;
   }
}*/