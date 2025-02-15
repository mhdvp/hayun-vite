// import './style.css'
import AudiogramChart from "./Audiogram/Audiogram.js"
import dims from './Audiogram/dims.js'
import Forms from "./Form/Forms.js";
import { officeData, patientData } from "../data/sampleData.js"

document.querySelector('#app').innerHTML = `
    <div id="audiogram-div" style="max-width: 700px;"></div>
    <div id="forms-div"></div>
`
const forms = new Forms({ container: document.getElementById('forms-div'), name: 'form1' });
forms.update({ officeData, patientData, sessionIndex: 0 })

const RAudiogram = new AudiogramChart({
  container: document.getElementById('audiogram-div'),
  dims: dims.display,
  side: 'R',
})

const LAudiogram = new AudiogramChart({
  container: document.getElementById('audiogram-div'),
  dims: dims.display,
  side: 'L',
})

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

LAudiogram.update({
  data: {
    // R_AC_M: { 8000: 25, 2000: 5, 1500: 0, },
    L_AC: { 1000: 25, 500: 15, 750: 20, 250: 10, 6000: 35, 2000: 45 },
    L_AC_NR: { 1500: 85 },
    L_BC_M: { 2000: 25, 6000: 25 },
    L_BC_M_NR: { 3000: 85 },
    L_BC: { 1000: 20, 500: 10, 750: 15, 250: 5, 4000: 20 },
  },
  side: 'L',
})




// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


