<?php
if(empty($_COOKIE['brn_wlmc_nickname'])){
	header("location:index.php");exit;
}
$p=isset($_GET['p'])?trim($_GET['p']):"用户姓名";
$bigImgPath = 'images/txz.png';
$img = imagecreatefromstring(file_get_contents($bigImgPath));

$font = 'font/msyh.ttf';//字体
$black = imagecolorallocate($img, 254, 204, 167);//字体颜色 RGB

$fontSize = 20;   //字体大小
$circleSize = 0; //旋转角度
$left = 385;      //左边距
$top = 237;       //顶边距
$str = mb_strimwidth($_COOKIE['brn_wlmc_nickname'], 0, 10, '', 'utf8');
$leng_arr = imagettfbbox ( $fontSize , 0 , $font , $str);

imagefttext($img, $fontSize, $circleSize, $left-($leng_arr[2]/2-$leng_arr[0]/2), $top, $black, $font, $str);

list($bgWidth, $bgHight, $bgType) = getimagesize($bigImgPath);
switch ($bgType) {
	case 1: //gif
		header('Content-Type:image/gif');
		imagegif($img);
		break;
	case 2: //jpg
		header('Content-Type:image/jpg');
		imagejpeg($img);
		break;
	case 3: //jpg
		header('Content-Type:image/png');
		imagepng($img);
		break;
	default:
		break;
}
imagedestroy($img);