

function loadSection(){
	setTimeout( function(){ $(".hand_btn").fadeOut(400); },3550)
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
		'touchSensitivity':20,
        'sectionsColor': ['#161516', '#dcd1ce', '#928f8b', '#1a0e07', '#160409', '#756149', '#1d1e16','','#394b5f'],
        //anchors: ['page1','page2','page3','page4','page5','page6','page7'],
        'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
		onLeave: function(index, nextIndex, direction){
			/*if(nextIndex==3||nextIndex==5||nextIndex==7){
				$.fn.fullpage.setAllowScrolling(false);
			}else{
				$.fn.fullpage.setAllowScrolling(true);
			}*/
		},
		afterLoad:function(anchorLink,index){
			if(index==3){
				setTimeout(function(){ audioAutoPlay('car','car_music');},500);
			}else{
				//car_music.pause();
			}
			if(index==4){
				setTimeout(function(){ audioAutoPlay('feiji','feiji_music');},100);
			}else{
				//feiji_music.pause();
			}
			if(index==5){
				setTimeout(function(){ audioAutoPlay('huanhu','huhuan_music');},100);
			}else{
				//huhuan_music.pause();
			}
			if(index==7){
				setTimeout(function(){ audioAutoPlay('jianpan','jianpan_music');},100);
			}else{
				//jianpan_music.pause();
			}
			if(index==8){
				setTimeout(function(){ audioAutoPlay('jiqiren','jiqiren_music');},100);
			}else{
				//jiqiren_music.pause();
			}
		}
    })
	$.fn.fullpage.setAllowScrolling(false);
	$(".jiemi_btn").click(function(){
		$(".money").show();
		audioAutoPlay('car','car_music');car_music.pause();
		audioAutoPlay('feiji','feiji_music');feiji_music.pause();
	    audioAutoPlay('huanhu','huhuan_music');huhuan_music.pause();
	    audioAutoPlay('jianpan','jianpan_music');jianpan_music.pause();
	    audioAutoPlay('jiqiren','jiqiren_music');jiqiren_music.pause();
		var tt = document.querySelector('.money');
	    tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
		   $.fn.fullpage.moveSectionDown();
		   $(".money").hide();
		})
	})
	$(".hand_btn,.getBtn,.getBtn1").click(function(){
		$(".money").show();
		var tt = document.querySelector('.money');
	    tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
		   $.fn.fullpage.moveSectionDown();
		   $(".money").hide();
		})
	})
	$(".getBtn2").click(function(){
		$(".money").show();
	    jianpan_music.pause();
		var tt = document.querySelector('.money');
	    tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
		   $.fn.fullpage.moveSectionDown();
		   $(".money").hide();
		})
	})
	var img_2_2 = document.querySelector('.img_2_2');
	img_2_2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
	   setTimeout(function(){ $.fn.fullpage.moveSectionDown();},2000);
	})
	var fly_img = document.querySelector('.fly_img');
	fly_img.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
	   setTimeout(function(){ $.fn.fullpage.moveSectionDown();},1000);
	})
	var img_6_2 = document.querySelector('.img_6_2');
	img_6_2.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
	   setTimeout(function(){ $.fn.fullpage.moveSectionDown();},3000);
	})
	var img_8_1 = document.querySelector('.img_8_1');
	img_8_1.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
	   setTimeout(function(){ $.fn.fullpage.moveSectionDown();},3000);
	})
}


//音乐BEGIN
function audioAutoPlay(id,name){
	eval(name+' = document.getElementById(id);\
  play = function(){\
	  '+name+'.play();\
  };\
  '+name+'.play();\
  ')
  
  
  document.addEventListener("WeixinJSBridgeReady",function (){
	  //微信
	  play();
  },false);
  document.addEventListener('YixinJSBridgeReady',function(){
	  //易信
	  play();
  },false);
  //document.addEventListener("touchstart",play,false);
}


function checkForm(){
	//姓名
	var name = $(".p_name input").val();
	//手机
	var tel = $(".p_tel input").val();
	var regTel = /^(((17[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(147))+\d{8})$/;

	if(name==""||name.length<2||tel==""||!regTel.test(tel)){
		alert("填写错误，请重新写");
	}else{
		$.post("reg.php",{name:name,phone:tel},function(res){
			console.log(res)
			var data = JSON.parse(res);
			if(data.status=="success"){
			    alert("信息提交成功！感谢报名，组委会将在报名信息中抽取参会资格。");
				$(".p_name input").val("");
				$(".p_tel input").val("");
			}else{
				alert(data.mess);
			}
		});

	}
}


var tmp_i=0;
function loadImage(){
	var image=new Image();
	var len=$(".wrapBox").find("img").length;
	image.src = $(".wrapBox").find("img").eq(tmp_i).attr("src");
	image.onload = function() {
		$(".loadText").html(parseInt(tmp_i / len* 100) + "%");
		$(".loading div p").width((tmp_i / len* 316) + "px");
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
		$(".loading").hide();
		$(".wrapBox").show();
		loadSection();
}
