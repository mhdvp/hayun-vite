import Audiogram from "./Audiogram";

document.querySelector('#app').innerHTML = `
    <div id="test"></div>
`;

const container = document.getElementById('test')

const dims = {
  "blank": false,
  "name": "RAudiogram",
  "w": 100,
  "h": 90,
  "margin": {
    "left": 1,
    "top": 1,
    "right": 1,
    "bottom": 1
  },
  "display": "inline",
  "borderBox": "display",
  "width": 600,
  "height": 600
}

const RAudiogram = new Audiogram({ container, side: 'R', dims })
RAudiogram.update({
  data: {
    // R_AC_M: { 8000: 25, 2000: 5, 1500: 0, },
    R_AC: { 1000: 25, 500: 15, 750: 20, 250: 10, 6000: 35, 2000: 45 },
    R_AC_NR: { 1500: 85 },
    R_BC_M: { 2000: 25, 6000: 25 },
    R_BC_M_NR: { 3000: 85 },
    R_BC: { 1000: 20, 500: 10, 750: 15, 250: 5, 4000: 20 },
  },
  side: 'R',
})