<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");
die(json_encode(array('status'=>'error','mess'=>'月朦胧，鸟朦胧，我和你妈钻草丛，我掏出毛毛虫，喜得你妈脸通红，哥哥我扒开你妈乱草丛，忙把小虫塞进乱草丛，小虫进洞变大虫，干的你妈直流脓！')));
$post = $_POST;
$openid = "";
if(empty($post)||!isset($post['openid'])){
    die(json_encode(array('status'=>'error','mess'=>'非法访问！')));
}else{
    $openid = trim($post['openid']);
    unset($post['openid']);
}
require_once('class/db.class.php');
$db = new DB();
$member = $db->get('member',array('openid'=>$openid),'id');
if(empty($member)){
    die(json_encode(array('status'=>'error','mess'=>'参数错误！')));
}
$post['createtime'] = time();
$res = $db->update('member',$post,array('openid'=>$openid));
if($res){
    die(json_encode(array('status'=>'success','mess'=>'提交成功！')));
}else{
    die(json_encode(array('status'=>'error','mess'=>'提交失败！')));
}