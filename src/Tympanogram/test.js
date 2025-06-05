import Tympanogram from "./Tympanogram";

document.querySelector('#app').innerHTML = `
    <div id="test"></div>
`;

const container = document.getElementById('test')

const dims = {
    "name": "RTympanogram",
    "w": 100,
    "h": 60,
    "margin": {
        "left": 2,
        "top": 0,
        "right": 2,
        "bottom": 0
    },
    "display": "inline",
    "width": 100 * 12,
    "height": 60 * 12
}
const RTympanogram = new Tympanogram({ container, dims, side: 'R' })
RTympanogram.update({
    Type: "An",
    ECV: '3',
    SC: '1.5',
    MEP: '-150',
    G: 0.2,
    expanded: false, // by default is false for expand pressure from -600 to +400
    // extraCompliance: true // by default is false (0 - 3) and true is: (0 - 6)


})