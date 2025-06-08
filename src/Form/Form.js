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

    update({ officeData, patientData, sessionIndex = 0 }) {

        const session = patientData.sessions[sessionIndex]

        let data = {
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
        if (JSON.stringify(this.data.header) !== JSON.stringify(data.header) && data.header) {
            this.header?.update(data.header)
            this.data.header = data.header
        }
        // }
        // if (keys.includes("patient")) {
        if (JSON.stringify(this.data.patient) !== JSON.stringify(data.patient) && data.patient) {
            this.patient?.update(data.patient)
            this.data.patient = data.patient
        }
        // }
        // if (keys.includes("history")) {
        if (JSON.stringify(this.data.history) !== JSON.stringify(session?.history) && session?.history) {
            this.history?.update(session?.history)
            this.data.history = session.history
        }
        // }
        // if (keys.includes("audiogram")) {
        if (JSON.stringify(this.data.audiogram) !== JSON.stringify(session.audiogram) && session.audiogram) {
            this.RAudiogram?.update({ data: session.audiogram?.R, side: 'R' })
            this.LAudiogram?.update({ data: session.audiogram?.L, side: 'L' })
        }
        this.data.audiogram = session.audiogram
        // }
        // if (keys.includes("speech")) {
        if (JSON.stringify(this.data.speech) !== JSON.stringify(session.speech) && session.speech) {
            this.RSpeech?.update(session.speech?.R)
            this.LSpeech?.update(session.speech?.L)
        }
        this.data.speech = session.speech
        // }
        // if (keys.includes("tympanogram")) {
        if (JSON.stringify(this.data.tympanogram) !== JSON.stringify(session.tympanogram) && session.tympanogram) {
            this.RTympanogram?.update(session.tympanogram?.R)
            this.LTympanogram?.update(session.tympanogram?.L)
        }
        this.data.tympanogram = session.tympanogram;
        // }
        // if (keys.includes("reflex")) {
        if (JSON.stringify(this.data.reflex) !== JSON.stringify(session.reflex) && session.reflex) {
            this.RReflex?.update(session.reflex?.R)
            this.LReflex?.update(session.reflex?.L)
        }
        this.data.reflex = session.reflex;
        // }
        // if (keys.includes("report")) {
        if (JSON.stringify(this.data.report) !== JSON.stringify(session.report) && session.report) {
            this.report?.update(session.report)
            this.data.report = session.report
        }
        // }
        // if (keys.includes("footer")) {
        if (JSON.stringify(this.data.footer) !== JSON.stringify(data.footer) && data.footer) {
            this.footer?.update(data?.footer)
            this.data.footer = data.footer
        }
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