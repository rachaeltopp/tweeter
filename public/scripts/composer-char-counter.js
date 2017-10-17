$(document).ready(function() {
    $("textarea").keyup(function() {
        let charactersLeft = (140 -(this.value.length));
        $(this).parent().find(".counter").text(charactersLeft);

        if(charactersLeft < 0) {
            $(".counter").addClass("red");
        } 
        else {
            $(".counter").removeClass("red");
        }
    });
});
