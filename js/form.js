

$(window).load(function () {
// all JS inside $(window).load

console.log('loaded');

/***
 * forms
 */
 
// trigger more input for items as needed
$('#inputI3').focus( function(){ xitem(); });

function xitem(){ 
    // clone the last item input field
 	var template = $("section#items .control-group").last().clone(); 	
 	i = Number( template.find("input").attr('id').slice(6) );
 	n = i + 1;
 
 	if( n < 16 ){

    	template.find(".add-on").text(n);
    	template.find("input").attr('id','inputI'+ n);

    	$("section#items").append(template);    

    	$('#inputI' + n).focus( function(){ xitem(); }); 	    
 	}
    
    $('#inputI' + i ).unbind('focus'); // trigger from each only once
    
};


// unlock
$('.checkbox').change( function(){ 
    
//    console.log( $('#test1:checked').val() );
    
    if( $('#test1:checked').val() && !$('#test2:checked').val()  && $('#test3:checked').val()  ){
        console.log('unlocked');
        $('form button').removeAttr("disabled");
        
    }
    
     });


// END $(window).load
});
