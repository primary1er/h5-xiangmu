var width = 0;
var height=0;
var imgs = 0;

$(document).ready(function(){
	var overscroll = function(el) {
  	el.addEventListener('touchstart', function() {
	    var top = el.scrollTop
	      , totalScroll = el.scrollHeight
	      , currentScroll = top + el.offsetHeight;
	    //If we're at the top or the bottom of the containers
	    //scroll, push up or down one pixel.
	    //
	    //this prevents the scroll from "passing through" to
	    //the body.
	    if(top === 0) {
	      el.scrollTop = 1;
	    } else if(currentScroll === totalScroll) {
	      el.scrollTop = top - 1;
	    }
	  });
	  el.addEventListener('touchmove', function(evt) {
	    //if the content is actually scrollable, i.e. the content is long enough
	    //that scrolling can occur
	    if(el.offsetHeight < el.scrollHeight)
	      evt._isScroller = true;
	  });
	};
	overscroll(document.querySelector('.ap_wa'));
	overscroll(document.querySelector('.zj_wa'));
	overscroll(document.querySelector('.hdgs'));
	overscroll(document.querySelector('.hdzm'));
	document.body.addEventListener('touchmove', function(evt) {
	  //In this case, the default behavior is scrolling the body, which
	  //would result in an overflow.  Since we don't want that, we preventDefault.
	  if(!evt._isScroller) {
	    evt.preventDefault();
	  }
	});

	//audioAutoPlay('bgmusic');
	//audioAutoPlay('sbl');
	var sbl = document.getElementById("sbl");
	var bgmusic = document.getElementById("bgmusic");
	audioAutoPlay("bgmusic");
	
	$('img').each(function(){
		var dfd=$.Deferred();
		if($(this).attr("src")==""){
			loadImage($(this).attr("data-src"));
		}
	});
	imgs = $('img').length-1;

	width = $(document).width();
	height = $(document).height();
	var logoheight = $('.logo').height();
	$(".page").width(width).height(height);
	$("body").width(width).height(height);
	$('.logo').height(logoheight);
	$('.jl').css({"width":width+"px","height":height*0.8333+"px"});
	$('.music').click(function(){
		if($('.music div').attr("class").indexOf('plus')>-1){
			$('.music div').removeClass('plus');
			bgmusic.play();
		}else{
			$('.music div').addClass('plus');
			bgmusic.pause();
		}
	});
	var t;
	var pointer = document.querySelector('#zw');
	var cancelTimeout = function() {
	    if(t) {
	        clearTimeout(t);
	        t = null;
	        $('.zw,.ca').hide();
	        clearInterval(draw);
		$('#animation_canvas').animate({"opacity":"0"},500);
		$('.car').animate({"left":"-50%","top":"120%"},2000);
		setTimeout(function(){
			$('.page_index').hide();
			$('.page_hj').fadeIn(500);
			$('.llogo').show();
			$('.jz').animate({"top":"83.33%"},2000).addClass("fadeOut animatedhj");
			$('.hj').animate({"height":"80.33%"},2000);
			setTimeout(function(){
				$('.circle').show();
				$('.clock').show().addClass("fadeInDown animated");
				$('.tipwa').show();
				line();
				/*$('.tiphand').show().animate({left:"63.6%",top:"82.6%"}, "fast", function(){
					$('.tiphand').animate({left:"52.6%",top:"77.7%"},"fast",function(){
						$('.tiphand').animate({"top":"78.9%","left":"43%"},"fast",function(){
							$('.tiphand').animate({"top":"73.6%","left":"34.1%"},"fast",function(){
								$('.tiphand').animate({"top":"69.7%","left":"41.8%"},"fast",function(){
									$('.tiphand').animate({"top":"65.3%","left":"44.2%"},"fast",function(){
										$('.tiphand').animate({"top":"62.3%","left":"55.7%"},"fast",function(){
											$('.tiphand').animate({"top":"56.8%","left":"44.1%"},"fast",function(){
												$('.tiphand').animate({"top":"48.6%","left":"41.4%"},"fast",function(){
													$('.tiphand').animate({"top":"43.6%","left":"37.4%"},"fast",function(){
														$('.tiphand').animate({"top":"35.2%","left":"44%"},"fast",function(){
															$('.tiphand').animate({"top":"25.5%","left":"36%"},"fast",function(){
																$('.tiphand').animate({"top":"17.3%","left":"28%"},"fast",function(){
																	$('.tiphand').animate({"top":"13.3%","left":"22.35%"},"fast",function(){
																		$('.tiphand').fadeOut(1000);
																		
																		line();
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});*/
			},2000);
		},2000);
	    }
	};
	pointer.addEventListener('touchstart', function(e) {
	    t = setTimeout(function() {
	        console.log('1s!');
	        cancelTimeout();
	    }, 1000);
	    e.preventDefault();
	    return false;
	});
	pointer.addEventListener('touchend', cancelTimeout);
	pointer.addEventListener('touchcancel', cancelTimeout);
	/*$('.zw').click(function(){
		clearInterval(draw);
		$('#animation_canvas').animate({"opacity":"0"},500);
		$('.car').animate({"left":"-50%","top":"120%"},2000);
		setTimeout(function(){
			$('.page_index').hide();
			$('.page_hj').fadeIn(500);
			$('.jz').animate({"top":"83.33%"},2000).addClass("fadeOut animatedhj");
			$('.hj').animate({"height":"80.33%"},2000);
			setTimeout(function(){
				$('.circle').show();
				$('.clock').show().addClass("fadeInDown animated");
				$('.tip').show().animate({"top":"70.05%","left":"50.2%"}, "fast", function(){
					$('.tip').animate({"top":"65.15%","left":"39.2%"},"fast",function(){
						$('.tip').animate({"top":"66.35%","left":"29.6%"},"fast",function(){
							$('.tip').animate({"top":"60.85%","left":"20.5%"},"fast",function(){
								$('.tip').animate({"top":"57.15%","left":"28.7%"},"fast",function(){
									$('.tip').animate({"top":"52.65%","left":"31.2%"},"fast",function(){
										$('.tip').animate({"top":"49.65%","left":"42.7%"},"fast",function(){
											$('.tip').animate({"top":"44.25%","left":"31.1%"},"fast",function(){
												$('.tip').animate({"top":"35.95%","left":"28.4%"},"fast",function(){
													$('.tip').animate({"top":"31.05%","left":"24.4%"},"fast",function(){
														$('.tip').animate({"top":"22.55%","left":"30.9%"},"fast",function(){
															$('.tip').animate({"top":"12.85%","left":"22.9%"},"fast",function(){
																$('.tip').animate({"top":"4.65%","left":"14.9%"},"fast",function(){
																	$('.tip').animate({"top":"0.75%","left":"9.35%"},"fast",function(){
																		$('.tip').fadeOut(1000);
																		
																		line();
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			},2000);
		},2000);
	});*/
	
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
});



