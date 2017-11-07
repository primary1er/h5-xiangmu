<?php

header("Content-Type: text/html; charset=utf-8");

require_once('class/db.class.php');
$db = new DB();
$sql = "ALTER TABLE `brn_marry_money` ADD `ip` VARCHAR(30) NOT NULL DEFAULT '' ;";
$db->query($sql);
/*$sql = <<<EOL
CREATE TABLE IF NOT EXISTS `brn_marry_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL DEFAULT '',
  `money` int(11) NOT NULL DEFAULT '0',
  `partner_trade_no` varchar(50) NOT NULL DEFAULT '',
  `adj` varchar(50) NOT NULL DEFAULT '',
  `createtime` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
EOL;
$db->query($sql);*/