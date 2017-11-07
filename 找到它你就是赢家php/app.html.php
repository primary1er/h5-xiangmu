<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>找到TA，你就是赢家！</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/style.css?v=2">
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="js/index.js?v=2"></script>
    <script>
        var _czc = _czc || [];
        _czc.push(["_setAccount", "1262029281"]);
    </script>
</head>
<body>
<div style="display: none;"><script src="https://s13.cnzz.com/z_stat.php?id=1262029281&web_id=1262029281" language="JavaScript"></script></div>
<audio id="Jaudio" src="bgmusic.mp3" preload autoplay="autoplay" loop></audio>
<div class="bgimg none">
    <img src="images/open_door.jpg" />
    <!--<img src="images/g1.png" />
        <img src="images/g2.png" />
        <img src="images/g3.png" />
        <img src="images/g4.png" />
        <img src="images/g5.png" />
        <img src="images/g6.png" />
        <img src="images/g7.png" />
        <img src="images/g8.png" />
        <img src="images/g9.png" />
        <img src="images/g10.png" />-->
</div>
<!--loading-->
<div class="page page_load">
    <img src="images/loading.png" class="loading"/>
    <div class="load_text">
        <div class="load_num" id="loadNum">0%</div>
        <span class="black">"为了最佳体验请锁定屏幕旋转"</span>
    </div>
</div>
<!--首页-->
<div class="page page_index none">
    <img src="images/logo.png" class="index_logo" />
    <img src="images/index_start.png" class="index_start" />
    <img src="images/index_jia.png" class="index_jia" />
    <img src="images/index_jia_l.png" class="index_jia_l" />
    <img src="images/index_find.png" class="index_find" />
    <img src="images/index_jia_r.png" class="index_jia_r" />
</div>
<!--开门-->
<div class="page page_door none">
    <div class="door_circle">
        <img src="images/circle0.png" class="circle0" />
        <img src="images/circle1.png" class="circle1" />
        <img src="images/circle2.png" class="circle2" />
        <img src="images/circle3.png" class="circle3" />
    </div>
    <div class="door_circle_click"></div>
    <img src="images/door_hand.png" class="door_hand" />
    <div class="door_clue none">
        <img src="images/clue.png" class="clue" />
        <img src="images/door_start.png" class="door_start">
    </div>
</div>
<!--主要页面-->
<div class="page page_all none">
    <!--厨房-->
    <div class="page page_kitchen" data-page="0">
        <div class="kitchen_yy"><i class="light6"></i></div>
        <div class="kitchen_cz"><i class="light6"></i></div>
        <div class="kitchen_jhq"></div>
        <div class="lroom_dhj"><i class="light2"></i></div>
        <img src="images/dhj.png" class="yj_dhj" />
    </div>
    <!--客厅-->
    <div class="page page_lroom" data-page="1">
        <div class="lroom_yg"><i class="light"></i></div>
        <div class="lroom_cys"><i class="light"></i></div>
        <div class="lroom_jinyan"><i class="light"></i></div>
        <div class="lroom_menpai"><i class="light"></i></div>
        <div class="lroom_cz"><i class="light4"></i></div>
        <div class="lroom_cl"></div>
        <div class="lroom_sf"></div>
        <div class="lroom_dt"></div>
        <img src="images/yangang.png" class="yj_yg" />
    </div>
    <!--卧室-->
    <div class="page page_room" data-page="2">
        <div class="room_cl"></div>
        <div class="room_cz"><i class="light8"></i></div>
        <div class="room_yd"><i class="light"></i></div>
        <div class="room_rili"><i class="light"></i></div>
        <div class="room_ydfw"></div>
        <img src="images/yandou.png" class="yj_yd" />
    </div>

    <div class="all_tip">
        <img src="images/tip.png" class="clue_tip" />
        <div class="tip_lj">
            <img src="images/lj.png" class="tip_laji"/>
            <img src="images/wen.png" class="tip_wen"/>
            <img src="images/jia.png" class="tip_jia"/>
            <img src="images/wen.png" class="tip_wen"/>
            <img src="images/jia.png" class="tip_jia"/>
            <img src="images/wen.png" class="tip_wen"/>
        </div>
        <div class="tip_ax">
            <img src="images/ax.png" class="tip_aixin"/>
            <img src="images/wen1.png" class="tip_wen"/>
            <img src="images/jia.png" class="tip_jia"/>
            <img src="images/wen1.png" class="tip_wen"/>
            <img src="images/jia.png" class="tip_jia"/>
            <img src="images/wen1.png" class="tip_wen"/>
        </div>
    </div>

    <img src="images/left.png" class="tab_left"/>
    <img src="images/right.png" class="tab_right"/>

    <div class="xsts lroom_tip none">
        <img src="images/tip1.png" class="tip1"/>
        <img src="images/tip2.png" class="tip2"/>
        <img src="images/continue.png" class="continue"/>
    </div>
    <div class="cltip lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/cz.png" class="lroom_cz">
    </div>
    <div class="rili lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/05-31.png" class="lroom_rili">
    </div>
    <div class="cys lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/cns.png" class="lroom_cns">
        <img src="images/cns_wa.png" class="lroom_wa" />
    </div>
    <div class="jinyan lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/jzxy.png" class="lroom_jy">
        <img src="images/jy_wa.png" class="lroom_wa" />
    </div>
    <div class="menpai lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/0531.png" class="lroom_menpai">
        <img src="images/wy_wa.png" class="lroom_wa" />
    </div>
    <div class="three lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/cl.png" class="three_cl">
    </div>
    <div class="yyj lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/yyj.png" class="three_cl">
    </div>
    <div class="jhq lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/jhq.png" class="three_cl">
    </div>
    <div class="yandou lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/esy_yd.png" class="esy">
        <img src="images/yd_tip.png" class="esy_tip">
        <img src="images/diuqi.png" class="lroom_dq" />
    </div>
    <div class="dahuoji lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/esy_dhj.png" class="esy">
        <img src="images/dhj_tip.png" class="esy_tip">
        <img src="images/diuqi.png" class="lroom_dq" />
    </div>
    <div class="yangang lroom_tip none">
        <img src="images/close.png" class="lroom_close" />
        <img src="images/esy_yg.png" class="esy">
        <img src="images/yg_tip.png" class="esy_tip">
        <img src="images/diuqi.png" class="lroom_dq" />
    </div>
