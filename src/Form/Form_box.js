import Header from "../Header/Header_box.js";
import Speech from "../Speech/Speech_box.js";
import putRect from "../common/putRect.js";
import Audiogram from "../Audiogram/Audiogram_box.js";
import mainTemplate from "../../assets/templates/mainTemplate.js";
import putSVG from "../common/putSVG.js";
import MultiText from "../MultiText/MultiText_box.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Form {
    constructor({ container, template } = {}) {
        this.template = mainTemplate;
        this.container = container;
        this.data = {};
        let { width, height, margin, paper, sections } = mainTemplate;

        this.form = this.create({ paper, margin }); // Printable Area

        this.form.style.display = 'none'; // فرم نامرئی ایجاد میشود و بعدا مرئی می‌شود
        // رسم مارجین های فرم
        this.drawMarginLines({ container: this.form, width, height });

        sections.forEach(section => {
            this.createSection(section)
            this.createBox(section)

            const box = section.box

            switch (section.name) {
                case 'header':
                    const header = new Header({ box })
                    break;
                case 'patientInfo':
                    const patientInfo = new MultiText({ box })
                    break;
                case 'history':
                    break;
                case 'RAudiogram':
                    const RAudiogram = new Audiogram({ box, container: box.container, side: 'R', events: false })
                    break;
                case 'LAudiogram':
                    // const LAudiogram = new Audiogram({ container: box.container, side: 'L', dims: box, events: false })
                    break;
                case 'RSpeech':
                    const RSpeech = new Speech({ box })
                    break;

                default:
                    break;
            }
        });

        // this.createBox(sections[0])
        // this.createElements(sections[0].box)
        // let box = sections[0].box

        // const header = new Header({ box })

        // box = sections[1].box



        this.container.appendChild(this.form);
    }

    // Sections With Brown Color Border
    createSection(section) {
        // console.log(dims);
        const { width, height, top, left } = section;
        const style = ['fill: transparent', 'stroke: brown', 'stroke-width: 0.2'].join(';')
        const container = putSVG({ container: this.form, x: left, y: top, width, height })

        putRect({ container, x: 0, y: 0, width, height, style })
        // اضافه کردن پراپرتی اس‌وی‌جی به آبجکت سکشن
        section['container'] = container;
        // console.log(section);

    }

    // Boxes Width Blue Color Border
    createBox(section) {
        const { width, height, margin } = section.box
        const style = ['fill: transparent', 'stroke: blue', 'stroke-width: 0.2'].join(';')
        const container = putSVG({ container: section.container, x: margin.left, y: margin.top, width, height })
        putRect({ container, x: 0, y: 0, width, height, style })

        section.box.container = container
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

        /*
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
        // get array of keys (audiogram, header, footer, ...)
        let keys = Object.keys(data)
        this.header?.update(data.header)
        this.patient?.update(data.patient)
        this.history?.update(session?.history)
        this.data.history = session.history;
        this.RAudiogram?.update({ data: session.audiogram?.R, side: 'R' })
        this.LAudiogram?.update({ data: session.audiogram?.L, side: 'L' })
        this.data.audiogram = session.audiogram
        this.RSpeech?.update(session.speech?.R)
        this.LSpeech?.update(session.speech?.L)
        this.data.speech = session.speech
        this.RTympanogram?.update(session.tympanogram?.R)
        this.LTympanogram?.update(session.tympanogram?.L)
        this.data.tympanogram = session.tympanogram;
        this.RReflex?.update(session.reflex?.R)
        this.LReflex?.update(session.reflex?.L)
        this.data.tympanogram = session.reflex;
        this.report?.update(session.report)
        this.data.report = session.report;
        this.footer?.update(data?.footer)
        this.data.footer = data.footer;
        */
    }

    // خطوط نقطه چین مارجین فرم
    drawMarginLines({ container, width, height }) {

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