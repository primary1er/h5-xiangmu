<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");
die(json_encode(array('status'=>'error','mess'=>'非法访问！')));
$post = $_POST;
$openid = "";
$da = "";
if(empty($post)||!isset($post['openid'])){
    die(json_encode(array('status'=>'error','mess'=>'非法访问！')));
}else{
    $openid = trim($post['openid']);
    $da = trim($post['adjStrZ']);
}
if(empty($da)){
    die(json_encode(array('status'=>'hyh','mess'=>'很遗憾！')));
}
require_once('class/db.class.php');
$db = new DB();
$member = $db->get('member',array('openid'=>$openid),'id,nickname');
if(empty($member)){
    die(json_encode(array('status'=>'error','mess'=>'参数错误！')));
}
$sql = "select count(id) as total from ".$db->tablename('money')." where openid='{$openid}' and money>0";
$num = $db->fetchcolumn($sql);
if($num>0){
    die(json_encode(array('status'=>'error','mess'=>'每个用户限领一次红包！')));
}
$sql = "select count(id) as total from ".$db->tablename('money')." where ip='{$ip}'";
$numip = $db->fetchcolumn($sql);
if($numip>=1){
    die(json_encode(array('status'=>'error','mess'=>'每个IP限领1个红包！')));
}
$sql = "select sum(money) as total from ".$db->tablename('money')." where money>0";
$nummoney = $db->fetchcolumn($sql);
if($nummoney>499800){
    die(json_encode(array('status'=>'error','mess'=>'红包已领完!')));
}
/*$time = strtotime(date("Y-m-d 00:00:00",time()));
$sql = "select count(id) as total from ".$db->tablename('money')." where openid='{$openid}' and createtime>{$time}";
$num = $db->fetchcolumn($sql);
if($num>0){
    die(json_encode(array('status'=>'error','mess'=>'一天一次机会，红包明天等你拿！')));
}*/

require_once('class/WxTransfers.class.php');
function share($money,$openid,$nickname,$desc){

    $path = WxTransfersConfig::getRealPath(); // 证书文件路径
    $config['wxappid'] = WxTransfersConfig::APPID;
    $config['mch_id'] = WxTransfersConfig::MCHID;
    $config['key'] = WxTransfersConfig::KEY;
    $config['PARTNERKEY'] = WxTransfersConfig::KEY;
    $config['api_cert'] = $path . WxTransfersConfig::SSLCERT_PATH;
    $config['api_key'] = $path . WxTransfersConfig::SSLKEY_PATH;
    $config['rootca'] = $path . WxTransfersConfig::SSLROOTCA;

    $wxtran=new WxTransfers($config);

    $wxtran->setLogFile(__DIR__.'/transfers.log');//日志地址

    //转账
    $data=array(
        'openid'=>$openid,//openid
        'check_name'=>'NO_CHECK',//是否验证真实姓名参数
        're_user_name'=>$nickname,//姓名
        'amount'=>intval($money)<100?100:intval($money),//最小1元 也就是100
        'desc'=>$desc,//描述
        'spbill_create_ip'=>$wxtran->getServerIp(),//服务器IP地址
    );
    $res = $wxtran->transfers($data);
    if(empty($res)){
        die(json_encode(array('status'=>'error','mess'=>"红包已领完!")));
    }else{
        return $res;
    }

    //获取转账信息
    //var_dump($wxtran->getInfo('11111111'));
    //var_dump($wxtran->error);*/
}
$money = 100;
if(!empty($da)){
    $money = rand(100,200);
}
$ress = share($money,$openid,$member['nickname'],"年轻婚态度红包发放");
//partner_trade_no payment_time
$data = array(
    'openid'=>$openid,
    'money'=>$money,
    'partner_trade_no'=>trim($ress->partner_trade_no),
    'createtime'=>strtotime($ress->payment_time),
    'adj'=>$da,
    'ip'=>$ip
);
$db->insert("money",$data);
die(json_encode(array('status'=>'success','mess'=>"红包发放成功，金额：".round($money/100,2)."元。")));