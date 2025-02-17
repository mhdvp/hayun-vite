import audDims from "../../Audiogram/dims.js"
import image from './rasa_audiometry.jpg'

const rasaAud = {
    name: 'rasa_audiometry',
    label: 'ادیومتری رسا',
    backgroundImage: image, // Just Path of image
    margin: { left: 0, top: 0, right: 0, bottom: 0 },
    paper: { type: 'A4', case: 'portrait', width: 209, height: 294.5 },

    // Printable Dimention
    calc1: function () {
        this.width = this.paper.width - (this.margin.left + this.margin.right);
        this.height = this.paper.height - (this.margin.top + this.margin.bottom);
        let width = this.width;
        // ابعاد و پدینگ المنت ها
        // فضای خالی
        this.blank = {
            name: 'blank',
            w: width, h: 21,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }
        this.blank1 = {
            name: 'blank',
            w: width, h: 99,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }
        this.header = {
            // hideContext: true,
            name: 'header',
            w: width, h: 20,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }
        this.patient = {
            hideContext: true, // برچسب ها را ایجاد نمیکند
            forceInsert: true, // مقادیر مختصات ورودی ها را از آبجکت جداگانه ای میگیرد
            name: 'patient',
            w: width, h: 22,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }
        this.history = {
            // hideContext: true,
            name: 'history',
            w: width, h: 10,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }

        this.RAudiogram = {}
        Object.assign(this.RAudiogram,
            {
                blank: true,
                chartPadding: { left: 0, top: 0, right: 0, bottom: 0 },

                name: 'RAudiogram',
                w: width / 2, h: 99, // این پهنا و ارتفاع سکشن هست
                margin: { left: 18.1, top: 18.5, right: 16.4, bottom: 11.2 },
                intensity: { min: -20, max: 120, step: 10 },
                // بعدا از مقادیر بالا برای محاسبه اتومات پهنا و ارتفاع استفاده میشود
               
                display: 'inline',
            }
        );

        this.LAudiogram = {}
        Object.assign(this.LAudiogram,
            {
                name: 'LAudiogram',
                blank: true,

                chartPadding: { left: 0, top: 0, right: 0, bottom: 0 },
                intensity: { min: -20, max: 120, step: 10 },
                
                w: width / 2, h: 99, // پهنای سکشن هست
                margin: { left: 18.2, top: 18.5, right: 16.4, bottom: 11.2 },
                display: 'block',
            }
        );

        this.RSpeech = {
            name: 'RSpeech',
            w: width / 2, h: 37.6,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'inline',
            hideContext: true,
            forceInsert: true,
        }
        this.LSpeech = {
            name: 'LSpeech',
            w: width / 2, h: 37.6,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
            hideContext: true,
            forceInsert: true,
        }

        this.report = {
            name: 'report',
            w: width, h: 36.9,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
            hideContext: true,
            forceInsert: true
        }
        this.footer = {
            name: 'footer',
            w: width, h: 10,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block'
        }
    },

    calc2: function () {
        // let dims = this.dims;
        let width, height;

        width = this.header.width = this.getWidth(this.header)
        height = this.header.height = this.getHeight(this.header)

        this.header.elements = [
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'text', x: 30, y: 5, value: 'تاریخ :' },
        ]
        this.header.inputs = [
            { name: 'officeName', x: width - 20, y: height - 10 },
            { name: 'date', x: 20, y: 5 },
        ]

        width = this.patient.width = this.getWidth(this.patient)
        this.patient.height = this.getHeight(this.patient)
        this.patient.elements = [
            { type: 'line', x1: 0, y1: 20, x2: width, y2: 20 },
            { type: 'text', x: width, y: 5, value: 'نام:' },
            { type: 'text', x: width - 30, y: 5, value: 'نام خانوادگی:' },
            { type: 'text', x: width - 90, y: 5, value: 'سن:' },
            { type: 'text', x: width - 130, y: 5, value: 'ارجاع از:' }
        ]
        this.patient.inputs = [
            { name: 'name', x: width - 5, y: 5 },
            { name: 'lastName', x: width - 47, y: 5 },
            { name: 'age', x: width - 97, y: 5 },
            { name: 'referrer', x: width - 142, y: 5 }
        ]
        this.patient.forceInputs = [
            { name: 'name', x: width - 45, y: 12 },
            { name: 'lastName', x: width - 75, y: 12 },
            { name: 'age', x: width - 105, y: 12 },
            { name: 'referrer', x: width - 150, y: 12 },
            { name: 'date', x: width - 185, y: 12 }
        ]

        width = this.history.width = this.getWidth(this.history)
        this.history.height = this.getHeight(this.history)
        this.history.elements = [
            { type: 'line', x1: 0, y1: 20, x2: width, y2: 20 },
            { type: 'text', x: width, y: 5, value: 'شرح حال:' },
        ]
        this.history.inputs = [
            { name: 'description', x: width - 13, y: 5 },
        ]

        width = this.RAudiogram.width = this.getWidth(this.RAudiogram)
        this.RAudiogram.height = this.getHeight(this.RAudiogram)

        width = this.LAudiogram.width = this.getWidth(this.LAudiogram)
        this.LAudiogram.height = this.getHeight(this.LAudiogram)

        width = this.RSpeech.width = this.getWidth(this.RSpeech)
        this.RSpeech.height = this.getHeight(this.RSpeech)
        this.RSpeech.labels = ["SRT", "MCL", "SDS", 'UCL']
        this.RSpeech.forceInputs = [
            { name: 'SRT', x: 24, y: 26 },
            { name: 'MCL', x: 36, y: 26 },
            { name: 'SDS', x: 48, y: 26 },
            { name: 'UCL', x: 60, y: 26 },
        ]

        width = this.LSpeech.width = this.getWidth(this.LSpeech)
        this.LSpeech.height = this.getHeight(this.LSpeech)
        this.LSpeech.labels = ["SRT", "MCL", "SDS", 'UCL']
        this.LSpeech.forceInputs = [
            { name: 'SRT', x: 34, y: 26 },
            { name: 'MCL', x: 46, y: 26 },
            { name: 'SDS', x: 58, y: 26 },
            { name: 'UCL', x: 70, y: 26 },
        ]

        width = this.report.width = this.getWidth(this.report)
        this.report.height = this.getHeight(this.report)
        this.report.elements = [
            { type: 'text', x: width, y: 5, value: 'گزارش:' },
        ]
        this.report.inputs = [
            { name: 'description', x: width - 10, y: 5 },
        ]
        this.report.forceInputs = [
            { name: 'description', x: width - 20, y: 14 },

        ]

        width = this.footer.width = this.getWidth(this.footer)
        this.footer.height = this.getHeight(this.footer)
        this.footer.elements = [
            { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'text', x: width, y: 5, value: 'آدرس:' },
            { type: 'text', x: width - 120, y: 5, value: 'تلفن:' },
        ]
        this.footer.inputs = [
            { name: 'address', x: width - 10, y: 5 },
            { name: 'tel', x: width - 128, y: 5 },
        ]
    },


    getWidth: function (element) {
        return (element.w - (element.margin.left + element.margin.right))
    },
    getHeight: function (element) {
        return (element.h - (element.margin.top + element.margin.bottom))
    },

    calcSectionsArray: function () {
        // این آرایه دقیقا ترتیب قرارگیری سکشن ها را بدون اون اوردر قبلی تعیین میکند
        this.sections = [

            // this.blank,
            this.blank,
            this.patient,
            // this.blank1,

            // this.history,
            this.RAudiogram,
            this.LAudiogram,
            this.RSpeech, this.LSpeech,
            // this.RTympanogram, this.LTympanogram,
            // this.RReflex, this.LReflex,
            this.report,
            // this.footer

        ]
    },


}

rasaAud.calc1()
rasaAud.calc2()
rasaAud.calcSectionsArray()

// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default rasaAud;