function progressFn(cent){
		$('.pro').css({"width":parseInt(cent/imgs*100)+"%"});
		$('.page_load span').text(parseInt(cent/imgs*100)+"%");
	}

var ctx_line = null;
var circle = {};
var lastcircle = {};
var la = {};
var no = {};
var numline = [];
function line(){
	var canvas = document.getElementById("line");
	canvas.width = canvas.parentNode.clientWidth;
	canvas.height = canvas.parentNode.clientHeight;
	if (!canvas.getContext) {
		console.log("Canvas not supported. Please install a HTML5 compatible browser.");
		return;
	}
	ctx_line = canvas.getContext("2d");
	ctx_line.fillStyle="rgba(255, 255, 255, 0)";
	ctx_line.fillRect(0, 0, canvas.width, canvas.height);
	
	$('.circle').unbind('click').bind("click",function(){
		$('.tipwa').fadeOut(500);
		var $this = $(this);
		//circle['id'] = $this.data('id');
		if($this.data('id')==15){
			console.log("line finished!");
			$('.page_hj').hide();
			$('.page_sp').show();
			var sp = document.getElementById("ljcy");
			bgmusic.pause();
			sp.play();
			document.getElementById('ljcy').addEventListener("x5videoexitfullscreen", function(){
				dh_show();
				if($('.music div').attr("class").indexOf('plus')==-1){
					bgmusic.play();
				}
			});
			$('.stop').click(function(){
				sp.pause();
				dh_show();
				if($('.music div').attr("class").indexOf('plus')==-1){
					bgmusic.play();
				}
			});
			sp.onended = function() {
				console.log("视频播放完成");
				dh_show();
				if($('.music div').attr("class").indexOf('plus')==-1){
					bgmusic.play();
				}
			};
		}
		/*if(!lastcircle.id){
			lastcircle['id']=15;
			}*/
		//circle['x'] = $this.context.offsetLeft+$this.context.offsetWidth/2;
		//circle['y'] = $this.context.offsetTop+$this.context.offsetHeight/2+height*0.1119;
		//if(lastcircle.id==15-numline.length&&circle.id==lastcircle.id-1){
		/*for(var i=lastcircle.id;i>circle['id'];i--){
			la['id']=i;
			la['x'] = $('.circle[data-id="'+i+'"]')[0].offsetLeft+$('.circle[data-id="'+i+'"]')[0].offsetWidth/2;
			la['y'] = $('.circle[data-id="'+i+'"]')[0].offsetTop+$('.circle[data-id="'+i+'"]')[0].offsetHeight/2+height*0.1119;
			var noid = i-1;
			no['id']=noid;
			no['x'] = $('.circle[data-id="'+noid+'"]')[0].offsetLeft+$('.circle[data-id="'+noid+'"]')[0].offsetWidth/2;
			no['y'] = $('.circle[data-id="'+noid+'"]')[0].offsetTop+$('.circle[data-id="'+noid+'"]')[0].offsetHeight/2+height*0.1119;
			
			if(numline.indexOf(la.id+"-"+no.id)==-1){
				numline.push(la.id+"-"+no.id);
				draw_line(la,no);
			
			}
			
		}*/
			
		//}else{
			/*numline=[];
			ctx_line.clearRect(0,0,width,height);
			ctx_line.beginPath();
			ctx_line.stroke();
			lastcircle = {};*/
		//}
		//lastcircle['id'] = circle['id'];
		//lastcircle['id'] = $this.data('id');
		//lastcircle['x'] = $this.context.offsetLeft+$this.context.offsetWidth/2;
		//lastcircle['y'] = $this.context.offsetTop+$this.context.offsetHeight/2+height*0.1119;
	});
}

