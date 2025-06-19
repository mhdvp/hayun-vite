import { officeData, patientData } from "../../assets/data/sampleData";
import templAudiometry from "../../assets/templates/templAudiometry";
import templCombo from "../../assets/templates/templCombo";
import Forms from "./Forms";

export default function formsUI({ data = {} } = {}) {
  document.querySelector('#app').insertAdjacentHTML('beforeend', `
    <button type="button" id="update-form">Update Form</button>
    <div id="forms"></div>
`);

  const container = document.getElementById('forms')

  const forms = new Forms({ container, templates: [templCombo, templAudiometry], mode: 'develop' });
  forms.update({ officeData, patientData, sessionIndex: 0 })

  // forms.forms[0].RSpeech.update({ SAT: 555 })

  let dims = {
    "name": "RSpeech",
    "w": 89,
    "h": 15,
    "margin": {
      "left": 1,
      "top": 0,
      "right": 10,
      "bottom": 0
    },
    "display": "inline",
    "stroke": true,
    "width": 100 * 5,
    "height": 20 * 5,
    "labels": [
      "SAT",
      "SRT",
      "MCL",
      "UCL",
      "SDS"
    ]
  }
  // forms.forms[0].RSpeech.draw({ container, dims })
  // forms.update({ officeData, patientData, sessionIndex: 0 })
  // forms.update({ officeData, patientData, sessionIndex: 1 })

  document.querySelector('#update-form').addEventListener('click', e => {
    console.log(patientData.sessions[0].speech.R.SAT);

    forms.update({ officeData, patientData, sessionIndex: 0 })

  })
}





