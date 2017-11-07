<?php 
  
class WeixinModel {
    private $weixin_config = array(
    'appid'=>"wxfee453e59179716d",
    'app_secret'=>"ecd285a427a7a560297cfd3d73618171",
        'token' => "ecd285a427a7a560297cfd3d73618171",
    //'appid'=>"wxf16155a2147f59a3",
    //'app_secret'=>"300771d35be840ef6deac076d03eecb5",
        //'token' => "300771d35be840ef6deac076d03eecb5",
        'url'   => array(
            'getCode' => 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=R_appid&redirect_uri=R_redirect_uri&response_type=R_response_type&scope=R_scope&state=R_state#wechat_redirect',
    
                'getAccessToken' =>'https://api.weixin.qq.com/sns/oauth2/access_token?appid=R_appid&secret=R_secret&code=R_code&grant_type=R_grant_type',
    
                'getWXUserInfo'=>'https://api.weixin.qq.com/sns/userinfo?access_token=R_access_token&openid=R_openid&lang=zh_CN',
    
        ),  
    );
    // wx95310a0263e13f13
    // dbfcf21820ed3e991623842da14e494a
	private $_config;
    private $filedir=array(
        'basicAccessToken'=>'basic_access_token.json',
        'jsapi_ticket'=>'jsapi_ticket.json',
        );
    // public function __construct() {
    // 	$this->_config 	= $this->$weixin_config;
    //     $this->filedir=array(
    //     'basicAccessToken'=>'access_token_public_number.json',
    //     'jsapi_ticket'=>'../conf/jsapi_ticket.json',
    //     );
    // }

    /**
     * 取得微信授权信息
     */
	public function getWXUser($back_url){
        if( isset($_GET['code']) && $_GET['code'] )
        {
        	//第二步
            $access_info = $this->getAccessToken( $_GET['code'] );
			if( $access_info['access_token'] && $access_info['openid'] )
			{
				//第三步
				return $this->getWXUserInfo($access_info);
			}
			return false;
        }
        else
        {
        	//第一步
            $this->getCode($back_url);
			exit;
        }
    }

    /**
     * 第一步，获取code
     */
	function getCode($back_url){
        $post_arr = array(
                'R_scope'=>'snsapi_userinfo',
                'R_response_type'=>'code',
                'R_state'=>'',
                'R_appid'=>$this->_config['appid'],
                'R_redirect_uri'=>urlencode($back_url),
        );  
		
		$url = $this->_config['url']['getCode'];
		$k = array_keys($post_arr);	
		$v = array_values($post_arr);	
		$url_new = str_replace($k,$v,$url);
		header('Location:'.$url_new);
    }

    /**
     * 第二步，获取access_token
     */
	function getAccessToken( $code ){
	    $post_arr = array(
	            'R_code'=>$code,
	            'R_appid'=>$this->_config['appid'],
	            'R_secret'=>$this->_config['app_secret'],
	            'R_grant_type'=>'authorization_code',
	    );
		$k = array_keys($post_arr);	
		$v = array_values($post_arr);	
		$url = $this->_config['url']['getAccessToken'];
		$url_new = str_replace($k,$v,$url);

		//封装过的curl类
    	include_once LIBPATH . 'HttpRequest.php';
		$re_str = HttpRequest::curl_get($url_new);
		$re = json_decode($re_str,true);
		return $re;
    }


    /**
     *第三步，获取用户信息
     */
    function getWXUserInfo( $data ){
    	$post_arr = array(
    		'R_access_token'=>$data['access_token'],
    		'R_openid'=>$data['openid'],
    	);

    	
    	$url = $this->_config['url']['getWXUserInfo'];
    	$k = array_keys($post_arr);	
    	$v = array_values($post_arr);	
    	$url_new = str_replace($k,$v,$url);

    	//封装过的curl类
    	include_once LIBPATH . 'HttpRequest.php';
    	$re_str = HttpRequest::curl_get($url_new);
    	$re = json_decode($re_str,true);	
    	return $re;
    }

    

    /**
     * 获取公众号的access_token
     * @return [type] [description]
     */
    public function getBasicAccessToken(){
        // $url_access_token="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe7e2778b3bc5c636&secret=dba87560c931a76930e89ec43a691a43";
        // $response=$this->curl_https($url_access_token);
        $file=$this->filedir['basicAccessToken'];
        if(file_exists($file)){
            $response=file_get_contents($file);
            $update=filemtime($file);
            if($update){
                $re=json_decode($response,true);
                if(!empty($re['access_token'])&&!empty($re['expires_in'])){
                    $expires_in=$re['expires_in'];
                    $now=time();
                    if($update+$expires_in-1800>=$now){
                        // $re['update']=false;
                        return $re;
                    }  
                    // $re['update']=true;
                    // $re['time']=$now-$update;
                    // $re['now']=$now;
                    // $re['up']=$update;
                    
                }
                
            }
        }
        return $this->createBasicAccessToken();
    }

