<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");

if(empty($_COOKIE['brn_wlmc_openid']))
{
    exit(json_encode(array('status'=>"error","mess"=>"参数错误！请刷新。")));
}else{
    require_once('class/db.class.php');
    $db = new DB();
    $openid = $_COOKIE['brn_wlmc_openid'];
    $post = $_POST;
    $member = $db->get('wlmc_member',array('openid'=>$openid));
    if(empty($member)){
        exit(json_encode(array('status'=>"error","mess"=>"用户不存在！请刷新。")));
    }
    $data = array(
        "name"=>trim($post['name']),
        "phone"=>trim($post['phone'])
    );
    $db->update('wlmc_member',$data,array('id'=>$member['id']));
    exit(json_encode(array('status'=>"success","mess"=>"报名成功！")));
}
