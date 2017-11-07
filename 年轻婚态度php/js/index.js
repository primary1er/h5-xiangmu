$(document).ready(function(e){
    //加载动画
    var iNow = 0;
	var loadNum = document.getElementById('loadNum');
	var timer = setInterval(function(){
		if(iNow==100){
			clearInterval(timer);
			audioAutoPlay('Jaudio');
			$(".pageload").fadeOut();
			$(".pageopen").addClass("pageopenHover");
	    }else{
			iNow += 2;
			progressFn(iNow);
			if(iNow==50){
				$(".pagewarp").eq(0).addClass("pagewarpHover");
			}
		}
	},100);
	function progressFn(cent){
		loadNum.innerHTML = cent + '<em>%</em>';
	}
	
	//音乐BEGIN
	function audioAutoPlay(id){
		var audio = document.getElementById(id),
			play = function(){
			audio.play();
			document.removeEventListener("touchstart",play,false);
		};
		audio.play();
		document.addEventListener("WeixinJSBridgeReady",function (){
			//微信
			play();
		},false);
		document.addEventListener('YixinJSBridgeReady',function(){
			//易信
			play();
		},false);
		document.addEventListener("touchstart",play,false);
	}
	//音乐END
	
	$(".pagePup").css({"width":parseInt($(window).width())});
	$(".pageopen").click(function(){
		$(this).css({"display":"none"});
	});
	
	$(".pageBtn").click(function(){
		var thisNum = parseInt($(this).attr("data-pageNum"));
		$(".pagewarp").eq(thisNum).addClass("pagewarpPast");
		$(".pagewarp").eq(thisNum+1).addClass("pagewarpHover");
		if(thisNum==3){
			$(".pup_warp").animate({"padding":"0px"},1000,function(){
				$(".pup_gz,.pup_warp").fadeIn();
			})
		}
	});
	
	function myLbFn(mdd){
		//定义三种状态，分别为左满屏、左右各一半，右满屏，值为0/1/2
		var flag = 1;
		//定义滑动初始的X坐标，滑动中X坐标，和坐标差
		var fincoo_begin_x,fincoo_move_x,fincoo_cNum;
		$(mdd).on("touchstart",function(e){
			$('.img03').fadeOut(500);
			fincoo_begin_x = event.changedTouches[0].clientX;
		});
		$(mdd).on("touchmove",function(e){
			e.preventDefault();
			fincoo_move_x = e.originalEvent.changedTouches[0].pageX;
			fincoo_cNum = fincoo_move_x-fincoo_begin_x;
			
			//中间状态
			if(flag==1){
				//箭头消失
				$(mdd).children().children().children().children(".jtBox").css({"display":"none"});
				//如果是正的话则向右滑N，如果是负则向左滑N
				if(fincoo_cNum>=0){
					var bfbNum = (fincoo_cNum/$(window).width())*100;
					var z_num01 = 50 + bfbNum + '%'
					var z_num02 = 50 - bfbNum + '%'
					$(mdd).children().children().eq(0).css({'width':z_num01}).addClass("hover");
					$(mdd).children().children().eq(1).css({'width':z_num02}).removeClass("hover");
				}else{
					fincoo_cNum = -fincoo_cNum;
					var bfbNum = (fincoo_cNum/$(window).width())*100;
					var z_num01 = 50 - bfbNum + '%'
					var z_num02 = 50 + bfbNum + '%'
					$(mdd).children().children().eq(0).css({'width':z_num01}).removeClass("hover");
					$(mdd).children().children().eq(1).css({'width':z_num02}).addClass("hover");
					fincoo_cNum = -fincoo_cNum;
				}
			}
			//左边状态
			else if(flag==0){
				//如果是正的话则向右滑N，如果是负则向左滑N
				if(fincoo_cNum>=0){
					//不动画
				}else{
					fincoo_cNum = -fincoo_cNum;
					var bfbNum = (fincoo_cNum/$(window).width())*100;
					var z_num01 = 100 - bfbNum + '%'
					var z_num02 = bfbNum + '%'
					$(mdd).children().children().eq(0).css({'width':z_num01}).removeClass("hover");
					$(mdd).children().children().eq(1).css({'width':z_num02});
					fincoo_cNum = -fincoo_cNum;
				}
			}
			//右边状态
			else if(flag==2){
				if(fincoo_cNum>=0){
					var bfbNum = (fincoo_cNum/$(window).width())*100;
					var z_num01 = bfbNum + '%'
					var z_num02 = 100 - bfbNum + '%'
					$(mdd).children().children().eq(0).css({'width':z_num01});
					$(mdd).children().children().eq(1).css({'width':z_num02}).removeClass("hover");
				}
			}
			
		});
		$(mdd).on("touchend",function(e){
			//分别判断为左满屏、左右各一半、右满屏的情况
			if(flag==0){
				//分别判断fincoo_cNum为正和为负的时候
				if(fincoo_cNum>=0){
					//往右滑，大于屏幕四分之一就到左右各一半的状态，小语则不滑动
				}else{
					//往左滑，不起效果
					fincoo_cNum = -fincoo_cNum;
					$(mdd).children().children().eq(0).animate({'width':"50%"},250);
					$(mdd).children().children().eq(1).animate({'width':"50%"},250);
					flag = 1;
				}
			}else if(flag==1){
				//分别判断fincoo_cNum为正和为负的时候
				if(fincoo_cNum>=0){
					//为正的时候，大于屏幕的四分之一则显示左边
					$(mdd).children().children().eq(0).animate({'width':"100%"},250);
					$(mdd).children().children().eq(1).animate({'width':"0%"},250);
					flag = 0;
				}else{
					$(mdd).children().children().eq(0).animate({'width':"0%"},250);
					$(mdd).children().children().eq(1).animate({'width':"100%"},250);
					flag = 2;
				}
			}else{
				//分别判断fincoo_cNum为正和为负的时候
				if(fincoo_cNum>=0){
					$(mdd).children().children().eq(0).animate({'width':"50%"},250);
					$(mdd).children().children().eq(1).animate({'width':"50%"},250);
					flag = 1;
				}
			}
			//console.log(flag);
		});
	}
	myLbFn(".page_one");
	myLbFn(".page_two");
	myLbFn(".page_three");
	myLbFn(".page_four");
});