    public function createBasicAccessToken(){
        $appid=$this->weixin_config['appid'];
        $app_secret=$this->weixin_config['app_secret'];
        $url_access_token="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$app_secret}";
        $response=$this->curl_https($url_access_token);
        $file=$this->filedir['basicAccessToken'];
        file_put_contents($file,$response);
        return json_decode($response,true);
    }

    /**
     * 获取jsapi_ticket，用于分享
     * @param  [type] $access_token [description]
     * @return [type]               [description]
     */
    public function get_jsapi_ticket($access_token){
        $file=$this->filedir['jsapi_ticket'];
        if(file_exists($file)){
            $response=file_get_contents($file);
            $update=filemtime($file);
            if($update){
                $re=json_decode($response,true);
                if(!empty($re['ticket'])&&!empty($re['expires_in'])){
                    $expires_in=$re['expires_in'];
                    $now=time();
                    if($update+$expires_in-1800>=$now){
                        // $re['update']=false;
                        return $re;
                    }  
                }
                
            }
        }
        $url_access_token="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$access_token}&type=jsapi";
        $response=$this->curl_https($url_access_token);
        file_put_contents($file,$response);
        return json_decode($response,true);
    }

    /**
     * 强制刷新jsapi
     * @return [type] [description]
     */
    public function refresh_jspai_ticket(){
        $file=$this->filedir['jsapi_ticket'];
        $token=$this->createBasicAccessToken();
        $access_token=$token['access_token'];
        $url_access_token="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$access_token}&type=jsapi";
        $response=$this->curl_https($url_access_token);
        file_put_contents($file,$response);
        return json_decode($response,true);
    }

    public function jsapiSign($data){
        $ticket;
        $refresh=$data['refresh'];
        if($refresh){
            $jsapi_ticket=$this->refresh_jspai_ticket();
        }else {
            $token=$this->getBasicAccessToken();
            $jsapi_ticket=$this->get_jsapi_ticket($token['access_token']);
        }
        $ticket=$jsapi_ticket['ticket'];
        unset($data['refresh']);
        $data['jsapi_ticket']=$ticket;
        $content=$this->formatBizQueryParaMap($data,false);
        $sign=sha1($content);
        $data['appid']=$this->weixin_config['appid'];
        $data['sign']=$sign;
        return $data;
    }

    /**
     *  作用：格式化参数，签名过程需要使用
     */
    function formatBizQueryParaMap($paraMap, $urlencode)
    {
        $buff = "";
        ksort($paraMap);
        foreach ($paraMap as $k => $v)
        {
            if($urlencode)
            {
               $v = urlencode($v);
            }
            //$buff .= strtolower($k) . "=" . $v . "&";
            $buff .= $k . "=" . $v . "&";
        }
        $reqPar;
        if (strlen($buff) > 0) 
        {
            $reqPar = substr($buff, 0, strlen($buff)-1);
        }
        return $reqPar;
    }
    
    /**
     *  作用：生成签名
     */
    private function getSign($Obj)
    {
        foreach ($Obj as $k => $v)
        {
            $Parameters[$k] = $v;
        }
        //签名步骤一：按字典序排序参数
        ksort($Parameters);
        $String = $this->formatBizQueryParaMap($Parameters, false);
        // echo '【string1】'.$String.'</br>';
        //签名步骤二：在string后加入KEY
        $String = $String."&key=".self::KEY;
        // echo "【string2】".$String."</br>";
        //签名步骤三：MD5加密
        $String = md5($String);
        // echo "【string3】 ".$String."</br>";
        //签名步骤四：所有字符转为大写
        $result_ = strtoupper($String);
        // echo "【result】 ".$result_."</br>";
        return $result_;
    }


    /** curl 获取 https 请求
    * @param String $url        请求的url 
    * @param Array  $data       要發送的數據
    * @param Array  $header     请求时发送的header
    * @param int    $timeout    超时时间，默认30s
    */
    public function curl_https($url){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);  // 从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        $response = curl_exec($ch);
        if($error=curl_error($ch)){
            return "false";
        }
        curl_close($ch);
        return $response;

    }

    private function curl_https_post($url, $data, $header=array(), $timeout=30){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);  // 从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);

        $response = curl_exec($ch);

        if($error=curl_error($ch)){
            return "false";
        }

        curl_close($ch);

        return $response;

    }

}



if($_REQUEST['act']=='jsSign')
{ 
    $weixin=new WeixinModel();
	$p=array('noncestr'=>$_REQUEST['noncestr'],'timestamp'=>$_REQUEST['timestamp'],'url'=>$_REQUEST['url'],'refresh'=>$_REQUEST['refresh']);
	$re=$weixin->jsapiSign($p);
	return print json_encode($re,false);
}
 
?>