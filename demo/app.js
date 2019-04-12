import ComponentMain from './component-main';

document.addEventListener("DOMContentLoaded",
    (event) => {
        let body = document.querySelector('body');
        body.appendChild(new ComponentMain());
    });