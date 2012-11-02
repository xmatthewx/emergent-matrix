<?php 

// load data
$data = array();

//Query to retreive information about all the matrices created to date
$result = mysql_query("SELECT MATRIX_ID, MATRIX_URI, MATRIX_CATS, MATRIX_ITEMS, MATRIX_TITLE FROM MATRIX");
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$data[]= array(
			'MATRIX_ID'=>$row['MATRIX_ID'],
			'MATRIX_URI'=>$row['MATRIX_URI'],
			'MATRIX_CATS'=>$row['MATRIX_CATS'],
			'MATRIX_ITEMS'=>$row['MATRIX_ITEMS'],
			'MATRIX_TITLE'=>$row['MATRIX_TITLE']
	);
}

echo json_encode($data); 


?>