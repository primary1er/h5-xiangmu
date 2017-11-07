$(document).ready(function(){
	$(".page_help").addClass("active");

	//计算
	var zNum = parseFloat($(".nr-02").html());
	function numChange(){
		var xNUm01 = zNum/8;
		var xNUm02 = zNum/15;
		var z_xNUm01 = parseFloat(xNUm01).toFixed(1);
		var z_xNUm02 = parseFloat(xNUm02).toFixed(1);
		$("#x_num01").html(z_xNUm01);
		$("#x_num02").html(z_xNUm02);
		if(zNum<3){
			$("#x_wri").html("距离奖品只差一步,分享好友助力有惊喜哦!");
		}else{
			var z_x_zNum = parseInt(zNum/3);
			$("#x_wri").html("相当于绕紫禁城骑行"+z_x_zNum+"圈");
		}
	}
	numChange();
	
	//点击为ta助力，需要判断用户ID，一个用户只能助力一次
	var flag = true;
	$("#btn-zl").click(function(){
		if(flag){
			//增加动画
			$(".btn-01-j").animate({"opacity":"1","top":"-300%"},1250,function(){
				$(".btn-01-j").animate({"opacity":"0"},200,function(){
					$(".btn-01-j").css({"top":"-65%"});
				})
			});
			//增加变化,nr_zNum为增加0.2km之后的数值，需保存
			zNum = zNum + 0.2;
			var nr_zNum = parseFloat(zNum).toFixed(1);
			$(".nr-02").html(nr_zNum);
			numChange();
			
			flag = false;	
		}else{
			alert("您已经助力过了");
		}
	});
	
	//排行榜弹窗
	$("#phbBtn").click(function(){
		$(".pup_warp_black").fadeIn(500);
		$(".phb_pup_in").fadeIn(500);
	});
	$("#phb_closeBtn").click(function(){
		$(".pup_warp_black").fadeOut(500);
		$(".phb_pup_in").fadeOut(500);
	});
});