var startY=0,endY=0,trans=0,initTrans=0,step=0;
var ads1 = [
	{text:'大宝明天见，大宝啊，天天见。',id:0, time:1998},
	{text:'恒源祥，羊羊羊。',id:1,time:2008},
	{text:'今年过节不收礼，收礼只收脑白金。',id:2 ,time:2005},
	{text:'维维豆奶,欢乐开怀。',id:3 ,time:2009},
	{text:'我的地盘听我的。',id:4 ,time:2004},
	{text:'飘柔，就是这么自信。',id:5 ,time: 2001},
	{text:'杯子连起来可绕地球两圈。',id:6, time:2011},
	{text:'你的能量超乎你想象。',id:7, time:2013},
	{text:'你的益达，是你的益达。',id:8 ,time:2008},
	{text:'不走寻常路，美特斯邦威。',id:9 ,time: 2003}
];
var ads2 = [
	{text:'掏出来搞事情的拍照黑科技小米手机。',id:0, sour:'奇葩说'},
	{text:'奶后吐真言。',id:1, sour:'奇葩说'},
	{text:'鸡年全家提桶鸡。',id:2, sour:'奇葩说'},
	{text:'别让你的头屑陪我过夜。',id:3, sour:'奇葩说' },
	{text:'我X（去），这也能卖出去。',id:4, sour:'奇葩说'},
	{text:'玩的不够大，别喝美年达。',id:5 , sour:'奇葩说'},
	{text:'想的美不如拍得美的vivo手机。',id:6, sour:'姐姐好饿'},
	{text:'四海八荒说走就走，老司机带你上宇宙。',id:7, sour:'吃光全宇宙'},
	{text:'hip-hop是你的维他命保持12分的清醒，农夫山泉维他命水马力全开优势占领。',id:8, sour:'中国有嘻哈'},
	{text:'麦当劳那么大的小食Fun开闹不休息，那么那么大小食坚持进攻火力。',id:9 , sour:'中国有嘻哈'},
	{text:'Never循规蹈矩ABSOLUT绝对伏特加有魔力，Cool night有绝对伏特加让胜利更有创意。',id:10, sour:'中国有嘻哈'}
];

var $wrapper = $('.container.choice1');

