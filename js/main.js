
// init
$(window).load(function () {
    $(".alert").alert('close')
});



// the itemslist
var itemslist = new Array(
    {
        id:1,
        content:'cats',
        mean_x:100,
        mean_y:100,
        count:11
    },
    {
        id:2,
        content:'dogs',
        mean_x:200,
        mean_y:100,
        count:11
    },
    {
        id:3,
        content:'apples',
        mean_x:100,
        mean_y:200,
        count:11
    },
    {
        id:4,
        content:'oranges',
        mean_x:200,
        mean_y:200,
        count:11
    } // no comma at end!!
);


/***
 * generate html
 */
$('#thecanvas').html( function(){
        
    
    // loop thru list
    for(i=0; i<itemslist.length; i++  ){
        
        item = itemslist[i];
        
        // write html
        $('#thecanvas').append( 
            '<div id="i_'+ item.id +'" class="btn '+ item.count +'" style="left:'+item.mean_x+'px; top:'+item.mean_y+'px;" >'
                +'<heading>'
                    + item.content
                +'</heading>' 
                +'<section class="details" >'
                    +'<p>id: '+ item.id +'<br>'
                    +'count: ' + item.count +'<br>'
                    +'avg x: ' + item.mean_x +'<br> '
                    +'avg y: ' + item.mean_y +'</p>'
                +'</section>'
            +'</li>'
        );
    }
   

   
});


/***
 * drag events
 */
$('#thecanvas div').draggable();

$('#thecanvas div').bind( "dragstart", function(event, ui) {
    // $(this).clone().appendTo('#thecanvas');
    $(this).siblings().css('z-index','0');
    $(this).css('z-index','10');    
    $(this).children('.details').fadeOut();
});

$('#thecanvas div').bind( "drag", function(event, ui) {
    $(this).children('.details').fadeIn();
});

$('#thecanvas div').bind( "dragstop", function(event, ui) {
    $(this).children('.details').fadeOut();
    hello(this);
});


function hello(elem){
    x = $(elem).css('left');
    y = $(elem).css('top');
    console.log('Item '+elem.id+' moved to: '+x+', '+y); 
    }


/***
 * delete
 */
$('#thecanvas li a.icon-trash').click( function(){
    var nix_it = $(this).parent().attr('id').substr(3); // grab longer IDs plz
    itemslist.splice(nix_it,1);
    $(this).parent().fadeOut("slow");
});



