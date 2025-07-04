// سکشن دور باکس را گرفته است. و باکس دور چارت را گرفته است
import Header from "../Header/Header_box.js";
import Reflex from "../Reflex/Reflex.js";
import Sections from "./Sections.js";
import Speech from "../Speech/Speech_Box.js";
import Tympanogram from "../Tympanogram/Tympanogram_box.js";
import putRect from "../common/putRect.js";
import Audiogram from "../Audiogram/Audiogram_box.js";
import MultiText from "../MultiText/MultiText_box.js";
import putSVG from "../common/putSVG.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Form {
    constructor({ container, template, mode = "production" } = {}) {
        this.template = template;
        this.container = container;
        this.mode = mode;
        this.data = {};
        let { width, height, margin, paper, sectionsArray } = template;

        this.svg = this.createForm({ paper, margin }); // اس‌وی‌جی مادر فرم را صفحه نامگذاری میکنیم بذاریم همون اس‌وی‌جی؟
        this.svg.style.display = 'none';

        // خطوط نقطه چین مارجین فرم
        putRect({ container: this.svg, x: 0, y: 0, width, height, className: 'no-print form-margin' })

        // ایجاد سکشن ها و باکس‌ها
        sectionsArray.forEach(section => {

            this.createSection(section)
            this.createBox(section)

            const box = section.box

            switch (section.name) {

                case 'header':
                    this.header = new Header({ box })
                    break;
                case 'patientInfo':
                    this.patientInfo = new MultiText({ box })
                    break;
                case 'history':
                    this.history = new MultiText({ box })
                    break;
                case 'RAudiogram':
                    this.RAudiogram = new Audiogram({ box, side: 'R', events: false })
                    break;
                case 'LAudiogram':
                    this.LAudiogram = new Audiogram({ box, side: 'L', events: false })
                    break;
                case 'RSpeech':
                    this.RSpeech = new Speech({ box, side: 'R' })
                    break;
                case 'LSpeech':
                    this.LSpeech = new Speech({ box, side: 'L' })
                    break;
                case 'RTympanogram':
                    this.RTympanogram = new Tympanogram({ box, side: 'R' })
                    break;
                case 'LTympanogram':
                    this.LTympanogram = new Tympanogram({ box, side: 'L' })
                    break;
                case 'report':
                    this.report = new MultiText({ box })
                    break;
                case 'footer':
                    this.footer = new MultiText({ box })
                    break;


                default:
                    break;
            }
        });


        this.container.appendChild(this.svg);

        // افزودن رویداد کلیک روی فرم
        this.svg.onclick = e => console.log(e.target.dataset['name'])
    }

    createForm({ paper, margin }) {
        const { width, height } = paper;
        const { left, top } = margin;
        const backgroundImage = this.template.backgroundImage;
        let svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", [-left, -top, width, height])
        // svg.style = "background-color: BlanchedAlmond;"
        svg.setAttribute("class", "form")

        if (backgroundImage) {
            let image = document.createElementNS(svgNS, "image")
            image.setAttribute('class', 'no-print')
            image.setAttribute('width', width)
            // image.setAttribute('height', height)
            image.setAttribute('x', 0)
            image.setAttribute('y', 0)
            image.setAttribute('href', backgroundImage)
            svg.appendChild(image)
        }
        return svg
    }

    // Sections With Brown Color Border
    createSection(section) {
        const { width, height, top, left } = section;
        const container = putSVG({ container: this.svg, x: left, y: top, width, height })
        putRect({ container, name: 'section-border', x: 0, y: 0, width, height, className: 'section-border no-print' })
        // اضافه کردن پراپرتی اس‌وی‌جی به آبجکت سکشن
        section['container'] = container;
    }

    // Boxes Width Blue Color Border
    createBox(section) {
        const { width, height, margin } = section.box
        const container = putSVG({ container: section.container, x: margin.left, y: margin.top, width, height })
        putRect({ container,name: 'box-border', x: 0, y: 0, width, height, className: 'box-border no-print' })
        section.box.container = container
    }

    update({ officeData, patientData, sessionIndex }) {
        // console.log('from form update');
        // جداکردن دیتای مربوط به سکشن های مختلف
        const
            { title, logos, selectedLogoIndex, addresses, tels, selectedAddressIndex, selectedTelIndex }
                = officeData
        const { name, lastName, age, referrer } = patientData
        const currentPatientData = patientData.sessions[sessionIndex]
        const { audiogram, speech, tympanogram, reflex, history, report } = currentPatientData

        const data = {
            header: { title, logo: logos[selectedLogoIndex] },
            patientInfo: { name, lastName, age, referrer },
            audiogram, speech, tympanogram, reflex, history, report,
            footer: { address: addresses[selectedAddressIndex], tel: tels[selectedTelIndex] },
        }

        this.header?.update(data.header)
        this.patientInfo?.update(data.patientInfo)
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
    }

}