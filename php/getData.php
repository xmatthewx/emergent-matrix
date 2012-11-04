<?php 
    // does URL have /?uri
    if(empty( $_GET['id'] )) {        
        echo '<div class="alert"><strong>Hello</strong>. Make your <a href="new.html" >own matrix</a> or visit one of the others.</div>';
        include('php/getMatrices.php');
        include('php/footer.php');
        die();        
    }

    // grab vars
    $uri = $_GET['id']; // matrix uri
    $update = $_GET['update']; // true if sent via ajax api

    if( $update == 'true' ) { include "config.php"; }

    // load data
    $data = array();

    //Joint Query of ITEMS AND MATRIX TABLE to fetch all the required,relevant data in one query
    $result = mysql_query("SELECT ITEMS.ID,ITEMS.ITEM_ID,ITEMS.ITEM_CONTENT,ITEMS.ITEM_MEAN_X,ITEMS.ITEM_MEAN_Y,ITEMS.ITEM_COUNT,MATRIX.MATRIX_ID,MATRIX.MATRIX_URI,MATRIX.MATRIX_CATS,MATRIX.MATRIX_ITEMS,MATRIX.MATRIX_TITLE FROM ITEMS,MATRIX WHERE ITEMS.MATRIX_ID=MATRIX.MATRIX_ID AND MATRIX.MATRIX_URI='$uri'");
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data[]= array(
    			'ID'=>$row['ID'],
    			'ITEM_ID'=>$row['ITEM_ID'],
    			'ITEM_CONTENT'=>$row['ITEM_CONTENT'],
    			'ITEM_MEAN_X'=>$row['ITEM_MEAN_X'],
    			'ITEM_MEAN_Y'=>$row['ITEM_MEAN_Y'],
    			'ITEM_COUNT'=>$row['ITEM_COUNT'],
    			'MATRIX_ID' => $row['MATRIX_ID'],
    			'MATRIX_URI' => $row['MATRIX_URI'],
    			'MATRIX_CATS' => $row['MATRIX_CATS'],
    			'MATRIX_ITEMS' => $row['MATRIX_ITEMS'],
    			'MATRIX_TITLE' => $row['MATRIX_TITLE']
    	);
    }
    
    if ( $update == 'true' ) {
        echo json_encode($data); // return ajax
    }
    else {  
        $data_js= json_encode($data); // init data
    }

?>