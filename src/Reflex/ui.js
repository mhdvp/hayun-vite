import Reflex from "./Reflex";

document.querySelector('#app').insertAdjacentHTML('beforeend', `
    <div id="reflex"></div>
`);
const dims = {
    "name": "RTympanogram",
    "w": 100,
    "h": 30,
    "margin": {
        "left": 1,
        "top": 0,
        "right": 10,
        "bottom": 0
    },
    "display": "inline",
    "width": 100 * 6,
    "height":30 *6 
}
const container = document.getElementById('reflex')

const RReflex = new Reflex({ container, dims });




