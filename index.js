import Audiogram from './src/Audiogram/Audiogram'
import dims from './src/Audiogram/dims'
import { officeData, patientData } from './assets/data/sampleData'
import Forms from './src/Forms/Forms'
import combo_template from './assets/templates/templCombo'
import './styles.css'
import formsUI from './src/Forms/FormsUI'
// import './src/style.css'
// import './src/Speech/ui.js'



// import rasa_aud_template from './assets/templates/rasa_audiometry'
// import rasa_tymp_reflex_template from './assets/templates/rasa_tymp_reflex'

import logo0 from './assets/logos/logo-0_mm_20w_22h_300p.png'
import logo1 from './assets/logos/logo-1.png'
import logo2 from './assets/logos/logo-2.png'
import Speech from './src/Speech/Speech'
// import { ReflexUI } from './src/components'
import speechUI from './src/Speech/SpeechUI'

const logos = [logo0, logo1, logo2]




export {
    Audiogram, Forms, dims, officeData,
    patientData, combo_template,
    logos, Speech, speechUI, formsUI

} 