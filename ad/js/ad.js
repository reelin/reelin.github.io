var startY=0,endY=0,trans=0,initTrans=0,step=0;
var ads = [
	{text:'大宝明天见，大宝啊，天天见。',id:0},
	{text:'恒源祥，羊羊羊。',id:1},
	{text:'车到山前必有路，有路必有丰田车。',id:2},
	{text:'今年过节不收礼，收礼只收脑白金。',id:3},
	{text:'维维豆奶,欢乐开怀。',id:4},
	{text:'我的地盘听我的。',id:5},
	{text:'飘柔，就是这么自信。',id:6},
	{text:'杯子连起来可绕地球两圈。',id:7},
	{text:'你的能量超乎你想象。',id:8},
	{text:'你的益达，是你的益达。',id:9},
	{text:'不走寻常路，美特斯邦威。',id:10}
]

$(function(){
	trans = rem2px(0.47);
	initTrans = 11*trans-rem2px(0.05);
	ads = randomilize(ads);
	render(ads);
	$(".select-wrapper ul").css({y:-initTrans});
	$(".select-wrapper ul").children("li").eq(16).addClass("active");
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
	$(".up-btn").on('touchstart',function(e){
		e.stopPropagation();
		slideAds(false);
	})
	$(".down-btn").on('touchstart',function(e){
		e.stopPropagation();
		slideAds(true);
	})
	//end

	var myPlayer = videojs('example_video_1');
    myPlayer.ready(function(){
        myPlayer.width(rem2px(3.95));
        myPlayer.height(rem2px(2.85));
        myPlayer.play();
        $(".video-box").trigger("click");
    });
    function changeVideo(id){
    	console.log("changed")
    	myPlayer.src('./test/video2.mp4');
    	myPlayer.load();
    	myPlayer.play();
    }

    $(".video-box").on("click",function(e){
    	e.preventDefault();
    	myPlayer.play();
    })
})
var slideAds = function(direction){
	if(direction){
		//上滑
		$(".select-wrapper ul").transition({ y:'+='+trans});
		$(".active").removeClass("active").prev().addClass("active");
		step--;
		init();
	}else{
		//下滑
		$(".select-wrapper ul").transition({ y:'-='+trans});
		$(".active").removeClass("active").next().addClass("active");
		step++;	
		init();
	}
}
var init =function (){
	if(Math.abs(step) == 11){
		console.log("归位")
		step = 0;
		$(".select-wrapper ul").transition({y:-initTrans},0);
		$(".select-wrapper ul").children("li").eq(16).addClass("active");
	}
}
var render = function(arr){
	$(".select-wrapper ul").empty()
	for(var i=0;i<3;i++){
		for(var j=0;j<arr.length;j++){
			var text_ = arr[j].text;
			var id_ = arr[j].id;
			var dom_ = '<li data-id='+id_+'>'+text_+'</li>';
			$(".select-wrapper ul").append(dom_);
		}
	}
}

var randomilize = function randomilize(arr){
    var length=arr.length;
    var arr1=new Array(); 
    for(var i=0;i<length;i++)
    {
        arr1[i]=i;
    }   //建立数组下标数组
    var arr2=new Array();
    for(var i=0;i<length;i++)
    {
        arr2[i]=arr1.splice(Math.floor(Math.random()*arr1.length),1);
    }  //将数组下标随机打乱
    var arr3=new Array();
    for(var i=0;i<length;i++)
    {
        arr3[i]=arr[arr2[i]];
    }  //将数组按打乱后的下标输出
    return arr3;
}