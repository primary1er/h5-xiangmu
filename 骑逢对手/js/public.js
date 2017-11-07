$(document).ready(function(){
	//音乐
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
	audioAutoPlay('Jaudio');
	
	var musicNum = 0;
	$(".musicStartBtn").click(function(){
		$(".musicBox").addClass('musicAn');
		$("#Jaudio").get(0).pause();
	});
	$(".musicCloseBtn").click(function(){
		$(".musicBox").removeClass('musicAn');
		$("#Jaudio").get(0).play();
	});
	/*$(".musicBox").click(function(event) {
		if(musicNum==0){
			$(this).addClass('musicAn');
			$("#Jaudio").get(0).pause();
			musicNum = 1;
		}else{
			$(this).removeClass('musicAn');
			$("#Jaudio").get(0).play();
			musicNum = 0;
		}
	});*/
});
