const dims = {
    padding: { left: 6, top: 5, right: 6, bottom: 5 },
    paper: { type: 'A4', case: 'portraite', width: 210, height: 295.5, },
    // sections: ['header', 'patient', 'history', ['RAudiogram', 'LAudiogram'], ['RSpeech', 'LSpeech'],],

    // Printable Dimention
    calc1: function () {

        this.width = this.paper.width - (this.padding.left + this.padding.right);
        this.height = this.paper.height - (this.padding.top + this.padding.bottom);

        let width = this.width;
        // ابعاد و پدینگ المنت ها
        this.header = {
            name: 'header',
            w: width, h: 20,
            pad: { left: 1, top: 1, right: 1, bottom: 2 },
            display: 'block',
        }
        this.patient = {
            name: 'patient',
            w: width, h: 10,
            pad: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }
        this.history = {
            name: 'history',
            w: width, h: 10,
            pad: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block',
        }
        this.RAudiogram = {
            name: 'RAudiogram',
            w: width / 2, h: 105,
            pad: { left: 1, top: 1, right: 1, bottom: 0 },
            display: 'inline'
        }
        this.LAudiogram = {
            name: 'LAudiogram',
            w: width / 2, h: 105,
            pad: { left: 1, top: 1, right: 1, bottom: 0 },
            display: 'block'
        }
        this.RSpeech = {
            name: 'RSpeech',
            w: width / 2, h: 20,
            pad: { left: 2, top: 1, right: 16, bottom: 1 },
            display: 'inline',
        }
        this.LSpeech = {
            name: 'LSpeech',
            w: width / 2, h: 20,
            pad: { left: 16, top: 1, right: 2, bottom: 1 },
            display: 'block',
        }
        this.RTympanogram = {
            name: 'RTympanogram',
            w: width / 2, h: 60,
            pad: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'inline',
        }
        this.LTympanogram = {
            name: 'LTympanogram',
            w: width / 2, h: 60,
            pad: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'block',
        }
        this.RReflex = {
            name: 'RReflex',
            w: width / 2, h: 30,
            pad: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'inline'
        }
        this.LReflex = {
            name: 'LReflex',
            w: width / 2, h: 30,
            pad: { left: 2, top: 2, right: 2, bottom: 2 },
            display: 'block'
        }
        this.report = {
            name: 'report',
            w: width, h: 20,
            pad: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block'
        }
        this.footer = {
            name: 'footer',
            w: width, h: 10,
            pad: { left: 1, top: 1, right: 1, bottom: 1 },
            display: 'block'
        }
    },

    calc2: function () {
        // let dims = this.dims;
        let width, height;
        //آیتم های روی این تمپلت
        // روش جدید محاسبه ابعاد منطقی تر و تمیز تر
        Object.assign(this.header, {
            width: this.getWidth(this.patient),
            height: this.getHeight(this.header)
        })

        width = this.patient.width = this.getWidth(this.patient)
        this.patient.height = this.getHeight(this.patient)
        this.patient.labels = {
            line: { x1: 0, y1: 20, x2: width, y2: 20 },
            name: { x: width, y: 5 },
            lastName: { x: width - 30, y: 5 },
            age: { x: width - 90, y: 5 },
            referrer: { x: width - 130, y: 5 }
        }
        this.patient.inputs = {
            name: { x: width - 5, y: 5 },
            lastName: { x: width - 47, y: 5 },
            age: { x: width - 97, y: 5 },
            referrer: { x: width - 142, y: 5 }
        }

        width = this.history.width = this.getWidth(this.history)
        this.history.height = this.getHeight(this.history)
        this.history.labels = {
            line: { x1: 0, y1: 20, x2: width, y2: 20 },
            text: { x: width, y: 5 },
        }
        this.history.inputs = {
            text: { x: width - 13, y: 5 },
        }

        width = this.RAudiogram.width = this.getWidth(this.RAudiogram)
        this.RAudiogram.height = this.getHeight(this.RAudiogram)
        width = this.LAudiogram.width = this.getWidth(this.LAudiogram)
        this.LAudiogram.height = this.getHeight(this.RAudiogram)

        width = this.RSpeech.width = this.getWidth(this.RSpeech)
        this.RSpeech.height = this.getHeight(this.RSpeech)
        this.RSpeech.labels = ["SDS", "SRT", "MCL", "UCL"]

        width = this.LSpeech.width = this.getWidth(this.LSpeech)
        this.LSpeech.height = this.getHeight(this.LSpeech)
        this.LSpeech.labels = ["SDS", "SRT", "MCL", "UCL", "SAT"]

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
        this.report.labels = {
            name: { x: width, y: 5 },
        }
        this.report.inputs = {
            name: { x: width - 5, y: 5 },
        }

        width = this.footer.width = this.getWidth(this.footer)
        this.footer.height = this.getHeight(this.footer)
        this.footer.labels = {
            name: { x: width, y: 5 },
        }
        this.footer.inputs = {
            name: { x: width - 5, y: 5 },
        }
    },

    getWidth: function (element) {
        return (element.w - (element.pad.left + element.pad.right))
    },
    getHeight: function (element) {
        return (element.h - (element.pad.top + element.pad.bottom))
    },

    calcSectionsArray: function () {
        // این آرایه دقیقا ترتیب قرارگیری سکشن ها را بدون اون اوردر قبلی تعیین میکند
        this.sections = [
            this.header,
            this.patient,
            this.history,
            this.RAudiogram, this.LAudiogram,
            this.RSpeech, this.LSpeech,
            this.RTympanogram, this.LTympanogram,
            this.RReflex, this.LReflex,
            this.report,
            this.footer

        ]
    },


}

dims.calc1()
dims.calc2()
dims.calcSectionsArray()
// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default dims;

