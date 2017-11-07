$(function(){
	init();//
})

var tmp_i=0;
function loadImage(){
	var image=new Image();
	var len=$(".page").find("img").length; 
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

function init(){
	v=obj().v;
	if(v!=1){ loadImage();}
	else{ showPage(); }
}

function obj(){
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
	   var str = url.substr(1);
	   strs = str.split("&");
	   for (var i = 0; i < strs.length; i++) {
		  theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	  }
   }
	return theRequest;
	
}
	
	
function showPage() {
	$(".load").hide();
	$(".page_index").show();
	audio.play();
}



var audio = "";

$(document).ready(function(e){
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

	audioAutoPlay('Jaudio');
	audio.pause();
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
	$('.music').click(function(){
		if(musicNum==0){
			$('.music div').addClass('plus');
			audio.pause();
			musicNum = 1;
		}else{
			$('.music div').removeClass('plus');
			audio.play();
			musicNum = 0;
		}
	});
	//音乐END

	//滑动
	function tmove(clas,direct,cb){
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
        /*$("."+clas+" .next").on("touchend", function(e) {
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

            }
            //右滑
            else if ( X < 0 &&direct=="left") {

            }
            //下滑
            else if ( Y > 0&&direct=="down") {

            }
            //上滑
            else if ( Y < 0 &&direct=="up") {

            }
            //单击
            else{
                typeof cb == "function" && cb();
            }
        });*/
	}
	//首页动画
	$(".logo").show().addClass("slideInDown animated");
	var tt = document.querySelector('.logo');
	tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
		$(".index_main").show().addClass("slideInDown animated");
		tt = document.querySelector('.index_main');
		tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
			$(".index_title").show().addClass("slideInDown animated");
			tt = document.querySelector('.index_title');
			tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
				$(".index_3y").show().addClass("slideInDown animated");
				tt = document.querySelector('.index_3y');
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
					$(".page_index .next").show().addClass("updown animatedslow infinite");
					tmove("page_index","up",function(){
						$(".page_index").animate({"top":"-100%"});
						start_map();
					});
				}, false);
			}, false);
		}, false);
	}, false);

	function start_map(){
		$(".page_map").fadeIn(500);
        $(".page_map .line2").animate({"height":"204px"},1500);
        $(".page_map .line3").animate({"height":"435px"},1200);
        $(".page_map .line4").animate({"height":"257px"},2000);
        $(".page_map .line5").animate({"height":"310px"},1400);
        $(".page_map .line6").animate({"height":"276px"},2200);
        $(".page_map .line7").animate({"height":"188px"},1800);
        setTimeout(function(){
            $(".map_plane").fadeIn(200).animate({"width":"150px","top":"730px","left":"120px"},2000,function(){
				$(this).delay(500).fadeOut(500);
			});
            $(".page_map .next").show().addClass("updown animatedslow infinite").click(function(){
                start_travel(); window.scrollReveal = new scrollReveal({reset: true});
            });
            tmove("page_map","up",function(){
                start_travel();window.scrollReveal = new scrollReveal({elem: document.getElementById('srcontainer'),reset: true});
            });
        },2000);
	}
	
	function start_travel(){
        $(".page").hide();
        $(".page_travel").fadeIn(500);
        $(".page_travel .video_img").click(function(){
            sp_last();
        });
        /*$(".page_travel_1 .next").show().addClass("updown animatedslow infinite").click(function(){
            start_travel2();
        });
        tmove("page_travel_1","up",function(){
            start_travel2();
            //$(".page_travel_1").animate({"top":"-100%"});
            //start_travel2();
        });*/
    }
	function sp_last(){
        $(".sp_all").show();
        var sp = document.getElementById("all");
        audio.pause();
        sp.play();
        document.getElementById('all').addEventListener("x5videoexitfullscreen", function(){
            if(musicNum==0){
                $('.music div').removeClass('plus');
                audio.play();
            }
        });
        $('.stop').click(function(){
            sp.pause();
            if(musicNum==0){
                $('.music div').removeClass('plus');
                audio.play();
            }
        });
        sp.onended = function() {
            console.log("视频播放完成");
			 window.location="index.html?v=1";
            if(musicNum==0){
                $('.music div').removeClass('plus');
                audio.play();
            }
        };

    }

/*===========以下没用========*/
    //var sp = true;
