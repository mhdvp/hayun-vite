// 'Printable Area'
const boxmodel = {
    name: 'Audiometry',
    label: 'مدل باکس',
    // backgroundImage: 'backgroundImage',
    // تعیین نمایش بوردرهای سکشن ها
    showSectionBorders: true, // treu || false    boxBorders: 'none', // display || none

    paper: { type: 'A4', width: 210, height: 297, orientation: 'portrait' },
    margin: { left: 10, top: 7, right: 4, bottom: 3 },

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
            width: this.width / 2, height: 100,
            box: { container: '', margin: { top: 2, right: 2, bottom: 2, left: 2 } },
            display: 'inline',
        }
        this['Left Audiogram'] = {
            name: 'LAudiogram', container: '',
            width: this.width / 2, height: 100,
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
        this.sectionsArray = [
            this['Header'],
            this['Patient Info'],
            this['History'],
            this['Right Audiogram'], this['Left Audiogram'],
            this['Right Speech'], this['Left Speech']

        ];

    },

    calcSectionTopLeft: function () { // محاسبه فاصله از بالا و چپ هر سکشن از محدوده قابل چاپ
        let top = 0;
        let left = 0;

        this.sectionsArray.forEach(section => {
            section.top = top
            section.left = left
            if (section.display !== 'inline') {
                top += section.height;
                left = 0
            } else left += section.width;
        });
    },

    defBoxes: function () {
        this.sectionsArray.forEach(section => {
            const { box, width, height } = section
            const { margin } = box
            box.width = width - (margin.left + margin.right)
            box.height = height - (margin.top + margin.bottom)
        })

    },

    defElements: function () {
        
        let width, height

        let box = this['Header'].box;
        ({ width, height } = box)
        let style = ['user-select: none', 'direction: rtl', 'font-family: Vazirmatn', 'font-size: 1mm'].join('; ')
        box.elements = [
            { type: 'image', x: 10, y: 30 },
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'label', x: 30, y: 5, value: 'تاریخ :', style },
            { type: 'input', name: 'officeName', x: width - 16, y: height - 6, style },
            { type: 'input', name: 'date', x: 20, y: 5, style: style + ' font-size: 0.8mm;' },
        ];

        box = this['Patient Info'].box;
        ({ width, height } = box)
        box.elements = [
            { type: 'label', x: width, y: 5, value: 'نام:', style },
            { type: 'label', x: width - 38, y: 5, value: 'نام خانوادگی:', style },
            { type: 'label', x: width - 90, y: 5, value: 'سن:', style },
            { type: 'label', x: width - 130, y: 5, value: 'ارجاع از:', style },
            { type: 'input', name: 'name', x: width - 7, y: 5 },
            { type: 'input', name: 'lastName', x: width - 59, y: 5 },
            { type: 'input', name: 'age', x: width - 98, y: 5 },
            { type: 'input', name: 'referrer', x: width - 143, y: 5 }

        ];

        box = this['Right Audiogram'].box

        box = this['Right Speech'].box
        // box.elements = ["SAT", "SRT", "MCL", "UCL", "SDS"];
        // box.name = this['Right Speech'].name;


    },





    // Printable Dimention

}

// محاسبه پهنا و ارتفاع قسمت ها با توجه به پهنا و ارتفاع محدوده چاپی و مارجین ها


boxmodel.calcDims()
boxmodel.defSections()
boxmodel.defSectionsAray()
boxmodel.calcSectionTopLeft()
boxmodel.defBoxes()
boxmodel.defElements()
// پهنا و ارتفاع قابل استفاده منهای پد ها میشه پهنا و ارتفاع اصلی

export default boxmodel;

