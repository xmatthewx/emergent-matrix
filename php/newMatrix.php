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
    insertMatrixData($matrixData);
    
    //If matrix data and item data have been inserted successfully, redirect to following url
    header("Location: http://www.ideapublic.org/matrix/matrix.php?id=".$matrixData[matrixUri]); /* Redirect browser */
}


/*
 * inserts a new record into the MATRIX table
 */
function insertMatrixData($matrixData) {
	//echo being commented because weirdly, this gives a problem when using header("") in a php file.
   	//echo 'insert data';
    
    $sql_insert= "insert into MATRIX(MATRIX_URI,MATRIX_CATS,MATRIX_ITEMS,MATRIX_TITLE)
	VALUES('$matrixData[matrixUri]','$matrixData[matrixCategories]','$matrixData[matrixItems]','$matrixData[matrixTitle]')";
    
	$result = mysql_query($sql_insert);
    if (!$result) {
        die('Invalid query: ' . mysql_error());
    }

	$result2 = mysql_query("COMMIT");
	if ($result == 1) { 
		//If matrix data has been inserted successfully, insert item data
	    insertItemData();
	    
	    }
    if ($result2 != 1) {
        die('Invalid commit: ' . mysql_error());
    }
    
}
/*
 * inserts new records into the ITEM table
*/
function insertItemData() {

	$matrixItems = $_POST["MATRIX_ITEMS"];

	//Removing blank items from the array
	$blank_items = array_keys($matrixItems,"");
	foreach ($blank_items as $b)
		unset($matrixItems[$b]);
	
	//fetch latest matrix id
	$lastMatrixId=mysql_fetch_array(mysql_query("SELECT MAX(MATRIX_ID) FROM MATRIX"));
	$matrixId=$lastMatrixId[0];
	
	$itemId = 0;
	foreach ($matrixItems as $eachItem) {
		
		//fetch latest item id
		// $lastItemId=mysql_fetch_array(mysql_query("SELECT MAX(ITEM_ID) FROM ITEMS"));		
		// $itemId=$lastItemId[0]+1;
		
		$sql_insert= "insert into ITEMS(ITEM_ID, MATRIX_ID, ITEM_CONTENT)
		VALUES('$itemId','$matrixId','$eachItem')";

		$result = mysql_query($sql_insert);
		if (!$result) {
			die('Invalid query: ' . mysql_error());
		}
		$result2 = mysql_query("COMMIT");

		if ($result == 1) {
			//echo 'success!';
			$itemId += 1;
		}
		if ($result2 != 1) {
			die('Invalid commit: ' . mysql_error());
		}
	}
}

?>
