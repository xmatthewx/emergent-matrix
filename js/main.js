var color_urg = 255/10; 
var pos_top = 0;
var pos_left = 0;
var contexts = new Array();

// init
$(window).load(function () {
    $(".alert").alert('close')
});


// item_id (primary key)
// item_content
// item_mean_x (average)
// item_mean_y (average)
// item_count ( total iterations of inputs )

// the m_list
var m_list = new Array(
{
    item_id:1,
    item_content:'cats',
    m_context:['rock','school'],
    m_date:{created:'09/07/2012',modified:'09/07/2012',doit:'09/07/2012'}
}
// no comma
);


// generate html
$('#thecanvas').html( function(){
        
    
    // loop thru list
    for(i=0; i<m_list.length; i++  ){
        
        item = m_list[i];
        
        // create class from context
        item.m_class= item.m_context[0];
        for(n=1; n < item.m_context.length; n++  ){ 
            item.m_class += ' ';
            item.m_class += item.m_context[n];
            contexts.push(item.m_context[n]);
        }
        
        // write html
        $('#thecanvas').append( 
            '<div id="m_'+ i +'" class="">'
                +'<heading>'
                    + item.item_content
                +'</heading>' 
                +'<section class="details" >'
                    +'<span class="badge">'+ item.item_id +'</span>'
                    +'<p>' + item.m_date.doit +'</p>'
                    +'<p>' + item.m_context +'</p>'
                +'</section>'
            +'</li>'
        );
        // absolute position
        /*
            $('#m_'+i).css('top',pos_top);
            $('#m_'+i).css('left',pos_left);
            pos_top += 30;
            pos_left += 30;
        */
    }
   

   
});


// add global style & attributes
$('#thecanvas div').addClass('btn');
// $('#thecanvas div').attr('draggable','true'); // html5
$( '#thecanvas div' ).draggable(); // jquery


// drag fucntions
$('#thecanvas div').dragstart( function(){ console.log('dragging');  }   )

// the details
$('#thecanvas li a.icon-list').click( function(){
    $(this).parent().siblings().children('.details').fadeOut("fast");
    $(this).parent().children('.details').delay(200).fadeToggle();
    //$(this).siblings().css('z-index','0');
    //$(this).css('z-index','10');
    
});

// delete
$('#thecanvas li a.icon-trash').click( function(){
    var nix_it = $(this).parent().attr('id').substr(3)
    m_list.splice(nix_it,1);
    $(this).parent().fadeOut("slow");
});

// edit
$('#thecanvas li heading').dblclick( function(){
    $('#thecanvas li heading').attr('contenteditable','false');
    $(this).attr('contenteditable','true');
    $(this).focus();
});
$('#thecanvas li heading').blur( function(){
    $('#thecanvas li heading').attr('contenteditable','false');
});


// menu filters
$('ul.filter').append( function(){ 
    // i need to run this late in the game. but i don't append and .filter upfront.  

    contexts = $.unique( contexts );
    for(c=0; c<contexts.length; c++){
        $('ul.filter').append( '<li><a href="#">'+ contexts[c] +'</a></li>'   );
    }    

});


// do filter
$('ul.filter a').click( function() {
    var filter = $(this).html().toLowerCase();
    
    if (filter == 'all') {
        $('#thecanvas li').fadeIn('slow'); 
    }
    else {
        $( '#thecanvas li.' + filter ).siblings().fadeOut('fast');
        $( '#thecanvas li.' + filter ).fadeIn('slow');        
    } 
});


$(function(){

	// Dialog
	$('#dialog').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Ok": function() {
				$(this).dialog("close");
			},
			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});

	// Dialog Link
	$('#dialog_link').click(function(){
		$('#dialog').dialog('open');
		return false;
	});

	//hover states on the static widgets
	$('#dialog_link, ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); },
		function() { $(this).removeClass('ui-state-hover'); }
	);

});

