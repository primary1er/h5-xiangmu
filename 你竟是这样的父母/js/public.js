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
});
