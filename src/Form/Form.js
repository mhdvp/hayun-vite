import Header from "../Header/Header.js";
import Reflex from "../Reflex/Reflex.js";
import Sections from "./Sections.js";
import Speech from "../Speech/Speech.js";
import Tympanogram from "../Tympanogram/Tympanogram.js";
import putRect from "../common/putRect.js";
import AudiogramChart from "../Audiogram/Audiogram.js";
import MultiText from "../MultiText/MultiText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Form {
    constructor({ container, template, mode = "production" } = {}) {
        this.template = template;
        this.container = container;
        this.mode = mode;
        this.data = {};
        let { width, height, margin, paper } = template;
        this.svg = this.create({ paper, margin }); // اس‌وی‌جی مادر فرم را صفحه نامگذاری میکنیم بذاریم همون اس‌وی‌جی؟
        this.svg.style.display = 'none';
        let dims;
        // رسم مارجین های فرم
        this.drawMarginLines({ container: this.svg, width, height });

        const sections = new Sections({ container: this.svg, dims: template });
        this.sections = sections;

        if (sections.header) {
            this.header = new Header({ container: sections.header })
            this.header.draw({ dims: template.header });
        }
        if (sections.patient) {
            dims = template.patient;
            this.patient = new MultiText({ container: sections.patient, dims });
        }
        if (sections.history) {
            dims = template.history;
            this.history = new MultiText({ container: sections.history, dims })
            // this.history.draw({ dims: template.history });
        }
        if (sections['Audiogram Titles']) {
            dims = template['Audiogram Titles'];
            new MultiText({ container: sections['Audiogram Titles'], dims });
        }
        if (sections.RAudiogram) {
            this.RAudiogram = new AudiogramChart({
                container: sections.RAudiogram,
                dims: template.RAudiogram,
                side: 'R',
                events: false
            })
        }
        if (sections.LAudiogram) {
            this.LAudiogram = new AudiogramChart({
                container: sections.LAudiogram,
                dims: template.LAudiogram,
                side: 'L',
                events: false
            })
        }
        if (sections['Speech Titles']) {
            dims = template['Speech Titles'];
            const titles = new MultiText({ container: sections['Speech Titles'], dims });
        }
        if (sections['RSpeech']) {
            dims = template.RSpeech
            this.RSpeech = new Speech({ container: sections.RSpeech, side: 'R', dims })
        }
        if (sections.LSpeech) {
            dims = template.LSpeech
            this.LSpeech = new Speech({ container: sections.LSpeech, side: 'L', dims })
        }
        if (sections['Tympanogram Titles']) {
            dims = template['Tympanogram Titles'];
            new MultiText({ container: sections['Tympanogram Titles'], dims });
        }
        if (sections.RTympanogram) {
            dims = template.RTympanogram
            this.RTympanogram = new Tympanogram({ container: sections.RTympanogram, side: 'R', dims })
        }
        if (sections.LTympanogram) {
            dims = template.LTympanogram
            this.LTympanogram = new Tympanogram({ container: sections.LTympanogram, side: 'L', dims })
        }
        if (sections['Reflex Titles']) {
            dims = template['Reflex Titles'];
            const titles = new MultiText({ container: sections['Reflex Titles'], dims });
        }
        if (sections.RReflex) {
            dims = template.RReflex
            this.RReflex = new Reflex({ container: sections.RReflex, side: 'R', dims })
        }
        if (sections.LReflex) {
            dims = template.LReflex
            this.LReflex = new Reflex({ container: sections.LReflex, side: 'L', dims })
        }
        if (sections.report) {
            dims = template.report;
            this.report = new MultiText({ container: sections.report, dims })
        }
        if (sections.footer) {
            dims = template.footer;
            this.footer = new MultiText({ container: sections.footer, dims })
        }

        this.container.appendChild(this.svg);

        this.addEvent()
    }

    create({ paper, margin }) {
        const { width, height } = paper;
        const { left, top } = margin;

        const backgroundImage = this.template.backgroundImage;

        let svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", [-left, -top, width, height])
        svg.setAttribute("style", "background-color: BlanchedAlmond");
        if (backgroundImage) {
            let image = document.createElementNS(svgNS, "image")
            image.setAttribute('class', 'no-print')
            image.setAttribute('width', width)
            // image.setAttribute('height', height)

            image.setAttribute('x', 0)
            image.setAttribute('y', 0)
            // image.setAttribute('height', height);
            image.setAttribute('href', backgroundImage)

            svg.appendChild(image)
        }
        return svg
    }

    update({ officeData, patientData, sessionIndex }) {
        // جداکردن دیتای مربوط به سکشن های مختلف

        const { title, logos, selectedLogoIndex, addresses, tels, selectedAddressIndex, selectedTelIndex } = officeData
        const { name, lastName, age, referrer } = patientData
        const currentPatientData = patientData.sessions[sessionIndex]
        const { audiogram, speech, tympanogram, reflex, history, report } = currentPatientData

        const data = {
            header: { title, logo: logos[selectedLogoIndex] },
            patient: { name, lastName, age, referrer },
            audiogram, speech, tympanogram, reflex, history, report,
            footer: { address: addresses[selectedAddressIndex], tel: tels[selectedTelIndex] },
        }

        this.header?.update(data.header)
        this.patient?.update(data.patient)
        this.history?.update(data.history)
        this.report?.update(data.report)
        this.footer?.update(data.footer)
        data?.audiogram?.R && this.RAudiogram?.update({ data: data.audiogram.R, side: 'R' })
        data?.audiogram?.L && this.LAudiogram?.update({ data: data.audiogram.L, side: 'L' })
        data?.speech?.R && this.RSpeech?.update(data?.speech?.R)
        data?.speech?.L && this.LSpeech?.update(data?.speech?.L)
        data?.tympanogram?.R && this.RTympanogram?.update(data.tympanogram?.R)
        data?.tympanogram?.L && this.LTympanogram?.update(data.tympanogram?.L)
        data?.reflex?.R && this.RReflex?.update(data?.reflex?.R)
        data?.reflex?.L && this.LReflex?.update(data?.reflex?.L)
        /*

        const session = patientData.sessions[sessionIndex]

        let objData = {
            header: {
                officeName: officeData.name,
                officeLogo: officeData.logos[officeData.selectedLogoIndex],
                createDate: patientData.sessions[sessionIndex]?.createDate,
            },
            patient: {
                name: patientData.name,
                lastName: patientData.lastName,
                gender: patientData?.gender,
                // خط زیر محاسبه درست سن هست. موقتا کامنت می‌شود تا در اپ اصلی فیلد سن رو در سشن ها قرار دهیم
                // age: patientData.sessions[sessionIndex]?.age,
                age: patientData?.age,
                referrer: patientData.sessions[sessionIndex]?.referrer,
                date: new Date().toLocaleDateString('fa-IR'),
            },
            footer: {
                address: officeData.addresses[0],
                tel: officeData.tels[0],
            },
            id: +sessionIndex + 1,
        };

        // let keys = Object.keys(data)
        // if (keys.includes("header")) {
        if (objData.header) {
            this.header?.update(objData.header)
            this.data.header = objData.header
        }
        // }
        // if (keys.includes("patient")) {
        if (objData.patient) {
            this.patient?.update(objData.patient)
            this.data.patient = objData.patient
        }
        // }
        // if (keys.includes("history")) {
        if (session?.history) {
            this.history?.update(session?.history)
            this.data.history = session.history
        }
        // }
      

        */
    }

    // خطوط نقطه چین مارجین فرم
    drawMarginLines({ container, width, height }) {
        // console.log(container.attributes.viewBox);

        const style = `
            stroke: black;
			stroke-width: 0.3;
			stroke-opacity: 0.5;
            stroke-dasharray: 0.5;
            fill: transparent;
        `;
        putRect({ container, x: 0, y: 0, width, height, style, className: 'no-print' })
    }

    // افزودن رویداد کلیک روی فرم
    addEvent({ } = {}) {
        this.svg.addEventListener("click", e => {
            console.log(e.target.dataset['name']);

        })
    }
}