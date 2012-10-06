<?php
include "config.php";

/*
 * inserts a new record into the MATRIX table
 */
function insertData($newMatrix)
{
	$matrixUri=$newMatrix->MATRIX_URI;
	$matrixCategories=$newMatrix->MATRIX_CATS;
	$matrixTitle=$newMatrix->MATRIX_TITLE;

	
	$sql_insert= "insert into MATRIX(MATRIX_URI,MATRIX_CATS,MATRIX_TITLE)
	VALUES($matrixUri,$matrixCategories,$matrixTitle)";
	mysql_query($sql_insert);
	mysql_query("COMMIT");
}


$string=str_replace ('\"','"', $_GET['matrix']);

$newMatrix = json_decode($string);
insertData($newMatrix);

// create response object
$json = array();
$json['matrix_info'] = $string;
 
// encode array $json to JSON string
$encoded = json_encode($json);
 
// send response back to index.html
// and end script execution
die($encoded);

?>
