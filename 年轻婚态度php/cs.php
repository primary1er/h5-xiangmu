<?php
error_reporting(0);

header("Content-Type: text/html; charset=utf-8");
function post_qyfk($cfg, $openid, $amount){
    global $_W;
    $root = __DIR__.'/cert/';
    $ret = array();
    $ret['code'] = 0;
    $ret['message'] = "success";
    $ret['amount'] = $amount;
    $url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
    $pars = array();
    $pars['mch_appid'] = $cfg['appid'];
    $pars['mchid'] = $cfg['mchid'];
    $pars['nonce_str'] = random(32);
    $pars['partner_trade_no'] = random(10) . date('Ymd') . random(3);
    $pars['openid'] = $openid;
    $pars['check_name'] = "NO_CHECK";
    $pars['amount'] = $amount;
    $pars['desc'] = "提现";
    $pars['spbill_create_ip'] = $cfg['client_ip'];
    ksort($pars, SORT_STRING);
    $string1 = '';
    foreach($pars as $k => $v){
        $string1 .= "{$k}={$v}&";
    }
    $string1 .= "key={$cfg['apikey']}";
    $pars['sign'] = strtoupper(md5($string1));
    $xml = array2xml($pars);
    $extras = array();
    $extras['CURLOPT_CAINFO'] = $root . 'rootca.pem';
    $extras['CURLOPT_SSLCERT'] = $root . 'apiclient_cert.pem';
    $extras['CURLOPT_SSLKEY'] = $root . 'apiclient_key.pem';
    $procResult = null;
    $resp = ihttp_request($url, $xml, $extras);
    if(is_error($resp)){
        $procResult = $resp['message'];
        $ret['code'] = -1;
        $ret['dissuccess'] = 0;
        $ret['message'] = "-1:" . $procResult;
        return $ret;
    }else{
        $xml = '<?xml version="1.0" encoding="utf-8"?>' . $resp['content'];
        $dom = new DOMDocument();
        if($dom -> loadXML($xml)){
            $xpath = new DOMXPath($dom);
            $code = $xpath -> evaluate('string(//xml/return_code)');
            $result = $xpath -> evaluate('string(//xml/result_code)');
            if(strtolower($code) == 'success' && strtolower($result) == 'success'){
                $ret['code'] = 0;
                $ret['dissuccess'] = 1;
                $ret['message'] = "success";
                return $ret;
            }else{
                $error = $xpath -> evaluate('string(//xml/err_code_des)');
                $ret['code'] = -2;
                $ret['dissuccess'] = 0;
                $ret['message'] = "-2:" . $error;
                return $ret;
            }
        }else{
            $ret['code'] = -3;
            $ret['dissuccess'] = 0;
            $ret['message'] = "error response";
            return $ret;
        }
    }
}

$cfg = array(
    'appid'=>"wxf16155a2147f59a3",
    'mchid'=>"wxf16155a2147f59a3",
    'client_ip'=>"100.131.2.5",
    'apikey'=>"wxf16155a2147f59a3",
);
$openid = "asdsadsadzxcvxzczxczxczxvzxc";
$amount = 1;
var_dump(post_qyfk($cfg, $openid, $amount));