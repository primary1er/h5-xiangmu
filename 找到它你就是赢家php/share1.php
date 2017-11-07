<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");
die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
$post = $_POST;
$openid = "";
$start_time = strtotime("2017-06-01 00:00:00");
$end_time = strtotime("2017-06-10 23:59:59");
if($_SERVER['REQUEST_TIME']<$start_time||$_SERVER['REQUEST_TIME']>$end_time){
    die(json_encode(array('status'=>'error','mess'=>'不在活动时间范围内，无法获得红包！')));
}
if(empty($post)||!isset($post['openid'])){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}else{
    $openid = trim($post['openid']);
}
//IP
function ip($type = 0, $adv = false)
{
    $type      = $type ? 1 : 0;
    static $ip = null;
    if (null !== $ip) {
        return $ip[$type];
    }

    if ($adv) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos = array_search('unknown', $arr);
            if (false !== $pos) {
                unset($arr[$pos]);
            }
            $ip = trim(current($arr));
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u", ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}
$ip = ip();

require_once('class/db.class.php');
$db = new DB();
$member = $db->get('member',array('openid'=>$openid),'id,nickname,createtime');
if(empty($member)){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}

if($_SERVER['REQUEST_TIME']-$member['createtime']<=120){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}
$sql = "select count(id) as total from ".$db->tablename('money')." where openid='{$openid}' and money>0";
$num = $db->fetchcolumn($sql);
if($num>0){
    die(json_encode(array('status'=>'error','mess'=>'你已领取过红包，每位用户仅限领取一次！')));
}
/*$sql = "select count(id) as total from ".$db->tablename('money')." where ip='{$ip}'";
$numip = $db->fetchcolumn($sql);
if($numip>=1){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}*/
if(rand(1,4)==1){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}
$start_time = strtotime(date("Y-m-d 00:00:00",$_SERVER['REQUEST_TIME']));
$end_time = strtotime(date("Y-m-d 23:59:59",$_SERVER['REQUEST_TIME']));
$sql = "select sum(money) as total from ".$db->tablename('money')." where createtime between {$start_time} and {$end_time}";
$nummoney = $db->fetchcolumn($sql);
$d = date("d",$_SERVER['REQUEST_TIME']);
$total_money = 49850;
if($d<=2){
    $total_money = 119850;
}elseif($d>=7){
    $total_money = 19850;
}
if($nummoney>$total_money){
    die(json_encode(array('status'=>'error','mess'=>'你与红包擦肩而过，还有机会！')));
}
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
        die(json_encode(array('status'=>'error','mess'=>"你与红包擦肩而过，还有机会！")));
    }else{
        return $res;
    }

    //获取转账信息
    //var_dump($wxtran->getInfo('11111111'));
    //var_dump($wxtran->error);*/
}
//$money = 100;
//if(!empty($da)){
    $money = rand(100,150);
//}
$ress = share($money,$openid,$member['nickname'],"无烟家庭，无烟的家，更多的爱活动红包发放");
//partner_trade_no payment_time
$data = array(
    'openid'=>$openid,
    'money'=>$money,
    'partner_trade_no'=>trim($ress->partner_trade_no),
    'createtime'=>strtotime($ress->payment_time),
    'ip'=>$ip
);
$db->insert("money",$data);
die(json_encode(array('status'=>'success','mess'=>"红包发放成功，金额：".round($money/100,2)."元。")));