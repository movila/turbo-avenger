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

    $('#user').hover(function(){
        $(this).children('.user-menu').show();
    }, function(){
        $(this).children('.user-menu').hide();
    });

    $('#program-list > .program').eq(1).find('button').on('click', function(){
        $('body').css('overflow', 'hidden');
        $('#popup').show();
    });

    $popup = $('#popup');
    $popup.on('click', function(event){
        if (event.target === this) {
            $popup.hide();
            $('body').removeAttr('style');
        }
    });

    $popup.children('.popup-module').children('.close').on('click', function(event){
        console.log(event.currentTarget);
        event.preventDefault();
        $popup.hide();
        $('body').removeAttr('style');
    });

    $('.link-account-btn').click(function(){
       // $('#popup').height($('#module-1').height());
        $('#module-1').hide();
        $('#module-2').show();
        //$('#popup').height($('#module-2').height());
    });



});

//define("fannaby", ['jquery'], function() {
//});