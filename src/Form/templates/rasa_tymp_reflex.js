import image from './rasa_tymp_reflex.jpg'

const rasaTymp = {
    name: 'rasa_tymp_reflex',
    label: 'تمپانومتری رسا',
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
            w: width, h: 20,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }
        this.header = {
            // hideContext: true,
            name: 'header',
            w: width, h: 20,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }
        this.patient = {
            name: 'patient',
            w: width, h: 10,
            margin: { left: 5, top: 1, right: 5, bottom: 1},
            display: 'block',
        }
        this.history = {
            name: 'history',
            w: width, h: 10,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }

        this.RTympanogram = {
            name: 'RTympanogram',
            w: width / 2, h: 60,
            margin: { left: 5, top: 2, right: 3, bottom: 2 },
            display: 'inline',
        }

        this.LTympanogram = {
            name: 'LTympanogram',
            w: width / 2, h: 60,
            margin: { left: 3, top: 2, right: 5, bottom: 2 },
            display: 'block',
        }
        this.RReflex = {
            name: 'RReflex',
            w: width / 2, h: 30,
            margin: { left: 5, top: 2, right: 3, bottom: 2 },
            display: 'inline'
        }

        this.LReflex = {
            name: 'LReflex',
            w: width / 2, h: 30,
            margin: { left: 3, top: 2, right: 5, bottom: 2 },
            display: 'block'
        }

        this.report = {
            name: 'report',
            w: width, h: 20,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block'
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
            { type: 'text', x: width - 37, y: 5, value: 'نام خانوادگی:' },
            { type: 'text', x: width - 84, y: 5, value: 'سن:' },
            { type: 'text', x: width - 120, y: 5, value: 'ارجاع از:' },
            { type: 'text', x: width - 170, y: 5, value: 'تاریخ:' }
        ]
        this.patient.inputs = [
            { name: 'name', x: width - 6, y: 5 },
            { name: 'lastName', x: width - 57, y: 5 },
            { name: 'age', x: width - 91, y: 5 },
            { name: 'referrer', x: width - 132, y: 5 },
            { name: 'date', x: width - 180, y: 5 }
        ]
        this.patient.forceInputs = [
            { name: 'name', x: width - 10, y: 4 },
            { name: 'lastName', x: width - 47, y: 5 },
            { name: 'age', x: width - 97, y: 5 },
            { name: 'referrer', x: width - 142, y: 5 }
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

        width = this.RTympanogram.width = this.getWidth(this.RTympanogram)
        this.RTympanogram.height = this.getHeight(this.RTympanogram)
        width = this.LTympanogram.width = this.getWidth(this.LTympanogram)
        this.LTympanogram.height = this.getHeight(this.LTympanogram)

        width = this.RReflex.width = this.getWidth(this.RReflex)
        this.RReflex.height = this.getHeight(this.RReflex)
        width = this.LReflex.width = this.getWidth(this.LReflex)
        this.LReflex.height = this.getHeight(this.LReflex)

        width = this.report.width = this.getWidth(this.report)
        this.report.height = this.getHeight(this.report)
        this.report.elements = [
            { type: 'text', x: width, y: 5, value: 'گزارش:' },
        ]
        this.report.inputs = [
            { name: 'description', x: width - 10, y: 5 },
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
            this.blank,
            this.patient,
            // this.history,
            // this.RAudiogram,
            // this.LAudiogram,
            // this.RSpeech,
            // this.LSpeech,
            this.RTympanogram, this.LTympanogram,
            this.RReflex, this.LReflex,
            // this.report,
            // this.footer

        ]
    },

}

rasaTymp.calc1()
rasaTymp.calc2()
rasaTymp.calcSectionsArray()
// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default rasaTymp;

