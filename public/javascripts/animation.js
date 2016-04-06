/**
 * Created by Max on 04.04.2016.
 */
(function() {





    $(document).ready(function() {
        (function($){
            var x = 0;
            var y = 0;

            var bgImage = $(".bgPicture");
            bgImage.css("background-position", x + "px" + " " + y + "px" );


            var directionLeft = true;

            var timer = setInterval(function() {
                bgImage.css("background-position", x + "px" + " " + y + "px" );
                if(directionLeft){
                  //  x--;
                }else{
                 //   x++;
                }

                if(x === -1){
                    directionLeft = false;

                }else if(x === 1){
                    directionLeft = true;
                }
            }, 600);
        })($);
    })
})();