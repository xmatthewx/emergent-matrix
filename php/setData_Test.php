<?php
include "config.php";

/*
 * selectData()
 * return the current row data associated with a particular ItemId from the ITEMS table
 */
function selectData($newIteration)
{
	$key=$newIteration->KEY;
	$result = mysql_query("SELECT ITEM_MEAN_X,ITEM_MEAN_Y,ITEM_COUNT FROM ITEMS WHERE ITEM_ID=$itemId");	
	if (!$result) {
		echo 'Could not run query: ' . mysql_error();
		exit;
	}	
	$row = mysql_fetch_row($result);	
	return $row;	
}

/*
 * calculateNewMeans()
 * uses the current row data for an Item from the ITEMS table and the new position selected by the user to calculate 
 * the new means and the new count
 * returns the calculated data
 */
function calculateNewMeans($newIteration,$currentRecord)
{
	$itemId=$newIteration->ITEM_ID;
	$itemX=$newIteration->ITEM_X;
	$itemY=$newIteration->ITEM_Y;

	//calculate new mean
	$newCount = $currentRecord[2] + 1;
	$newMeanX = ( ( $currentRecord[0] * $currentRecord[2] ) + $itemX ) / $newCount;
	$newMeanY = ( ( $currentRecord[1]* $currentRecord[2] ) + $itemY ) /$newCount;
	
	$newRecord=array($itemId,$itemX,$itemY,$newCount,$newMeanX,$newMeanY);	
	return $newRecord;
}


/*
 * inserts a new record into the ITEM_ITERATIONS table
 */
function insertData($newRecord)
{
	$itemId=$newRecord[0];
	$itemX=$newRecord[1];
	$itemY=$newRecord[2];
	$itemCount=$newRecord[3];
	$itemMeanX=$newRecord[4];
	$itemMeanY=$newRecord[5];
	
	$sql_insert= "insert into ITEM_ITERATIONS(ITEM_ID,ITEM_X,ITEM_Y,ITEM_MEAN_X,ITEM_MEAN_Y)
	VALUES($itemId,$itemX,$itemY,$itemMeanX,$itemMeanY)";
	mysql_query($sql_insert);
	mysql_query("COMMIT");
}

/*
 * updates the ITEMS table with the calculated means 
*/
function updateData($newRecord)
{
	$itemId=$newRecord[0];
	$itemX=$newRecord[1];
	$itemY=$newRecord[2];
	$itemCount=$newRecord[3];
	$itemMeanX=$newRecord[4];
	$itemMeanY=$newRecord[5];
	
	$sql_update="update ITEMS set ITEM_COUNT=$itemCount, ITEM_MEAN_X=$itemMeanX, ITEM_MEAN_Y=$itemMeanY WHERE ITEM_ID=$itemId";
	mysql_query($sql_update);
	mysql_query("COMMIT");
}


$string=str_replace ('\"','"', $_GET['json']);

$newIteration = json_decode($string);
$currentRecord=selectData($newIteration);

if($currentRecord)
{
	
$newRecord=calculateNewMeans($newIteration, $currentRecord);
insertData($newRecord);
updateData($newRecord);

}

// create response object
$json = array();
$json['item_information'] = $newRecord;
 
// encode array $json to JSON string
$encoded = json_encode($json);
 
// send response back to index.html
// and end script execution
die($encoded);

?>
