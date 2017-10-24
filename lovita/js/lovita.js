(function($) {

    var myPlayer = videojs('video',{
		"controls": false
	});
    var play_status = '0';
    var howLoudIsIt;

    myPlayer.ready(function(){
        var w = parseInt($('.inner-container').width());
        myPlayer.width(w);

        $('.video-bg').on('touchstart', function() {
            myPlayer.play();
            play_status = '1';
        });
        $('video').on('touchstart', function() {
            myPlayer.pause();
            play_status = '2';
        });
        $('.mute-wrapper').on('touchstart', function() {
            var $mute = $('.js-mute.mute');
            var $muted = $('.js-mute.muted');
            if (!$(this).hasClass('muted')){
                $muted.show();
                $mute.hide();
                // myPlayer.volume(0.5);
                $('video')[0].muted = true;
                $(this).addClass('muted');
            } else {
                $mute.show();
                $muted.hide();
                $('video')[0].muted = false;
                $(this).removeClass('muted');
            }
        })
   });
   myPlayer.on("play", function(){
        $('.video-bg').hide();
   });
   myPlayer.on("pause", function(){
        $('.video-bg').show();
   });



    $(window).on('load', function() {

        $('.video-container').height($('video').height());


        $('.lazyload').each(function() {
            $(this).attr('src', $(this).attr('data-src'));
        });
        $('.loading').animate({
            opacity: 0
        }, 1000, function() {
            $('.loading').hide();
            $('body,html').css({
                'height': 'auto',
                'overflow': 'auto'
            });
        });
        // setTimeout(animateHandler, 2000);
    });

    var handler = null;
    // 首屏动画
    function animateHandler() {
        isRotate = true;

        // $('.inner-container .banner .ring').hide();
        if (handler) {
            clearTimeout(handler);
            dropHandler();
            isRotate = false;
            handler = null;
            return ;
        }

        $('.drop-animation').addClass('js-animate');
        $('.inner-container .banner .js-rotate').show().addClass('ring-animate');

        setTimeout(function() {
            $('.inner-container .banner .ring .js-rotate').css({
                'transform': 'rotate(0deg)',
                '-webkit-transform': 'rotate(0deg)'
            });

            // $('.inner-container .banner .ring').animate({
            //     'display': 'block'
            // }, 500);
            $('.inner-container .banner .js-rotate').removeClass('ring-animate');
            isRotate = false;
        }, 1500);

        handler = setTimeout(dropHandler, 12000);
    }

    function dropHandler() {
        $('.drop-animation').removeClass('js-animate');
    }



    var clientY_start;
    var clientY_end;
    var clientX_start;
    var pageY_start;
    var clientX_end;
    var isSlideDown = false;
    var isSlideLeft = false;
    var minRange = 10;
    var minLRange = 100;
    var isFirst = true;
    var distance;
    var isPic = false;
    var $picWrapper;
    var isRotate = false;
    var h_video = parseInt($('video').height());

    var re_slide_down = false;
    //
    // $(document).scroll(function() {
    //
    //     var top = $(document).scrollTop();
    //     console.log(top+' '+h_video);
    //     console.log(isSlideDown)
    //     if (isSlideDown == 'u' && top <= h_video) {
    //         console.log('暂停');
    //
    //         if (play_status == '1') {
    //            myPlayer.play();
    //         }
    //     }else if (isSlideDown == 'd') {
    //         if (play_status == '1') {
    //             myPlayer.pause();
    //         }
    //
    //         if (re_slide_down && (top >= (h_video + 10) && top < (h_video - 10)) {
    //             console.log('动画');
    //             animateHandler();
    //         }
    //     }
    // });

    $('.inner-container').on('touchstart', function(e) {
        clientY_start = e.touches[0].clientY;
        clientX_start = e.touches[0].clientX;
        pageY_start = e.touches[0].pageY;
        // console.log('s: ' + pageY_start);
    });
    $('.inner-container').on('touchmove', function(e) {

        clientY_end = e.changedTouches[0].clientY;
        clientX_end = e.changedTouches[0].clientX;
        //判断移动的方向
        distance = Math.abs(e.changedTouches[0].pageY - clientY_end);
        // console.log('dis:' + distance);

        if(clientY_start + minRange < clientY_end) {
           isSlideDown = 'u';

           if(!isRotate && (distance < (h_video + 100))) {
               if (play_status == '1') {
                   myPlayer.play();
               }
           }
        } else if(clientY_start - minRange > clientY_end){
           isSlideDown = 'd';


            if (play_status == '1') {
                myPlayer.pause();
            }
            console.log(distance);
            if (!isRotate && (distance >= h_video && distance < (h_video + 100))) {
                animateHandler();
            }

        }


    });



    $('.thumb-block').on('touchstart',function(e){
        var touch_ = e.originalEvent;
		clientX_start = touch_.changedTouches[0].pageX;

    });
    $('.thumb-block').on('touchmove',function(e) {
        clientX_end = e.changedTouches[0].clientX;
        if (clientX_start + minLRange < clientX_end) {
            isSlideLeft = 'r';
        } else if (clientX_start - minLRange > clientX_end) {
            isSlideLeft = 'l';
        }

    });
    $('.thumb-block').on('touchend',function(e) {
        if (isSlideLeft == 'l') {
            slideRight($(this).find('a.right'));
        } else if(isSlideLeft == 'r') {
            slideLeft($(this).find('a.left'));
        }
    });

    //滑动手势监听
	$('.select-wrapper').on('touchstart',function(e) {
		e.preventDefault();
		var touch_ = e.originalEvent;
		startY = touch_.changedTouches[0].pageY;
		endY = touch_.changedTouches[0].pageY;
	})
	$('.select-wrapper').on('touchmove',function(e) {
		e.preventDefault();
		var touch = e.originalEvent;
		endY = touch.changedTouches[0].pageY;
	})
	$('.select-wrapper').on('touchend',function(e) {
		e.preventDefault();
		if (endY - startY > 10) {
			console.log("下划");
			slideAds(true);
		} else if (endY - startY < -10) {
			console.log("上划");
			slideAds(false);
		};
	})

    $('.thumb-block .text-block a.js-pic').on('touchstart', function(e) {
        e.preventDefault();
        var $textBlock = $(this).parent();
        var $picBlock = $textBlock.next();
        $textBlock.hide();
        $picBlock.show();
    });
    var isAnim = false;
    $('.thumb-block .pic-block .right').on('touchstart', function(e) {
        e.preventDefault();
        slideRight(this);
    });
    $('.thumb-block .pic-block .left').on('touchstart', function(e) {
        e.preventDefault();
        slideLeft(this);
    });
    function slideRight(elem) {
        var $slide = $(elem).parent().find('.pic-wrapper');
        var $img = $slide.find('.pic-slide img');
        var $active = $slide.find('.pic-slide img.active');
        var width = parseInt($(elem).parent().find('.slide-wrapper').width());
        var length = $img.length - 1;
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $left = $(elem).prev();

        if (!isAnim && index < length) {
            $slide.find('.shining').hide();
            isAnim = true;
            isSlideLeft = 'a';
            $slide.transition({ x:'-='+width}, 'linear', function() {
                $active.removeClass('active');
                $($img[index+1]).addClass('active');
                $left.show();
                $slide.find('.shining').show();
                isAnim = false;
            });
            if (index == length -1) {
                $(elem).hide();
            }
        } else {
            $(elem).hide();
            // $left.show();
        }
    }
    function slideLeft(elem) {
        var $slide = $(elem).parent().find('.pic-wrapper');
        var $img = $slide.find('.pic-slide img');
        var $active = $slide.find('.pic-slide img.active');
        var width = parseInt($(elem).parent().find('.slide-wrapper').width());
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $right = $(elem).next();
        if (!isAnim && index > 0) {
            isAnim = true;
            isSlideLeft = 'a';
            $slide.find('.shining').hide();
            $slide.transition({ x:'+='+width}, 'linear', function() {
                $active.removeClass('active');
                $($img[index-1]).addClass('active');
                $right.show();
                // if (index - 1 > 0) {
                //     $(elem).show();
                // }
                $slide.find('.shining').show();
                isAnim = false;
            });
            if (index == 1) {
                $(elem).hide();
                // $right.show();
            }
        } else {
            $(elem).hide();
            // $right.show();
        }
    }
})(jQuery);
