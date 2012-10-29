<?php
    //
    //
    // test experimental features in matrix.php
    // use index.php for live users
    // URIs will work on either file
    //
    //
    // test: http://www.ideapublic.org/matrix/matrix.php?id=testing
    //
    // uses: matrix_test.js
    // instead of: matrix.js
    //
    //
    //
    // to migrate matrix.php to index.php
    // replace inline header.php
    // with include('php/header.php');
    // see below
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


        <div class="navbar navbar-fixed-top navbar-inverse">
            <div class="navbar-inner">
                <a class="brand" href="index.html">Emergent Matrix</a>
                <ul class="nav filter">
                    <li><a href="#">about</a></li>
                </ul>
            </div>
        </div>


        <div class="container">

<?php
    //
    // end header.php
    //
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


<?php include('php/footer.php'); ?>

