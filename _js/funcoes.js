$(document).ready(function(){
	$(".styled-select").click(function(){
	var res = detectHeight();
	});
	
	next();
	scrollAnimated();
	detectHeightElement();
	/* center area card horizontal*/
	detectHeightElementNav2("section.content-aside" ,".content-aside .container:first-child",".content-aside .container:last-child");
	
	$( ".content-aside_cat2 .right a:last-child span" ).addClass( "rotation-180" );
	goTarget();
});

function mudaFoto(foto){
		document.getElementById("icone").src = foto;
	}
	
function detectHeight() {
	var browser =$(window).height();   // altura do browser
	var position =$(window).scrollTop() +(browser/2);
	
		//alert("w"+window.innerHeight+"\n S:"+browser);
	   if(browser >= position) {
			$( ".styled-select div div" ).removeClass( "toggle-cs-optionsdown" ).addClass( "toggle-cs-options" );
			//return true;
	   } else {
			$( ".styled-select div div" ).removeClass( "toggle-cs-options" ).addClass( "toggle-cs-optionsdown" );
			//return false;
	   }
}

function showHeight( element, height ) {
  alert( "The height for the " + element + " is " + height + "px." );
}

function detectHeightElement(){
	var browser =$(window).height();   // comp. do browser
	var height_containers = $( "#contatos .container:first-child" ).outerHeight() + $( "#contatos .container:last-child" ).outerHeight();
	var height_section = $( "#contatos" ).outerHeight() ;
	var height_content_aside3= $( ".content-aside3" ).outerHeight() ;
	var height_rodape= $( "#rodape" ).outerHeight() ;

	var all_elements = height_containers + height_content_aside3 + height_rodape;
	//showHeight( "all_elements", all_elements );

	var calc_padding = (browser - all_elements) / 2;
	//showHeight( "calc_padding", calc_padding );
	var styles = {
      paddingBottom: calc_padding+"px",
	  paddingTop: calc_padding+"px"
		};
	$("section.content-aside2").css( styles) ;
	
    //showHeight( "contatos .container:first-child", $( "#contatos .container:first-child" ).height() );
}

function detectHeightElementNav2(elemM,elem1,elem2){
	var browser =$(window).height();   // comp. do browser
	var height_containers = $( elem1 ).outerHeight() + $( elem2 ).outerHeight();
	var height_fixed = $( "#search" ).outerHeight() + $( "#menu_bar" ).outerHeight();
	height_containers += height_fixed
	//var height_section = $(cartao).outerHeight() ;

	//var all_elements = height_containers + height_content_aside3 + height_rodape;
	//showHeight( "all_elements", all_elements );

	var calc_padding = (browser - height_containers) / 2;
	//showHeight( "calc_padding", calc_padding );
	var styles = {
      paddingBottom: calc_padding+"px",
	  paddingTop: calc_padding+"px"
		};
	$(elemM).css( styles) ;
}
  
  /* function invoked in na_home2*/
  function validation(){
    $(document).ready(function () {
		$("#payment_card").hide();
		$(".radios").on('click', function () {
		if ($(this).is("fieldset input[value='card']")) {
			$("#payment_card").fadeIn();
		}else{
			$("#payment_card").hide();
		}
		});
	});
  }
  
  function next(){
  $("#searchForm").submit( function(event){
	var $form = $(this),
    url = $form.attr("action");
		url="nav_cartao/"+url;
		
		event.preventDefault();
		 //var olink = $(this).attr("href");
		 //var olink = "nav_cartao/nav_home2.html";
		  $.ajax({
			method: "post",
			url: url,
			beforeSend: function(){
			  // Mostra a mensagem de carregando
			  $("#carregando").show("fast");
			   $("#cartao").hide('slide', {direction: 'left'}, 300);
			 /*  $("#conteudo").fadeOut(1000);*/
			},
			// O que deve acontecer quando o processo estiver completo
			complete: function(){
			  // Oculta a mensagem carregando
			  $("#carregando").hide("slow");
			 // $("#conteudo").show('slide', {direction: 'right'}, 1000);
			},
			success: function(conteudo){
			   $("#cartao").html(conteudo).show('slide', {direction: 'right'}, 300);
			}
		  });
		return false;
	  });
	  
	  }
 
 function verifyCheckbox(tag){
	var clean =  tag.replace('#', '');
	 var target = "input[value='"+clean+"']";
	$(tag).hide();
	$(".checkbox").on('click', function () {
		if ($(this).is(target)) {
			if ($(this).is(":checked") ){
				$(tag).fadeIn();
			}else{
				$(tag).hide();
			}
		}
	});
}

function scrollAnimated(){
	$(document).ready(function() {
		
		var height_fixed = $( "#search" ).outerHeight() + $( "#menu_bar" ).outerHeight();	
		$(".link").on("click", function(e){
			var offset = $( $(this).attr('href') ).offset();
		var top = offset.top;
		top = top - height_fixed;
			e.preventDefault();
			$("body, html").animate({ 
			//scrollTop: $( $(this).attr('href') ).offset().top }, 600);
			scrollTop:top }, 600);
		});
	});
}







function goBack(target){
$('.previous span').click(function(event){
		event.preventDefault();
        ajaxInternal("nav_cartao/"+target,"#cartao",'left');
        return false;
    });
}

