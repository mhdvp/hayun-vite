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
      <div id="forms"></div>
    `);

    const container = document.getElementById('forms')
    this.forms = new Forms({ container, templates: [templCombo, templAudiometry], mode: 'develop' });
  }

  update({ officeData, patientData, sessionIndex }) {
    officeData && (this.officeData = officeData);
    patientData && (this.patientData = patientData);
    this.currentSessionPatientData = patientData.sessions[sessionIndex]
    this.forms.update({ officeData, patientData, sessionIndex })
  }

}

export default new formsUI()