function dh_show(){
$('.page').hide();
	$('.page_dh').show();
	$('.zj').show().addClass("animated fadeInLeft");
	var hd=false;
	var tt = document.querySelector('.zj');
		tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
			$('.ap').show().addClass("animated fadeInLeft");
			tt = document.querySelector('.ap');
			tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
				$('.dr').show().addClass("animated fadeInLeft");
				tt = document.querySelector('.dr');
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
					$('.gs').show().addClass("animated fadeInLeft");
					$('.menu .right').addClass("animatedslow flash infinite");
				}, false);
			}, false);
		}, false);
		$('.zj').click(function(){
			$('.page_dh').hide();
			$('.page_zj').show();
			if(!hd){
				hd=true;
				$('.page_zj .single-item').slick({
					dots: true,
					arrows: false,
					infinite:false,
				});
				}
				
		});
		$('.ap').click(function(){
			$('.page_dh').hide();
			$('.page_ap').show();
			
		});
		$('.dr').click(function(){
			$('.page_dh,.dr_bl').hide();
			$('.page_dr').show();
			$('.dr_car').show().addClass("animated fadeInLeft");
			setTimeout(function(){
				sbl.play();
				$('.dr_bl').show();
				},200)
			$('.dr_check').click(function(){
				$('.dr_check').removeClass('active');
				$(this).addClass('active');
			});
			$('.dr_bt').click(function(){
				$('.page_tip,.page_tip .zjtc').fadeIn();
			});
			$('#dr_sub').unbind('click').bind('click',function(){
				if($('#dr_xm').val()==""||!( /^(1(([358][0-9])|[4][579]|[7][01235678]))\d{8}/g.test($('#dr_dh').val()))){
					$('.page_tip,.page_tip .tjsb').fadeIn();
				}else{
					$.post("./sub.php",{"type":2,"nickname":$('#dr_xm').val(),"phone":$('#dr_dh').val(),"sex":$('.dr_check.active').data('id')},function(res){
	            var data = JSON.parse(res);
	            if(data.status=="success"){
	                $('.page_tip,.page_tip .tjcg').fadeIn();
	            }else{
	                alert("提交失败，请稍后重试！"+data.mess);
	            }
	        });
				}
				
			});
		});
		$('.gs').click(function(){
			$('.page_dh').hide();
			$('.page_gs').show();
			$('.gs_lsj').addClass("animated fadeInRight");
			$('.gs_zgzl').addClass("rotate");
			$('.gs_check').click(function(){
				$('.gs_check').removeClass('active');
				$(this).addClass('active');
			});
			$('.gs_bt').click(function(){
				$('.page_tip,.page_tip .zm').fadeIn();
			});
			$('#gs_sub').unbind('click').bind('click',function(){
				if($('#gs_xm').val()==""||!( /^(1(([358][0-9])|[4][579]|[7][01235678]))\d{8}/g.test($('#gs_dh').val()))){
					$('.page_tip,.page_tip .tjsb').fadeIn();
				}else{
					$.post("./sub.php",{"type":1,"nickname":$('#gs_xm').val(),"phone":$('#gs_dh').val(),"sex":$('.gs_check.active').data('id')},function(res){
            var data = JSON.parse(res);
            if(data.status=="success"){
                $('.page_tip,.page_tip .tjcg').fadeIn();
            }else{
                alert("提交失败，请稍后重试！"+data.mess);
            }
        });
				}
				
			});
				
		});
		$('.back').click(function(){
			$('.page').hide();
			$('.page_dh').show();
		});
		$('.close').click(function(){
			$('.page_tip,.tip_img,.tip_xq').fadeOut();
		});
}

