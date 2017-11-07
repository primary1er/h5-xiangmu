<?php
function get_random($prefix = '')
{
    return $prefix . base_convert(time() * 1000, 10, 36) . "_" . base_convert(microtime(), 10, 36) . uniqid();
}

function file_random_name($dir, $ext){
    do {
        $filename = get_random(30) . '.' . $ext;
    } while (file_exists($dir . $filename));
    return $filename;
}

function mkdirs($path) {
    if (!is_dir($path)) {
        mkdirs(dirname($path));
        mkdir($path);
    }
    return is_dir($path);
}

function rmdirs($path, $clean = false) {
    if (!is_dir($path)) {
        return false;
    }
    $files = glob($path . '/*');
    if ($files) {
        foreach ($files as $file) {
            is_dir($file) ? rmdirs($file) : @unlink($file);
        }
    }
    return $clean ? true : @rmdir($path);
}

function is_weixin(){

    if ( strpos($_SERVER['HTTP_USER_AGENT'],

            'MicroMessenger') !== false ) {

        return true;

    }

    return false;

}

function is_zhifubao(){

    if ( strpos($_SERVER['HTTP_USER_AGENT'],

            'AliApp') !== false ) {

        return true;

    }

    return false;

}

function file_upload($file, $type = 'image', $name = '') {
    $harmtype = array('asp', 'php', 'jsp', 'js', 'css', 'php3', 'php4', 'php5', 'ashx', 'aspx', 'exe', 'cgi');
    if (empty($file)) {
        die(json_encode('没有上传内容'));
    }
    if (!in_array($type, array('image', 'thumb', 'voice', 'video', 'audio'))) {
        die(json_encode('未知的上传类型'));
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $ext = strtolower($ext);
    /*$setting = $_W['setting']['upload'][$type];
    if (!in_array(strtolower($ext), $setting['extentions']) || in_array(strtolower($ext), $harmtype)) {
        return error(-3, '不允许上传此类文件');
    }
    if (!empty($setting['limit']) && $setting['limit'] * 1024 < filesize($file['tmp_name'])) {
        return error(-4, "上传的文件超过大小限制，请上传小于 {$setting['limit']}k 的文件");
    }*/

    $result = array();
    if (empty($name) || $name == 'auto') {
        $uniacid = 'brn_bluegogo';
        $path = "{$type}s/{$uniacid}/" . date('Y/m/');
        mkdirs(ATTACHMENT_ROOT . '/' . $path);
        $filename = file_random_name(ATTACHMENT_ROOT . '/' . $path, $ext);
        $result['path'] = $path . $filename;
    } else {
        $result['path'] = $name;
    }
    if (!file_move($file['tmp_name'], $name)) {
        die(json_encode('保存上传文件失败'));
    }
    $result['success'] = true;
    return $result;
}

function is_error($data) {
    if (empty($data) || !is_array($data) || !array_key_exists('errno', $data) || (array_key_exists('errno', $data) && $data['errno'] == 0)) {
        return false;
    } else {
        return true;
    }
}

function file_move($filename, $dest) {
    global $_W;

    mkdirs(dirname($dest));
    if (is_uploaded_file($filename)) {
        move_uploaded_file($filename, $dest);
    } else {
        rename($filename, $dest);
    }
    @chmod($filename, $_W['config']['setting']['filemode']);
    return is_file($dest);
}
function column_str($key)
{
    $array = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ');
    return $array[$key];
}
function column($key, $columnnum = 1)
{
    return column_str($key) . $columnnum;
}
function export($list, $params = array(),$model)
{
    require_once 'PHPExcel.php';
    $excel = new PHPExcel();

    $excel->getProperties()->setCreator($model)->setLastModifiedBy($model)->setTitle("Office 2007 XLSX Test Document")->setSubject("Office 2007 XLSX Test Document")->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")->setKeywords("office 2007 openxml php")->setCategory("report file");

    $sheet = $excel->setActiveSheetIndex(0);
    $rownum = 1;
    foreach ($params['columns'] as $key => $column) {
        $sheet->setCellValue(column($key, $rownum), $column['title']);
        if (!empty($column['width'])) {
            $sheet->getColumnDimension(column_str($key))->setWidth($column['width']);
        }
    }
    $rownum++;

    foreach ($list as $row) {
        $len = count($row);
        for ($i = 0; $i < $len; $i++) {
            $value = $row[$params['columns'][$i]['field']];
            $sheet->setCellValue(column($i, $rownum), $value);
        }
        $rownum++;
    }

    $excel->getActiveSheet()->setTitle($params['title']);
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $params['title'] . '-' . date('Y-m-d H:i', time()) . '.xlsx"');
    header('Cache-Control: max-age=0');
    $writer = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
    $writer->save('php://output');
    die;
}

