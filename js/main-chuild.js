Stars BEGIN
***********************/
$(function($){
    $(".stars-rating-big").starRating({
        useFullStars: true,
        emptyColor: '#cedae1',
        hoverColor: '#239ca3',
        activeColor: '#239ca3',
        ratedColor: '#239ca3',
        disableAfterRate: false,
        starSize: 50,
        useGradient: false,
        strokeColor: 'transparent',
        callback: function(currentRating, $el){
            $el.siblings('input').val(currentRating);
        }
    });

    $(".stars-rating-static").starRating({
        useFullStars: true,
        emptyColor: '#cedae1',
        hoverColor: '#239ca3',
        activeColor: '#239ca3',
        ratedColor: '#239ca3',
        disableAfterRate: false,
        starSize: 50,
        useGradient: false,
        strokeColor: 'transparent',
        readOnly: true,
        callback: function(currentRating, $el){
            $el.siblings('input').val(currentRating);
        }

    });

});