function draw_line(last,now){
	
	ctx_line.clearRect(0,0,width,height);
	//ctx_line.beginPath();
	ctx_line.setLineDash([3, 3]);
	ctx_line.moveTo(last.x,last.y);
	ctx_line.lineTo(now.x,now.y);
	ctx_line.lineWidth=1;
	ctx_line.strokeStyle="black";
	ctx_line.stroke();
	if(now.id==1){
				console.log("line finished!");
				$('.page_hj').hide();
				$('.page_sp').show();
				var sp = document.getElementById("ljcy");
				bgmusic.pause();
				sp.play();
				sp.onended = function() {
						console.log("视频播放完成");
						dh_show();
						if($('.music div').attr("class").indexOf('plus')==-1){
							bgmusic.play();
						}
				};
			
			}
}


var config = {
	"0.png":
	{"img":"bin-2.png",
		"frame": {"x":1783,"y":1802,"w":125,"h":188},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":180,"y":244,"w":125,"h":188},
		"sourceSize": {"w":320,"h":589}
	},
	"2.png":
	{"img":"bin-2.png",
		"frame": {"x":1898,"y":777,"w":134,"h":189},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":178,"y":244,"w":134,"h":189},
		"sourceSize": {"w":320,"h":589}
	},
	"8.png":
	{"img":"bin-2.png",
		"frame": {"x":1881,"y":1,"w":151,"h":191},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":169,"y":244,"w":151,"h":191},
		"sourceSize": {"w":320,"h":589}
	},
	"38.png":
	{"img":"bin-2.png",
		"frame": {"x":1879,"y":383,"w":165,"h":256},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":155,"y":194,"w":165,"h":256},
		"sourceSize": {"w":320,"h":589}
	},
	"48.png":
	{"img":"bin-2.png",
		"frame": {"x":1783,"y":1490,"w":245,"h":310},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":75,"y":145,"w":245,"h":310},
		"sourceSize": {"w":320,"h":589}
	},
	"50.png":
	{"img":"bin-2.png",
		"frame": {"x":1592,"y":383,"w":285,"h":393},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":35,"y":67,"w":285,"h":393},
		"sourceSize": {"w":320,"h":589}
	},
	"142.png":
	{"img":"bin-2.png",
		"frame": {"x":519,"y":1122,"w":263,"h":412},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":57,"y":49,"w":263,"h":412},
		"sourceSize": {"w":320,"h":589}
	},
	"144.png":
	{"img":"bin-2.png",
		"frame": {"x":1,"y":1589,"w":252,"h":421},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":68,"y":37,"w":252,"h":421},
		"sourceSize": {"w":320,"h":589}
	},
	"84.png":
	{"img":"bin-1.png",
		"frame": {"x":1,"y":826,"w":320,"h":397},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":67,"w":320,"h":397},
		"sourceSize": {"w":320,"h":589}
	},
	"86.png":
	{"img":"bin-1.png",
		"frame": {"x":1,"y":412,"w":309,"h":412},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":11,"y":49,"w":309,"h":412},
		"sourceSize": {"w":320,"h":589}
	},
	"94.png":
	{"img":"bin-1.png",
		"frame": {"x":1,"y":1,"w":315,"h":409},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":5,"y":44,"w":315,"h":409},
		"sourceSize": {"w":320,"h":589}
	},
	"98.png":
	{"img":"bin-1.png",
		"frame": {"x":312,"y":412,"w":318,"h":397},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":2,"y":58,"w":318,"h":397},
		"sourceSize": {"w":320,"h":589}
	},
	"112.png":
	{"img":"bin-1.png",
		"frame": {"x":1577,"y":1,"w":186,"h":318},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":134,"y":137,"w":186,"h":318},
		"sourceSize": {"w":320,"h":589}
	},
	"138.png":
	{"img":"bin-3.png",
		"frame": {"x":558,"y":1020,"w":250,"h":395},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":70,"y":73,"w":250,"h":395},
		"sourceSize": {"w":320,"h":589}
	},
	"140.png":
	{"img":"bin-3.png",
		"frame": {"x":558,"y":621,"w":258,"h":397},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":62,"y":67,"w":258,"h":397},
		"sourceSize": {"w":320,"h":589}
	},
	"146.png":
	{"img":"bin-3.png",
		"frame": {"x":308,"y":621,"w":248,"h":421},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":72,"y":29,"w":248,"h":421},
		"sourceSize": {"w":320,"h":589}
	},
	"148.png":
	{"img":"bin-3.png",
		"frame": {"x":852,"y":347,"w":245,"h":427},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":75,"y":22,"w":245,"h":427},
		"sourceSize": {"w":320,"h":589}
	},
	"150.png":
	{"img":"bin-3.png",
		"frame": {"x":818,"y":776,"w":243,"h":409},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":77,"y":44,"w":243,"h":409},
		"sourceSize": {"w":320,"h":589}
	},
	"152.png":
	{"img":"bin-3.png",
		"frame": {"x":308,"y":1044,"w":236,"h":415},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":84,"y":39,"w":236,"h":415},
		"sourceSize": {"w":320,"h":589}
	},
	"154.png":
	{"img":"bin-3.png",
		"frame": {"x":810,"y":1187,"w":236,"h":396},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":84,"y":58,"w":236,"h":396},
		"sourceSize": {"w":320,"h":589}
	},
	"24.png":
	{"img":"bin-4.png",
		"frame": {"x":1470,"y":1543,"w":165,"h":202},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":155,"y":242,"w":165,"h":202},
		"sourceSize": {"w":320,"h":589}
	},
	"30.png":
	{"img":"bin-4.png",
		"frame": {"x":1859,"y":1368,"w":164,"h":215},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":156,"y":234,"w":164,"h":215},
		"sourceSize": {"w":320,"h":589}
	},
	"32.png":
	{"img":"bin-4.png",
		"frame": {"x":1821,"y":1150,"w":166,"h":216},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":154,"y":229,"w":166,"h":216},
		"sourceSize": {"w":320,"h":589}
	},
	"34.png":
	{"img":"bin-4.png",
		"frame": {"x":694,"y":1810,"w":168,"h":225},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":152,"y":219,"w":168,"h":225},
		"sourceSize": {"w":320,"h":589}
	},
	"36.png":
	{"img":"bin-4.png",
		"frame": {"x":1470,"y":1302,"w":169,"h":239},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":151,"y":208,"w":169,"h":239},
		"sourceSize": {"w":320,"h":589}
	},
	"124.png":
	{"img":"bin-4.png",
		"frame": {"x":1843,"y":413,"w":201,"h":353},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":119,"y":105,"w":201,"h":353},
		"sourceSize": {"w":320,"h":589}
	},
	"128.png":
	{"img":"bin-4.png",
		"frame": {"x":1641,"y":1369,"w":216,"h":367},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":104,"y":98,"w":216,"h":367},
		"sourceSize": {"w":320,"h":589}
	},
	"10.png":
	{"img":"bin-5.png",
		"frame": {"x":587,"y":1331,"w":153,"h":192},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":167,"y":244,"w":153,"h":192},
		"sourceSize": {"w":320,"h":589}
	},
	"12.png":
	{"img":"bin-5.png",
		"frame": {"x":1072,"y":1812,"w":153,"h":194},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":167,"y":244,"w":153,"h":194},
		"sourceSize": {"w":320,"h":589}
	},
	"14.png":
	{"img":"bin-5.png",
		"frame": {"x":916,"y":1823,"w":154,"h":194},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":166,"y":244,"w":154,"h":194},
		"sourceSize": {"w":320,"h":589}
	},
	"20.png":
	{"img":"bin-5.png",
		"frame": {"x":751,"y":1823,"w":163,"h":196},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":157,"y":244,"w":163,"h":196},
		"sourceSize": {"w":320,"h":589}
	},
	"22.png":
	{"img":"bin-5.png",
		"frame": {"x":584,"y":1813,"w":165,"h":200},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":155,"y":244,"w":165,"h":200},
		"sourceSize": {"w":320,"h":589}
	},
	"26.png":
	{"img":"bin-5.png",
		"frame": {"x":1250,"y":1501,"w":166,"h":208},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":154,"y":238,"w":166,"h":208},
		"sourceSize": {"w":320,"h":589}
	},
	"28.png":
	{"img":"bin-5.png",
		"frame": {"x":742,"y":1311,"w":163,"h":211},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":157,"y":235,"w":163,"h":211},
		"sourceSize": {"w":320,"h":589}
	},
	"40.png":
	{"img":"bin-5.png",
		"frame": {"x":907,"y":1279,"w":210,"h":267},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":110,"y":187,"w":210,"h":267},
		"sourceSize": {"w":320,"h":589}
	},
	"42.png":
	{"img":"bin-5.png",
		"frame": {"x":1081,"y":965,"w":235,"h":276},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":85,"y":179,"w":235,"h":276},
		"sourceSize": {"w":320,"h":589}
	},
	"44.png":
	{"img":"bin-5.png",
		"frame": {"x":414,"y":1049,"w":236,"h":280},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":84,"y":174,"w":236,"h":280},
		"sourceSize": {"w":320,"h":589}
	},
	"46.png":
	{"img":"bin-5.png",
		"frame": {"x":847,"y":683,"w":219,"h":305},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":101,"y":150,"w":219,"h":305},
		"sourceSize": {"w":320,"h":589}
	},
	"100.png":
	{"img":"bin-5.png",
		"frame": {"x":1318,"y":965,"w":216,"h":280},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":104,"y":174,"w":216,"h":280},
		"sourceSize": {"w":320,"h":589}
	},
	"102.png":
	{"img":"bin-5.png",
		"frame": {"x":412,"y":1526,"w":216,"h":285},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":104,"y":168,"w":216,"h":285},
		"sourceSize": {"w":320,"h":589}
	},
	"104.png":
	{"img":"bin-5.png",
		"frame": {"x":864,"y":990,"w":215,"h":287},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":105,"y":166,"w":215,"h":287},
		"sourceSize": {"w":320,"h":589}
	},
	"106.png":
	{"img":"bin-5.png",
		"frame": {"x":1323,"y":615,"w":215,"h":294},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":105,"y":159,"w":215,"h":294},
		"sourceSize": {"w":320,"h":589}
	},
	"108.png":
	{"img":"bin-5.png",
		"frame": {"x":1026,"y":361,"w":215,"h":303},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":105,"y":151,"w":215,"h":303},
		"sourceSize": {"w":320,"h":589}
	},
	"110.png":
	{"img":"bin-5.png",
		"frame": {"x":630,"y":704,"w":215,"h":311},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":105,"y":144,"w":215,"h":311},
		"sourceSize": {"w":320,"h":589}
	},
	"114.png":
	{"img":"bin-5.png",
		"frame": {"x":414,"y":721,"w":214,"h":326},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":106,"y":129,"w":214,"h":326},
		"sourceSize": {"w":320,"h":589}
	},
	"116.png":
	{"img":"bin-5.png",
		"frame": {"x":411,"y":389,"w":189,"h":330},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":131,"y":125,"w":189,"h":330},
		"sourceSize": {"w":320,"h":589}
	},
	"118.png":
	{"img":"bin-5.png",
		"frame": {"x":211,"y":824,"w":201,"h":336},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":119,"y":119,"w":201,"h":336},
		"sourceSize": {"w":320,"h":589}
	},
	"120.png":
	{"img":"bin-5.png",
		"frame": {"x":210,"y":1191,"w":196,"h":336},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":124,"y":119,"w":196,"h":336},
		"sourceSize": {"w":320,"h":589}
	},
	"122.png":
	{"img":"bin-5.png",
		"frame": {"x":212,"y":429,"w":197,"h":340},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":123,"y":114,"w":197,"h":340},
		"sourceSize": {"w":320,"h":589}
	},
	"126.png":
	{"img":"bin-5.png",
		"frame": {"x":891,"y":1,"w":210,"h":358},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":110,"y":104,"w":210,"h":358},
		"sourceSize": {"w":320,"h":589}
	},
	"130.png":
	{"img":"bin-5.png",
		"frame": {"x":676,"y":1,"w":213,"h":371},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":107,"y":97,"w":213,"h":371},
		"sourceSize": {"w":320,"h":589}
	},
	"132.png":
	{"img":"bin-5.png",
		"frame": {"x":447,"y":1,"w":227,"h":380},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":93,"y":90,"w":227,"h":380},
		"sourceSize": {"w":320,"h":589}
	},
	"134.png":
	{"img":"bin-5.png",
		"frame": {"x":213,"y":1,"w":232,"h":386},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":88,"y":84,"w":232,"h":386},
		"sourceSize": {"w":320,"h":589}
	},
	"4.png":
	{
		"img":"bin-0.png",
		"frame": {"x":1598,"y":1507,"w":141,"h":187},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":176,"y":244,"w":141,"h":187},
		"sourceSize": {"w":320,"h":589}
	},
	"6.png":
	{"img":"bin-0.png",
		"frame": {"x":1598,"y":1318,"w":145,"h":187},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":175,"y":244,"w":145,"h":187},
		"sourceSize": {"w":320,"h":589}
	},
	"16.png":
	{"img":"bin-0.png",
		"frame": {"x":1886,"y":1058,"w":158,"h":194},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":162,"y":244,"w":158,"h":194},
		"sourceSize": {"w":320,"h":589}
	},
	"18.png":
	{"img":"bin-0.png",
		"frame": {"x":1886,"y":862,"w":160,"h":194},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":160,"y":244,"w":160,"h":194},
		"sourceSize": {"w":320,"h":589}
	},
	"52.png":
	{"img":"bin-0.png",
		"frame": {"x":1591,"y":871,"w":293,"h":445},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":27,"y":46,"w":293,"h":445},
		"sourceSize": {"w":320,"h":589}
	},
	"54.png":
	{"img":"bin-0.png",
		"frame": {"x":1283,"y":878,"w":306,"h":428},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":14,"y":65,"w":306,"h":428},
		"sourceSize": {"w":320,"h":589}
	},
	"56.png":
	{"img":"bin-0.png",
		"frame": {"x":645,"y":1430,"w":320,"h":466},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":57,"w":320,"h":466},
		"sourceSize": {"w":320,"h":589}
	},
	"58.png":
	{"img":"bin-0.png",
		"frame": {"x":323,"y":500,"w":320,"h":489},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":32,"w":320,"h":489},
		"sourceSize": {"w":320,"h":589}
	},
	"60.png":
	{"img":"bin-0.png",
		"frame": {"x":323,"y":1482,"w":320,"h":488},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":26,"w":320,"h":488},
		"sourceSize": {"w":320,"h":589}
	},
	"62.png":
	{"img":"bin-0.png",
		"frame": {"x":323,"y":991,"w":320,"h":489},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":489},
		"sourceSize": {"w":320,"h":589}
	},
	"64.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":1033,"w":320,"h":497},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":497},
		"sourceSize": {"w":320,"h":589}
	},
	"66.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":1532,"w":320,"h":497},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":497},
		"sourceSize": {"w":320,"h":589}
	},
	"68.png":
	{"img":"bin-0.png",
		"frame": {"x":323,"y":1,"w":320,"h":497},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":497},
		"sourceSize": {"w":320,"h":589}
	},
	"70.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":523,"w":320,"h":508},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":508},
		"sourceSize": {"w":320,"h":589}
	},
	"72.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":1,"w":320,"h":520},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":520},
		"sourceSize": {"w":320,"h":589}
	},
	"74.png":
	{"img":"bin-0.png",
		"frame": {"x":645,"y":1,"w":320,"h":482},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":482},
		"sourceSize": {"w":320,"h":589}
	},
	"76.png":
	{"img":"bin-0.png",
		"frame": {"x":645,"y":958,"w":320,"h":470},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":320,"h":470},
		"sourceSize": {"w":320,"h":589}
	},
	"78.png":
	{"img":"bin-0.png",
		"frame": {"x":645,"y":485,"w":320,"h":471},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":13,"w":320,"h":471},
		"sourceSize": {"w":320,"h":589}
	},
	"80.png":
	{"img":"bin-0.png",
		"frame": {"x":1197,"y":1,"w":320,"h":440},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":28,"w":320,"h":440},
		"sourceSize": {"w":320,"h":589}
	},
	"82.png":
	{"img":"bin-0.png",
		"frame": {"x":967,"y":915,"w":314,"h":441},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":6,"y":27,"w":314,"h":441},
		"sourceSize": {"w":320,"h":589}
	},
	"88.png":
	{"img":"bin-0.png",
		"frame": {"x":1490,"y":443,"w":307,"h":426},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":13,"y":37,"w":307,"h":426},
		"sourceSize": {"w":320,"h":589}
	},
	"90.png":
	{"img":"bin-0.png",
		"frame": {"x":967,"y":1358,"w":312,"h":426},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":8,"y":28,"w":312,"h":426},
		"sourceSize": {"w":320,"h":589}
	},
	"92.png":
	{"img":"bin-0.png",
		"frame": {"x":1173,"y":443,"w":315,"h":433},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":5,"y":21,"w":315,"h":433},
		"sourceSize": {"w":320,"h":589}
	},
	"96.png":
	{"img":"bin-0.png",
		"frame": {"x":1281,"y":1358,"w":315,"h":419},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":5,"y":36,"w":315,"h":419},
		"sourceSize": {"w":320,"h":589}
	},
	"136.png":
	{"img":"bin-0.png",
		"frame": {"x":1799,"y":473,"w":242,"h":387},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":78,"y":81,"w":242,"h":387},
		"sourceSize": {"w":320,"h":589}
	},
	"156.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"158.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"160.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"162.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"164.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"166.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	},
	"168.png":
	{"img":"bin-0.png",
		"frame": {"x":1,"y":2036,"w":3,"h":3},
		"rotated": false,
		"trimmed": true,
		"spriteSourceSize": {"x":0,"y":0,"w":3,"h":3},
		"sourceSize": {"w":320,"h":589}
	}
};
var num=0;
var canvas = null;//初始化参数
var img = null;
var ctx = null;
var chay = 0;
var bi= 0;
var draw = null;

