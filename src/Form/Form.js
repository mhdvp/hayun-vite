import Audiogram from "../Audiogram/Audiogram_N.js";
import putLine from "../common/putLine.js";
import drawTopLayer from "../common/putTopLayer.js";
import Symbols from "../Symbol/Symbols.js";
import TextBox from "./TextBox.js";
import Header from "./Header.js";
import Reflex from "./Reflex.js";
import Sections from "./Sections.js";
import Speech from "./Speech.js";
import Tympanogram from "./Tympanogram.js";
import AudiogramChart from "../Audiogram/AudiogramChart_N.js";
import dims from "../Audiogram/dims.js";
import putRect from "../common/putRect.js";
const svgNS = "http://www.w3.org/2000/svg";




export default class Form {
    constructor({ container, template, image } = {}) {
        this.image = image;
        // const dims = template;
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

        this.symbols = new Symbols();

        if (sections.RAudiogram) {
            this.RAudiogram = new AudiogramChart({
                container: sections.RAudiogram,
                dims: template.RAudiogram,
                side: 'R',
            });
        }
        if (sections.LAudiogram) {
            this.LAudiogram = new AudiogramChart({
                container: sections.LAudiogram,
                dims: template.LAudiogram,
                side: 'L',
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
            this.RTympanogram = new Tympanogram({ container: sections.RTympanogram, dims: template.RTympanogram })
            this.RTympanogram.draw({ dims: template.RTympanogram });
        }
        if (sections.LTympanogram) {
            this.LTympanogram = new Tympanogram({ container: sections.LTympanogram, dims: template.LTympanogram })
            this.LTympanogram.draw({ dims: template.LTympanogram });
        }
        if (sections.RReflex) {
            this.RReflex = new Reflex({ container: sections.RReflex, dims: template.RReflex })
            this.RReflex.draw({ dims: template.RReflex });
        }
        if (sections.LReflex) {
            this.LReflex = new Reflex({ container: sections.LReflex, dims: template.LReflex })
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

    draw() {

        let pad;
        let style = `
            user-select: none;
            direction: ltr !important;
            /* text-align: center; */
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 1.3mm;
            font-weight: bold;
            color: red;
             text-anchor: middle; /*تراز افقی*/
             dominant-baseline: middle; /* تراز عمودی*/       
        `;
        // Draw Titles first
        // putText({ container: this.sections.audiograms, value: "Right Ear", x: 42.5, y: 4, style: style })
        // putText({ container: this.sections.speechs, value: "Speech Tests", x: this.sectionWidth / 2, y: 4, style: style })
        // putText({ container: this.sections.tympanograms, value: "Tympanometry", x: this.sectionWidth / 2, y: 4, style: style })
        // putText({ container: this.sections.reflexes, value: "Acoustic Reflexes", x: this.sectionWidth / 2, y: 4, style: style })


        // برای مخفی کردن بوردرها تابع تاگل بوردر همین جا فراخوانی شود
        // this.toggleBorders({ container: 'form' })
        // this.toggleBorders({ container: 'section' })
        // this.toggleBorders({ container: 'element' })


        // بعد از رسم همه المنت ها یک المنت مستطیل تاپ لایر
        // drawTopLayer({ container: this.form, dims: this.sections.dims });
    }

    create({ paper, margin }) {
        const { width, height } = paper;
        const { left, top } = margin;

        const backgroundImage = this.template.backgroundImage;
        let svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", [-left, -top, width, height])
        svg.setAttribute("style", "background-color: BlanchedAlmond");
        if (this.image) {
            let image = document.createElementNS(svgNS, "image");
            image.setAttribute('width', width);
            image.setAttribute('height', height);

            image.setAttribute('x', 0)
            image.setAttribute('y', 0)
            // image.setAttribute('height', height);
            image.setAttribute('href', this.image);
            
            svg.appendChild(image);
        }

        // div.appendChild(svg);
        return svg;
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
                    age: patientData.sessions[sessionIndex]?.age,
                    referrer: patientData.sessions[sessionIndex]?.referrer,

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
        putRect({ container, x: 0, y: 0, width, height, style })
        // Horizontal Lines
        // putLine({
        //     container: container, x1: 0, y1: margin.top,
        //     x2: width, y2: margin.top, style: style, name: 'form-border'
        // })
        // putLine({
        //     container: container, x1: 0, y1: height - margin.bottom,
        //     x2: width, y2: height - margin.bottom, style: style, name: 'form-border'
        // })
        // // Vertical Lines
        // putLine({
        //     container: container, x1: margin.left, y1: 0,
        //     x2: margin.left, y2: height, style: style, name: 'form-border'
        // })
        // putLine({
        //     container: container, x1: width - margin.right, y1: 0,
        //     x2: width - margin.right, y2: height, style: style, name: 'form-border'
        // })
        // // Middle Line
        // putLine({
        //     container: container, x1: width / 2, y1: 0,
        //     x2: width / 2, y2: height, style: style, name: 'form-border'
        // })
    }
}