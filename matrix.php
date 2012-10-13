<?php
    include('php/header.php');

    // no uri?
    if(empty( $_GET['id'] )) {
        echo '<div class="alert"><strong>Hello</strong>. Make your <a href="" >own matrix</a> or visit one of the others.</div>';
        include('php/footer.php');
        die();        
    }

    // grab uri
    $uri = $_GET['id']; // written to JS console below

    // load data
    $data = array();
    $result = mysql_query("SELECT MATRIX_ID,MATRIX_URI,MATRIX_CATS,MATRIX_ITEMS,MATRIX_TITLE FROM MATRIX WHERE MATRIX_URI ='".$uri."'");
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$data= array(
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
    console.log(data.MATRIX_CATS);  
    
    var cats = data.MATRIX_CATS.split(",")
    console.log(cats);
    
    $('#north').text(cats[0]);
    $('#east').text(cats[1]);
    $('#south').text(cats[2]);
    $('#wesrt').text(cats[3]);
    
</script>

    <h1><?php echo $uri; ?></h1>

    <!-- magic happens here -->
    <div id="thecanvas" class="">
    </div>

    <div id="north" class="label" >technology</div>
    <div id="east" class="label" >design</div>
    <div id="south" class="label" >theory</div>
    <div id="west" class="label" >fine art</div>

<?php include('php/footer.php'); ?>

