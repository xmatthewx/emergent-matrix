

$(window).load(function () {
// all JS inside $(window).load
console.log('loaded');

/***
 * forms
 */
 
// trigger more input for items as needed
$('#item_3').focus( function(){ xitem(); });

function xitem(){ 
    // clone the last item input field
 	var template = $("section#items .control-group").last().clone(); 	
 	i = Number( template.find("input").attr('id').slice(5) ); 
 	n = i + 1; // next item
 
 	if( n < 16 ){

    	template.find(".add-on").text(n);
    	template.find("input").attr('id','item_'+ n).attr('name','MATRIX_ITEMS[]');

    	$("section#items").append(template);    

    	$('#item_' + n).focus( function(){ xitem(); }); 	    
 	}
    
    $('#item_' + i ).unbind('focus'); // trigger from each only once
    
};


// unlock
$('.checkbox').change( function(){ 
    
//    console.log( $('#test1:checked').val() );
    
    if( $('#test1:checked').val() && !$('#test2:checked').val()  && $('#test3:checked').val()  ){
        console.log('unlocked');
        $('form button').removeAttr("disabled");
        
    }
// END $(window).load
});


// END $(window).load
});
