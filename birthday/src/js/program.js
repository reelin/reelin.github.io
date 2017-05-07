(function($) {
    var canClick = false;
    var isFirst = true;
    // 禁止微信浏览器下拉
    $('body').on('touchmove', function(evt) {
      if(!evt._isScroller) {
        evt.preventDefault();
      }
    });
    var myAudio = $('audio')[0];
    function playPause(){
        if(myAudio.paused){
            myAudio.play();
        }else{
            myAudio.pause();
        }
    }
    var timer = setInterval(function() {
        if (myAudio.readyState) {
            $('.loading .btn').show();
            clearTimeout(timer);
        }
    }, 100);

    $('.loading .btn').on('touchstart', function() {
        $('audio')[0].play();
        $('.loading').hide();
        $('.container-1').addClass('animate');
    });
    $('.container-1 .candle').on('touchstart', function() {

        $('.car, .car-rib, .container-1 .title, .bal, .container-1 .candle').addClass('animate');
        $('.car, .car-rib, .container-1 .title, .bal, .container-1 .candle').addClass('animate');
        setTimeout(function() {
            $('.car').addClass('float').removeClass('animate');
        }, 1100);
        setTimeout(function() {
            $('.container-1 .title').addClass('float').removeClass('animate');
            // $('.car-rib').addClass('float').removeClass('animate');
        }, 2100);
        setTimeout(function() {
            $('.bal1').addClass('float').removeClass('animate');
        }, 2700);
        setTimeout(function() {
            $('.bal2').addClass('float').removeClass('animate');
            canClick = true;
        }, 3200);
    });
    $('.container-1').on('touchstart', function() {
        if (!canClick) {
            return;
        }
        $('.container-1').hide();
        $('.container-2').show();
        $('.container-2 .title, .container-2 .candle').addClass('animate');
        setTimeout(function() {
            $(".container-2 .gift-p").show();
        }, 3000);
    });
    $('.container-2').on('touchstart', function() {
        if (isFirst && !$('.modal').hasClass('animate')) {
            $('.container-2 .lihua1, .container-2 .lihua2, .container-2 .yanhua2, .container-2 .yanhua1').addClass('animate');
                setTimeout(function() {
                    $('.container-2').hide();
                    $('.modal').addClass('animate');
                    isFirst = false;
                }, 1000);

        }
    });
    $('.modal').on('touchstart', '.btn', function() {
        $('.modal .btn').hide();
        $('.modal .title-f, .modal .candle').addClass('animate');
    });
    $('.modal').on('touchstart', '.candle', function() {
        $('.modal').hide();
        $('.container-3').show();
        $('.container-3 .font, .container-3 .candle').addClass('animate');


        // $.each(font, function(index, item) {
        //     var elem = $(item);
        //     setTimeout(function() {
        //         elem.addClass('animate');
        //     }, 2000);
        // });
        // $('.container-3 .candle').addClass('animate');
    });
    $('.container-3').on('touchstart', '.candle', function() {
        $('.container-3 .people').addClass('animate');
        setTimeout(function() {
            $('.container-3 .p1').addClass('float').removeClass('animate');
        }, 300);
        setTimeout(function() {
            $('.container-3 .p3').addClass('float').removeClass('animate');
        }, 2600);
        setTimeout(function() {
            $('.container-3 .p2').addClass('float').removeClass('animate');
        }, 4900);
    });
    // $('.container-2').on('touchstart', '.present', function() {
    //
    //         if (isFirst && $('.present .jz').hasClass('animate')) {
    //             isFirst = false;
    //             $('.present .tip').addClass('animate');
    //             setTimeout(function() {
    //                 $('.container-2 .lihua1, .container-2 .lihua2, .container-2 .yanhua2, .container-2 .yanhua1').addClass('animate');
    //                 setTimeout(function() {
    //                     $('.container-2').hide();
    //                     $('.container-3').show();
    //                     $('.container-3 .candle').addClass('animate');
    //
    //                 }, 1000);
    //             }, 1000);
    //
    //         }
    // });
    // $('.container-3').on('touchstart', function() {
    //     $('.container-3 .people').addClass('animate');
    //     setTimeout(function() {
    //         $('.container-3 .people').addClass('float').removeClass('animate');
    //
    //     }, 600);
    // });



})(Zepto);
