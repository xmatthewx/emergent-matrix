<?php
    include('php/header.php');
    include('php/getData.php');
?>

<script> 
    var uri = '<?php echo $uri ?>';
    console.log(uri);  
    var data = '<?php echo $data_js ?>';
    var data = JSON.parse('<?php echo $data_js ?>');
    console.log(data);  

    var cats = data[0].MATRIX_CATS.split(",")

    itemslist = [];
    for ( i=0; i < data.length; i++ ) {

        itemslist.push( {
            key:data[i].ID,
            id:data[i].ITEM_ID,
            content:data[i].ITEM_CONTENT,
            mean_x:data[i].ITEM_MEAN_X,
            mean_y:data[i].ITEM_MEAN_Y,
            count:data[i].ITEM_COUNT
        })
    }
    console.log(itemslist);    
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
        
    </div>


<?php include('php/footer.php'); ?>

