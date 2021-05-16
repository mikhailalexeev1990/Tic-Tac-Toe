import Vue from 'vue';
import Game from './Game';

document.addEventListener("DOMContentLoaded", () => {
    let el = document.querySelector('#app');
    if (el) {
        new Vue({
            el,
            components: {
                Game
            },
            template: '<Game/>'
        });
    }
});
