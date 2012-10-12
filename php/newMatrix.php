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


// $theuri = $_SERVER['REQUEST_URI'];
// echo $theuri;


$matrixUri = $_POST["MATRIX_URI"];
$matrixTitle = $_POST["MATRIX_TITLE"];
$matrixCategories = $_POST["MATRIX_CATS"]; // an array 
$matrixCategories = implode(",", $matrixCategories); // as string 
$matrixItems = $_POST["MATRIX_ITEMS"];
$matrixItems = implode(",", $matrixItems);

/* 
 * We need to remove blank MATRIX ITEMS
 * (not sure that i can do it on the front end)
 * Something like this:
 
    array_filter($_POST['MATRIX_ITEMS'],"remove_empty")
    function remove_empty($val) {
        if ($val==="") {
            // array_splice(array,start,length,array)
        };
        return false;
    };

*/


// avoid spam!!
if ( $_POST["TEST2"] ) { // kill the operation!
    $spammer = true; 
    } 
else {
    insertData();
}


/*
 * inserts a new record into the MATRIX table
 */
function insertData() {
    echo 'insert data';
	$sql_insert= "insert into MATRIX(MATRIX_URI,MATRIX_TITLE)
	VALUES('$matrixUri','$matrixTitle')";
	$result = mysql_query($sql_insert);
    if (!$result) {
        die('Invalid query: ' . mysql_error());
    }
	mysql_query("COMMIT");
	
	
}

// if the insert goes ok,
// i think we just want to redirect user to 
// "site.com/".$matrixUri
// then we need to make a template that knows what to do with that uri


header("Location: http://www.google.com/"); /* Redirect browser */

/* Make sure that code below does not get executed when we redirect. */
exit;

// send response back to index.html
// and end script execution
die($matrixUri);


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