$(function(){

	var type = '1';
	var line = 0;
	var hanlder = setInterval(function() {
		line = line + 1;
		if (line < 100) {
			$('.loading-line .line').width(line + '%');
		}
	}, 100);


	initSelect(ads1);

	var id = $wrapper.find(".select-wrapper li.active").attr('data-id');
	var myPlayer;
	var myPlayer2;
	$(window).on('load',function() {
		setTimeout(function() {
			clearInterval(hanlder);
			$('.loading-line .line').width('100%');
			$('.loading').hide();
			myPlayer.ready(function(){
				myPlayer.width(rem2px(3.95));
				myPlayer.height(rem2px(2.85));
				var url = './video/1/' + $(".choice1 .select-wrapper li.active").attr('data-id') + '.mp4';
				myPlayer.src(url);
				myPlayer.load();
				myPlayer.play();
				document.addEventListener("WeixinJSBridgeReady", function () {
					myPlayer.play();
					$wrapper.find(".vjs-big-play-button").trigger("click");
				}, false);
			});
		}, 1000);
		myPlayer = videojs('video1',{
			'controls':false
		});
		myPlayer2 = videojs('video2',{
			'controls':false
		});


	});

	function initSelect(ads) {
		trans = rem2px(0.47);
		initTrans = 10*trans-rem2px(0.05);
		ads = randomilize(ads);
		render(ads);
		$wrapper.find(".select-wrapper ul").css({y:-initTrans});
		$wrapper.find(".select-wrapper ul").children("li").eq(15).addClass("active");

	}


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
	});
	$(".down-btn").on('touchstart',function(e){
		e.stopPropagation();
		slideAds(true);
	});

	$('.choice1 .btn').on('touchstart', function(e) {
		e.preventDefault();
		myPlayer.pause();
		$('.choice1').hide();
		$('.choice2').show();
		$wrapper = $('.choice2');
		type = '2';
		initSelect(ads2);
		myPlayer2.ready(function(){
			myPlayer2.width(rem2px(4.85));
			myPlayer2.height(rem2px(2.65));
			var url = './video/2/' + $wrapper.find(".select-wrapper li.active").attr('data-id') + '.mp4';
			myPlayer2.src(url);
			myPlayer2.load();
			myPlayer2.play();
			document.addEventListener("WeixinJSBridgeReady", function () {
				myPlayer2.play();
				$wrapper.find(".vjs-big-play-button").trigger("click");
			}, false);
		});
	});
	var result = ['系统推算你是80后／广告界的泥石流<br>单纯走心，记忆深处最动人。',
		'90后/花式广告老司机<br>广告不仅好看<br>还可以跟着主演爱豆一起飙演技',
	'00后/魔性广告最洗脑<br>旧时代的广告<br>你用创意横扫 广告里迸发出魔性的味道'
];
	$('.choice2 .btn').on('touchstart', function(e) {
		e.preventDefault();
		myPlayer2.pause();
		var $first = $('.choice1 .select-wrapper li.active');
		var $last = $('.choice2 .select-wrapper li.active');
		var time = $first.attr('data-time');
		var r = result[2];
		$('.result .old .js-info').text($first.text());
		$('.result .old .js-time span').text(time.substr(2));
		$('.result .new .js-info').text($last.text());
		$('.js-result-time .js-result').text(time);
		$('.result span.js-pro').text($last.attr('data-sour'));
		time = parseInt(time);
		if (time <= 2003 ) {
			r = result[0];
		} else if (time <= 2009) {
			r = result[1];
		}
		$('.result p.js-result').html(r);
		$('.choice2').hide();
		$('.result').show();
	});
	//end
    // var myPlayer = document.getElementById('video');
    // console.log(myPlayer);
    // myPlayer.play();
    //document.getElementById('video').play();
    //$("#video").width(rem2px(3.95));
    //$("#video").height(rem2px(2.85));

    function changeVideo() {
    	console.log("changed");
		var id = $wrapper.find('.active').attr('data-id');
		var url = './video/' + type + '/' + id + '.mp4';
		var player = type == '1' ? myPlayer : myPlayer2;
		if (type == '1') {
			myPlayer.src(url);
			myPlayer.load();
			myPlayer.play();
		} else {
			myPlayer2.src(url);
			myPlayer2.load();
			myPlayer2.play();
		}
    }

    // $("#video").on("click",function(e){
    // 	e.preventDefault();
    // 	e.stopPropagation();
    // 	alert("!");
    // 	myPlayer.play();
    // })
    //$("#video").trigger("click");
	var slideAds = function(direction){
		if(direction){
			//上滑
			$wrapper.find(".select-wrapper ul").transition({ y:'+='+trans});
			$wrapper.find(".select-wrapper .active").removeClass("active").prev().addClass("active");
			step--;
			changeVideo();
			init();
		}else{
			//下滑
			$wrapper.find(".select-wrapper ul").transition({ y:'-='+trans});
			$wrapper.find(".select-wrapper .active").removeClass("active").next().addClass("active");
			step++;
			changeVideo()
			init();
		}
	}
});

var videoPlay = function(){
    document.getElementById('video').play();
}

var init =function (){
	if(Math.abs(step) == 11){
		console.log("归位")
		step = 0;
		$wrapper.find(".select-wrapper ul").transition({y:-initTrans},0);
		$wrapper.find(".select-wrapper ul").children("li").eq(16).addClass("active");
	}
}
var render = function(arr){
	$wrapper.find(".select-wrapper ul").empty()
	for(var i=0;i<3;i++){
		for(var j=0;j<arr.length;j++){
			var text_ = arr[j].text;
			var id_ = arr[j].id;
			var time_ = arr[j].time ? (' data-time=' + arr[j].time) : '';
			var sour_ = arr[j].sour ? (' data-sour=' + arr[j].sour) : '';
			var dom_ = '<li data-id='+id_+ time_ + sour_ + '>'+text_+'</li>';
			$wrapper.find(".select-wrapper ul").append(dom_);
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
