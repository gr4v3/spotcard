$(function(){

	var liWidth = $('.img_logos ul li').outerWidth(),
		speed  = 1000,
		rotate = setInterval(start, speed);

	$('.img_logos,.prev,.next').hover(function(){
		/*$('.buttons').fadeIn();*/
		clearInterval(rotate);
	}, function(){
		/*$('.buttons').fadeOut();*/
		rotate = setInterval(start, speed);
	});

	//Next button
	$('.next').click(function(e){
		e.preventDefault();

		$('.img_logos ul').css({'width':'99999%'}).animate({left:-liWidth}, function(){
			$('.img_logos ul li').last().after($('.img_logos ul li').first());
			$(this).css({'left':'0', 'width':'auto'});
		});
	});

	//Prev button
	$('.prev').click(function(e){
		e.preventDefault();
		$('.img_logos ul li').first().before($('.img_logos ul li').last().css({'margin-left':-liWidth}));
		$('.img_logos ul').css({'width':'99999%'}).animate({left:-liWidth}, function(){
			$('.img_logos ul li').first().css({'margin-left':'0'});
			$(this).css({'left':'0', 'width':'auto'});
		});
	});

	function start(){
		$('.next').click();
	};

});