(function($) {
    $('.ring img').on('load', function() {
        $('.ring .rotate, .drop-animation').addClass('js-animate');
        setTimeOut(function(){
            $('.ring .rotate').removeClass('js-animate');
        }, 1);
    });
})(Zepto);
