
<?php
$data = "";
if(isset($_REQUEST['this']) && !empty($_REQUEST['this'])) {
	$data = $_REQUEST['this'];
    if ($data['type'] == "youtube"){
        addSongList($data['id'],$data['type']);
    }
    if ($data['type'] == "soundcloud"){
        addSongList($data['id'],$data['type'],$data["title"]);
    }
	
}


function addSongList($id, $source,$title="from youtube") {
    $file = file_get_contents('playlist.json', true);
    $data = json_decode($file,true);
    unset($file);
    
    // //you need to add new data as next index of data.
    $data['tracks'][] = array('id' => $id, 'type' => $source, 'title'=> $title);
    $result=json_encode($data);
    file_put_contents('playlist.json', $result);
    unset($result);
}


?>

