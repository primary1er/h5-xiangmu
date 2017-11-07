$(document).ready(function(e){
    //加载动画
    var iNow = 0;
	var loadNum = document.getElementById('loadNum');
	var timer = setInterval(function(){
		if(iNow==100){
			clearInterval(timer);
			audioAutoPlay('Jaudio');
			$(".page_load").hide();
			$(".page_index").fadeIn();
			index_dh();
	    }else{
			iNow += 2;
			progressFn(iNow);
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
	function index_dh(){
		$(".index_find").show().addClass("slideInDown animated");
		var tt = document.querySelector('.index_find');
		tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
			$(".index_jia").show().addClass("slideInDown animated");
			tt = document.querySelector('.index_jia');
			tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
				$(".index_start").show().addClass("slideInDown animated");
				tt = document.querySelector('.index_start');
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
					$(".index_jia_l,.index_jia_r").fadeIn(500).addClass("tada animated infinite");
				}, false);
			}, false);
		}, false);
	}
	$('.index_start').click(function(){
		$(".page_index").hide();
		$(".page_door").fadeIn();
		$('.door_hand').addClass('hover');
		$('.page_index img').hide().removeClass("slideInDown animated tada infinite");
		light_circle();
	});
	//闪烁
	setInterval(function(){
		$('.lroom_menpai i').addClass('light1');
		setTimeout(function(){
			$('.lroom_menpai i').removeClass('light1');
		},1000);
		$('.room_rili i').addClass('light1');
		setTimeout(function(){
			$('.room_rili i').removeClass('light1');
		},1000);
	},3000);
	setInterval(function(){
		$('.lroom_yg i').addClass('light1');
		setTimeout(function(){
			$('.lroom_yg i').removeClass('light1');
		},1000);
		$('.lroom_cz i').addClass('light5');
		setTimeout(function(){
			$('.lroom_cz i').removeClass('light5');
		},1000);
	},4000);
	setInterval(function(){
		$('.lroom_dhj i').addClass('light3');
		setTimeout(function(){
			$('.lroom_dhj i').removeClass('light3');
		},1000);

		$('.kitchen_yy i').addClass('light7');
		setTimeout(function(){
			$('.kitchen_yy i').removeClass('light7');
		},1000);
	},2000);
	setInterval(function(){
		$('.lroom_cys i').addClass('light1');
		setTimeout(function(){
			$('.lroom_cys i').removeClass('light1');
		},1000);
		$('.kitchen_cz i').addClass('light7');
		setTimeout(function(){
			$('.kitchen_cz i').removeClass('light7');
		},1000);
		$('.room_cz i').addClass('light9');
		setTimeout(function(){
			$('.room_cz i').removeClass('light9');
		},1000);
	},2500);
	setInterval(function(){
		$('.lroom_jinyan i').addClass('light1');
		setTimeout(function(){
			$('.lroom_jinyan i').removeClass('light1');
		},1000);
		$('.room_yd i').addClass('light1');
		setTimeout(function(){
			$('.room_yd i').removeClass('light1');
		},1000);
	},3500);

	function light_circle(){
		var lightNum = -1;
		var lightTimer = null;
		var lightLen = $(".door_circle img").length;
		lightTimer = setInterval(function(){
			if(lightNum<=lightLen-1){
				lightNum = lightNum + 1;
				$(".door_circle img").eq(lightNum).css({"display":"block"}).siblings().css({"display":"none"});
				if(lightNum==lightLen-1){
					lightNum=-1;
				}
			}
		},250);
	}

	//light_dian();
	function light_dian(){
		var lightNum = -1;
		var lightTimer = null;
		var lightLen = $(".doorplate img").length;
		lightTimer = setInterval(function(){
			if(lightNum<=lightLen-1){
				lightNum = lightNum + 1;
				$(".doorplate img").eq(lightNum).css({"display":"block"}).siblings().css({"display":"none"});
				if(lightNum==lightLen-1){
					lightNum = -1;
					//clearInterval(lightTimer);
				}
			}
		},100);
	}

	$('.door_circle_click').click(function(){
		$('.door_circle,.door_hand').hide();
		$('.page_door').css({"background-image":"url(images/open_door.jpg)"});
		$('.tip,.door_clue').fadeIn(500);
	});

	$('.door_start').click(function(){
		$('.door_circle,.door_hand').show();
		$(".page_door,.tip,.door_clue").hide();
		$('.page_door').css({"background-image":"url(images/close_door.jpg)"});
		$(".page_all").fadeIn();
	});
	//提示
	$('.clue_tip').click(function(){
		$('.tip,.xsts').fadeIn(500);
	});
	$('.room_rili').click(function(){
		$('.tip,.rili').fadeIn(500);
	});
	$('.continue').click(function(){
		$('.tip,.xsts').fadeOut(500);
	});
	$('.kitchen_yy').click(function(){
		$('.tip,.yyj').fadeIn(500);
	});
	$('.kitchen_jhq').click(function(){
		$('.tip,.jhq').fadeIn(500);
	});
	$('.lroom_cz,.kitchen_cz,.room_cz').click(function(){
		$('.tip,.cltip').fadeIn(500);
	});
	$('.lroom_cl,.lroom_sf,.lroom_dt,.room_cl').click(function(){
		$('.tip,.three').fadeIn(500);
	});
	$('.lroom_close').click(function(){
		$('.tip,.lroom_tip').fadeOut(500);
	});

	$('.lroom_dhj').click(function(){
		$('.tip,.dahuoji').fadeIn(500);
	});
	$('.room_ydfw').click(function(){
		$('.tip,.yandou').fadeIn(500);
	});
	$('.lroom_yg').click(function(){
		$('.tip,.yangang').fadeIn(500);
	});

});