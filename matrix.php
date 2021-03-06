<?php
    //
    // test experimental features in matrix.php
    // use index.php for live users
    //
    // test: http://www.ideapublic.org/matrix/matrix.php?id=testing
    // test: matrix_test.js
    //
    // live: http://www.ideapublic.org/matrix/?id=testing
    // live: matrix.js
    //
    //
    // to migrate:
    // - copy matrix.php to index.php
    // - replace inline header
    // - with include('php/header.php');
    // - see below
    //
    //
    //
    //
     

include "php/config.php"; ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>matrix</title>
        <meta name="description" content="Music Mosaic">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.1.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.0.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>

    	<script type="text/javascript" src="js/vendor/jquery-ui-1.8.23.custom.min.js"></script>

            <script src="js/matrix_test.js"></script>

    </head>
    <body>
        <!--[if lt IE 7]>
        <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

        <div class="container">

<?php
    //
    // end header.php
    // delete everything above
    // uncomment include header.php below
    //
?>
    <?php
        // include('php/header.php');
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


<section id="about" >
    <h3>Instructions</h3>
    <p><span class="" style="font-size:1em;"><i class="icon-move icon-white"></i> Move an item to give your input.</span></p>
    <p class="hidden"><strong><span class="user"></span>your input</strong></p>
    <h4>Why?</h4>
    <p>This app merges survey and visualization. You will see your input in the foreground and the average from all respondents behind it. We will also show a sample of other replies dotted across the screen.</p>
    <h3>About</h3>
    <p>This app trades the limited snapshot of a traditional poll for a process that amplifies and records a hint of the influence and revised thought that naturally precedes and follows any feedback forum.</p> 
    <p>
        <a class="btn btn-success" href="new.html">Make Your Own</a>
        <a class="btn btn-info" href="https://github.com/xmatthewx/emergent-matrix">Contribute on Github</a>
    </p>
    <p>Brought to you by html5, jQuery, github, Shankari, and&nbsp;Matthew.</p>
</section>



<?php include('php/footer.php'); ?>

