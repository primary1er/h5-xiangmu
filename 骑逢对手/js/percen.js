$(document).ready(function(){
	$(".page_percen").addClass("active");
	var timer = null;
	timer = setTimeout(function(){
		$(".page_percen .tsBox img").addClass("hover");
		timer02 = setTimeout(function(){
			$(".page_percen .tsBox").fadeOut(500);
		},3000);
	},1300);
	
	//排行榜弹窗
	$("#phbBtn").click(function(){
		$(".pup_warp_black").fadeIn(500);
		$(".phb_pup_in").fadeIn(500);
	});
	$("#phb_closeBtn").click(function(){
		$(".pup_warp_black").fadeOut(500);
		$(".phb_pup_in").fadeOut(500);
	});
	//分享弹窗
	$("#shareBtn").click(function(){
		$(".pup_warp_black").fadeIn(500);
		$(".share_pup_in").fadeIn(500);
	});
	$("#share_closeBtn").click(function(){
		$(".pup_warp_black").fadeOut(500);
		$(".share_pup_in").fadeOut(500);
	});
	
	//将数据导入canvas中，再转为图片
	//设置用户ID、用户分数、根据分数调用的字符串
	var userId = "飞的猪才怪～";
	var userFr = 23.6;
	var userMs;
	if(userFr<3){
		userMs = "距离奖品只差一步,分享好友助力有惊喜哦!"
	}else{
		var userNum = parseInt(userFr/3);
		userMs = "相当于绕紫禁城骑行"+userNum+"圈";
	}
	
	//z_userNUm01、z_userNUm01分别是根据距离计算之后的节约碳排量(g)/卡路里(kCal)
	var userNUm01 = (userFr*1000)/8;
	var userNUm02 = (userFr*1000)/15;
	var z_userNUm01 = parseFloat(userNUm01).toFixed(1);
	var z_userNUm02 = parseFloat(userNUm02).toFixed(1);
	
	var canvas = document.getElementById("myCanvas");
	//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
	if(canvas.getContext){  
		//获取对应的CanvasRenderingContext2D对象(画笔)
		var ctx = canvas.getContext("2d");

		var my_gradient=ctx.createLinearGradient(0,0,0,750);
		my_gradient.addColorStop(0,"white");
		my_gradient.addColorStop(1,"white");
		ctx.fillStyle=my_gradient;
		ctx.fillRect(0,0,750,1205); 
											
		//用户ID
		ctx.font = "26px '微软雅黑'";
		ctx.fillStyle = "#000";
		ctx.textAlign = 'center'; //设置文本的水平对对齐方式
		ctx.fillText(userId, canvas.width/2, 56);
		
		//用户分数
		ctx.font = "bold 118px Arial";
		ctx.fillStyle = "#000";
		ctx.textAlign = 'center'; //设置文本的水平对对齐方式
		ctx.fillText(userFr, canvas.width/2, 180);
		
		//骑行距离（km）
		ctx.font = "24px '微软雅黑'";
		ctx.fillStyle = "#989898";
		ctx.textAlign = 'center'; //设置文本的水平对对齐方式
		ctx.fillText("骑行距离（km）", canvas.width/2, 220);
		
		//调用语句
		ctx.font = "24px '微软雅黑'";
		ctx.fillStyle = "#000";
		ctx.textAlign = 'center'; //设置文本的水平对对齐方式
		ctx.fillText(userMs, canvas.width/2, 260);
		
		//节约碳排量(g)/卡路里(kCal)
		ctx.font = "bold 38px Arial";
		ctx.fillStyle = "#000";
		ctx.textAlign = 'left'; //设置文本的水平对对齐方式
		ctx.fillText(z_userNUm01, 108, 340);
		ctx.fillText(z_userNUm02, 315, 340);

		ctx.font = "24px'微软雅黑'";
		ctx.fillStyle = "#989898";
		ctx.textAlign = 'center'; //设置文本的水平对对齐方式
		ctx.fillText("节约碳排量(g)", 110, 380);
		ctx.fillText("卡路里(kCal)", 310, 380);
		
		var numImg01 = new Image();
		numImg01.src = 'images/page_help_nr05_l.png';
		numImg01.onload = function () {
			ctx.drawImage(numImg01,50,300);
		}
		var numImg02 = new Image();
		numImg02.src = 'images/page_help_nr05_r.png';
		numImg02.onload = function () {
			ctx.drawImage(numImg02,260,300);
		}
		
		var codeImg = new Image();
		codeImg.src = 'images/page_help_code.png';
		codeImg.onload = function () {
			ctx.drawImage(codeImg,0,420);
		}
		
	}
	function convertCanvasToImage(canvas) {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		return image;
	}
	
	var srcImgFnTimer = setTimeout(function(){
		document.getElementById("canvasPngHolder").appendChild(convertCanvasToImage(canvas));
	},1000);
});