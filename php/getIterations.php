<?php 
    header('Access-Control-Allow-Origin: *');

    // does URL have /?uri
    if(empty( $_GET['id'] )) {
        die();        
    }
    include "config.php";

    // grab ID of the item belonging to a particular matrix
    $id = $_GET['id']; // matrix uri

    // load data
    $data = array();

    $result=mysql_query("SELECT ID, ITEM_X, ITEM_Y FROM ITEM_ITERATIONS WHERE ID='$id'");

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data[]= array(
    			'ID'=>$row['ID'],
    			'ITEM_X'=>$row['ITEM_X'],
    			'ITEM_Y'=>$row['ITEM_Y'],
    	);
    }
    
    echo json_encode($data); // return ajax

?>