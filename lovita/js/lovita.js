(function($) {

    // $(document).on('ready',function() {
    //     $('img').lazyload();

    // });
    $(window).on('load', function() {
        $('img').lazyload();
        $('.loading').animate({
            opacity: 0
        }, 1000, function() {
            $('.loading').hide();
            $('body,html').css({
                'height': 'auto',
                'overflow': 'auto'
            });
        });
        setTimeout(function() {
            $('.inner-container .banner .ring').hide();
            $('.drop-animation').addClass('js-animate');
            $('.inner-container .banner .js-rotate').show().addClass('ring-animate');

            setTimeout(function() {
                $('.inner-container .banner .ring .js-rotate').css({
                    'transform': 'rotate(0deg)',
                    '-webkit-transform': 'rotate(0deg)'
                });
            }, 1000);
            setTimeout(function() {
                $('.inner-container .banner .ring').show();
                $('.inner-container .banner .js-rotate').hide().removeClass('ring-animate');
                $('.drop-animation').removeClass('js-animate');
            }, 3000);
        }, 1000);
    });

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
    $('.inner-container').on('touchstart', function(e) {
        clientY_start = e.touches[0].clientY;
        clientX_start = e.touches[0].clientX;
        pageY_start = e.touches[0].pageY;
        console.log('s: ' + pageY_start);
    });
    $('.inner-container').on('touchmove', function(e) {
        clientY_end = e.changedTouches[0].clientY;
        clientX_end = e.changedTouches[0].clientX;
        //判断移动的方向
        distance = Math.abs(e.changedTouches[0].pageY - clientY_end);
        console.log('dis:' + distance);

        if(clientY_start + minRange < clientY_end) {
           isSlideDown = 'u';
           console.log('上');
        } else if(clientY_start - minRange > clientY_end){
           isSlideDown = 'd';
           console.log('下');
        }


    });
    $('.inner-container').on('touchend', function(e) {
        if(isSlideDown == 'u' && distance < 100) {
            console.log('yep');
            $('.inner-container .banner .ring').hide();
            $('.drop-animation').addClass('js-animate');
            $('.inner-container .banner .js-rotate').show().addClass('ring-animate');

            setTimeout(function() {
                $('.inner-container .banner .ring .js-rotate').css({
                    'transform': 'rotate(0deg)',
                    '-webkit-transform': 'rotate(0deg)'
                });
            }, 1000);
            setTimeout(function() {
                $('.inner-container .banner .ring').show();
                $('.inner-container .banner .js-rotate').hide().removeClass('ring-animate');
                $('.drop-animation').removeClass('js-animate');
            }, 3000);
        }
    });
    // var y = 0;
    // $('.inner-container').on('touchend', function(e) {
    //     // e.preventDefault();
    //
    //     // distance = e.touches[0].pageY - pageY_start;
    //     console.log('dis: ' + distance);
    //     y = y + distance;
    //     // if (isSlideDown) {
    //     //     $('.drop-animation.drop1').animate({
    //     //         '-webkit-transform': 'translateY('+ y + 'px)',
    //     //         'transform': 'translateY('+ y + 'px)',
    //     //         'opacity': '1'
    //     //     }, 1000);
    //     //     setTimeout(function() {
    //     //         $('.drop-animation.drop2').animate({
    //     //             '-webkit-transform': 'translateY('+ y + 'px)',
    //     //             'transform': 'translateY('+ y + 'px)',
    //     //             'opacity': '1'
    //     //         }, 1000);
    //     //     }, 500);
    //     //
    //     // }
    //     if (isSlideDown && isFirst) {
    //
    //         isFirst = false;
    //         // $('.inner-container .banner .ring').hide();
    //         // $('.drop-animation').addClass('js-animate');
    //         // $('.inner-container .banner .js-rotate').show().addClass('ring-animate');
    //         // setTimeout(function() {
    //         //     $('.inner-container .banner .ring').show();
    //         //     $('.inner-container .banner .js-rotate').hide().removeClass('ring-animate');
    //         // }, 5000);
    //     }
    //     // 右滑
    //     if (isPic && !isSlideLeft) {
    //         slideRight($picWrapper.find('a.right'));
    //     }
    // });
    $('.thumb-block').on('touchstart',function(e){

        clientX_start = e.touches[0].clientX;
    });
    $('.thumb-block').on('touchmove',function(e) {
        clientX_end = e.changedTouches[0].clientX;
        if (clientX_start + minLRange < clientX_end) {

            isSlideLeft = 'r';
            console.log('向右滑');
        } else if (clientX_start - minLRange > clientX_end) {
            isSlideLeft = 'l';
            console.log('向左滑');
        }

    });
    $('.thumb-block').on('touchend',function(e) {
        console.log('1')
        if (isSlideLeft == 'l') {
            slideRight($(this).find('a.right'));
        } else if(isSlideLeft == 'r') {
            slideLeft($(this).find('a.left'));
        }
    });

    $('.thumb-block .text-block a').on('touchstart', function(e) {
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
        var width = $(elem).parent().find('.slide-wrapper').width();
        var length = $img.length - 1;
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $left = $(elem).prev();

        if (!isAnim && index < length) {
            isAnim = true;
            isSlideLeft = 'a';
            $slide.animate({
                'margin-left': (marginLeft - width) +'px'
            }, 'linear', function() {
                $active.removeClass('active');
                $($img[index+1]).addClass('active');
                $left.show();

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
        var width = $(elem).parent().find('.slide-wrapper').width();
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $right = $(elem).next();
        if (!isAnim && index > 0) {
            isAnim = true;
            isSlideLeft = 'a';
            $slide.animate({
                'margin-left': (marginLeft + width) +'px'
            }, 'linear', function() {
                $active.removeClass('active');
                $($img[index-1]).addClass('active');
                $right.show();
                // if (index - 1 > 0) {
                //     $(elem).show();
                // }
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
})(Zepto);
