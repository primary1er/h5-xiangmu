//分享文案
var app_title = "中国两极穿越·追光之旅";
var app_desc = "中俄边境线上的极致远征，趁现在，加入我们，来一次真正的勇闯天涯~";
var tl_title = "中国两极穿越·追光之旅";
//微信分享s
var DOMAIN="http://weixin.fengme.cc/app/followspot/";
var URL = location.href.split('#')[0];
URL = encodeURIComponent(URL);
var link = DOMAIN+"index.html"//"http://www.obeibei.com/zgzl0/index.php";

var shareConfig = {
	timestamp: Math.round(new Date() / 1000),
	nonceStr: Math.round(new Date() / 1000) + Math.random(),
	url:URL,
	shop_name:"",
	shop_id:"",
	share_url:""
};

$.get(DOMAIN+"/wxshare/WeixinModel.class.php?act=jsSign&noncestr="+shareConfig.nonceStr+"&timestamp="+shareConfig.timestamp+"&url="+URL+"&refresh=", function(data, status){
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
		title: tl_title, 		// 分享标题
		link: link, 					// 分享链接
		imgUrl: DOMAIN+"/share.jpg",	// 分享图标
		success: function () {
			//用户分享成功后执行的回调函数
		},
		cancel: function () {
			// 用户取消分享后执行的回调函数
		}
	});

	//分享给朋友
	wx.onMenuShareAppMessage({
		title: app_title, // 分享标题
		desc: app_desc, // 分享描述
		link: link, // 分享链接
		imgUrl: DOMAIN+"/share.jpg", // 分享图标
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