<?php
require_once('class/db.class.php');
$db = new DB();
$post = $_POST;
$data = array();
if(!empty($post['name'])){
	$data['name']=trim($post['name']);
}
if(!empty($post['phone'])){
	$data['phone']=trim($post['phone']);
}
$data['createtime']=time();
$db->insert('money_member',$data);
exit(json_encode(array('status'=>"success","mess"=>"报名成功！")));