function ajaxInternal(url,content,direction){
			//$("#conteudo").load("nav_cartao/nav_home.html");
			$.ajax({
			method: "POST",
			url: url,
			beforeSend: function(){
			  // Mostra a mensagem de carregando
			  $("#carregando").show("fast");
			   //$("#cartao").hide('slide', {direction: 'left'}, 300);
			 /*  $("#conteudo").fadeOut(1000);*/
			},
			// O que deve acontecer quando o processo estiver completo
			complete: function(){
			  // Oculta a mensagem carregando
			  $("#carregando").hide("slow");
			 // $("#conteudo").show('slide', {direction: 'right'}, 1000);
			},
			success: function(conteudo){
			//$(content).html(conteudo).show('slide', {direction: direction}, 2000);
			//$(content).html(conteudo).hide();
			//$(content).show('slide', {direction: direction}, 600);
			//$(content).hide('slide', {direction: 'left'}, 200);
			$('.content-aside_cat2 .nine.columns').hide().fadeIn('slow');
			$(content).html(conteudo).show('slide', {direction: direction}, 500);
			}
		  });
}



function goTarget(){
	var last = "";
	var start = 0;
	$( ".content-aside_cat2 .nine.columns" ).addClass( "display_none" );
	$(".link_cat").on('click', function (event) {
		event.preventDefault();
		$( ".content-aside_cat2 .nine.columns" ).addClass( "display_none" );
		var tag = $(this).attr('href').replace("#",'');
		last = tag;
		var target = "nav_cat_"+tag+".html";
		
		if($( this ).hasClass('active_link')){
			$( ".content-aside_cat2 .nine.columns" ).addClass( "display_none" );
			$( this ).removeClass('active_link');
		}else if(!$( this ).hasClass('active_link')){
			$(".link_cat").removeClass('active_link');
			if($( ".content-aside_cat2 .nine.columns" ).hasClass( "display_none" )){
				$( ".content-aside_cat2 .nine.columns" ).removeClass( "display_none" );
				$(this).addClass("active_link");
				ajaxInternal("nav_categoria/"+target,".content-aside_cat2 .nine .overflow .container",'right');
			}
		}
	});
}






(function() {
  var delay = false;

  $(document).on('mousewheel DOMMouseScroll', function(event) {
	  
	  var wheelDirection = function(evt){
			if (!evt) evt = event;
			return (evt.detail<0) ? 1 : (evt.wheelDelta>0) ? 1 : -1;
		};
    event.preventDefault();
   if(delay) return;

    delay = true;
    setTimeout(function(){delay = false},500)

    var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
	var height_fixed = $( "#search" ).outerHeight() + $( "#menu_bar" ).outerHeight();

    var a= document.getElementsByClassName('target');
    if(wd < 0) {
      for(var i = 0 ; i < a.length ; i++) {
        var t = a[i].getClientRects()[0].top;
        if(t >= height_fixed) break;
      }
    }
    else {
      for(var i = a.length-1 ; i >= 0 ; i--) {
        var t = a[i].getClientRects()[0].top;	
        if(t < -height_fixed) break;
      }
    }
	/*var top = $(a[i]).position().top;*/
	//var top =$(a[i]).position.top;
	
	var tag = $(a[i]);
	var position = tag.position();
	var offset = $(a[i]).offset();
	
	
	var test = document.getElementById('html,body');
	var tester = document.getElementById('cartao');
	
	var top = offset.top;
	var direction = wheelDirection(test);
	if(direction>=0){	
		if(i ==2)
			top+=height_fixed -1;
		else
			top+=height_fixed -67;
	}else if(direction<0){
		//top-=height_fixed -1;
		if(i ==1){
			//top-=height_fixed -1;
		}else
			top-=height_fixed -1;
		}
	//alert(height_fixed);
	//alert(offset.top);
	//var top = $(a[i]).offset().top;
	/*alert(top);*/
	//tag.offset({ top: top});
    $('html,body').animate({
     /* scrollTop: a[i].offsetTop*/
	 scrollTop: top
    });
  });
})();



	window.onload = function(){
		var wheelDistance = function(evt){
			if (!evt) evt = event;
			var w=evt.wheelDelta, d=evt.detail;
			if (d){
				if (w) return w/d/40*d>0?1:-1; // Opera
				else return -d/3;              // Firefox;         TODO: do not /3 for OS X
			} else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
		};
		var wheelDirection = function(evt){
			if (!evt) evt = event;
			return (evt.detail<0) ? 1 : (evt.wheelDelta>0) ? 1 : -1;
		};
		var test = document.getElementById('body');
		//var results = document.getElementById('results');
		function showResults(evt){
			var distance  = wheelDistance(evt);
			var direction = wheelDirection(evt);
			//alert("event.wheelDelta: "+evt.wheelDelta+"<br>event.detail: "+evt.detail+"<br>Normalized Wheel Distance: "+distance+"<br>Wheel Direction: "+direction);
			//results.innerHTML = "event.wheelDelta: "+evt.wheelDelta+"<br>event.detail: "+evt.detail+"<br>Normalized Wheel Distance: "+distance+"<br>Wheel Direction: "+direction;
		}

		if (test.addEventListener){
			test.addEventListener( 'mousewheel', showResults, false );     // Chrome/Safari/Opera
			test.addEventListener( 'DOMMouseScroll', showResults, false ); // Firefox
		}else if (test.attachEvent){
			test.attachEvent('onmousewheel',showResults);                  // IE
		}
	}
	