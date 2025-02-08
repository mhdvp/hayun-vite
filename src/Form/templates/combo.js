import audDims from "../../Audiogram/dims.js";

const combo = {
    name: 'combo',
    label: 'Combo',
    // backgroundImage: 'backgroundImage',
    margin: { left: 5, top: 5, right: 5, bottom: 5 },
    paper: { type: 'A4', case: 'portrait', width: 210, height: 297 },

    // Printable Dimention
    calc1: function () {
        this.width = this.paper.width - (this.margin.left + this.margin.right);
        this.height = this.paper.height - (this.margin.top + this.margin.bottom);
        let width = this.width;
        // ابعاد و پدینگ المنت ها
        // فضای خالی
        this.blank = {
            name: 'blank',
            w: width, h: 10,
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
            name: 'patient',
            w: width, h: 10,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }
        this.history = {
            name: 'history',
            w: width, h: 10,
            margin: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }

        this.RAudiogram = {}
        Object.assign(this.RAudiogram,
            audDims[this.name],
            {
                name: 'RAudiogram',
                w: width / 2, h: 100,
                margin: { left: 1, top: 1, right: 1, bottom: 1 },
                display: 'inline',
            });

        this.LAudiogram = {}
        Object.assign(this.LAudiogram,
            audDims[this.name],
            {
                name: 'LAudiogram',
                w: width / 2, h: 100, // پهنای سکشن هست
                margin: { left: 1, top: 1, right: 1, bottom: 1 },
                display: 'block',
            });

        this.RSpeech = {
            name: 'RSpeech',
            w: width / 2, h: 15,
            margin: { left: 5, top: 1, right: 5, bottom: 1 },
            display: 'inline',
            stroke: true,
        }

        this.LSpeech = {
            name: 'LSpeech',
            w: width / 2, h: 15,
            margin: { left: 5, top: 1, right: 5, bottom: 1 },
            display: 'block',
            stroke: true
        }

        this.RTympanogram = {
            name: 'RTympanogram',
            w: width / 2, h: 60,
            margin: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'inline',
        }

        this.LTympanogram = {
            name: 'LTympanogram',
            w: width / 2, h: 60,
            margin: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'block',
        }
        this.RReflex = {
            name: 'RReflex',
            w: width / 2, h: 30,
            margin: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'inline'
        }

        this.LReflex = {
            name: 'LReflex',
            w: width / 2, h: 30,
            margin: { left: 2, top: 2, right: 2, bottom: 2 },
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

        width = this.RAudiogram.width = this.getWidth(this.RAudiogram)
        this.RAudiogram.height = this.getHeight(this.RAudiogram)

        width = this.LAudiogram.width = this.getWidth(this.LAudiogram)
        this.LAudiogram.height = this.getHeight(this.LAudiogram)

        width = this.RSpeech.width = this.getWidth(this.RSpeech)
        this.RSpeech.height = this.getHeight(this.RSpeech)
        this.RSpeech.labels = ["SAT", "SRT", "MCL", "UCL", "SDS"]

        width = this.LSpeech.width = this.getWidth(this.LSpeech)
        this.LSpeech.height = this.getHeight(this.LSpeech)
        this.LSpeech.labels = ["SAT", "SRT", "MCL", "UCL", "SDS"]

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
            this.header,
            this.patient,
            this.history,
            this.RAudiogram,
            this.LAudiogram,
            this.RSpeech,
            this.LSpeech,
            this.RTympanogram, this.LTympanogram,
            this.RReflex, this.LReflex,
            this.report,
            this.footer

        ]
    },

}

combo.calc1()
combo.calc2()
combo.calcSectionsArray()
// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default combo;

