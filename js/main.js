
$(window).load(function () {
// all JS inside $(window).load

/***
 * debugging
 */
clearlocal = false; // clear once to clean local data
if (clearlocal) { localStorage.clear(); }

/***
 * init itemslist
 */
var itemslist = [];
var trigger = false;


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
    console.log(itemslist); // console let's you view contents
}


/***
 * store itemslist
 */
function storelist() {
    theitems = JSON.stringify(itemslist);
    localStorage.itemslist = theitems;
    // console.log("stored local: " +localStorage.itemslist);
}


/***
 * generate html
 */
pre_render('all'); // render all onload

function pre_render(id){

    if (id == 'all') {
        // loop thru list
        for(i=0; i<itemslist.length; i++  ){ render(i); }
    }
    else { 
        $('div.i_'+id+'').remove();
        render(id,'pop'); // -1        
    }
    
} 
 
// render an item. attach events. 
function render(i,pop){

        item = itemslist[i];
        
        // write emergent item
        $('#thecanvas').append( 
            '<div id="i_'+ item.id +'" class="swarm i_'+item.id+' c'+ item.count +'" style="left:'+item.mean_x+'px; top:'+item.mean_y+'px;" >'
                +'<header>'
                    + item.content
                +'</header>' 
                +'<section class="details" >'
                    +'<p>' + item.count +' emerged</p>'
                +'</section>'
            +'</div>'
        );
        
        // if user has moved item, write it
        if ( item.user_x ) { 
            
            // demote emergent clone
            $('div#i_'+item.id+'').removeClass('swarm').addClass('swarm2');
            
            // write users item
            $('#thecanvas').append( 
                '<div id="i_'+ item.id +'" class="user i_'+ item.id +'" style="z-index:10; left:'+item.user_x+'px; top:'+item.user_y+'px;" >'
                    +'<header>'
                        + item.content
                    +'</header>' 
                +'</div>'
            );
                        
        } // END if(item.user_x)
        



    /***
     * drag events
     */
    $('#thecanvas div.swarm').draggable();
    $('#thecanvas div.user').draggable();

    $('#thecanvas div').bind( "dragstart", function(event, ui) {
        // $(this).clone().appendTo('#thecanvas');
                
        trigger = true;
                
        // put the item on top
        $(this).siblings().css('z-index','0');
        $(this).css('z-index','10');    
    
        // hide popout if showing
        $(this).children('.details').clearQueue().fadeOut();
    
    });

    $('#thecanvas div').bind( "drag", function(event, ui) { 
        // nothing to see here. move along.
    });

    $('#thecanvas div').bind( "dragstop", function(event, ui) {
        // update then save
        if( trigger ) { updateitem(this); }
        trigger = false; // prevent loops
    });

    // reveal pairs of user/emergent 
    $('#thecanvas div.swarm2').hover( 
        function(){ // mousein
            id = $(this).attr('id');
            $('div.'+id+' header').css('border-color','rgb(255,0,255)');
            $(this).css('zIndex',101);
            $(this).clearQueue().animate({ opacity:1.0 }, 1000);
        },
        function(){ // mouseout
            $(this).animate({ opacity:0.2 }, 1000);
            $(this).children('.details').fadeOut('fast');
            $('div.'+id+' header').css('border-color','transparent');
            $('div.'+id+'.swarm2').css('zIndex',1); 
            $('div.'+id+'.user').css('zIndex',11);
        }    
    );
    $('#thecanvas div.swarm2').click( function(){
        $(this).css('zIndex',101);
        $(this).children('.details').fadeIn('slow');
    }); 
    
    
    // show popout after item update
    
    if(pop == 'pop') {
        $('div.i_'+item.id+'.swarm2').css('opacity','1.0').css('zIndex',11);
        $('div.i_'+item.id+'.swarm2').children('.details').delay(200).fadeIn().delay(2000).fadeOut().delay(1000);
        $('div.i_'+item.id+'.swarm2').delay(3000).animate({ opacity:0.2 }, 1000).delay(2000).animate({'z-index':1},0); 
        $('div.i_'+item.id+'.user').delay(3000).animate({'z-index':11},0); // jQuery sux at pairing z-index & delays
    }
    

}; // END render()


/***
 * update session, localstorage, then DB
 */
function updateitem(elem){
    
    // grab info
    id = Number(elem.id.slice(2)); // -1
    item = itemslist[id];
    count = item.count;
    mean_x = item.mean_x;
    mean_y = item.mean_y;
    
    // find and update user coordinates
    user_x = item.user_x = Number( $(elem).css('left').slice(0,-2) );
    user_y = item.user_y = Number( $(elem).css('top').slice(0,-2) );

    // calculate and update mean coordintes    
    new_x = item.mean_x = Math.round( ( mean_x * count + user_x ) / (count + 1) );
    new_y = item.mean_y = Math.round( ( mean_y * count + user_y ) / (count + 1) );

    // console.log( 'id:'+id + ' mean_x:' + mean_x + ' count:' + count + ' user_x:' + user_x + ' new_x:' + new_x );
    
    item.count = count + 1;
    
    storelist();
    pre_render(item.id);
    saveIteration(item);//Send data to php for insert
    
    }

//---------------------------------------------------------------------------
/* Send Item's new position to setData.php in JSON
	Function Definitions:
	saveIteration(elem): Creates a JSONString using the updated browser information
	getHTTPObject():
	runAjax(JSONstring):
	sendData(): 
*/

function saveIteration(item){
  //  x = $(elem).css('left'); // passing saveIteration() obj w/ all the data it needs
  //  y = $(elem).css('top');
    
    var JSONObject = new Object;
    
    JSONObject.ITEM_ID=item.id;
    JSONObject.ITEM_X=item.user_x;
    JSONObject.ITEM_Y=item.user_y;
    
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
            id:0,
            content:'cats',
            mean_x:100,
            mean_y:100,
            count:3
        },
        {
            id:1,
            content:'dogs',
            mean_x:200,
            mean_y:100,
            count:11
        },
        {
            id:2,
            content:'apples',
            mean_x:100,
            mean_y:200,
            count:110
        },
        {
            id:3,
            content:'oranges',
            mean_x:200,
            mean_y:200,
            count:9
        } // no comma at end!!
    ];   
    
    itemslist = itemslist.concat(addlist);
    
};


// END $(window).load
});

