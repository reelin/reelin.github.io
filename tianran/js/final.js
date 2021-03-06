(function($) {
    var img = new Image();
    img.src = 'imgs/bg.png';
    img.onload = function() {
        // 生成图片
        convert2canvas();
    }

    function html2img() {
        $('.avatar').on('load',function() {
            convert2canvas();
        });

    }
    function convert2canvas() {

        var cntElem = $(".canvas-wrapper")[0];

        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

        var left = shareContent.offsetLeft;
        var top = shareContent.offsetTop;

        canvas.getContext("2d").translate(-left, -top);
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            // logging: true, //日志开关，便于查看html2canvas的内部执行流程
            width: width, //dom 原始宽度
            height: height,
            useCORS: true // 【重要】开启跨域配置
        };

        html2canvas(shareContent, opts).then(function (canvas) {
            var context = canvas.getContext('2d');
            // 【重要】关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;

            // 【重要】默认转化的格式为png,也可设置为其他格式
            var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
            $(".canvas-wrapper").html('').prepend(img);

            $(img).css({
                "width": canvas.width / 2 + "px",
                "height": canvas.height / 2 + "px"
            });

        });
    }

})(jQuery);
