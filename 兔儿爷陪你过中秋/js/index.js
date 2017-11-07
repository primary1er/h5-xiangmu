$(document).ready(function(e){
	loadImage();
	
	window.alert = function(name){
		var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain,');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
	};

	width = $(document).width();
	height = $(document).height();
	$(".page").width(width).height(height);
	var audio = "";
	audioAutoPlay('Jaudio');
	//音乐BEGIN
	function audioAutoPlay(id){
		audio = document.getElementById(id),
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
	var musicNum = 0;
    $(".musicStartBtn").click(function(){
        $(".musicBox").addClass('musicAn');
        $("#Jaudio").get(0).pause();
    });
    $(".musicCloseBtn").click(function(){
        $(".musicBox").removeClass('musicAn');
        $("#Jaudio").get(0).play();
    });
	//音乐END

	//滑动
	/*function tmove(clas,direct,cb){
     $("."+clas).on("touchstart", function(e) {
     // 判断默认行为是否可以被禁用
     if (e.cancelable) {
     // 判断默认行为是否已经被禁用
     if (!e.defaultPrevented) {
     e.preventDefault();
     }
     }
     startX = e.originalEvent.changedTouches[0].pageX,
     startY = e.originalEvent.changedTouches[0].pageY;
     });
     $("."+clas).on("touchend", function(e) {
     // 判断默认行为是否可以被禁用
     if (e.cancelable) {
     // 判断默认行为是否已经被禁用
     if (!e.defaultPrevented) {
     e.preventDefault();
     }
     }
     moveEndX = e.originalEvent.changedTouches[0].pageX,
     moveEndY = e.originalEvent.changedTouches[0].pageY,
     X = moveEndX - startX,
     Y = moveEndY - startY;
     //左滑
     if ( X > 0 &&direct=="right") {
     typeof cb == "function" && cb();
     }
     //右滑
     else if ( X < 0 &&direct=="left") {
     typeof cb == "function" && cb();
     }
     //下滑
     else if ( Y > 0&&direct=="down") {
     typeof cb == "function" && cb();
     }
     //上滑
     else if ( Y < 0 &&direct=="up") {
     typeof cb == "function" && cb();
     }
     //单击
     else{
     typeof cb == "function" && cb();
     }
     });
     }*/
    //start_index();
    //$('.page_rabbit img').show();
    

	
});


//首页动画
function start_index(){
  $('.page_index .yuan').fadeIn(500);
  $('.page_index .stars').fadeIn(800);
  $('.page_index .yun1').show().animate({"left":"80px"},1000);
  $('.page_index .yun2').show().animate({"right":"70px"},1000);
  setTimeout(function(){
	  $('.page_index .index_rabbit').fadeIn(1000);
	  $('.page_index .index_title').fadeIn(1000);
	  $(".page_index .next").show().addClass("updown animatedslow infinite");
      $(".page_index .pagedown").show();
	  setTimeout(function(){
		  $(".page_index .denglong1").show().addClass("animated slideInDown");
	  },200);
	  setTimeout(function(){
		  $(".page_index .denglong2").show().addClass("animated slideInDown");
	  },400);
	  setTimeout(function(){
		  $(".page_index .denglong3").show().addClass("animated slideInDown");
	  },600);
	  setTimeout(function(){
		  $(".page_index .denglong4").show().addClass("animated slideInDown");
	  },800);
	  setTimeout(function(){
		  $(".page_index .denglong5").show().addClass("animated slideInDown");
	  },900);

  },1000);
}


function start_rabbit(){
	/*$('.tip').show().click(function(){
		$(this).fadeOut();
	});*/
	$('.page_rabbit .banyuan,.stars2').fadeIn();
	setTimeout(function(){
		$(".page_rabbit .denglong6").show().addClass("animated slideInDown");
	},200);
	setTimeout(function(){
		$(".page_rabbit .denglong7").show().addClass("animated slideInDown");
	},400);
	setTimeout(function(){
		$(".page_rabbit .denglong8").show().addClass("animated slideInDown");
		$(".page_rabbit .next").show().addClass("updown animatedslow infinite");
        $(".page_rabbit .pagedown").show();
	},600);
	setTimeout(function(){
		/*$('.rabbit').fadeIn(500);*/
		setTimeout(function(){
			/*$('.page_rabbit .title').delay(500).fadeIn(500);
			$('.page_rabbit p').delay(1000).fadeIn(500);*/
			$('.page_rabbit .yun3').fadeIn(500).animate({"left":"-127px"},2000,'linear');
			setTimeout(function(){
				$('.page_rabbit .yun3').addClass("rightleft");
			},2500);
			$('.page_rabbit .yun4').fadeIn(500).animate({"left":"-197px"},8000,'linear');
			setTimeout(function(){
				$('.page_rabbit .yun4').addClass("rightleft1");
			},8500);
			$('.page_rabbit .yun5').fadeIn(500).animate({"left":"-119px"},6000,'linear');
			setTimeout(function(){
				$('.page_rabbit .yun5').addClass("rightleft2");
			},6500);
		},200);
	},800);
}


//弹窗
function showTc(o){
	$(o).fadeIn(200);
	$(".bg").show();
	$("body").css("overflow","hidden");
}
	
	
//弹窗关闭	
function zClose(o) {
	$(o).fadeOut(200);
	$(".bg").hide();	
	$("body").css("overflow","auto");	
}

//抽奖动画执行方法
var prizeId = 0;
function drawAnimate() {
	prizeId=Math.round(Math.random()*7+1);
	if ($(".drawBtn").hasClass('isClick')) {
		$(".drawBtn").removeClass('isClick');
		var time = 40;
		var startI = 1;
		var t;
		function cycle(i) {
			var nowItem = ".pr" + i;
			$(".prizeBox li.now").removeClass('now');
			$(nowItem).addClass('now');
			t = setTimeout(function() {cycle(i);}, time);
			if (time <= 200) {
				time += 5
			} else {
				if (i == prizeId) {
					clearTimeout(t);
					setTimeout(function() { $(".tc_share img.share_img").attr("src","images/share_img"+prizeId+".png");showTc(".tc_share")}, 500);//调用中奖弹窗
					$(".drawBtn").addClass('isClick');
					//朋友圈
					wx.onMenuShareTimeline({
						title: share[prizeId].app_desc, 		// 分享标题
						link: link, 					// 分享链接
						imgUrl: DOMAIN+"/share.png",	// 分享图标
						success: function () {
							//用户分享成功后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
				
					//分享给朋友
					wx.onMenuShareAppMessage({
						title: share[prizeId].app_title, // 分享标题
						desc: share[prizeId].app_desc, // 分享描述
						link: link, // 分享链接
						imgUrl: DOMAIN+"/share.png", // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function () {
							//用户分享成功后执行的回调函数
						},
						cancel: function () {
							// 用户取消分享后执行的回调函数
						}
					});
				}
			}
				i++;
				i = i == 9 ? 1 : i;
		}
	    cycle(startI);
	}
}

var images = new Array("images/banyuan.png","images/denglong1.png","images/denglong2.png","images/denglong3.png","denglong4.png","denglong5.png","denglong6.png","denglong7.png"
,"denglong8.png","denglong9.png","images/draw_btn.png","images/draw_btn_bg.png","images/hand.png","images/index_bg.jpg","images/index_rabbit.png",
"images/index_title.png","images/li_bg.png","images/li_bg_hover.png","images/load_bg.jpg","images/musicCloseBtn.png","images/musicStartBtn.png","images/next.png",
"images/r1.png","images/r2.png","images/r3.png","images/r4.png","images/r5.png","images/r6.png",
"images/r7.png","images/r8.png","images/rabbit1.gif","images/rabbit2.gif","images/rabbit3.gif","images/rabbit4.gif",
"images/rabbit5.gif","images/rabbit6.gif","images/rotate_bg.png","images/share_img1.png","images/share_img2.png","images/share_img3.png","images/share_img4.png","images/share_img5.png",
"images/share_img6.png","images/share_img7.png","images/share_img8.png","images/tc_share_bg.png","images/tip_lr.png","images/yanhua_img1.png","images/yanhua_img2.png",
"images/yanhua_img3.png","images/yuan.png","images/yun1.png","images/yun2.png","images/yun3.png","images/yun4.png","images/yun5.png");
var tmp_i=0;
function loadImage(){
	var image=new Image();
	var len=images.length; 
	image.src = $(".page").find("img").eq(tmp_i).attr("src");
	image.onload = function() {
		$(".loadText").html(parseInt(tmp_i / len * 100) + "%");
		$(".load_pro  span").width(tmp_i / len*350)
		if (tmp_i <len) {
			setTimeout('loadImage()',100);
		} else {
			setTimeout(function(){
				showPage();
			},50);
		}
	}
	tmp_i++;
}
	
	
function showPage() {
	$(".load").hide();
	$(".swiper-wrapper").show();
	start_index();
	var num=0;
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: false,
        // 如果需要前进后退按钮
        nextButton: '.next',
        onSlideNextEnd: function(swiper){
            if(swiper.activeIndex==1&&1>num){
                start_rabbit();
                num=1;
            }
            if(swiper.activeIndex==2&&2>num){
                $('.page_zp img').show();
                num=2;
            }
        }
    });
}