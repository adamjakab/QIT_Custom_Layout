// Other js modules
import "./css/style.less";
// import _ from 'lodash';
import imagesLoaded from 'imagesloaded';


(function($) {

    function setupGlitchContainer() {
        //const $wrapper = $('#wrapper');
        let $glitchContainer = $('<div class="glitch_container loading"></div>');

        $("body").children().first().before($glitchContainer);
        let $glitchDiv = $('<div class="glitch"></div>');
        $glitchContainer.append($glitchDiv);
        for (let i=1; i<=5; i++) {
            $glitchDiv.append($('<div class="glitch__img"></div>'));
        }
        imagesLoaded('.glitch__img', { background: true }, () => {
            $glitchContainer.removeClass("loading").addClass("imgloaded")
        });
    }

    $(document).ready(function() {
        console.log("JQ READY");
        setupGlitchContainer();

    });
})(jQuery);


/*
queueViewModel.pageReady(function(data) {
    console.log("QIT-VM");
});

window.addEventListener('load', function () {
    console.log("WIN");
});

(function($) {
    console.log("ANON");
    $(document).ready(function() {
        console.log("JQ READY");
    });
})(jQuery);
*/
