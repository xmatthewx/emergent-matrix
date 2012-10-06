<?php
include "config.php";

/*
 * checkMatrixURI()
 * returns 1 if URI already exists MATRIX table
 * return 0 if URI does not exist in the MATRIX table
 */
function checkMatrixURI($matrixURI)
{

	$result = mysql_query("select COUNT(*) from MATRIX where MATRIX_URI=$matrixURI");
	$count=mysql_fetch_row($result);
	return $count;
}

$matrixURI=$_GET['matrixURI'];
$uriAlreadyExists=checkMatrixURI($matrixURI);

// encode array $json to JSON string
echo json_encode($uriAlreadyExists);

?>
