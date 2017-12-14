var appId;
var timeStamp;
var nonceStr;
var signature;
var shareImgUrl =  'http://iqiyi.trancn.com/lovita/imgs/share_icon.png';
var shareLink= window.location.href;
var realShareLink =  window.location.href;
var sharedescContent = '';
var shareTitle = 'LOVITA乐薇塔 | 用心爱，随心配';
var sharedescContent = '全球首创“主钻+可拆卸式外圈”的专利珠宝作品。';

(function($){
  if(shareLink.indexOf("http") < 0){
    shareLink = "http://iqiyi.trancn.com/lovita/index.html";
  }
   getTicket();
})(jQuery);
function getTicket() {
  $.ajax({
    async: false,
    url: 'http://iqiyi.trancn.com:10024/api/ticket/lovita?url='+shareLink,
    type: 'GET',
    dataType: 'json',
    data: {},
    success:function(data){
      if(data.error_code == 0)
      {
        var data = data.data;
        appId = data.app_id;
        timeStamp = data.timestamp;
        nonceStr = data.nonce_str;
        signature = data.signature;
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp:timeStamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    }
  })
}

wx.ready(function(){
    wx.onMenuShareAppMessage({
        title: shareTitle , // 分享标题
        desc: sharedescContent, // 分享描述
        link: realShareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '',
        success: function () {
            console.log("@");
        },
    });
    wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: realShareLink, // 分享链接
        imgUrl: shareImgUrl,
        success: function () {
          console.log("@");
        },
    });
});
