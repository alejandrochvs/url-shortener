$(function() {
    var localHref = window.location.href;
    var firstHref = $('.first').attr('href');
    var secondHref = $('.second').attr('href');
    
    $('.first').attr('href', localHref + "new/" + firstHref);
    $('.second').attr('href', localHref + "new/" + secondHref);
    
    $('#Go').on('click',function(){
        var info = $('.input').val();
        if (info == "")
        {
            info = "https://www.google.com/";
        }
        window.location.href = localHref + "new/" + info;
    });
});