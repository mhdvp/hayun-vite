import { officeData, patientData } from "../../assets/data/sampleData";
import templAudiometry from "../../assets/templates/templAudiometry";
import templCombo from "../../assets/templates/templCombo";
import Forms from "./Forms";

document.querySelector('#app').insertAdjacentHTML('beforeend', `
    <button type="button" id="update-form">Update Form</button>

    <div id="forms"></div>
`);

const container = document.getElementById('forms')

const forms = new Forms({ container, templates: [templCombo,], mode: 'develop' });

// forms.update({ officeData, patientData, sessionIndex: 0 })
// forms.update({ officeData, patientData, sessionIndex: 1 })

document.querySelector('#update-form').addEventListener('click', e => {
    console.log(patientData.sessions[0].speech.R.SAT);

    forms.update({ officeData, patientData, sessionIndex: 0 })



})



