var itemslist = [];
var drag_active = false;
var first_drag = true;
var first_visit = true;
var getting_iterations;
var sparkles = [];
var width;
var height;

clearlocal = false; // clear once to clean local data and load a new list.
if (clearlocal) { localStorage.clear(); }

var server_root = 'http://ideapublic.org/matrix/'

function responsive(){
    width = $(window).width(); 
    height = $(window).height();
    // position labels 
    n_offset = width/2 - $('#north').outerWidth() / 2;
    $('#north').css( 'left', n_offset);
    s_offset = width/2 - $('#south').outerWidth() / 2;
    $('#south').css( 'left', s_offset);
    e_offset = height/2 - $('#east').outerHeight() / 2;
    $('#east').css( 'top', e_offset);
    w_offset = height/2 - $('#west').outerHeight() / 2;
    $('#west').css( 'top', w_offset);
    $('#thecanvas').css('height',height);   

    about_max = height - 60;
    $('#about').css('maxHeight', about_max  );

}

$(window).load(function () {
// all JS inside $(window).load

// on load and browser resize
responsive();


// periodically get DB data
var refreshInterval = setInterval(getData, 10*1000); // seconds


/***
 * set title and categories
 */
var title = data[0].MATRIX_TITLE;
var cats = data[0].MATRIX_CATS.split(",");
$('h1').text(title);
$('.container').append('<div id="north" class="category" >north</div><div id="east" class="category" >east</div><div id="south" class="category" >south</div><div id="west" class="category" >west</div>');
$('#north').text(cats[0]);
$('#south').text(cats[1]);
$('#west').text(cats[2]);
$('#east').text(cats[3]);
responsive();


/***
 * responsize window size
 */
width = $(window).width(); 
height = $(window).height();

$(window).resize(function() {
    responsive();
});



/***
 * init itemslist
 */

// load locally if available
if ( !localStorage.getItem(uri) ) { 
    console.log("no stored items"); 
    
    // load data from php
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
    // console.log(itemslist);    
    itemslist = JSON.stringify(itemslist);
    localStorage.setItem(uri,itemslist);

    itemslist = JSON.parse(itemslist);
    console.log(itemslist); // console let's you view contents
    pre_render('all'); // draw from local

}
else {
    console.log("loaded from storage"); 
    first_visit = false;

    itemslist = localStorage.getItem(uri);
    itemslist = JSON.parse(itemslist);
    console.log(itemslist); // console let's you view contents
    pre_render('all'); // draw from local
}


/***
 * store itemslist
 */
function storelist() {    
    theitems = JSON.stringify(itemslist);
    localStorage.setItem(uri,theitems);
    // console.log("stored local: " +localStorage.itemslist);
}


/***
 * generate html
 */

function pre_render(id,pop){

    if (id == 'all') {
        // loop thru list
        for(i=0; i<itemslist.length; i++  ){ render(i); }
    }
    else { 
        $('.i_'+id+'').remove(); // remove item
        render(id,pop);       // recreate item
    }
    
} 
 
// render an item. attach events. 
function render(i,pop){

        item = itemslist[i];
        // console.log(i);

        // write emergent item
        $('#thecanvas').append( 
            '<div id="i_'+ item.id +'" class="swarm i_'+item.id+' c'+ item.count +'" style="left:'+item.mean_x+'%; top:'+item.mean_y+'%;" >'
                +'<header>'
                    + item.content
                +'</header>' 
                +'<section class="details" >'
                    +'<p>' + item.count +' inputs</p>'
                +'</section>'
                +'<span class="anchor"></span>'
            +'</div>'
            +'<span class="swarm i_'+ item.id +' anchor" style="left:'+item.mean_x+'%; top:'+item.mean_y+'%;"></span>'
        );
        
        // if user has moved item, write it
        if ( item.user_x ) { 

            // first mark original emergent before clone
            $('.i_'+item.id+'').removeClass('swarm').addClass('swarm2');
            
            // animate anchor on clone. yikes.
            radius = Math.sqrt(item.count/Math.PI); // radius of count as area
            if( radius < 4 ){ radius = 4; }
            $('span.i_'+item.id+'.swarm2')
                .animate({
                    
                    width:'+='+radius*2,
                    height:'+='+radius*2,
                    marginLeft:'-='+radius,
                    marginTop:'-='+radius,
                    borderTopLeftRadius:'+='+radius*2,
                    borderTopRightRadius:'+='+radius*2,
                    borderBottomLeftRadius:'+='+radius*2,
                    borderBottomRightRadius:'+='+radius*2
                    
                },700)
                        
            // write users item
            $('#thecanvas').append( 
                '<div id="i_'+ item.id +'" class="user i_'+ item.id +'" style="z-index:10; left:'+item.user_x+'%; top:'+item.user_y+'%;" >'
                    +'<header>'
                        + item.content
                    +'</header>' 
                    +'<span class="anchor"></span>'
                +'</div>'
            );
                        
        } // END if(item.user_x)
        



    /***
     * drag events
     */
    $('#thecanvas div.swarm').draggable( {containment: "parent"} );
    $('#thecanvas div.user').draggable( {containment: "parent"} );

    $('#thecanvas div').bind( "dragstart", function(event, ui) {                
        drag_active = true;
                
        // put the item on top
        $(this).siblings().css('z-index','0');
        $(this).css('z-index','10');    
        $(this).css('box-shadow','1px 1px 7px rgba(0,0,0,0.2)');

        // hide popout if showing
        $(this).children('.details').clearQueue().fadeOut();    

        // launch operation sparkles
        // this seems to be triggered 5 or 6 times on a single interaction       
        id = Number(this.id.slice(2));
        sparkles = []; // could check id in getting_iterations before dumping
        getIterations(itemslist[id].key); 
        $('.sparkle').remove(); // remove any previous
        
    });

    $('#thecanvas div').bind( "drag", function(event, ui) { 
        // nothing to see here. move along.
    });

    $('#thecanvas div').bind( "dragstop", function(event, ui) {
        // update then save
        if( drag_active ) { 
                updateitem(this); 
                renderSparkles(sparkles);
                }        
            drag_active = false; // prevent loops. don't put inside if statement. don't move to updateitem()
    });

    // reveal pairs of user/emergent 
    $('#thecanvas div.swarm2').hover( 
        function(){ // mousein
            id = $(this).attr('id');
            // access one with (this), both in a pair with (div.id)
            $('div.'+id+' header').css('border-color','orange'); 
            $('div.'+id+'').css('zIndex',99);
            $(this).css('zIndex',101);
            $(this).clearQueue().animate({ opacity:1.0 }, 1000);    
            $('span.'+id+'.swarm2').clearQueue().animate({ opacity:1.0 }, 1000); // anchor circle
        },
        function(){ // mouseout
            id = $(this).attr('id');
            $(this).animate({ opacity:0.25 }, 1000);
            $('span.'+id+'.swarm2').clearQueue().animate({ opacity:0.25 }, 1000); // anchor circle
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
        // display details on drop: $('div.i_'+item.id+'.swarm2').children('.details').delay(200).fadeIn().delay(2000).fadeOut().delay(1000);
            $('div.i_'+item.id+'.swarm2').delay(3000).animate({ opacity:0.25 }, 1000).delay(2000).animate({'z-index':5},0); 
        $('div.i_'+item.id+'.user').delay(3000).animate({'z-index':11},0); // jQuery sux at pairing z-index & delays
    }


}; // END render()


/***
 * update session, localstorage, then DB
 */
function updateitem(elem){
    
    // grab info
    id = Number(elem.id.slice(2));
    item = itemslist[id];
    count = Number(item.count);
    mean_x = item.mean_x;
    mean_y = item.mean_y;
    
    // find and update user coordinates
    var offset = $(elem).offset();
    x_px = offset.left;
    y_px = offset.top;

    user_x = item.user_x = x_px / width * 100;
    user_y = item.user_y = y_px / height * 100;

    // calculate and update mean coordintes    
    new_x = item.mean_x = Math.round( ( mean_x * count + user_x ) / (count + 1) );
    new_y = item.mean_y = Math.round( ( mean_y * count + user_y ) / (count + 1) );

    // console.log( 'id:'+id + ' mean_x:' + mean_x + ' count:' + count + ' user_x:' + user_x + ' new_x:' + new_x );
    
    item.count = count + 1;
    
    storelist();

    /* // prompt on first visit 
    if ( first_drag && first_visit ){ 
        drag_active = true;
        showinfo(id); 
        first_drag = false; 
        pre_render(item.id,'pop'); 
    }
    else { 
        first_drag = false; 
        pre_render(item.id,'pop'); 
    }  */
    first_drag = false; 
    pre_render(item.id,'pop'); 



//  pre_render(item.id,'pop'); 
    saveIteration(item);//Send data to php for insert

} // END updateitem()

// prompt on first visit
// disabled
function showinfo(id){
    
    // console.log('showinfo' + ' dragactive: ' + drag_active );

    $('#info').show();
    $('#info').css('zIndex','4');
    $('html').click( function(){ 
        $('#info').fadeOut(); 
        drag_active = false;
        //pre_render(id,'pop');
    });
    $('#info button').click( function(){ 
        drag_active = false;
        //pre_render(id,'pop');
     });
    
};


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

    JSONObject.ID=item.key;
    JSONObject.ITEM_ID=item.id;
    JSONObject.ITEM_X=item.user_x;
    JSONObject.ITEM_Y=item.user_y;
    
    JSONstring = JSON.stringify(JSONObject);
    runAjax(JSONstring);
    
    // console.log(''+JSONstring);
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
    request.open("GET", "php/setData_Test.php?json="+JSONstring, true);
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
/*
 * To refresh data periodically to maintain consistent data across a multi-user environment using ajax
 * function definition: getData()
 * Can be called each time the user changes the position of an item [after updateItem()], or some other trigger
 * or
 * Can be called at regular intervals of time
 * Still uncertain of its impact on speed and performance.
 */



 function getData(){
     // console.log('getData. active: ' + !first_drag);

     if( !drag_active && !first_drag ) {  // don't update during user drag
            // console.log('get data');            
 	    	 $.ajax({
 	    	        // url: "/emergent-matrix/php/getData.php",
 	    	        // uhh, fix this url:
 	    	        url: server_root + 'php/getData.php?update=true&id=' + uri,
 	    	        async: true,
 	    	        dataType: 'json',
 	    	        success: function(data) {
                        // console.log('ajax success');
      
                        if ( !localStorage.getItem(uri) ) { 
                            // init it
                            // this will never happen. we are now writing to localStorage on initial load
                            console.log('init data');            
                            initData(data);
                            }
   
                        else {
                            // refreshit
                            // console.log('refresh data');            
                            refreshData(data); 
                            // console.log(data);                           
                        };

 	    	        } // END success
 	    	    });
 	    }	    
 	    else { console.log( 'getData delayed.' ); }
 	    	    
  } // END getData()

function initData(data){
    
    $.each(data, function(key, value){

	     theid = value.ITEM_ID;

          // create stuff
	      itemslist.push( {
                id:theid,
                content:value.ITEM_CONTENT,
                mean_x:value.ITEM_MEAN_X,
                mean_y:value.ITEM_MEAN_Y,
                count:value.ITEM_COUNT
            });

	}); // end $.each

    console.log('init success:');
    console.log(itemslist);

	storelist();
    pre_render('all');
	
}


function refreshData(data){
 

    // $.each(data.rows, function(key, val) { 
    $.each(data, function(key, value){

         theid = value.ITEM_ID;

          // update stuff
          // must include ID and ITEM_ID
          // key = value.ID ??
          
        item = itemslist[theid];
        item.mean_x = value.ITEM_MEAN_X;
        item.mean_y = value.ITEM_MEAN_Y;
        item.count = value.ITEM_COUNT;
        item.content = value.ITEM_CONTENT;
        item.id = value.ITEM_ID;


        //  console.log(item.user_x);

        if( !drag_active ) { // really. plz dont disrupt the user. note: drag active could carry an id and be more specific.
            pre_render(theid,'nonpop');
        }

    }); // end $.each

    storelist();
   
    
}


/***
 * get iterations!
 */

// call after save success
// getIterations(JSONObject.ID); 

function getIterations(id) {
    if( !getting_iterations ) {  // don't repeat yourself
        getting_iterations = id;
        // console.log('launch operation sparkles for: ' + id);
	    	 $.ajax({
	    	        url: server_root + 'php/getIterations.php?id=' + id,
	    	        async: true,
	    	        dataType: 'json',
	    	        success: function(data) {
                       // console.log('got iterations');
                       // console.log(data);
                       
                       // renderSparkles(data); // render here during drag
                       sparkles = data; // render later during dragstop

	    	        } // END success
	    	    });
	    }
}

function renderSparkles(data) {
    
    if( !data ) { data = [] };
    
    $.each(data, function(key, value){ 
        x = value.ITEM_X;
        y = value.ITEM_Y;
    	$('#thecanvas').append('<em class="sparkle" style="left:'+x+'%; top:'+y+'%;" ></>');    
    	$('.sparkle').hide();
    });
    // console.log('sparkles rendered');
    getting_iterations = false; // stop preventing loops

    i = 1;
    var timer = new Array();
    jQuery('.sparkle').each(function($) {
        i++;
        var thiz = jQuery(this);
        timer[i] = setTimeout(function() { thiz.fadeIn(300); }, i * 100);
    })	
	
}



/***
 * delete
 */
$('#thecanvas li a.icon-trash').click( function(){
    var nix_it = $(this).parent().attr('id').substr(3); // grab longer IDs plz
    itemslist.splice(nix_it,1);
    $(this).parent().fadeOut("slow");
});


/***
 * nav menu
 */

// create toggle button
$('#about').before('<a id="nav-show" class="nav-toggle btn btn-inverse"><i class="icon-plus-sign icon-white"></i></a>');
$('#about').before('<a id="nav-hide" class="nav-toggle btn"><i class="icon-minus-sign"></i></a>');
$('#nav-hide').hide();
$('.nav-toggle').click( function(){ toggle_menu(); });

// show
toggle_menu();
function toggle_menu(){
    $('#about').toggle('slow');
    $('#nav-show').toggle();
    $('#nav-hide').toggle();
    // set canvas to hide about info once
    $('#thecanvas').one("click", function(event){
    	$('#about').fadeOut('slow'); 
        $('#nav-show').toggle();
        $('#nav-hide').toggle();
    });
}



// END $(window).load
});

