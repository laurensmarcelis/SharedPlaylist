<?php
    $file = file_get_contents('playlist.json', true);
    $data = json_decode($file,true);
    unset($file);
    $result=json_encode($data);
    echo $result;

?>