// import Symbols from "../Symbol/Symbols.js";
import TextBox from "./TextBox.js";
import Header from "./Header.js";
import Reflex from "./Reflex.js";
import Sections from "./Sections.js";
import Speech from "./Speech.js";
import Tympanogram from "./Tympanogram.js";
import putRect from "../common/putRect.js";
import AudiogramChart from "../Audiogram/Audiogram.js";
const svgNS = "http://www.w3.org/2000/svg";


export default class Form {
    constructor({ container, template } = {}) {
        this.template = template;
        this.container = container;
        this.data = {};
        let { width, height, margin, paper } = template;
        this.form = this.create({ paper, margin });
        this.form.style.display = 'none';
        // رسم مارجین های فرم
        this.drawMarginLines({ container: this.form, width, height });
        
        const sections = new Sections({ container: this.form, dims: template });
        this.sections = sections;
        
        (template.label === 'تمپانومتری رسا') && console.log(template.patient);
        
        if (sections.header) {
            this.header = new Header({ container: sections.header })
            this.header.draw({ dims: template.header });
        }

        if (sections.patient) {
            this.patient = new TextBox({ container: sections.patient });
            this.patient.draw({ dims: template.patient });
        }

        if (sections.history) {
            this.history = new TextBox({ container: sections.history })
            this.history.draw({ dims: template.history });
        }

        if (sections.RAudiogram) {
            this.RAudiogram = new AudiogramChart({
                container: sections.RAudiogram,
                dims: template.RAudiogram,
                side: 'R',
                events: false
            });
        }
        
        if (sections.LAudiogram) {
            this.LAudiogram = new AudiogramChart({
                container: sections.LAudiogram,
                dims: template.LAudiogram,
                side: 'L',
                events: false
            });
        }
        if (sections.RSpeech) {
            this.RSpeech = new Speech({ container: sections.RSpeech, side: 'R' })
            this.RSpeech.draw({ dims: template.RSpeech, })
        }
        if (sections.LSpeech) {
            this.LSpeech = new Speech({ container: sections.LSpeech, side: 'L' })
            this.LSpeech.draw({ dims: template.LSpeech, });
        }
        if (sections.RTympanogram) {
            this.RTympanogram = new Tympanogram({ container: sections.RTympanogram, side: 'R' })
            this.RTympanogram.draw({ dims: template.RTympanogram });
        }
        if (sections.LTympanogram) {
            this.LTympanogram = new Tympanogram({ container: sections.LTympanogram, side: 'L' })
            this.LTympanogram.draw({ dims: template.LTympanogram });
        }
        if (sections.RReflex) {
            this.RReflex = new Reflex({ container: sections.RReflex, side: 'R' })
            this.RReflex.draw({ dims: template.RReflex });
        }
        if (sections.LReflex) {
            this.LReflex = new Reflex({ container: sections.LReflex, side: 'L' })
            this.LReflex.draw({ dims: template.LReflex });
        }
        if (sections.report) {
            this.report = new TextBox({ container: sections.report })
            this.report.draw({ dims: template.report });
        }
        if (sections.footer) {
            this.footer = new TextBox({ container: sections.footer })
            this.footer.draw({ dims: template.footer });
        }

        this.container.appendChild(this.form);
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

    update({ data, officeData, patientData, sessionIndex = 0 }) {

        const session = patientData.sessions[sessionIndex]
        // Prevent undefined error 
        if (!data) {
            data = {
                common: {
                    audiometer: "",
                    tympanometers: "",
                },
                header: {
                    officeName: officeData.name,
                    officeLogo: officeData.logo,
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
            // data = { audiogram: {}, common: {}, footer: {}, header: {}, patient: {}, reflex: {}, report: {}, speech: {}, tympanometry: {} }
        }
        // find which data reach and then call corresponding update function
        // get array of keys (audiogram, header, footer, ...)
        let keys = Object.keys(data)
        // if (keys.includes("header")) {

        this.header?.update(data.header)
        // }
        // if (keys.includes("patient")) {
        this.patient?.update(data.patient)
        // }
        // if (keys.includes("history")) {

        this.history?.update(session?.history)
        this.data.history = session.history;
        // }
        // if (keys.includes("audiogram")) {
        this.RAudiogram?.update({ data: session.audiogram?.R, side: 'R' })
        this.LAudiogram?.update({ data: session.audiogram?.L, side: 'L' })
        this.data.audiogram = session.audiogram
        // }
        // if (keys.includes("speech")) {
        this.RSpeech?.update(session.speech?.R)
        this.LSpeech?.update(session.speech?.L)
        this.data.speech = session.speech
        // }
        // if (keys.includes("tympanogram")) {
        this.RTympanogram?.update(session.tympanogram?.R)
        this.LTympanogram?.update(session.tympanogram?.L)
        this.data.tympanogram = session.tympanogram;
        // }
        // if (keys.includes("reflex")) {
        this.RReflex?.update(session.reflex?.R)
        this.LReflex?.update(session.reflex?.L)
        this.data.tympanogram = session.reflex;
        // }
        // if (keys.includes("report")) {
        this.report?.update(session.report)
        this.data.report = session.report;
        // }
        // if (keys.includes("footer")) {
        // console.log("footer Data:", data?.footer);

        this.footer?.update(data?.footer)
        this.data.footer = data.footer;
        // }
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
}