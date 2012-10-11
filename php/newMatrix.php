<?php
include "config.php";

/*
    Form delivers $_POST
    Contains:
        MATRIX_TITLE
        MATRIX_URI
        MATRIX_CATS[] // clockwise N, S, E, W
        MATRIX_ITEMS[] // up to 15
        TEST2 // only gets delivered if TRUE. evidence of SPAM!
*/


$theuri = $_SERVER['REQUEST_URI'];
echo $theuri;


$matrixUri = $_POST["MATRIX_URI"];
$matrixTitle = $_POST["MATRIX_TITLE"];
$matrixCategories = $_POST["MATRIX_CATS"]; // an array 
$matrixCategories = implode(",", $matrixCategories); // as string 
$matrixItems = $_POST["MATRIX_ITEMS"];

//Removing blank items from the array
$blank_items = array_keys($matrixItems,"");
foreach ($blank_items as $b)
unset($matrixItems[$b]);

$matrixItems = implode(",", $matrixItems);

//store the form data in an array
$matrixData=array("matrixUri"=>$matrixUri,"matrixCategories"=>$matrixCategories,"matrixItems"=>$matrixItems,"matrixTitle"=>$matrixTitle);


// avoid spam!!
if ( $_POST["TEST2"] ) { // kill the operation!
    $spammer = true; 
    } 
else {
    insertData($matrixData);
}


/*
 * inserts a new record into the MATRIX table
 */
function insertData($matrixData) {
	$sql_insert= "insert into MATRIX(MATRIX_URI,MATRIX_CATS,MATRIX_ITEMS,MATRIX_TITLE)
	VALUES('$matrixData[matrixUri]','$matrixData[matrixCategories]','$matrixData[matrixItems]','$matrixData[matrixTitle]')";
	mysql_query($sql_insert);
	mysql_query("COMMIT");
}

// if the insert goes ok,
// i think we just want to redirect user to 
// "site.com/".$matrixUri
// then we need to make a template that knows what to do with that uri


// create response object
$json = array();
$json['matrix_info'] = $string;

// encode array $json to JSON string
$encoded = json_encode($json);
 
// send response back to index.html
// and end script execution
die($encoded);


/*
 * how to display data for debugging:
 *
echo $_POST['MATRIX_TITLE'].'<br>';
echo $_POST['MATRIX_URI'].'<br>';

foreach( $_POST['MATRIX_CATS'] as $cat ) { 
    echo $cat."<br>";
    };
echo '<br>***************<br>';

foreach( $_POST['MATRIX_ITEMS'] as $item ) { 
    echo $item."<br>";
    };
echo '<br>***************<br>';
*/



?>
