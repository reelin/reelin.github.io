var appId;
var timeStamp;
var nonceStr;
var signature;
var shareImgUrl;
var shareLink= window.location.href;
var sharedescContent;
var shareTitle;
// var sharedescfriendDefault = (typeof(shareTitle) == "undefined" || shareTitle == "")?"谱时为你专属定制活动摄影，严格把控每一环节的质量，让每一张照片都很谱时，轻松实现阅读10w+
// ":shareTitle;;
var UvUrl= window.location.pathname;
$(function(){

    var thisUrl = window.location.href;
    if(thisUrl.indexOf("http") < 0){
        thisUrl = "http://"+ window.location.href;
    }
    if(shareLink.indexOf("http") < 0){
        shareLink = "http://"+ window.location.href;
    }
    $.ajax({
        url: '/share/signature',
        type: 'GET',
        dataType: 'json',
        data: {url: thisUrl,shareUrl:shareLink},
        success:function(data){
            if(data.success)
            {
                appId = data.result.app_id;
                timeStamp = data.result.timestamp;
                nonceStr = data.result.noncestr;
                signature = data.result.signature;
                shareLink = data.result.share_url;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: appId, // 必填，公众号的唯一标识
                    timestamp:timeStamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        }
    })

})


wx.ready(function(){
    wx.onMenuShareAppMessage({
        title: "shareTitle" , // 分享标题
        desc: "sharedescContent", // 分享描述
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '',
        success: function () {
            $.ajax({
                url: '/statistics/shareClick',
                type: 'GET',
                dataType: 'json',
                data: {key: UvUrl,
                    params:"activityNo="+activityNo
                },
            });
        },
    });

    wx.onMenuShareTimeline({
        title: "sharedescContent", // 分享标题
        link: shareLink, // 分享链接
        imgUrl: shareImgUrl,
        success: function () {
            $.ajax({
                url: '/statistics/shareClick',
                type: 'GET',
                dataType: 'json',
                data: {key: UvUrl,
                    params:"activityNo="+activityNo
                },
            });
        },
    });
});
