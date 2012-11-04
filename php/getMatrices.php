<?php 

// load data
$matrices = array();

//Query to retreive information about all the matrices created to date
$result = mysql_query("SELECT MATRIX_ID, MATRIX_URI, MATRIX_CATS, MATRIX_ITEMS, MATRIX_TITLE FROM MATRIX");
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$matrices[]= array(
			'MATRIX_ID'=>$row['MATRIX_ID'],
			'MATRIX_URI'=>$row['MATRIX_URI'],
			'MATRIX_CATS'=>$row['MATRIX_CATS'],
			'MATRIX_ITEMS'=>$row['MATRIX_ITEMS'],
			'MATRIX_TITLE'=>$row['MATRIX_TITLE']
	);
}

// echo json_encode($matrices); // api 
// $matrices_js= json_encode($matrices); // init data

echo '<ul>';

foreach ($matrices as $matrix){
    echo '<li><a href="/matrix/?id='.$matrix["MATRIX_URI"].'" >'.$matrix["MATRIX_TITLE"].'</a></li>';
}

echo '</ul>';

/*
<script> 
    var matrices = '<?php echo $matrices_js ?>';
    var matrices = JSON.parse('<?php echo $matrices_js ?>');
    // console.log(matrices);     
</script>
*/

?>

