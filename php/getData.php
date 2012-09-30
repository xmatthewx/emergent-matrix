<?php
include "config.php";

$item_id=$_GET['item_id'];
$item_data = array();

$result = mysql_query("SELECT ITEM_ID,ITEM_CONTENT,ITEM_MEAN_X,ITEM_MEAN_Y,ITEM_COUNT FROM ITEMS");
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	$item_data[]= array(
			'ITEM_ID' => $row['ITEM_ID'],
			'ITEM_CONTENT' => $row['ITEM_CONTENT'],
			'ITEM_MEAN_X' => $row['ITEM_MEAN_X'],
			'ITEM_MEAN_Y' => $row['ITEM_MEAN_Y'],
			'ITEM_COUNT' => $row['ITEM_COUNT']
	);
}

echo json_encode($item_data);

/* The JSON Object is:

[
{ "ITEM_ID":"1","ITEM_MEAN_X":"100","ITEM_MEAN_Y":"200"} ETC
]

*/
/*
to access this data in javascript
$.getJSON('http://localhost/emergent-matrix/php/getData.php', function(data) {
            data will hold the php array as a javascript object 
            $.each(data, function(key, val) { 
            	
            	 // write html
                $('#thecanvas').append( 
                    '<div id="i_'+ val.ITEM_ID +'" class="btn '+ val.ITEM_COUNT +'" style="left:'+val.ITEM_MEAN_X+'px; top:'+val.ITEM_MEAN_Y+'px;" >'
                        +'<heading>'
                            + val.ITEM_CONTENT
                        +'</heading>' 
                        +'<section class="details" >'
                            +'<p>id: '+ val.ITEM_ID +'<br>'
                            +'count: ' + val.ITEM_COUNT +'<br>'
                            +'avg x: ' + val.ITEM_MEAN_X +'<br> '
                            +'avg y: ' + val.ITEM_MEAN_Y +'</p>'
                        +'</section>'
                    +'</li>'
                );
            });
    });
}
*/
?>