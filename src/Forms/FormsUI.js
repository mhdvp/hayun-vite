import { officeData, patientData } from "../../assets/data/sampleData";
import templAudiometry from "../../assets/templates/templAudiometry";
import templCombo from "../../assets/templates/templCombo";
import Forms from "./Forms";

class formsUI {
  constructor() {
    this.data = {}

  }

  draw({ containerId = '#app' }) {
    document.querySelector(containerId).insertAdjacentHTML('beforeend', `
      <button type="button" id="update-form">Update Form</button>
      <div id="forms"></div>
    `);

    const container = document.getElementById('forms')

    this.forms = new Forms({ container, templates: [templCombo, templAudiometry], mode: 'develop' });
    // forms.update({ officeData, patientData, sessionIndex: 0 })
    // forms.update({ data })

    document.querySelector('#update-form').addEventListener('click', e => {
      // forms.update({ data, officeData, patientData, sessionIndex: 0 })

    })
  }

  update({ officeData, patientData, sessionIndex = 0 }) {
    officeData && (this.officeData = officeData);
    patientData && (this.patientData = patientData);
    this.currentPatientData = patientData.sessions[sessionIndex]
    this.forms.update({ data: patientData.sessions[sessionIndex] })
  }

}

export default new formsUI()




