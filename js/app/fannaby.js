require(['jquery'], function(){ 

    // switch status success & linked account button
    $('#program-list .status').children('.linked').each(function(){
        
        if ($(this).hasClass('success')) {
            $(this).show();
            $(this).siblings('button').hide();
        } else {
            $(this).hide();
            $(this).siblings('button').show();
        }
        
    });

    // user menu show/hide --> onHover
    $('#user').hover(function(){
        $(this).children('.user-menu').show();
    }, function(){
        $(this).children('.user-menu').hide();
    });

    // airmiles program card; on click --> show popup, reset overlay scroll
    $('#program-list > .program').eq(1).find('button').on('click', function(){
        $('body').css('overflow', 'hidden');
        $('#popup').show();
    });

    // click overlay border area to close popup
    $popup = $('#popup');
    $popup.on('click', function(event){
        if (event.target === this) {
            $popup.hide();
            $('body').removeAttr('style');
            $('#popup-1').show();
            $('#popup-2').hide();
            $('#popup-3').hide();
        }
    });
    // click pop close button to close popup
    $popup.children('.popup-module').children('.close').on('click', function(event){
        console.log(event.currentTarget);
        event.preventDefault();
        $popup.hide();
        $('body').removeAttr('style');
        $('#popup-1').show();
        $('#popup-2').hide();
        $('#popup-3').hide();
    });

    // switch popup content: program-description page --> link account page
    $('.link-account-btn').click(function(){
       // $('#popup').height($('#popup-1').height());
        $('#popup-1').hide();
        $('#popup-2').show();
        //$('#popup').height($('#popup-2').height());
    });
    $('#popup-2 > .popup-content .program').eq(1).css('cursor', 'pointer').click(function(){
        $('#popup-2').hide();
        $('#popup-3').show();
    });



});

//define("fannaby", ['jquery'], function() {
//});