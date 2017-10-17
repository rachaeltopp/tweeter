$(document).ready(function() {
    $(".new-tweet textarea").keyup(function() {
        const charactersLeft = 140 -this.value.length;
        const counter = $(this).parent().find(".counter");
        counter.text(charactersLeft);

        if(charactersLeft < 0) {
            counter.addClass("red");
        } 
        else {
            counter.removeClass("red");
        }
    });
});
