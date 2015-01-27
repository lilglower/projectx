var gui = require('nw.gui');
gui.Window.get().setMaximumSize(0, screen.availHeight);

var process = {
	exit : function(){
		gui.App.quit();
	}
}

$.shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//bg offset
$.bgLeft = function(){
	$(".background").animate({
		margin : "-300px -980px"
	}, 35000, function(){
		$.bgRight();
	})
}

$.bgRight = function(){
	$(".background").animate({
		margin : "-300px 0"
	}, 35000, function(){
		$.bgLeft();
	})
}

$.prepare = function($on, $done){
	setTimeout($done, 1200);
	$.gameOn = !!$on;
	if($on){
		$.hook('gameStart');
		setTimeout(function(){
			$.wave1();
		}, 2800);
		$(".field").click(function(){
			$.craft.shoot();
		})
		$('body').animate({
			backgroundColor : '#F55'
		}, 2500)
		$('.menu').animate({
			left : '-400px'
		}, 1200)
		$('.titlebar').animate({
			top : '-150px'
		}, 750)
		$('body').css({
			cursor : 'none'
		})

		$.craft = new ship();
		
	} else {
		$.hook('gameStop');
		$.destroyAllMonsters();
		$(".field").unbind('click');
		$('body').animate({
				backgroundColor : '#000'
			}, 2500)
		$(".menu > h1").css({color : '#FFF'})
		$(".start").prop('disabled', false);
		$('.field *').hide(1000, function(){
			$(this).remove();
		})
		$('.menu').animate({
			left : '50%'
		}, 1200);

		$('.titlebar').animate({
			top : '0px'
		}, 750)

		$('body').css({
			cursor : 'default'
		})

		if('craft' in $)
			$.craft.destroy()
	}
}
$(function(){
	$.prepare(0)

	$.bgRight();

	$(window).keyup(function(e){
		switch(e.keyCode){
			case 27: //esc
				if($.gameOn)
					$.prepare(0);
			break;

			case 32: //space
				$.craft.shoot();
			break;

			case 82: //R
				$.craft.rapid = !$.craft.rapid;
			break;
		}
	})

	$(".titlebar").hover(function(){
		$(this).animate({
			'backgroundColor': 'rgba(137, 14, 124, .5)',
			'color' : '#F55'
		}, 550);
	}, function(){
		$(this).animate({
			'backgroundColor': 'rgba(0, 0, 0, .7)',
			'color' : '#FFF'
		}, 550);
	})

	$(".start").click(function(){
		$(this).prop('disabled', true);
		$.prepare(1, function(){

		});
	})

	$('.exit').click(function(){
		process.exit();
	})
})