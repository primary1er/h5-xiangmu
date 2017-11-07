<?php
error_reporting(0);
include_once('class/db.class.php');
include_once('class/common.php');
!defined('TIMESTAMP') && define('TIMESTAMP', time());
$db = new DB();
$page = intval($_GET['page']-1)>0?intval($_GET['page']-1):0;
$psize = 15;
$start = $page*$psize;

$sql = "select count(id) as total from ".$db->tablename('member')." where 1";
$num = $db->fetchcolumn($sql);
$sql = "select sum(money) as total from ".$db->tablename('money')." where money>0";
$nummoney = $db->fetchcolumn($sql);
$sql = "select m.*,q.money,q.createtime as payment_time,q.partner_trade_no,q.ip from ".$db->tablename('member')." m left join ".$db->tablename('money')." q on q.openid=m.openid where q.ip!='' order by m.id desc limit {$start},{$psize}";
$rs = $db->fetchall($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
	<meta charset="utf-8">
	<title>年轻婚态度</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/viewer.min.css">
	<style type="text/css">
		body, div, canvas
		{
			image-rendering: optimizeSpeed;
			-webkit-image-rendering: optimizeSpeed;
			-webkit-interpolation-mode: nearest-neighbor;
		}
		body{padding:0; margin:0;font-size:12px;}
		body, html{height: 100%;}
		ul li{display:inline-block;list-style: none;}
	</style>

</head>
<body>

<div class="container">
	<h4 class="text-center">年轻婚态度</h4>
	<p>总条数：<?php echo $num;?>   总金额：<?php echo round($nummoney/100,2);?> </p>
	<table class='table table-bordered'>
		<thead>
		<th>ID</th>
		<th>昵称</th>
		<th>词组</th>
		<th>红包金额</th>
		<th>IP地址</th>
		<th>商户订单号</th>
		<th>领取时间</th>
		<th>操作</th>
		</thead>
		<tbody id="dowebok">
		<?php
		foreach ($rs as $row)
		{
			echo "<tr>
			<td><span>{$row['id']}</span></td>
			<td><span>{$row['nickname']}</span></td>
			<td>{$row['adj']}</td>
			<td><span>".round($row['money']/100,2)."元</span></td>
			<td>{$row['ip']}</td>
			<td><span>{$row['partner_trade_no']}</span></td>
			<td><span>".date("Y-m-d H:i:s",$row['payment_time'])."</span></td>
			<td><span><a href='javascript:;' data-id='{$row['id']}'>删除</a></span></td>
	</tr>";
		}
		?>
		</tbody></table>
	<div class="text-center">
		<?php
		echo pagination($num,$page+1,$psize);
		?>
	</div>
</div>

<script src="js/jquery-1.10.2.min.js"></script>
<script>
	$('td a').click(function(){
		var mid = parseInt($(this).data('id'));
		if(mid<1){
			alert('参数错误！')
		}
		$.post('list.php',{'op':'del','mid':mid},function(res){
			var data = JSON.parse(res);
			if(data.status=='error'){
				alert(data.mess);
			}
			else if(data.status=='success'){
				location.reload();
			}
		})
	});
</script>
</body>
</html>
<?php
exit;