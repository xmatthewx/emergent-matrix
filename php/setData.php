<?php
include "config.php";

// decode JSON string to PHP object

$new_iteration = json_decode($_GET['json']);
$sql_insert= "insert into ITEM_ITERATIONS(ITEM_ID,ITEM_X,ITEM_Y)
		 VALUES($new_iteration->ITEM_ID,$new_iteration->ITEM_X,$new_iteration->ITEM_Y)";

mysql_query($sql_insert);

//Validation required
// create response object
$json = array();
$json['errorsNum'] = 2;
$json['error'] = array();
$json['error'][] = 'Failure';
 
// encode array $json to JSON string
$encoded = json_encode($json);
 
// send response back to index.html
// and end script execution
die($encoded);
?>
