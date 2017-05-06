(function($) {
    $(document).ready(function () {
        setTimeout(function() {
            $('.loading').hide();

            $('.container-1').addClass('animate');
        }, 1000);
        setTimeout(function() {
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
            }, 3200);
        }, 1600);

        $('.container-1').on('click', function() {
            $('.container-1').hide();
            $('.container-2').show();
            $('.container-2 .title, .container-2 .candle').addClass('animate');
        });
        $('.container-2 .candle').on('click', function() {

            $('.container-2 .lihua1, .container-2 .lihua2, .container-2 .yanhua2, .container-2 .yanhua1').addClass('animate');
        });

    });



})(Zepto);
