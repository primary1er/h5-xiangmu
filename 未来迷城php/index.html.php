<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>未来迷城</title>
    <meta name="viewport" content="user-scalable=no,width=750">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/style.css">
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/share.js"></script>
    <script type="text/javascript" src="js/jquery.slideunlock.min.js"></script>
    <style>
        #slider{
            width:43.2%;
            height:5.64%;
            position: absolute;
            left:20.4%;
            bottom:10%;
            padding-right:100px;
            border-radius: 2px;
            background-color: transparent;
            overflow: hidden;
            text-align: center;
        }
        #slider.success{
            background-color: transparent;
        }
        #label{
            width: 100px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background:url(images/hk.png);
            background-size: 100% 100%;
            cursor: pointer;
        }

        p{
            padding: 0 10px;
            word-wrap: break-word;
        }
    </style>
	<!--<script>
		var _czc = _czc || [];
		_czc.push(["_setAccount", "1262021144"]);
	</script>-->
</head>
<body>

	<!--<div style="display: none;"><script src="https://s22.cnzz.com/z_stat.php?id=1262021144&web_id=1262021144" language="JavaScript"></script></div>-->
	<div class="page page_index">
        <img class="logo" src="images/logo.png"/>
        <img class="index1 none" src="images/index_1.png"/>
        <img class="index2 none" src="images/index_2.png"/>
        <img class="index3 none" src="images/index_3.png"/>
        <img class="index4 none" src="images/index_4.png"/>
        <img class="index5 none" src="images/index_5.png"/>
        <div class="jiantou none" ></div>
        <input type="hidden" value="" id="lockable">
        <div id="slider">
            <span id="label" class="none"></span>
            <span id="lableTip"></span>
        </div>
        <div class="left" ></div>
        <div class="right" ></div>
        <div class="tags" >
            <span>自由生物黑客</span>
            <span>时空站绝地武士</span>
            <span>永恒时空计算师</span>
            <span>星际居所规划师</span>
            <span>银河绘图师</span>
            <span>三体文明国王</span>
            <span>虫洞时空黑客</span>
            <span>银河星际复苏者</span>
            <span>星云布展师</span>
            <span>太空城建筑师</span>
            <span>星际旅行者</span>
        </div>
    </div>
    <div class="page page_reg none">
        <img class="logo" src="images/logo.png"/>
        <img class="reg1 none" src="images/reg_1.png"/>
        <img class="reg2 none" src="images/reg_2.png"/>
        <img class="reg3 none" src="images/reg_3.png"/>
        <img class="reg4 none" src="images/reg_4.png"/>
        <input type="text" id="name"/>
        <input type="text" id="phone"/>
        <img src="images/reg_button.png" class="reg none"/>
    </div>
    <div class="page page_txz none">
        <img src="images/txz.jpg" class="txz none" />
        <img class="txz_wa none" src="images/txz_wa.png"/>
        <img src="images/save.png" class="save none"/>
        <img src="images/href.png" class="href none"/>
    </div>
<script>
    var slider = new SliderUnlock("#slider", {}, function(){
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
    }, function(){
        $(".warn").text("index:" + slider.index + "， max:" + slider.max + ",lableIndex:" + slider.lableIndex + ",value:" + $("#lockable").val() + " date:" + new Date().getUTCDate());
    });
    slider.init();
</script>
</body>
</html>