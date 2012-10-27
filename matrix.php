<?php
    include('php/header.php');
    include('php/getData_Test.php');

?>

<script> 
    var uri = '<?php echo $uri ?>';
    console.log(uri);  
    var data = '<?php echo $data_js ?>';
    console.log(data);  
    var data = JSON.parse('<?php echo $data_js ?>');
    console.log(data);  
    console.log(data[0]);  
    console.log(data[1]);  

    var cats = data[0].MATRIX_CATS.split(",")
    var items = data[0].MATRIX_ITEMS.split(",")
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
        
    </div>


<?php include('php/footer.php'); ?>

