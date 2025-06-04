// import './style.css'
import Audiogram from "./Audiogram/Audiogram.js"
import Forms from "./Forms/Forms.js";
import { officeData, patientData } from "../assets/data/sampleData.js"
import template from "../assets/templates/template_combo.js";
import Tympanogram from "./Tympanogram/Tympanogram.js";
import Speech from "./Speech/Speech.js";
import Reflex from "./Reflex/Reflex.js";
import MultiText from "./MultiText/MultiText.js";



document.querySelector('#app').innerHTML = `
    <div id="test"></div>
    <div id="audiogram-div"></div>
    <div id="forms-div"></div>
`;

const container = document.getElementById('test')

let dims = {
  "name": "RSpeech",
  "w": 100,
  "h": 15,
  "margin": {
    "left": 2,
    "top": 0,
    "right": 12,
    "bottom": 0
  },
  "display": "inline",
  "stroke": true,
  "width": 100 * 6,
  "height": 20 * 6,
  "labels": [
    "SAT",
    "SRT",
    "MCL",
    "UCL",
    "SDS"
  ]
}

// const RSpeech = new Speech({ container, side: 'R' , dims})
// RSpeech.update({ MCL: '55', SAT: '25', SDS: '98', UCL: '120', SRT: '30' })

dims = {
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
  "width": 100 * 6,
  "height": 60 * 6
}

// const RTympanogram = new Tympanogram({ container, side: 'R', dims })

dims = {
  "name": "RReflex",
  "w": 100,
  "h": 28,
  "margin": {
    "left": 2,
    "top": 2,
    "right": 2,
    "bottom": 0
  },
  "display": "inline",
  "width": 100 * 6,
  "height": 30 * 6
}

// const RReflex = new Reflex({ container, side: 'R' , dims})

dims = {
  "name": "patient",
  "w": 200,
  "h": 8,
  "margin": {
    "left": 1,
    "top": 0,
    "right": 1,
    "bottom": 0
  },
  "display": "block",
  "width": 198,
  "height": 8,
  "elements": [
    {
      "type": "text",
      "x": 198,
      "y": 5,
      "value": "نام:"
    },
    {
      "type": "text",
      "x": 160,
      "y": 5,
      "value": "نام خانوادگی:"
    },
    {
      "type": "text",
      "x": 108,
      "y": 5,
      "value": "سن:"
    },
    {
      "type": "text",
      "x": 68,
      "y": 5,
      "value": "ارجاع از:"
    }
  ],
  "inputs": [
    {
      "name": "name",
      "x": 191,
      "y": 5
    },
    {
      "name": "lastName",
      "x": 139,
      "y": 5
    },
    {
      "name": "age",
      "x": 100,
      "y": 5
    },
    {
      "name": "referrer",
      "x": 55,
      "y": 5
    }
  ],
  "forceInputs": [
    {
      "name": "name",
      "x": 188,
      "y": 4
    },
    {
      "name": "lastName",
      "x": 151,
      "y": 5
    },
    {
      "name": "age",
      "x": 101,
      "y": 5
    },
    {
      "name": "referrer",
      "x": 56,
      "y": 5
    }
  ]
}

// const patient = new MultiText({ container, dims })

dims = {
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

// const RAudiogram = new Audiogram({ container, side: 'R', dims })
// RAudiogram.update({
//   data: {
//     // R_AC_M: { 8000: 25, 2000: 5, 1500: 0, },
//     R_AC: { 1000: 25, 500: 15, 750: 20, 250: 10, 6000: 35, 2000: 45 },
//     R_AC_NR: { 1500: 85 },
//     R_BC_M: { 2000: 25, 6000: 25 },
//     R_BC_M_NR: { 3000: 85 },
//     R_BC: { 1000: 20, 500: 10, 750: 15, 250: 5, 4000: 20 },
//   },
//   side: 'R',
// })

const forms = new Forms({ container: document.getElementById('forms-div'), templates: [template], mode: 'production' });
forms.update({ officeData, patientData, sessionIndex: 0 })




/*
const LAudiogram = new Audiogram({  container: document.getElementById('audiogram-div'), side: 'L', })



LAudiogram.update({
  data: {
    // R_AC_M: { 8000: 25, 2000: 5, 1500: 0, },
    L_AC: { 1000: 30, 500: 20, 750: 30, 250: 5, 6000: 35, 2000: 45 },
    L_BC_M: { 2000: 25, 6000: 25 },
    L_BC: { 1000: 20, 500: 10, 750: 15, 250: 5, 4000: 20 },
  },
  side: 'L',
})

*/




