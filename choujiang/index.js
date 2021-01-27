
(function($) {
	var name = 3; //第几名
	var cont = 3; //第几个
	var timer = null;

	var x = 9;//上限
	var y = 0; //下限

	$('.btn').on('click', 'a.js-start', function(e){
	
		e.preventDefault();

		if ($('.font span').first().hasClass('js-111')) {
			return;
		}
	
		$(this).css('display','none');	
		$('a.js-stop').css('display','inline-block');
		
		$('.font span').first().addClass('js-' + name + cont + '1');
		$('.font span').last().addClass('js-' + name + cont + '2');
		

		if (name == 2) {
			$('h3').text('二等奖');
			$('.font span').text('?');
		} else if (name == 1){
			$('h3').text('一等奖');
			$('.font span').text('?');

		}
		timer = setInterval(radom, 20);

	});
	$('.btn').on('click', 'a.js-stop', function(e){
		
		e.preventDefault();
		$(this).css('display','none');
		$('a.js-start').css('display','inline-block');
		clearInterval(timer);
		setTimeout(function() {
			$('.font span.js-331').html('1');
			$('.font span.js-332').html('5');
			$('.font span.js-321').html('1');
			$('.font span.js-322').html('0');
			$('.font span.js-311').html('1');
			$('.font span.js-312').html('3');
			$('.font span.js-221').html('0');
			$('.font span.js-222').html('9');
			$('.font span.js-211').html('0');
			$('.font span.js-212').html('7');
			$('.font span.js-111').html('1');
			$('.font span.js-112').html('1');
			cont = cont - 1;
			if (cont == 0) {
				if (name == 3) {
					name = 2;
					cont = 2;
				} else if (name == 2) {
					name = 1;
					cont = 1;
				}
			}
		}, 20);

	});
	function radom() {
		
		var r1 = parseInt(parseInt(Math.random() * (x - y + 1) + y));
		var r2 = parseInt(parseInt(Math.random() * (x - y + 1) + y));
		var className1 = 'js-' + name + cont + '1';
		var className2 = 'js-' + name + cont + '2';
		$('.font span.'+className1).html(r1);
		$('.font span.'+className2).html(r2);
	}
})(jQuery);