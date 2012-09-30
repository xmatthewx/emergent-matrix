
$(window).load(function () {
// all JS inside $(window).load


/***
 * init itemslist
 */
var itemslist = [];

// load remote data:
// http://api.jquery.com/jQuery.getJSON/

// load locally if available
if ( !localStorage.getItem('itemslist') ) { 
    console.log("no stored items"); 
    initItems();
}
else {
    itemslist = localStorage.getItem('itemslist');
    itemslist = JSON.parse(itemslist);
    
    console.log("loaded items:" + itemslist); 
}


/***
 * store itemslist
 */
function storelist() {
    theitems = JSON.stringify(itemslist);
    localStorage.itemslist = theitems;
    console.log("stored local: " +localStorage.itemslist);
}


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
    } // END for()

});


/***
 * drag events
 */
$('#thecanvas div').draggable();

$('#thecanvas div').bind( "dragstart", function(event, ui) {
    // $(this).clone().appendTo('#thecanvas');
    $(this).siblings().css('z-index','0');
    $(this).css('z-index','10');    
    $(this).children('.details').clearQueue().fadeOut();
});

$('#thecanvas div').bind( "drag", function(event, ui) {
    $(this).children('.details').css('border-color','red');
});

$('#thecanvas div').bind( "dragstop", function(event, ui) {
    $(this).children('.details').fadeIn('slow').delay(2000).fadeOut('slow');
    updateitem(this);
    saveIteration(this);//Send data to php for insert
    storelist();
});


function updateitem(elem){
    x = $(elem).css('left');
    y = $(elem).css('top');
    console.log('Item '+elem.id+' moved to: '+x+', '+y); 
    }

//---------------------------------------------------------------------------
/* Send Item's new position to setData.php in JSON
	Function Definitions:
	saveIteration(elem): Creates a JSONString using the updated browser information
	getHTTPObject():
	runAjax(JSONstring):
	sendData(): 
*/

 function saveIteration(elem){
    x = $(elem).css('left');
    y = $(elem).css('top');
    
    var JSONObject = new Object;
    
    JSONObject.ITEM_ID=elem.id.slice(2);
    JSONObject.ITEM_X=x.slice(0,-2);
    JSONObject.ITEM_Y=y.slice(0,-2);
    
    JSONstring = JSON.stringify(JSONObject);
    runAjax(JSONstring);
    
    console.log(''+JSONstring);
  }

function getHTTPObject()
{
    var xhr = false;
    if (window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try
        {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
                xhr = false;
            }
        }
    }
    return xhr;
}

var request;
function runAjax(JSONstring)
{
    // function returns "AJAX" object, depending on web browser
    // this is not native JS function!
    request = getHTTPObject();
    request.onreadystatechange = sendData;
    request.open("GET", "php/setData.php?json="+JSONstring, true);
    request.send(null);
}



// function is executed when var request state changes
function sendData()
{
    // if request object received response
    if(request.readyState == 4)
    {
	// parser.php response
	var JSONtext = request.responseText;
	// convert received string to JavaScript object
	var JSONobject = JSON.parse(JSONtext);
 
	// notice how variables are used
	var msg = "Item Iteration Information \n "+JSONobject.item_information;
		alert(msg);

    }
}

//---------------------------------------------------------------------------

/***
 * delete
 */
$('#thecanvas li a.icon-trash').click( function(){
    var nix_it = $(this).parent().attr('id').substr(3); // grab longer IDs plz
    itemslist.splice(nix_it,1);
    $(this).parent().fadeOut("slow");
});



/***
 * dummy itemlist
 */
function initItems(){
    // add to itemslist
    addlist = [
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
    ];   
    
    itemslist = itemslist.concat(addlist);
    console.log( itemslist[1] );   
    
};


// END $(window).load
});

