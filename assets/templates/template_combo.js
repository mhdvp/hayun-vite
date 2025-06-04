const template_combo = {
    name: 'combo',
    label: 'ادیومتری و تمپانوتری',
    // backgroundImage: 'backgroundImage',
    // تعیین نمایش بوردرهای سکشن ها
    sectionBorders: 'display', // display || none
    boxBorders: 'none', // display || none
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
            w: width, h: 15,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }

        this.patient = {
            name: 'patient',
            w: width, h: 8,
            margin: { left: 1, top: 0, right: 1, bottom: 0 },
            display: 'block',
            boxBorder: 'none' // display || none default: none
        }

        this.history = {
            name: 'history',
            w: width, h: 14,
            margin: { left: 1, top: 0, right: 1, bottom: 0 },
            display: 'block',
            boxBorder: 'none' // display || none
        }

        // Titles Common Object
        this['Title'] = {
            w: width, h: 7, // پهنا و ارتفاع سکشن
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block',
        }

        // Audiogram Titles 
        this['Audiogram Titles'] = {
            ...this['Title'],
            name: 'Audiogram Titles',
            stroke: true,
            // محاسبه پهنا  ارتفاع در تابع calc2 
        }

        this.RAudiogram = {}
        Object.assign(this.RAudiogram,
            {
                blank: false,
                name: 'RAudiogram',
                w: width / 2, h: 95, // ابعاد سکشن ادیوگرام 
                margin: { left: 1, top: 0, right: 2, bottom: 0 }, // در مدل باکس این برای باکس هست
                display: 'inline',
                borderBox: 'display', // display | none default: none بوردر 
            });

        this.LAudiogram = {}
        Object.assign(this.LAudiogram,
            {
                name: 'LAudiogram',
                w: width / 2, h: 95, // پهنای سکشن هست
                margin: { left: 2, top: 0, right: 1, bottom: 0 },
                display: 'block',
                // borderBox: 'none', // display | none default: none بوردر 
            });

        // Speech Titles 
        this['Speech Titles'] = {
            name: 'Speech Titles',
            ...this['Title'],
            stroke: true,
            // محاسبه پهنا  ارتفاع در تابع calc2 
        }

        this.RSpeech = {
            name: 'RSpeech',
            w: width / 2, h: 15,
            margin: { left: 1, top: 0, right: 10, bottom: 0 },
            display: 'inline',
            stroke: true,
        }

        this.LSpeech = {
            name: 'LSpeech',
            w: width / 2, h: 15,
            margin: { left: 10, top: 0, right: 1, bottom: 0 },
            display: 'block',
            stroke: true
        }

        // Tympanogram Titles 
        this['Tympanogram Titles'] = {
            name: 'Tympanogram Titles',
            ...this['Title'],
            stroke: true,
            // محاسبه پهنا  ارتفاع در تابع calc2 
        }

        this.RTympanogram = {
            name: 'RTympanogram',
            w: width / 2, h: 60,
            margin: { left: 1, top: 0, right: 10, bottom: 0 },
            display: 'inline',
        }

        this.LTympanogram = {
            name: 'LTympanogram',
            w: width / 2, h: 60,
            margin: { left: 10, top: 0, right: 1, bottom: 0 },
            display: 'block',
        }

        // Reflex Titles 
        this['Reflex Titles'] = {
            name: 'Reflex Titles',
            ...this['Title'],
            stroke: true,
            // محاسبه پهنا  ارتفاع در تابع calc2 
        }

        this.RReflex = {
            name: 'RReflex',
            w: width / 2, h: 26,
            margin: { left: 1, top: 0, right: 10, bottom: 1 },
            display: 'inline'
        }

        this.LReflex = {
            name: 'LReflex',
            w: width / 2, h: 26,
            margin: { left: 10, top: 0, right: 1, bottom: 1 },
            display: 'block'
        }

        this.report = {
            name: 'report',
            w: width, h: 20,
            margin: { left: 1, top: 0, right: 1, bottom: 0 },
            display: 'block'
        }

        this.footer = {
            name: 'footer',
            w: width, h: 10,
            margin: { left: 0, top: 0, right: 0, bottom: 0 },
            display: 'block'
        }
    },

    // محاسبه پهنا و ارتفاع رسمی بخش های فرم از روی مارجین و ابعاد کاغذ
    calc2: function () {
        // let dims = this.dims;
        let width, height, style;

        width = this.header.width = this.getWidth(this.header)
        height = this.header.height = this.getHeight(this.header)

        style = `
            font-family: Vazir, Helvetica, sans-serif !important;
            font-size: 1.5mm;
            font-weight: bold;
            text-anchor: start; /*تراز افقی*/
            /* dominant-baseline: middle; /* تراز عمودی*/       
        `;

        this.header.elements = [
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'text', x: 30, y: 5, value: 'تاریخ :' },
        ]
        this.header.inputs = [
            { name: 'officeName', x: width - 16, y: height - 6, style },
            { name: 'date', x: 20, y: 5, style: style + ' font-size: 0.8mm;' },
        ]

        width = this.patient.width = this.getWidth(this.patient)
        height = this.patient.height = this.getHeight(this.patient)
        this.patient.elements = [
            // { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'text', x: width, y: 5, value: 'نام:' },
            { type: 'text', x: width - 38, y: 5, value: 'نام خانوادگی:' },
            { type: 'text', x: width - 90, y: 5, value: 'سن:' },
            { type: 'text', x: width - 130, y: 5, value: 'ارجاع از:' }
        ]
        this.patient.inputs = [
            { name: 'name', x: width - 7, y: 5 },
            { name: 'lastName', x: width - 59, y: 5 },
            { name: 'age', x: width - 98, y: 5 },
            { name: 'referrer', x: width - 143, y: 5 }
        ]
        this.patient.forceInputs = [
            { name: 'name', x: width - 10, y: 4 },
            { name: 'lastName', x: width - 47, y: 5 },
            { name: 'age', x: width - 97, y: 5 },
            { name: 'referrer', x: width - 142, y: 5 }
        ]

        width = this.history.width = this.getWidth(this.history)
        height = this.history.height = this.getHeight(this.history)
        this.history.elements = [
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'text', x: width, y: 5, value: 'شرح حال:' },
        ]
        this.history.inputs = [
            { name: 'description', x: width - 16, y: 5 },
        ]

        width = this['Audiogram Titles'].width = this.getWidth(this['Audiogram Titles'])
        height = this['Audiogram Titles'].height = this.getHeight(this['Audiogram Titles'])
        style = `
            text-anchor: middle;
            dominant-baseline: middle;
            font-size: 1.2mm
        `;
        this['Audiogram Titles'].elements = [
            // { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'text', x: width / 2, y: height / 2, value: 'Audiograms', style },
            { type: 'text', x: width / 4, y: 5, value: 'Right', style: 'fill: red' },
            { type: 'text', x: width * 3 / 4, y: 5, value: 'Left', style: 'fill: blue' },
        ]

        width = this.RAudiogram.width = this.getWidth(this.RAudiogram)
        this.RAudiogram.height = this.getHeight(this.RAudiogram)

        width = this.LAudiogram.width = this.getWidth(this.LAudiogram)
        this.LAudiogram.height = this.getHeight(this.LAudiogram)

        width = this['Speech Titles'].width = this.getWidth(this['Speech Titles'])
        height = this['Speech Titles'].height = this.getHeight(this['Speech Titles'])
        this['Speech Titles'].elements = [
            // { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'text', x: width / 2, y: height / 2, value: 'Speech Tests', style },
            { type: 'text', x: width / 4, y: 5, value: 'Right', style: 'fill: red' },
            { type: 'text', x: width * 3 / 4, y: 5, value: 'Left', style: 'fill: blue' },
        ]

        width = this.RSpeech.width = this.getWidth(this.RSpeech)
        this.RSpeech.height = this.getHeight(this.RSpeech)
        this.RSpeech.labels = ["SAT", "SRT", "MCL", "UCL", "SDS"]

        width = this.LSpeech.width = this.getWidth(this.LSpeech)
        this.LSpeech.height = this.getHeight(this.LSpeech)
        this.LSpeech.labels = ["SAT", "SRT", "MCL", "UCL", "SDS"]

        width = this['Tympanogram Titles'].width = this.getWidth(this['Tympanogram Titles'])
        height = this['Tympanogram Titles'].height = this.getHeight(this['Tympanogram Titles'])
        this['Tympanogram Titles'].elements = [
            // { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'text', x: width / 2, y: height / 2, value: 'Tympanograms', style },
            // { type: 'text', x: width / 4, y: 5, value: 'Right', style: 'fill: red' },
            // { type: 'text', x: width * 3 / 4, y: 5, value: 'Left', style: 'fill: blue' },
        ]

        width = this.RTympanogram.width = this.getWidth(this.RTympanogram)
        this.RTympanogram.height = this.getHeight(this.RTympanogram)
        width = this.LTympanogram.width = this.getWidth(this.LTympanogram)
        this.LTympanogram.height = this.getHeight(this.LTympanogram)

        width = this['Reflex Titles'].width = this.getWidth(this['Reflex Titles'])
        height = this['Reflex Titles'].height = this.getHeight(this['Reflex Titles'])
        this['Reflex Titles'].elements = [
            // { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'text', x: width / 2, y: height / 2, value: 'Acoustic Reflexes', style },
            { type: 'text', x: width / 4, y: 5, value: 'Probe in the Right Ear', style: 'fill: red; text-anchor: middle' },
            { type: 'text', x: width * 3 / 4, y: 5, value: 'Probe in the Left Ear', style: 'fill: blue; text-anchor: middle' },
        ]

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
            { name: 'description', x: width - 12, y: 5 },
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
            this['Audiogram Titles'],
            this.RAudiogram,
            this.LAudiogram,
            this['Speech Titles'],
            this.RSpeech,
            this.LSpeech,
            this['Tympanogram Titles'],
            this.RTympanogram, this.LTympanogram,
            this['Reflex Titles'],
            this.RReflex, this.LReflex,
            this.report,
            this.footer

        ]
    },

}

// محاسبه پهنا و ارتفاع قسمت ها با توجه به پهنا و ارتفاع محدوده چاپی و مارجین ها
template_combo.calc1()
template_combo.calc2()
template_combo.calcSectionsArray()
// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default template_combo;

