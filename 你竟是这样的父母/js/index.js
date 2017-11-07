window.onload = function(){
    //加载动画
    var iNow = 0;
	var oDiv1 = document.getElementById('progressBox');
	var oDiv2 = document.getElementById('progressBar');
	var oDiv3 = document.getElementById('progressTxt');
	var allWidth = parseInt(oDiv1.style.width);
	var timer = setInterval(function(){
		if(iNow==100){
			clearInterval(timer);
			$(".loadpage").fadeOut();
			$(".homepage").addClass("homepageHover");
	    }else{
			iNow += 2;
			progressFn(iNow);
			if(iNow==50){
				$(".homepage,.warppage").css({"display":"block"});
			}
		}
	},20);
	function progressFn(cent){
		 oDiv2.style.clip = 'rect(0px,'+ cent/100*allWidth+'px,40px,0px)';
	}
	
	//点击首页开始按钮，出现第一题并且进行动画，这里用添加类去添加动画
	$("#startBtn").click(function(){
		$(".homepage").fadeOut();
		$(".page").eq(0).addClass("pageHover");	
	});
	
	
	//1、C    2、C    3、A    4、B    5、A  
	//正确得1分，错误不得分
	//df_z是总分，这个是提交给后台的，后台根据这个分数调取不同的结果合成图片
	var df01,df02,df03,df04,df05,df_z;
	var speet = 300;
	$(".box_btm li").click(function(){
		var thisNum = $(this).index();
		var listNum = parseInt($(this).parent("ul").attr("data-num"));
		if(listNum==0){
			if(thisNum==0){
				df01 = 0 ;
			}else if(thisNum==1){
				df01 = 0 ;
			}else{
				df01 = 1 ;
			}
			$(this).addClass("cur").siblings().removeClass("cur");
			var timer01 = setTimeout(function(){
				$(".page").removeClass("pageHover");	
				$(".page").eq(listNum+1).addClass("pageHover");	
				clearInterval(timer01);
			},speet);
		}else if(listNum==1){
			if(thisNum==0){
				df02 = 0 ;
			}else if(thisNum==1){
				df02 = 0 ;
			}else{
				df02 = 1 ;
			}
			$(this).addClass("cur").siblings().removeClass("cur");
			var timer02 = setTimeout(function(){
				$(".page").removeClass("pageHover");	
				$(".page").eq(listNum+1).addClass("pageHover");	
				clearInterval(timer02);
			},speet);
		}else if(listNum==2){
			if(thisNum==0){
				df03 = 1 ;
			}else if(thisNum==1){
				df03 = 0 ;
			}else{
				df03 = 0 ;
			}
			$(this).addClass("cur").siblings().removeClass("cur");
			var timer03 = setTimeout(function(){
				$(".page").removeClass("pageHover");	
				$(".page").eq(listNum+1).addClass("pageHover");	
				clearInterval(timer03);
			},speet);
		}else if(listNum==3){
			if(thisNum==0){
				df04 = 0 ;
			}else if(thisNum==1){
				df04 = 1 ;
			}else{
				df04 = 0 ;
			}
			$(this).addClass("cur").siblings().removeClass("cur");
			var timer04 = setTimeout(function(){
				$(".page").removeClass("pageHover");	
				$(".page").eq(listNum+1).addClass("pageHover");	
				clearInterval(timer04);
			},speet);
		}else if(listNum==4){
			if(thisNum==0){
				df05 = 1 ;
			}else if(thisNum==1){
				df05 = 0 ;
			}else{
				df05 = 0 ;
			}
			df_z = df01+df02+df03+df04+df05;
			$(this).addClass("cur").siblings().removeClass("cur");
			var timer04 = setTimeout(function(){
				self.location='result.html';
				clearInterval(timer04);
			},speet);
			//alert(df_z);
		}		
	});
}
