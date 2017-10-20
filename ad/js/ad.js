var startY=0,endY=0,trans=0,initTrans=0,step=0;
$(function(){
	trans = rem2px(0.47);
	initTrans = 11*trans;
	$(".select-wrapper ul").css({y:-initTrans});
	$(".select-wrapper ul").children("li").eq(16).addClass("active");
	$('.select-wrapper').on('touchstart',function(e) {
		e.preventDefault();
		var touch_ = e.originalEvent;
		startY = touch_.changedTouches[0].pageY;
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
