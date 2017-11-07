$(document).ready(function(){
	//加载动画BEGIN
    var iNow = 0;
	var oDiv1 = document.getElementById('progressBox');
	var oDiv2 = document.getElementById('progressBar');
	var oDiv3 = document.getElementById('progressTxt');
	var imgWin = parseInt($(".page_load .imgArea").width());
	var allWidth = parseInt(oDiv1.style.width);
	var timer = null;
    timer = setInterval(function(){
		if(iNow==100){
			clearInterval(timer);
			clearInterval(imgTimer);
			$(".page_load").fadeOut(500);
			$(".page_index").fadeIn(500).addClass("active").animate({"padding":"0px"},2000,function(){
				$(".index_gz_pup_black").fadeIn(500);
				$(".index_gz_pup_in").fadeIn(500);
			});
	    }else{
			iNow += 2;
			progressFn(iNow);
		}
	},20);
	function progressFn(cent){
		var centNum = cent/100*allWidth;
		var cheNum = centNum-imgWin;
		oDiv2.style.clip = 'rect(0px,'+centNum+'px,4px,0px)';
		$(".page_load .imgArea").css({'transform':'translate('+cheNum+'px,-132%)'});
	}
	//这个定时器控制骑车小人循环动画，CSS3背景大小动画不方便
	var imgTimer = null;
	var imgNum = 0;
	var imgLen = $(".page_load .imgArea img").length;
	imgTimer = setInterval(function(){
		imgNum = imgNum + 1;
		if(imgNum>=imgLen){
			imgNum = 0;
		}
		$(".page_load .imgArea img").eq(imgNum).css({"display":"block"}).siblings().css({"display":"none"});
	},300);
	//加载动画END
	
	//活动规则弹窗
	$(".page_index .wri").click(function(){
		$(".index_gz_pup_black").fadeIn(500);
		$(".index_gz_pup_in").fadeIn(500);
	});
	$(".page_index .gz_closeBtn").click(function(){
		$(".index_gz_pup_black").fadeOut(500);
		$(".index_gz_pup_in").fadeOut(500);
	});
	
	$(".indexBtn").click(function(){
		self.location='upload.html'; 
	});

});
