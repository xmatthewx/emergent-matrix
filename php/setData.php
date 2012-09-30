<?php
include "config.php";

$string=str_replace ('\"','"', $_GET['json']);
$new_iteration = json_decode($string);

$item_id=$new_iteration->ITEM_ID;
$item_x=$new_iteration->ITEM_X;
$item_y=$new_iteration->ITEM_Y;

$result = mysql_query("SELECT ITEM_MEAN_X,ITEM_MEAN_Y,ITEM_COUNT FROM ITEMS WHERE ITEM_ID=$new_iteration->ITEM_ID");

if (!$result) {
	echo 'Could not run query: ' . mysql_error();
	exit;
}

$row = mysql_fetch_row($result);

//calculate new mean
$new_count = $row[2] + 1;
$new_mean_x = ( ( $row[0] * $row[2] ) + $item_x ) / $new_count;
$new_mean_y = ( ( $row[1]* $row[2] ) + $item_y ) /$new_count;

$sql_insert= "insert into ITEM_ITERATIONS(ITEM_ID,ITEM_X,ITEM_Y,ITEM_MEAN_X,ITEM_MEAN_Y)
		 VALUES($item_id,$item_x,$item_y,$new_mean_x,$new_mean_y)";

mysql_query($sql_insert);

$sql_update="update ITEMS set ITEM_COUNT=$new_count, ITEM_MEAN_X=$new_mean_x, ITEM_MEAN_Y=$new_mean_y WHERE ITEM_ID=$item_id";

mysql_query($sql_update);

// create response object
$json = array();
$json['item_information'] = $string;
 
// encode array $json to JSON string
$encoded = json_encode($json);
 
// send response back to index.html
// and end script execution
die($encoded);

?>
