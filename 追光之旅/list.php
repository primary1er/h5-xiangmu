<?php
error_reporting(0);
include_once('class/db.class.php');
include_once('class/common.php');
!defined('TIMESTAMP') && define('TIMESTAMP', time());
$db = new DB();
$where = "1";
if(isset($_GET['type'])&&!empty($_GET['type'])){
	$where.= " and type=".intval($_GET['type']);
	if($_GET['type']==1){
		$title="-- 极光歌手";
	}else{
		$title="-- 自驾达人";
	}
}

//delete
if(isset($_POST['op'])&&$_POST['op']=='del'){
	$result['status'] = 'error';
	$mid = intval($_POST['mid']);
	if($mid<1){
		$result['mess'] = '参数错误！';
		exit(json_encode($result));
	}
	$res = $db->delete('followspot',array('id'=>$mid));
	if($res){
		$result['status'] = 'success';
	}else{
		$result['mess'] = '删除失败！';
	}
	exit(json_encode($result));
}

//export
if(isset($_GET['op'])&&$_GET['op']=='export'){
	$sql = "select * from ".$db->tablename('followspot')." where {$where} order by id desc";
	$list = $db->fetchall($sql);
	foreach ($list as &$row) {
		if($row['sex']==1){
			$row['sex']="男";
		}else{
			$row['sex']="女";
		}
		if($row['type']==1){
			$row['type']="极光歌手";
		}else{
			$row['type']="自驾达人";
		}
		$row['createtime'] = date('Y-m-d H:i:s',$row['createtime']);
	}
	unset($row);
	export($list, array(
			"title" => "中国两极穿越·追光之旅数据-" . date('Y-m-d-H-i', time()),
			"columns" => array(
					array('title' => 'ID', 'field' => 'id', 'width' => 12),
					array('title' => '姓名', 'field' => 'nickname', 'width' => 12),
					array('title' => '性别', 'field' => 'sex', 'width' => 24),
					array('title' => '手机', 'field' => 'phone', 'width' => 12),
					array('title' => '类型', 'field' => 'type', 'width' => 12),
					array('title' => '时间', 'field' => 'createtime', 'width' => 24)
			)),'中国两极穿越·追光之旅');
	exit();
}

$page = intval($_GET['page']-1)>0?intval($_GET['page']-1):0;
$psize = 15;
$start = $page*$psize;

$sql = "select count(id) as total from ".$db->tablename('followspot')." where {$where}";
$num = $db->fetchcolumn($sql);

$sql = "select * from ".$db->tablename('followspot')." where {$where} order by id desc limit {$start},{$psize}";
$rs = $db->fetchall($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
	<meta charset="utf-8">
	<title>中国两极穿越·追光之旅</title>
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
	<h4 class="text-center">中国两极穿越·追光之旅 <?php echo $title?></h4>
	<p>总数：<?php echo $num;?> <a href="list.php" >全部</a> - <a href="list.php?type=1" >极光歌手</a> - <a href="list.php?type=2" >自驾达人</a>  <a href="list.php?op=export&type=<?php echo $_GET['type']?>" style="float:right;" >导出数据</a></p>
	<table class='table table-bordered'>
		<thead>
		<th>ID</th>
		<th>姓名</th>
		<th>性别</th>
		<th>手机</th>
		<th>类型</th>
		<th>时间</th>
		<th>操作</th>
		</thead>
		<tbody id="dowebok">
		<?php
		foreach ($rs as $row)
		{
			if($row['sex']==1){
				$sex="男";
			}else{
				$sex="女";
			}
			if($row['type']==1){
				$type="极光歌手";
			}else{
				$type="自驾达人";
			}
			echo "<tr>
			<td><span>{$row['id']}</span></td>
			<td><span>{$row['nickname']}</span></td>
			<td><span>{$sex}</span></td>
			<td>".$row['phone']."</td>
			<td><span>{$type}</span></td>
			<td><span>".date("Y-m-d H:i:s",$row['createtime'])."</span></td>
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