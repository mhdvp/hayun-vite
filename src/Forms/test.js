import { officeData, patientData } from "../../assets/data/sampleData";
import templAudiometry from "../../assets/templates/templAudiometry";
import templCombo from "../../assets/templates/templCombo";
import Forms from "./Forms";

document.querySelector('#app').innerHTML = `
    <div id="test"></div>
`;

const container = document.getElementById('test')

const forms = new Forms({ container, templates: [templCombo,], mode: 'develop' });

// forms.update({ officeData, patientData, sessionIndex: 0 })
forms.update({ officeData, patientData, sessionIndex: 1 })

// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 1 })
// forms.update({ officeData, patientData, sessionIndex: 0 })
// forms.update({ officeData, patientData, sessionIndex: 0 })
// forms.update({ officeData, patientData, sessionIndex: 0 })

// خط برای کپی پیست نقشی در کد ندارد