function index_dh(){
	var canvas = document.getElementById("animation_canvas");
	canvas.width = 750;
	canvas.height = 1206;
	bi = width/320*0.75;
	chay = height*0.0488;
	if (!canvas.getContext) {
		console.log("Canvas not supported. Please install a HTML5 compatible browser.");
		return;
	}
	// get 2D context of canvas and draw rectangel
	ctx = canvas.getContext("2d");
	ctx.fillStyle="rgba(255, 255, 255, 0)";

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	img = document.createElement('img');
	//var imgs = ['images/bin-0.png','images/bin-1.png','images/bin-2.png','images/bin-3.png','images/bin-4.png','images/bin-5.png'];
	loaded();

}

var callback1 = function(src){
	num++;
	progressFn(num);
	$('img[data-src="'+src+'"]').attr("src",src);
	if(num==imgs){
			$('.page').hide();
			$('.page_index,.logo').show();
			$('.page_index .bt').fadeIn(1000);
			setTimeout(function(){
				$('.page_index .zw,.page_index .ca').fadeIn(1000);
				setTimeout(function(){
					$('.zw').addClass("animatedslow infinite flash");
				},1000);
			},1000);

			index_dh();
		}
};

function loadImage(src) {
	var imgloader= new window.Image();
	//当图片成功加载到浏览器缓存
	imgloader.onload =function(evt)
	{
		if(typeof(imgloader.readyState)=='undefined')
		{
			imgloader.readyState = 'undefined';
		}

		//在IE8以及以下版本中需要判断readyState而不是complete
		if ((imgloader.readyState=='complete'||imgloader.readyState=="loaded")||imgloader.complete)
		{
			callback1(src);
		}else{
			imgloader.onreadystatechange(evt);
		}
	};
	//当加载出错或者图片不存在
	imgloader.onerror = function(evt)
	{
		callback1(src);
		//callback({'msg':'error','id':id});
	};
	//当加载状态改变
	imgloader.onreadystatechange = function(e)
	{
		//此方法只有IE8以及一下版本会调用
	};
	imgloader.src=src;
}
//保证只有图像加载后才开始循环动画
function loaded() {
	//setTimeout( update, 1000/3);//添加3帧每秒间隔计时器
	draw = setInterval(update,50)
}
function redraw() {
	ctx.clearRect(0,0,750,1206);
	ctx.fillStyle="rgba(255, 255, 255, 0)";
	ctx.fillRect(0, 0, 750, 1206);
	img.src='images/'+config[frame+'.png'].img;
	//ctx.drawImage(img,config[frame+'.png'].frame.x,config[frame+'.png'].frame.y,config[frame+'.png'].frame.w,config[frame+'.png'].frame.h, width-config[frame+'.png'].spriteSourceSize.w*0.8, config[frame+'.png'].spriteSourceSize.y*0.8, config[frame+'.png'].spriteSourceSize.w*0.8,config[frame+'.png'].spriteSourceSize.h*0.8);
	ctx.drawImage(img,config[frame+'.png'].frame.x,config[frame+'.png'].frame.y,config[frame+'.png'].frame.w,config[frame+'.png'].frame.h, width-config[frame+'.png'].spriteSourceSize.w*bi, config[frame+'.png'].spriteSourceSize.y*bi-chay*bi, config[frame+'.png'].spriteSourceSize.w*bi,config[frame+'.png'].spriteSourceSize.h*bi);
}


