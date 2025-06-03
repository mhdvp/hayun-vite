// 'Printable Area'
const mainTemplate = {
    name: 'Main Template',
    label: 'ادیومتری و تمپانوتری',
    // backgroundImage: 'backgroundImage',
    // تعیین نمایش بوردرهای سکشن ها
    showSectionBorders: true, // treu || false

    paper: { type: 'A4', width: 210, height: 297, orientation: 'portrait' },
    margin: { left: 5, top: 5, right: 5, bottom: 5 },


    calcDims: function () {
        this.width = this.paper.width - (this.margin.left + this.margin.right);
        this.height = this.paper.height - (this.margin.top + this.margin.bottom);
    },

    defSections: function () {
        this['Header'] = {
            name: 'header', container: '',
            width: this.width, height: 20,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }
        this['Patient Info'] = {
            name: 'patientInfo', container: '',
            width: this.width, height: 15,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }
        this['History'] = {
            name: 'history', container: '',
            width: this.width, height: 25,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }
        this['Right Audiogram'] = {
            name: 'RAudiogram', container: '',
            width: this.width / 2, height: 90,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
            display: 'inline',
        }
        this['Left Audiogram'] = {
            name: 'LAudiogram', container: '',
            width: this.width / 2, height: 90,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }
        this['Right Speech'] = {
            name: 'RSpeech', container: '',
            width: this.width / 2, height: 20,
            display: 'inline',
            container: '', // later SVG node Section
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }
        this['Left Speech'] = {
            name: 'LSpeech', container: '',
            width: this.width / 2, height: 20,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
        }

    },

    defSectionsAray: function () { // تعریف آرایه سکشن‌ها
        this.sections = [
            this['Header'], this['Patient Info'], this['History'],
            this['Right Audiogram'], this['Left Audiogram'],
            this['Right Speech'], this['Left Speech']

        ];

    },

    calcSectionTopLeft: function () { // محاسبه فاصله از بالا و چپ هر سکشن از محدوده قابل چاپ
        let top = 0;
        let left = 0;

        this.sections.forEach(section => {
            section.top = top
            section.left = left
            if (section.display !== 'inline') {
                top += section.height;
                left = 0
            } else left += section.width;
        });
    },

    defBoxes: function () {
        // let section = this['Header']
        // section.box.width = section.width - (section.box.margin.left + section.box.margin.right)
        // section.box.height = section.height - (section.box.margin.top + section.box.margin.bottom)
        this.sections.forEach(section => {
            const { box, width, height } = section
            const { margin } = box
            box.width = width - (margin.left + margin.right)
            box.height = height - (margin.top + margin.bottom)
        })

    },

    defElements: function () {
        let box = this['Header'].box
        let style = ['user-select: none', 'direction: rtl', 'font-family: Vazir', 'font-size: 1mm'].join('; ')
        box.elements = [
            { type: 'image', x: 10, y: 30 },
            { type: 'line', x1: 0, y1: box.height, x2: box.width, y2: box.height },
            { type: 'label', x: 30, y: 5, value: 'تاریخ :', style },
            { type: 'input', name: 'officeName', x: box.width - 16, y: box.height - 6, style },
            { type: 'input', name: 'date', x: 20, y: 5, style: style + ' font-size: 0.8mm;' },
        ];

        box = this['Right Speech'].box
        box.elements = ["SAT", "SRT", "MCL", "UCL", "SDS"];
        box.name = this['Right Speech'].name;


    },


}

// تعریف همه پراپرتی‌های آبجکت با فراخوانی توابع به ترتیب
mainTemplate.calcDims();
mainTemplate.defSections();
mainTemplate.defSectionsAray();
mainTemplate.calcSectionTopLeft();
mainTemplate.defBoxes();
mainTemplate.defElements();



export default mainTemplate