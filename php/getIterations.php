<?php 
    // does URL have /?uri
    if(empty( $_GET['id'] )) {
        die();        
    }
    include "config.php";

    // grab vars
    $uri = $_GET['id']; // matrix uri
    $item = $_GET['item']; // matrix uri

    // load data
    $data = array();

    //Joint Query of ITEMS AND MATRIX TABLE to fetch all the required,relevant data in one query
    $result = mysql_query("SELECT ITEMS.ID,ITEMS.ITEM_ID,ITEMS.ITEM_COUNT,MATRIX.MATRIX_ID,MATRIX.MATRIX_URI FROM ITEMS,MATRIX,ITEMS_ITERATIONS WHERE ITEMS_ITERATIONS.ITEM_ID = ITEMS.ITEM_ID AND ITEMS.ITEM_ID = '$item' AND ITEMS.MATRIX_ID=MATRIX.MATRIX_ID AND MATRIX.MATRIX_URI='$uri'");
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data[]= array(
    			'ITEM_ID'=>$row['ITEM_ID'],
    			'ITEM_X'=>$row['ITEM_X'],
    			'ITEM_Y'=>$row['ITEM_Y'],
    			'ITEM_COUNT'=>$row['ITEM_COUNT'],
    			'MATRIX_ID' => $row['MATRIX_ID'],
    			'MATRIX_URI' => $row['MATRIX_URI']
    	);
    }
    
        echo json_encode($data); // return ajax

?>