// One of common forms that we initial Audiolog with that. We could disign variants of forms later.
import offices from "./officesObjStore.js"
import patients from "./patientsObjStore.js";


const formData1 = {
  common: {
    audiometer: offices[0].audiometers[0],
    tympanometers: offices[0].tympanometers[0],

  },
  header: {
    officeName: offices[0].name,
    officeLogo: offices[0].logo,
    dateValue: "۱۴۰۳/۵/۱۸", //be gotten from now Date
    numForm: "۱۳"
  },
  patient: {

    name: patients[0].name,
    lastName: patients[0].lastName,
    gender: patients[0].gender,
    age: patients[0].age,
    referrer: patients[0].sessions[0].referrer,
    history: patients[0].sessions[0].history,

  },
  audiogram: patients[0].sessions[0].audiogram,
  speech: patients[0].sessions[0].speech,
  tympanogram: patients[0].sessions[0].tympanogram,
  reflex: patients[0].sessions[0].reflex,
  report: {
    report: patients[0].sessions[0].report,
  },
  footer: {
    address: offices[0].address,
    tel: offices[0].tel,

  }
};

export { formData1 };