</div>

<div class="page page_result none">
    <img src="images.php?nickname=<?php echo $data['nickname'];?>" class="result_ryzs" />
    <img src="images/again.png" class="result_again" onclick="_czc.push(['_trackEvent','再玩一次','再玩一次']);"/>
    <img src="images/save.png" class="result_save" onclick="_czc.push(['_trackEvent','保存图片','保存图片']);"/>
    <img src="images/share.png" class="result_share" onclick="_czc.push(['_trackEvent','分享按钮','分享按钮']);"/>
    <img src="images/ansave.png" class="result_ansave" />
    <div class="result_tip none">
        <img src="images/share_close.png" class="share_close" />
        <img src="images/share_wa.png" class="share_wa">
        <img src="images/jiantou.png" class="jiantou dou">
    </div>
</div>

<div class="tip none"></div>

</body>
</html>
<script type="text/javascript">
    //分享文案
    var app_title = "找到TA，你就是赢家！";
    var app_desc = "无烟家庭，无烟的家，更多的爱！";
    var tl_title = "找到TA，你就是赢家！";

    //翻页
    var data_page=1;
    $('.tab_left').click(function(){
        data_page--;
        if(data_page<0){
            data_page=0;
        }else{
            $(".page_all").animate({top: "-"+100*data_page+"%"});
        }

    });
    $('.tab_right').click(function(){
        data_page++;
        if(data_page>2){
            data_page=2;
        }else{
            $(".page_all").animate({top: "-"+100*data_page+"%"});
        }

    });
    var v1,v2,v3,v4,v5,v6 = false;
    $('.lroom_cys').click(function(){
        $('.tip_ax .tip_wen').eq(0).attr("src","images/cys.png");
        $('.tip,.cys').fadeIn(500);
        v1 = true;
        result();
    });
    $('.lroom_jinyan').click(function(){
        $('.tip_ax .tip_wen').eq(1).attr("src","images/wybs.png");
        $('.tip,.jinyan').fadeIn(500);
        v2 = true;
        result();
    });
    $('.lroom_menpai').click(function(){
        $('.tip_ax .tip_wen').eq(2).attr("src","images/menpai.png");
        $('.tip,.menpai').fadeIn(500);
        v3 = true;
        result();
    });
    $('.yangang .lroom_dq').click(function(){
        $('.tip_lj .tip_wen').eq(2).attr("src","images/yangang.png");
        $('.yj_yg,.lroom_yg').hide();
        $('.tip,.lroom_tip').fadeOut(500);
        v6 = true;
        result();
    });
    $('.dahuoji .lroom_dq').click(function(){
        $('.tip_lj .tip_wen').eq(0).attr("src","images/dhj.png");
        $('.yj_dhj,.lroom_dhj').hide();
        $('.tip,.lroom_tip').fadeOut(500);
        v4 = true;
        result();
    });
    $('.yandou .lroom_dq').click(function(){
        $('.tip_lj .tip_wen').eq(1).attr("src","images/yandou.png");
        $('.yj_yd,.room_yd').hide();
        $('.tip,.lroom_tip').fadeOut(500);
        v5 = true;
        result();
    });
    $('.result_again').click(function(){
        v1=v2=v3=v4=v5=v6 = false;
        $('.tip_lj .tip_wen').attr("src","images/wen.png");
        $('.tip_ax .tip_wen').attr("src","images/wen1.png");
        $('.page').hide();
        $('.page_all .page,.yj_yg,.lroom_yg,.yj_dhj,.lroom_dhj,.yj_yd,.room_yd').show();
        $('.page_index,.index_logo').fadeIn(500);
        index_dh();
    });
    $('.result_save').click(function(){
        $('.result_ansave').show().addClass('hover');
        timer02 = setTimeout(function(){
            $('.result_ansave').fadeOut();
        },1500);
    });
    $('.result_share').click(function(){
        $('.jiantou').addClass("dou animated infinite");
        $('.tip,.result_tip').fadeIn(500);
    });
    $('.share_close').click(function(){
        $('.tip,.result_tip').fadeOut(500);
    });
    function result(){
        if(v1&&v2&&v3&&v4&&v5&&v6){
            setTimeout(function(){
                fhb();
                data_page = 1;
                $('.page_all,.tip,.lroom_tip,.result_ansave').hide();
                $(".page_all").animate({top: "-100%"});
                $('.page_result').fadeIn(500);
            },1000);
        }
    }
    function index_dh(){
        $(".index_find").show().addClass("slideInDown animated");
        var tt = document.querySelector('.index_find');
        tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
            $(".index_jia").show().addClass("slideInDown animated");
            tt = document.querySelector('.index_jia');
            tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
                $(".index_start").show().addClass("slideInDown animated");
                tt = document.querySelector('.index_start');
                tt.addEventListener("webkitAnimationEnd", function(){ //动画结束时事件
                    $(".index_jia_l,.index_jia_r").fadeIn(500).addClass("tada animated infinite");
                }, false);
            }, false);
        }, false);
    }
    function fhb(){
        //$.post("./sub.php",{"openid":"<?php echo $data['openid'];?>"},function(res){
            //var data = JSON.parse(res);
            //if(data.status=="success"){
                $.post("./share.php",{"openid":"<?php echo $data['openid'];?>"},function(res){
                    var data = JSON.parse(res);
                    if(data.status=="success"){
                        alert(data.mess);
                        app_desc = "<?php echo $data['nickname'];?>在本次无烟家庭活动中，获得了一个令人羡慕的红包奖励！";
                        tl_title = "<?php echo $data['nickname'];?>在本次无烟家庭活动中，获得了一个令人羡慕的红包奖励！";
                        wx.ready(function(){
                            wx.error(function(res){
                                console.log(res);
                            });
                            //朋友圈
                            wx.onMenuShareTimeline({
                                title: tl_title, 		// 分享标题
                                link: link, 					// 分享链接
                                imgUrl: DOMAIN+"/share.png",	// 分享图标
                                success: function () {
                                    //用户分享成功后执行的回调函数
                                    _czc.push(['_trackEvent','分享朋友圈','分享朋友圈']);
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
                                imgUrl: DOMAIN+"/share.png", // 分享图标
                                type: '', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function () {
                                    //用户分享成功后执行的回调函数
                                    _czc.push(['_trackEvent','分享','分享']);
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                }
                            });
                        });
                        //alert("success:金额：");
                    }else if(data.status=="error"){
                        alert(data.mess);
                    }
                });
            //}else if(data.status=="error"){
                //alert(data.mess);
            //}
        //});

    }
    //微信分享s
    var DOMAIN="http://weixin.fengme.cc/app/find";
    var URL = location.href.split('#')[0];
    URL = encodeURIComponent(URL);
    var link = location.origin+location.pathname;//+"?openid=";

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
            title: tl_title, 		// 分享标题
            link: link, 					// 分享链接
            imgUrl: DOMAIN+"/share.png",	// 分享图标
            success: function () {
                //用户分享成功后执行的回调函数
                _czc.push(['_trackEvent','分享朋友圈','分享朋友圈']);
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
            imgUrl: DOMAIN+"/share.png", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                //用户分享成功后执行的回调函数
                _czc.push(['_trackEvent','分享','分享']);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
</script>