function pagination($total, $pageIndex, $pageSize = 15, $url = '', $context = array('before' => 5, 'after' => 4, 'ajaxcallback' => '')) {
    $pdata = array(
        'tcount' => 0,
        'tpage' => 0,
        'cindex' => 0,
        'findex' => 0,
        'pindex' => 0,
        'nindex' => 0,
        'lindex' => 0,
        'options' => ''
    );
    if ($context['ajaxcallback']) {
        $context['isajax'] = true;
    }else{
        $context['isajax'] = false;
    }

    $pdata['tcount'] = $total;
    $pdata['tpage'] = ceil($total / $pageSize);
    if ($pdata['tpage'] <= 1) {
        return '';
    }
    $cindex = $pageIndex;
    $cindex = min($cindex, $pdata['tpage']);
    $cindex = max($cindex, 1);
    $pdata['cindex'] = $cindex;
    $pdata['findex'] = 1;
    $pdata['pindex'] = $cindex > 1 ? $cindex - 1 : 1;
    $pdata['nindex'] = $cindex < $pdata['tpage'] ? $cindex + 1 : $pdata['tpage'];
    $pdata['lindex'] = $pdata['tpage'];

    if ($context['isajax']) {

        if (!$url) {
            $url = Request::instance()->action(). 'html';
        }

        $pdata['faa'] = 'href="javascript:;" page="' . $pdata['findex'] . '" '. (!empty($callbackfunc) ? 'onclick="'.$callbackfunc.'(\'' . $url . '\', \'' . $pdata['findex'] . '\', this);return false;"' : '');
        $pdata['paa'] = 'href="javascript:;" page="' . $pdata['pindex'] . '" '. (!empty($callbackfunc) ? 'onclick="'.$callbackfunc.'(\'' . $url . '\', \'' . $pdata['pindex'] . '\', this);return false;"' : '');
        $pdata['naa'] = 'href="javascript:;" page="' . $pdata['nindex'] . '" '. (!empty($callbackfunc) ? 'onclick="'.$callbackfunc.'(\'' . $url . '\', \'' . $pdata['nindex'] . '\', this);return false;"' : '');
        $pdata['laa'] = 'href="javascript:;" page="' . $pdata['lindex'] . '" '. (!empty($callbackfunc) ? 'onclick="'.$callbackfunc.'(\'' . $url . '\', \'' . $pdata['lindex'] . '\', this);return false;"' : '');
    } else {

        if ($url) {
            $pdata['faa'] = 'href="?' . str_replace('*', $pdata['findex'], $url) . '"';
            $pdata['paa'] = 'href="?' . str_replace('*', $pdata['pindex'], $url) . '"';
            $pdata['naa'] = 'href="?' . str_replace('*', $pdata['nindex'], $url) . '"';
            $pdata['laa'] = 'href="?' . str_replace('*', $pdata['lindex'], $url) . '"';
        } else {
            $_GET['page'] = $pdata['findex'];
            $pdata['faa'] = 'href="?' . http_build_query($_GET) . '"';
            $_GET['page'] = $pdata['pindex'];
            $pdata['paa'] = 'href="?' . http_build_query($_GET) . '"';
            $_GET['page'] = $pdata['nindex'];
            $pdata['naa'] = 'href="?' . http_build_query($_GET) . '"';
            $_GET['page'] = $pdata['lindex'];
            $pdata['laa'] = 'href="?' . http_build_query($_GET) . '"';
        }
    }

    $html = '<div><ul class="pagination pagination-centered">';
    if ($pdata['cindex'] > 1) {
        $html .= "<li><a {$pdata['faa']} class=\"pager-nav\">首页</a></li>";
        $html .= "<li><a {$pdata['paa']} class=\"pager-nav\">&laquo;上一页</a></li>";
    }
    if (!$context['before'] && $context['before'] != 0) {
        $context['before'] = 5;
    }
    if (!$context['after'] && $context['after'] != 0) {
        $context['after'] = 4;
    }

    if ($context['after'] != 0 && $context['before'] != 0) {
        $range = array();
        $range['start'] = max(1, $pdata['cindex'] - $context['before']);
        $range['end'] = min($pdata['tpage'], $pdata['cindex'] + $context['after']);
        if ($range['end'] - $range['start'] < $context['before'] + $context['after']) {
            $range['end'] = min($pdata['tpage'], $range['start'] + $context['before'] + $context['after']);
            $range['start'] = max(1, $range['end'] - $context['before'] - $context['after']);
        }
        for ($i = $range['start']; $i <= $range['end']; $i++) {
            if ($context['isajax']) {
                $aa = 'href="javascript:;" page="' . $i . '" '. (!empty($callbackfunc) ? 'onclick="'.$callbackfunc.'(\'' . $url . '\', \'' . $i . '\', this);return false;"' : '');
            } else {
                if ($url) {
                    $aa = 'href="?' . str_replace('*', $i, $url) . '"';
                } else {
                    $_GET['page'] = $i;
                    $aa = 'href="?' . http_build_query($_GET) . '"';
                }
            }
            $html .= ($i == $pdata['cindex'] ? '<li class="active"><a href="javascript:;">' . $i . '</a></li>' : "<li><a {$aa}>" . $i . '</a></li>');
        }
    }

    if ($pdata['cindex'] < $pdata['tpage']) {
        $html .= "<li><a {$pdata['naa']} class=\"pager-nav\">下一页&raquo;</a></li>";
        $html .= "<li><a {$pdata['laa']} class=\"pager-nav\">尾页</a></li>";
    }
    $html .= '</ul></div>';
    return $html;
}