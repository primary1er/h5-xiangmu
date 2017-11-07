<?php
if(empty($_GET)||!isset($_GET['nickname'])){
	//exit;
}
$bigImgPath = 'images/ryzs.jpg';
$img = imagecreatefromstring(file_get_contents($bigImgPath));

$font = 'font/msyh.ttf';//字体
$black = imagecolorallocate($img, 0, 0, 0);//字体颜色 RGB

$fontSize = 20;   //字体大小
$circleSize = 0; //旋转角度
$left = 343;      //左边距
$top = 200;       //顶边距
$qid = imagettfbbox ( $fontSize , 0 , $font , '亲爱的：');
$leng_arr = imagettfbbox ( $fontSize , 0 , $font , '亲爱的：'. $_GET['nickname']);
$qidlen = $qid[2]-$qid[0];
$wenzilen = $leng_arr[2]-$leng_arr[0];

imagefttext($img, $fontSize, $circleSize, $left-$wenzilen/2, $top, $black, $font, '亲爱的：'. $_GET['nickname']);
imageline($img, $left+$qidlen-$wenzilen/2, 210, $left+$wenzilen/2, 210, $black);

list($bgWidth, $bgHight, $bgType) = getimagesize($bigImgPath);
//imgturn($img,1);
//exit;
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
function imgturn($img,$direction=1)
    {

        $width = imagesx($img);
        $height = imagesy($img);
        $img2 = imagecreatetruecolor($height,$width);
        //顺时针旋转90度
        if($direction==1)
        {
            for ($x = 0; $x < $width; $x++) {
                for($y=0;$y< $height;$y++) {
                    imagecopy($img2, $img, $height-1-$y,$x, $x, $y, 1, 1);
                }
            }
        }else if($direction==2) {
            //逆时针旋转90度
            for ($x = 0; $x < $height; $x++) {
                for($y=0;$y< $width;$y++) {
                    imagecopy($img2, $img, $x, $y, $width-1-$y, $x, 1, 1);
                }
            }
        }

        header('Content-Type:image/jpg');
        imagejpeg($img2);
        imagedestroy($img);
        imagedestroy($img2);
    }
    