//为了让图片以规定的速度动画，我们必须追踪已经经过的时间，然后根据分配给每帧的时间播放帧。基本步骤是：

//1、按每秒几帧设置动画速度(msPerFrame)。

//2、当你循环游戏时，计算一下自最后一帧以后已经经过了多少时间（delta）。

//3、如果已经经过的时间足够把动画帧播完，那么播放这一帧并设置累积delta为0。

//4、如果已经经过的时间不够，那么记住（累积）delta时间（acDelta）。
var frame = 0;
var lastUpdateTime = 0;
var acDelta = 0;
var msPerFrame = 100;

function update() {
	redraw();
	frame+=2;
	if (frame >= 168) {
		frame = 0;
	}
	if(frame==4&&$('.car').attr('class').indexOf('animated')==-1){
		$('.car').addClass('animated');
	}
	if(frame==120&&$('.car').attr('class').indexOf('animated')!=-1){
		$('.car').removeClass('animated');
	}
}

//requestAnimFrame的作用基本上就是setTimeout，但浏览器知道你正在渲染帧，所以它可以优化绘制循环，以及如何与剩下的页面回流。

//在某些情况下，setTimeout比requestAnimFrame更好用，特别是对于手机。

//以下是在不同的浏览器上调用requestAnimFrame的情况也不同，标准的检测方法如下：
/*
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000 / 3); //如果requestAnimFrame支持不可用，还是可以用回内置的setTimeout。
			};
})();*/