<?php
    include('php/header.php');
    include('php/getData.php');
?>

<script> 
    var uri = '<?php echo $uri ?>';
    console.log(uri);  
    var data = '<?php echo $data_js ?>';
    var data = JSON.parse('<?php echo $data_js ?>');
    // console.log(data); 
</script>

<h1><?php echo $uri; ?></h1>

<!-- magic happens here -->
<div id="thecanvas" class="">
    
</div>


<?php include('php/footer.php'); ?>

