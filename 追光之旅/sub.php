<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");

$post = $_POST;
require_once('class/db.class.php');
$db = new DB();

$res = $db->insert('followspot',array('createtime'=>time(),'type'=>intval($post['type']),'nickname'=>trim($post['nickname']),'sex'=>intval($post['sex']),'phone'=>trim($post['phone'])));
if($res){
    die(json_encode(array('status'=>'success','mess'=>'提交成功！')));
}else{
    die(json_encode(array('status'=>'error','mess'=>'提交失败！')));
}