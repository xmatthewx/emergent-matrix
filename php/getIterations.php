<?php 
    // does URL have /?uri
    if(empty( $_GET['id'] )) {
        die();        
    }
    include "config.php";

    // grab ID of the item belonging to a particular matrix
    $id = $_GET['id']; // matrix uri

    // load data
    $data = array();

    $result=mysql_query("SELECT ID, ITEM_ID, ITEM_X, ITEM_Y, ITEM_MEAN_X, ITEM_MEAN_Y FROM ITEM_ITERATIONS WHERE ID='$id'");

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data[]= array(
    			'ID'=>$row['ID'],
    			'ITEM_ID'=>$row['ITEM_ID'],
    			'ITEM_X'=>$row['ITEM_X'],
    			'ITEM_Y'=>$row['ITEM_Y'],
    			'ITEM_MEAN_X'=>$row['ITEM_MEAN_X'],
    			'ITEM_MEAN_Y' => $row['ITEM_MEAN_Y']
    	);
    }
    
    echo json_encode($data); // return ajax

?>