// import _ from 'lodash';
import imagesLoaded from 'imagesloaded';
import "../JPRO_1/css/style.less";

(function($) {
    function component() {
        const element = document.createElement('div');

        // Lodash, currently included via a script, is required for this line to work
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');

        return element;
    }

    $(document).ready(function() {
        console.log("JQ READY");
        document.body.classList.add('loading');

        setTimeout(() => document.body.classList.add('render'), 60);
        const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
        const total = navdemos.length;
        const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
        const navigate = (linkEl) => {
            document.body.classList.remove('render');
            document.body.addEventListener('transitionend', () => window.location = linkEl.href);
        };
        navdemos.forEach(link => link.addEventListener('click', (ev) => {
            ev.preventDefault();
            navigate(ev.target);
        }));
        document.addEventListener('keydown', (ev) => {
            const keyCode = ev.keyCode || ev.which;
            let linkEl;
            if ( keyCode === 37 ) {
                linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
            }
            else if ( keyCode === 39 ) {
                linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
            }
            else {
                return false;
            }
            navigate(linkEl);
        });

        imagesLoaded('.glitch__img', { background: true }, () => {
            document.body.classList.remove('loading');
            document.body.classList.add('imgloaded');
        });

    });
})(jQuery);