//    function sp_plane(){
//        //$(".page_map").animate({"top":"-100%"});
//        $(".page").hide();
//        $(".sp_plane").show();
//        var sp = document.getElementById("plane");
//        audio.pause();
//        sp.play();
//        document.getElementById('plane').addEventListener("x5videoexitfullscreen", function(){
//            if(sp){
//                start_bus();
//                if(musicNum==0){
//                    $('.music div').removeClass('plus');
//                    audio.play();
//                }
//                sp=false;
//            }
//
//        });
//        $('.sp_plane .stop').click(function(){
//            if(sp){
//                sp.pause();
//                start_bus();
//                if(musicNum==0){
//                    $('.music div').removeClass('plus');
//                    audio.play();
//                }
//                sp=false;
//            }
//        });
//        sp.onended = function() {
//            console.log("视频播放完成");
//            start_bus();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//    }
//
//
//    function start_bus(){
//        $(".page").hide();
//        $(".page_bus").fadeIn(500);
//        setTimeout(function(){
//            $(".bus").animate({"top":"415px"},500,'linear',function(){
//                $(".bus").animate({"top":"365px","left":"66px"},200,'linear',function(){
//                    $(".bus").animate({"top":"425px","left":"106px"},200,'linear',function(){
//                        $(".bus").animate({"top":"540px","left":"106px"},400,'linear',function(){
//                            $(".bus").animate({"top":"540px","left":"156px"},200,'linear',function(){
//                                $(".bus").animate({"top":"560px","left":"206px"},200,'linear',function(){
//                                    $(".bus").animate({"top":"580px","left":"306px"},300,'linear',function(){
//                                        $(".bus").animate({"top":"590px","left":"346px"},200,'linear',function(){
//                                            $(".bus").animate({"top":"700px","left":"506px"},500,'linear',function(){
//                                                $(".bus").animate({"top":"700px","left":"566px"},300,'linear',function(){
//                                                    $(".bus").animate({"top":"580px","left":"566px"},400,'linear',function(){
//                                                        $(".page_bus .next").show().addClass("updown animatedslow infinite").click(function(){
//                                                            sp_hotel();
//                                                        });
//                                                        /*tmove("page_bus","up",function(){
//                                                         //$(".page_bus").animate({"top":"-100%"});
//                                                         sp_hotel();
//                                                         });*/
//                                                    });
//                                                });
//                                            });
//                                        });
//                                    });
//                                });
//                            });
//                        });
//                    });
//                });
//            });
//        });
//    }
//
//    function sp_hotel(){
//        //$(".page_map").animate({"top":"-100%"});
//        $(".page").hide();
//        $(".sp_hotel").show();
//        var sp = document.getElementById("hotel");
//        audio.pause();
//        sp.play();
//        document.getElementById('hotel').addEventListener("x5videoexitfullscreen", function(){
//            start_travel1();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        $('.sp_hotel .stop').click(function(){
//            sp.pause();
//            start_travel1();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        sp.onended = function() {
//            console.log("视频播放完成");
//            start_travel1();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//
//    }
//
//    function start_travel1(){
//        $(".page").hide();
//        $(".page_travel_1").fadeIn(500);
//        $(".page_travel_1 .travel_img").click(function(){
//            sp_dodocar();
//        });
//        $(".page_travel_1 .next").show().addClass("updown animatedslow infinite").click(function(){
//            start_travel2();
//        });
//
//        /*tmove("page_travel_1","up",function(){
//            start_travel2();
//            //$(".page_travel_1").animate({"top":"-100%"});
//            //start_travel2();
//        });*/
//    }
//
//    function sp_dodocar(){
//        //$(".page_map").animate({"top":"-100%"});
//        $(".page_sp").hide();
//        $(".sp_dodocar").show();
//        var sp = document.getElementById("dodocar");
//        audio.pause();
//        sp.play();
//        document.getElementById('dodocar').addEventListener("x5videoexitfullscreen", function(){
//            $(".page_sp").hide();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        $('.stop').click(function(){
//            $(".page_sp").hide();
//            sp.pause();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        sp.onended = function() {
//            $(".page_sp").hide();
//            console.log("视频播放完成");
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//
//    }
//
//    function start_travel2(){
//        $(".page").hide();
//        $(".page_travel_2").fadeIn(500);
//        $(".page_travel_2 .travel_img").click(function(){
//            sp_elephant();
//        });
//        $(".page_travel_2 .next").show().addClass("updown animatedslow infinite").click(function(){
//            start_travel3();
//        });
//        /*tmove("page_travel_2","up",function(){
//            start_travel3();
//            //$(".page_travel_2").animate({"top":"-100%"});
//            //start_travel3();
//        });*/
//    }
//
//    function sp_elephant(){
//        //$(".page_map").animate({"top":"-100%"});
//        $(".page_sp").hide();
//        $(".sp_elephant").show();
//        var sp = document.getElementById("elephant");
//        audio.pause();
//        sp.play();
//        document.getElementById('elephant').addEventListener("x5videoexitfullscreen", function(){
//            $(".page_sp").hide();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        $('.sp_elephant .stop').click(function(){
//            $(".page_sp").hide();
//            sp.pause();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        sp.onended = function() {
//            $(".page_sp").hide();
//            console.log("视频播放完成");
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//
//    }
//
//    function start_travel3(){
//        $(".page").hide();
//        $(".page_travel_3").fadeIn(500);
//        $(".page_travel_3 .travel_img").click(function(){
//            sp_manor();
//        });
//        $(".page_travel_3 .next").show().addClass("updown animatedslow infinite").click(function(){
//            sp_all();
//        });
//        /*tmove("page_travel_3","up",function(){
//            sp_all();
//            //$(".page_travel_3").animate({"top":"-100%"});
//            //start_travel2();
//        });*/
//    }
//
//    function sp_manor(){
//        //$(".page_map").animate({"top":"-100%"});
//        $(".page_sp").hide();
//        $(".sp_manor").show();
//        var sp = document.getElementById("manor");
//        audio.pause();
//        sp.play();
//        document.getElementById('manor').addEventListener("x5videoexitfullscreen", function(){
//            $(".page_sp").hide();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        $('.sp_manor .stop').click(function(){
//            sp.pause();
//            $(".page_sp").hide();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        sp.onended = function() {
//            console.log("视频播放完成");
//            $(".page_sp").hide();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//
//    }
//    function sp_all(){
//        $(".page").hide();
//        $(".sp_all").show();
//        var sp = document.getElementById("all");
//        audio.pause();
//        sp.play();
//        document.getElementById('all').addEventListener("x5videoexitfullscreen", function(){
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        $('.stop').click(function(){
//            sp.pause();
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        });
//        sp.onended = function() {
//            console.log("视频播放完成");
//            if(musicNum==0){
//                $('.music div').removeClass('plus');
//                audio.play();
//            }
//        };
//
//    }
/*===========以上没用========*/
$("#srcontainer").scroll(function(e) {
	var t = $(this).scrollTop();
	if(t>5){
		$(".llogo").hide();
	}else{
		$(".llogo").show();
	}
	if(t>0&&t<30){
		 $(".bus_img").removeClass("bus_ani1 bus_ani2 bus_ani3");
	}
	if (t > 30) {
		if(!$(".bus_img").hasClass("bus_ani1"))
	   $(".bus_img").addClass("bus_ani1");
	}
	if (t > 600) {
	   $(".bus_img").addClass("bus_ani2");
	}
	if (t > 1300) {
	   $(".bus_img").addClass("bus_ani3");
	}
  });
	
	
	$('.tags span').each(function(){
		var $this = $(this);
		setTimeout(function(){
			$this.show().addClass('flash');
		},Math.random()*4*1000);
	});
	/*$('.jiantou').click(function(){
		$('.page_index').fadeOut(500);
		$('.page_reg').fadeIn(500);
	});*/
	$('.reg').click(function(){
		var name = $('#name').val();
		var phone = $('#phone').val();

		if(name==""||phone==""){
			alert("请完善信息！");
		}else if(!( /^(1(([358][0-9])|[4][579]|[7][01235678]))\d{8}/g.test(phone))){
			alert("请填写正确的联系方式！");
		}else{
			$.post("reg.php",{name:name,phone:phone},function(res){
				console.log(res)
				var data = JSON.parse(res);
				if(data.status=="success"){
					$('.page_reg').fadeOut(500);
					$('.page_txz').fadeIn(500);

					$(".txz").show().addClass("slideInDown animated").attr("src","images.php?p="+name);
					var tt = document.querySelector('.txz');
					tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
						$(".txz_wa").show().addClass("slideInDown animated");
						tt = document.querySelector('.txz_wa');
						tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
							$(".save,.href").show().addClass("slideInDown animated");

						}, false);
					}, false);
				}else{
					alert(data.mess);
				}
			});
		}
	});
	$('.save').click(function(){
		alert("请长按图片保存！");
	});
	$('.href').click(function(){
		window.location.href="https://best.zhaopin.com/m2/index.aspx?sid=121128100&site=mpyq";
	});


});
