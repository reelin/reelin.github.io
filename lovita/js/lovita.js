(function($) {
    // $('.ring img').on('load', function() {
    //     $('.ring .rotate, .drop-animation').addClass('js-animate');
    //     // setTimeOut(function(){
    //     //     $('.ring .rotate').removeClass('js-animate');
    //     // }, 1);
    // });
    var clientY_start;
    var clientY_end;
    var isSlideDown = false;
    var minRange = 10;
    var isFirst = true;
    // $('body').on('touchstart', function(e) {
    //     clientY_start = e.touches[0].clientY;
    // });
    // $('body').on('touchend', function(e) {
    //     e.preventDefault();
    //     if (isSlideDown && isFirst) {
    //         isFirst = false;
    //         $('.inner-container .banner .ring').hide();
    //         $('.drop-animation').addClass('js-animate');
    //         $('.inner-container .banner .js-rotate').show().addClass('ring-animate');
    //         setTimeout(function() {
    //             $('.inner-container .banner .ring').show();
    //             $('.inner-container .banner .js-rotate').hide().removeClass('ring-animate');
    //         }, 5000);
    //     }
    //
    // });
    // $('body').on('touchmove',function (e) {
    //     e.preventDefault();
    //     clientY_end = e.changedTouches[0].clientY;
    //     //判断移动的方向
    //     // distance = clientY_end - clientY_start;
    //     if(clientY_start + minRange < clientY_end) {
    //        isSlideDown = false;
    //     }
    //     else if(clientY_start - minRange > clientY_end){
    //        isSlideDown = true;
    //     }
    // });
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
        var $slide = $(this).parent().find('.pic-wrapper');
        var $img = $slide.find('.pic-slide img');
        var $active = $slide.find('.pic-slide img.active');
        var width = $(this).parent().find('.slide-wrapper').width();
        var length = $img.length - 1;
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $left = $(this).prev();
        if (!isAnim && index < length) {
            isAnim = true;
            $slide.animate({
                'margin-left': (marginLeft - width) +'px'
            }, 'linear', function() {
                $active.removeClass('active');
                $($img[index+1]).addClass('active');
                $left.show();
                isAnim = false;
            });
            if (index == length -1) {
                $(this).hide();
            }
        } else {
            $(this).hide();
        }
    });
    $('.thumb-block .pic-block .left').on('touchstart', function(e) {
        e.preventDefault();
        var $slide = $(this).parent().find('.pic-wrapper');
        var $img = $slide.find('.pic-slide img');
        var $active = $slide.find('.pic-slide img.active');
        var width = $(this).parent().find('.slide-wrapper').width();
        var index = $img.index($active);
        var marginLeft = parseInt($slide.css('margin-left'));
        var $right = $(this).next();
        if (!isAnim && index > 0) {
            isAnim = true;
            $slide.animate({
                'margin-left': (marginLeft + width) +'px'
            }, 'linear', function() {
                $active.removeClass('active');
                $($img[index-1]).addClass('active');
                $right.show();
                isAnim = false;
            });
            if (index == 1) {
                $(this).hide();
            }
        } else {
            $(this).hide();
        }
    });
})(Zepto);
