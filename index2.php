
<?php 

if(empty( $_GET['id'] )) {
    echo 'Make your <a href="" >own matrix</a> or visit one of the others.';
}
else { 
    echo $_GET['bagel'].'<br>'; 
    echo $_GET['moop']; 
}

?>

/*

future homepage

in theory all urls will

    - hit htaccess and point here with uri as variable
    - load template w/ general html/js
    - grab data based on uri


new.html includes form to create a new matrix

    - assign uri
    - create matrix in db    
    - push the creator to a new uri


*/
