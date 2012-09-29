<?php
include "config.php";


$iterations = array();

$result = mysql_query("SELECT ITEM_ID,ITEM_MEAN_X,ITEM_MEAN_Y FROM ITEM_ITERATIONS");
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $iterations[]= array(
    	'ITEM_ID' => $row['ITEM_ID'],
        'ITEM_MEAN_X' => $row['ITEM_MEAN_X'], 
        'ITEM_MEAN_Y' => $row['ITEM_MEAN_Y']
    );
}
echo '{"iterations":'.json_encode($iterations).'}';

/* The JSON Object is:

{"iterations":
[
{ "ITEM_ID":"1","ITEM_MEAN_X":"100","ITEM_MEAN_Y":"200"},
{ "ITEM_ID":"2","ITEM_MEAN_X":"200","ITEM_MEAN_Y":"200"}
]
}
*/
