$(window).load(function () {
// all JS inside $(window).load
console.log('loaded');

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
    form_height = height - 130;
    $('form').css('height', form_height);
    $('form').append('<div class="mask"></div>');
}
responsive();
$(window).resize(function() {
    responsive();
});

// enable tooltips
$('a').tooltip();


/***
 * uri check
 */
// suggest a uri
$('#matrix_title').keyup( function(){
    new_uri = $('#matrix_title').val();
    new_uri = new_uri.replace(/\s/g,"-").replace(/[^a-z 0-9 \-]+/gi,'').toLowerCase();
    $('#matrix_uri').val(new_uri);
});


var uri_ok;
$('#matrix_uri').blur( function() {
    check_uri();
});


function check_uri() {
    
     new_uri = $('#matrix_uri').val();
     var msg; var error;
     
     // blank?
     if ( new_uri === '' ) {
         error = 'uri is blank';
         msg = 'Sorry. A unique URL is required.';
         uri_bad(error,msg);
         return false;
        }

     // sanitized?
     sanitized = new_uri.search(/[^a-z0-9\-]/gi); // -1 = clean
     if ( sanitized != -1 ) { 
         error = 'uri has illegal characters';
         msg = 'Oops! Only numbers, letters, and dashes (-) allowed. No spaces.';
         uri_bad(error,msg);
         return false;
         } 
         
    console.log('uri is good. is it unique?');

    // uri unique? 
     $.post('php/checkMatrixURI.php',{new_uri:new_uri},function(data) {
         // console.log(data);
          if ( data != 1 ) { 
              console.log('uri is unique');
              $('#matrix_uri').css('color','green').css('fontWeight','bold'); 
              $('.alert').addClass('alert-success').text('Perfecto!').delay(2000).fadeOut('slow');
              uri_ok = true;
              unlock_submit();
          }
          else { 
              error = 'uri is taken';
              msg = 'Oh snap! That URL is already taken. Please try another.';
              uri_bad(error,msg);
              return false;
          }
        },'json');

};

function uri_bad(error,msg) {
    console.log(error);
    uri_ok = false;
    $('.alert').remove(); // remove pre-existing alerts
    $('form').scrollTop(0);
    $('#matrix_uri').css('color','red').css('fontWeight','bold'); 
    $('#matrix_uri').parents('.control-group').prepend('<div class="alert">'+msg+'</div>');         
    $('.alert').hide().slideDown(400); // reveal alert
    $('form button').attr('disabled', 'disabled');
}


/***
 * item fields
 */
 
// trigger more input for items as needed
// $('#item_3').focus( function(){ xitem(); });


$('#more_items').click( function(){
    console.log('more');
    xitem();
    //return false;
});

function xitem(){ 
    // clone the last item input field
 	var template = $("section#items .control-group").last().clone(); 	
 	i = Number( template.find("input").attr('id').slice(5) ); 
 	n = i + 1; // next item
 
 	if( n < 16 ){

    	template.find(".add-on").text(n);
    	template.find("input").attr('id','item_'+ n).val('');
 
    	$("section#items").append(template);    

    	// $('#item_' + n).focus( function(){ xitem(); }); 	    
 	}
 	else { 
 	    $('#more_items').text('max reached');
 	    $('#more_items').attr('disabled', 'disabled');
 	 }
    
    // $('#item_' + i ).unbind('focus'); // trigger from each only once
    
};


$('#less_items').click( function(){
    console.log('less');

    $("section#items .control-group").last().remove();

});


/***
 * unlock submit. uri ok and spam test.
 */
$('.checkbox').change( function(){ 
    check_uri();
});

function unlock_submit(){
    if( $('#test1:checked').val() && !$('#test2:checked').val()  && $('#test3:checked').val()  ){
        console.log('unlocked');
        if(uri_ok) {
            $('form button').removeAttr("disabled");
        }
    }
    else {
        $('form button').attr('disabled', 'disabled');
    }
}


/***
 * categories
 * rename labels while filling out form
 * problem: rotation on east/west yields wrong measurement for right/left placement as text lengthens
 
$('#matrix_north').keyup( function(){
    $('#north').text( $('#matrix_north').val() ); 
   // responsive();
});
$('#matrix_south').keyup( function(){
    $('#south').text( $('#matrix_south').val() ); 
    responsive();
});
$('#matrix_east').keyup( function(){
    $('#east').html( $('#matrix_east').val() ); 
    // e_right = -e_offset/2 + $('#east').outerWidth();
    $('#east').css( 'right', e_right);
   responsive();
});
$('#matrix_west').keyup( function(){
    $('#west').text( $('#matrix_west').val() ); 
    responsive();
});
*/


// END $(window).load
});
