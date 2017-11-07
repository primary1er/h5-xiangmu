$(document).ready(function(e){
	width = $(document).width();
	height = $(document).height();
	$(".page").width(width).height(height);

	$(".index1").show().addClass("slideInDown animated");
	var tt = document.querySelector('.index1');
	tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
		$(".index2").show().addClass("slideInDown animated");
		tt = document.querySelector('.index2');
		tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
			$(".index3").show().addClass("slideInDown animated");
			tt = document.querySelector('.index3');
			tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
				$(".index4").show().addClass("slideInDown animated");
				tt = document.querySelector('.index4');
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
					$(".index5").show().addClass("slideInDown animated");
					tt = document.querySelector('.index5');
					tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
						$('.jiantou').fadeIn(500);
						$("#label").fadeIn(1000);
					}, false);
				}, false);
			}, false);
		}, false);
	}, false);
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
		window.location.href="http://best.zhaopin.com/";
	});
	$(".jiantou").on("touchstart", function(e) {
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
	$(".jiantou").on("touchend", function(e) {
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
		if ( X > 0 ) {
			$('.page_index').fadeOut(500);
			$('.page_reg').fadeIn(500);
			$(".reg1").show().addClass("slideInDown animated");
			var tt = document.querySelector('.reg1');
			tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
				$(".reg2").show().addClass("slideInDown animated");
				tt = document.querySelector('.reg2');
				tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
					$(".reg3").show().addClass("slideInDown animated");
					tt = document.querySelector('.reg3');
					tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
						$(".reg4").show().addClass("slideInDown animated");
						tt = document.querySelector('.reg4');
						tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
							$('.reg').fadeIn(500);
						}, false);
					}, false);
				}, false);
			}, false);
			//alert('左滑');
		}
		//右滑
		else if ( X < 0 ) {
			//alert('右滑');
		}
		//下滑
		else if ( Y > 0) {
			//alert('下滑');
		}
		//上滑
		else if ( Y < 0 ) {
			//alert('上滑');
		}
		//单击
		else{
			//alert('单击');
		}
	});
});
