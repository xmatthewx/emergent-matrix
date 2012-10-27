<?php
    include('php/header.php');

    // does URL have /?uri
    if(empty( $_GET['id'] )) {
        echo '<div class="alert"><strong>Hello</strong>. Make your <a href="" >own matrix</a> or visit one of the others.</div>';
        include('php/footer.php');
        die();        
    }

    // grab uri
    $uri = $_GET['id']; // written to JS console below

    // load data
    $data = array();
    
    //Joint Query of ITEMS AND MATRIX TABLE to fetch all the required,relevant data in one query
    $result = mysql_query("SELECT ITEMS.ID,ITEMS.ITEM_ID,ITEMS.ITEM_CONTENT,ITEMS.ITEM_MEAN_X,ITEMS.ITEM_MEAN_Y,ITEMS.ITEM_COUNT,MATRIX.MATRIX_ID,MATRIX.MATRIX_URI,MATRIX.MATRIX_CATS,MATRIX.MATRIX_ITEMS,MATRIX.MATRIX_TITLE FROM ITEMS,MATRIX WHERE ITEMS.MATRIX_ID=MATRIX.MATRIX_ID AND MATRIX.MATRIX_URI='".$uri."'");
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data= array(
    			'ID'=>$row['ID'],
    			'ITEM_ID'=>$row['ITEM_ID'],
    			'ITEM_CONTENT'=>$row['ITEM_CONTENT'],
    			'ITEM_MEAN_X'=>$row['ITEM_MEAN_X'],
    			'ITEM_MEAN_Y'=>$row['ITEM_MEAN_Y'],
    			'ITEM_COUNT'=>$row['ITEM_COUNT'],
    			'MATRIX_ID' => $row['MATRIX_ID'],
    			'MATRIX_URI' => $row['MATRIX_URI'],
    			'MATRIX_CATS' => $row['MATRIX_CATS'],
    			'MATRIX_ITEMS' => $row['MATRIX_ITEMS'],
    			'MATRIX_TITLE' => $row['MATRIX_TITLE']
    	);
    }
    
    $js_data = json_encode($data);

?>

<script> 
    var uri = '<?php echo $uri ?>';
    var data = JSON.parse('<?php echo $js_data ?>');
    console.log(uri);  
    console.log(data);  

    var cats = data.MATRIX_CATS.split(",")
    var items = data.MATRIX_ITEMS.split(",")
    console.log("items");
    console.log(items);

    itemslist = [];
    for ( i=0; i < items.length; i++ ) {
        itemslist.push( {
              id:i,
              content:items[i],
              mean_x:50,
              mean_y:50,
              count:0
        })
    }
    itemslist = JSON.stringify(itemslist);
    localStorage.setItem(uri,itemslist);


$(window).load(function () {
    $('.container').append('<div id="north" class="label" >north</div><div id="east" class="label" >east</div><div id="south" class="label" >south</div><div id="west" class="label" >west</div>');
    $('#north').text(cats[0]);
    $('#east').text(cats[1]);
    $('#south').text(cats[2]);
    $('#west').text(cats[3]);
    responsive();
        
});
    
</script>

    <h1><?php echo $uri; ?></h1>

    <!-- magic happens here -->
    <div id="thecanvas" class="">
        
        
        <?php
        
           // foreach items 
        
        ?>
        
        <!-- 
        <div id="i_'+ item.id +'" class="swarm i_'+item.id+' c'+ item.count +'" style="left:'+item.mean_x+'%; top:'+item.mean_y+'%;" >'
                +'<header>'
                    + item.content
                +'</header>' 
                +'<section class="details" >'
                    +'<p>' + item.count +' inputs</p>'
                +'</section>'
                +'<span class="anchor"></span>'
            +'</div>'
        -->
        
        
    </div>


<?php include('php/footer.php'); ?>

