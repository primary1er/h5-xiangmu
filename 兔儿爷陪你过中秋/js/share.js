//分享文案
var app_title = "向快乐出发，葆婴泰国体验之旅开启 ";
var app_desc = "葆婴期待与您相约在泰国！";
var tl_title = "向快乐出发，葆婴泰国体验之旅开启 ";

var share=[
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"文化西城，月圆中秋，开启转盘，领祝福"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“福禄双全，长命百岁”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“人丁兴旺，儿孙满堂”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“事业兴盛， 财源滚滚”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“吉祥如意，大吉大利”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“事业兴盛， 财源滚滚”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“四季平安，幸福安康”"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“运筹帷幄，事业有成"},
	{app_title:"中秋佳节，兔儿爷送福",app_desc:"我获得的兔儿爷祝福语是“花开富贵，心想事成”"},
]

//微信分享s
//var DOMAIN="http://campaignblue.b-bri.cn/wlmc/";
var DOMAIN="http://weixin.fengme.cc/app/rabbitMaF";
var URL = location.href.split('#')[0];
URL = encodeURIComponent(URL);
var link = DOMAIN+"/index.html";

var shareConfig = {
	timestamp: Math.round(new Date() / 1000),
	nonceStr: Math.round(new Date() / 1000) + Math.random(),
	url:URL,
	shop_name:"",
	shop_id:"",
	share_url:""
};
$.get(DOMAIN+"/class/WeixinModel.class.php?act=jsSign&noncestr="+shareConfig.nonceStr+"&timestamp="+shareConfig.timestamp+"&url="+URL+"&refresh=", function(data, status){
	if(status == "success"){
		var data = JSON.parse(data);
		if(status == "success"){
			//微信分享
			wx.config({
				debug: false,
				appId: data.appid,
				timestamp: data.timestamp,
				nonceStr: data.noncestr,
				signature: data.sign,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
			});
			wx.error(function(res){
				console.log(res);
			});
		}else{
			alert("微信签名失败，刷新页面重试！");
		}
	}
});
wx.ready(function(){
	wx.error(function(res){
		console.log(res);
	});
	
	//朋友圈
	wx.onMenuShareTimeline({
		title: share[prizeId].app_desc, 		// 分享标题
		link: link, 					// 分享链接
		imgUrl: DOMAIN+"/share.png",	// 分享图标
		success: function () {
			//用户分享成功后执行的回调函数
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});

	//分享给朋友
	wx.onMenuShareAppMessage({
		title: share[prizeId].app_title, // 分享标题
		desc: share[prizeId].app_desc, // 分享描述
		link: link, // 分享链接
		imgUrl: DOMAIN+"/share.png", // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			//用户分享成功后执行的回调函数
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});
});