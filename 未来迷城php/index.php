<?php
error_reporting(0);
header("Content-Type: text/html; charset=utf-8");
function is_weixin(){
    if ( strpos($_SERVER['HTTP_USER_AGENT'],
            'MicroMessenger') !== false ) {
        return true;
    }
    return false;
}

require_once('class/db.class.php');
//!defined('AppId') && define('AppId', 'wxfee453e59179716d');//三足鼎 wxf16155a2147f59a3
!defined('AppId') && define('AppId', 'wxf16155a2147f59a3');//三足鼎
//!defined('AppSecret') && define('AppSecret', 'ecd285a427a7a560297cfd3d73618171');//三足鼎 300771d35be840ef6deac076d03eecb5
!defined('AppSecret') && define('AppSecret', '300771d35be840ef6deac076d03eecb5');//三足鼎
!defined('TIMESTAMP') && define('TIMESTAMP', $_SERVER['REQUEST_TIME']);
!defined('DEBUG') && define('DEBUG', true);
if(!DEBUG&&!is_weixin()){
    die("<!DOCTYPE html>
				                <html>
				                    <head>
				                        <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'>
				                        <title>抱歉，出错了</title><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'><link rel='stylesheet' type='text/css' href='https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css'>
				                    </head>
				                    <body>
				                    <div class='page_msg'><div class='inner'><span class='msg_icon_wrp'><i class='icon80_smile'></i></span><div class='msg_content'><h4>请用微信访问</h4></div></div></div>
				                    </body>
				                </html>");
}
$db = new DB();
$get = $_GET;
$op = isset($get['op'])?trim($get['op']):'index';

$wechatObj = new Wechat();
class wechat {
    private $appid = AppId;
    private $secret = AppSecret;

    public function get_access_token(){
        $param ['appid']  = $this->appid;
        $param ['secret'] = $this->secret;
        $param ['code'] = $_GET['code'];
        $param ['grant_type'] = 'authorization_code'; //client_credential

        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?'.http_build_query($param);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $res = curl_exec($ch);
        curl_close($ch);

        $content = json_decode ( $res, true );
        if (! empty ( $content ['errmsg'] )) {
            return false;
        }

        return $content;
    }

    //通过授权获取用户信息, $content 是数组类型
    public function get_userinfo_by_auth($content){
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$content ['access_token'].'&openid='.$content ['openid'].'&lang=zh_CN';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $content = curl_exec($ch);
        curl_close($ch);

        $user = json_decode($content, true);
        return $user;
    }

    /*获取code跳转*/
    public function get_code($url,$state){
        $param['appid'] = $this->appid;//'wx90200983d9b6b0d3'; //AppID
        $param ['redirect_uri'] = $url; //获取code后的跳转地址
        $param ['response_type'] = 'code'; //不用修改
        $param ['scope'] = 'snsapi_userinfo'; //不用修改
        $param ['state'] = $state; //可在行定义该参数

        $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?'.http_build_query($param).'#wechat_redirect';
        header('Location: '.$url);
    }

}

if((isset($_GET['code']) && empty($_COOKIE['brn_wlmc_openid']))||DEBUG){
    if(DEBUG){
        $info = array('openid' => 'fromUser', 'nickname' => '芦杰','sex'=>1, 'headimgurl' => 'http://wx.qlogo.cn/mmopen/rr7QEfV1IUZlRsZ0GwR3fTeYpaCWQ9PAaaiaCVeuZt8HMbxzP3Rv4QBH7yR1IJvicky3KghuSwriaIKIUqtuTy6iaC0fCWZG404Z/0', 'province' => '河北', 'city' => '保定');
    }else{
        $access_token=$wechatObj->get_access_token();
        $info=$wechatObj->get_userinfo_by_auth($access_token);
    }
    setcookie('brn_wlmc_openid',trim($info['openid']),time()+31536000);
    setcookie('brn_wlmc_nickname',trim($info['nickname']),time()+31536000);
    setcookie('brn_wlmc_headimgurl',trim($info['headimgurl']),time()+31536000);
    $data = array(
        'openid'=>trim($info['openid']),
        'nickname' =>trim($info['nickname']),
        'headimgurl' =>trim($info['headimgurl']),
        'sex' =>intval($info['sex']),
    );

    //进行插入
    $member = $db->get('wlmc_member',array('openid'=>$info['openid']),'id,nickname,headimgurl');
    if(!empty($member)){
        if($data['nickname']!=$member['nickname']||$data['headimgurl']!=$member['headimgurl']){
            $db->update('wlmc_member',$data,array('id'=>$member['id']));
        }
    }else{
        $data['createtime'] = TIMESTAMP;
        $db->insert('wlmc_member',$data);
    }
    include($op.'.html.php');
}else
{
    if(empty($_COOKIE['brn_wlmc_openid']))
    {
        $code=$wechatObj->get_code("http://campaignblue.b-bri.cn/wlmc/index.php?".$_SERVER['QUERY_STRING'],TIMESTAMP);
        exit();
    }else
    {
        $data = array(
            'openid'=>$_COOKIE['brn_wlmc_openid'],
            'nickname' =>$_COOKIE['brn_wlmc_nickname'],
            'headimgurl' =>$_COOKIE['brn_wlmc_headimgurl'],
        );
        $member = $db->get('wlmc_member',array('openid'=>$_COOKIE['brn_wlmc_openid']),'id');
        if(empty($member)){
            $data['createtime'] = TIMESTAMP;
            $db->insert('wlmc_member',$data);
        }
        include($op.'.html.php');
    }
}
