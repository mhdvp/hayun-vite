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
        // 'Printable Area'
        this.width = this.paper.width - (this.margin.left + this.margin.right);
        this.height = this.paper.height - (this.margin.top + this.margin.bottom);
    },

    defSections: function () {

        this.header = {
            name: 'header', container: '',
            width: this.width, height: 15,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Patient Info'] = {
            name: 'patientInfo', container: '',
            width: this.width, height: 8,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['History'] = {
            name: 'history', container: '',
            width: this.width, height: 14,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Right Audiogram'] = {
            name: 'RAudiogram', container: '',
            width: this.width / 2, height: 95,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
            display: 'inline',
        }
        this['Left Audiogram'] = {
            name: 'LAudiogram', container: '',
            width: this.width / 2, height: 95,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Right Speech'] = {
            name: 'RSpeech', container: '',
            width: this.width / 2, height: 17,
            display: 'inline',
            container: '', // later SVG node Section
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Left Speech'] = {
            name: 'LSpeech', container: '',
            width: this.width / 2, height: 17
            ,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Right Tympanogram'] = {
            name: 'RTympanogram', container: '', display: 'inline',
            width: this.width / 2, height: 60,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Left Tympanogram'] = {
            name: 'LTympanogram', container: '',
            width: this.width / 2, height: 60,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Right Reflex'] = {
            name: 'RReflex', container: '',
            width: this.width / 2, height: 30,
            display: 'inline',
            container: '', // later SVG node Section
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Left Reflex'] = {
            name: 'LReflex', container: '',
            width: this.width / 2, height: 30,
            container: '', // later SVG node Section
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Report'] = {
            name: 'report', container: '',
            width: this.width, height: 25,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }
        this['Footer'] = {
            name: 'footer', container: '',
            width: this.width, height: 10,
            box: { container: '', margin: { top: 1, right: 1, bottom: 1, left: 1 } },
        }

    },

    defSectionsAray: function () { // تعریف آرایه سکشن‌ها
        this.sectionsArray = [
            this.header,
            this['Patient Info'],
            this['History'],
            this['Right Audiogram'], this['Left Audiogram'],
            this['Right Speech'], this['Left Speech'],
            this['Right Tympanogram'], this['Left Tympanogram'],
            this['Right Reflex'], this['Left Reflex'],
            this['Report'],
            this['Footer'],

        ];

    },

    calcSectionTopLeft: function () { // محاسبه فاصله از بالا و چپ هر سکشن از محدوده قابل چاپ
        let top = 0;
        let left = 0;

        this.sectionsArray.forEach(section => {
            if (section.name === 'footer') {
                section.top = this.height - section.height
                section.left = 0
                return
            }
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
            const { box, width, height, name } = section
            const { margin } = box
            box.name = name
            box.width = width - (margin.left + margin.right)
            box.height = height - (margin.top + margin.bottom)
        })

    },

    defElements: function () {

        let width, height, x, y

        let box = this['header'].box;
        ({ width, height } = box)
        box.elements = [
            { type: 'image', name: 'logo', x: width - 15, y: 1, width: 15, height: 10 },
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'label', x: 30, y: 5, value: 'تاریخ :', className: 'common-label' },
            { type: 'input', name: 'title', x: width - 16, y: height - 6, className: 'header-title' },
            { type: 'input', name: 'date', x: 20, y: 5, className: 'common-text' },
        ];

        box = this['Patient Info'].box;
        ({ width, height } = box)
        y = 4
        box.elements = [
            { type: 'label', x: width, y, value: 'نام:', className: 'common-label' },
            { type: 'label', x: width - 38, y, value: 'نام خانوادگی:', className: 'common-label' },
            { type: 'label', x: width - 90, y, value: 'سن:', className: 'common-label' },
            { type: 'label', x: width - 130, y, value: 'ارجاع از:', className: 'common-label' },
            { type: 'input', name: 'name', x: width - 7, y, className: 'common-text' },
            { type: 'input', name: 'lastName', x: width - 59, y, className: 'common-text' },
            { type: 'input', name: 'age', x: width - 98, y, className: 'common-text' },
            { type: 'input', name: 'referrer', x: width - 143, y, className: 'common-text' }
        ];

        box = this['History'].box;
        ({ width, height } = box)
        box.elements = [
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'label', x: width, y, value: 'شرح حال:', className: 'common-label' },
            { type: 'input', name: 'description', x: width - 16, y, className: 'common-text' },
        ]

        box = this['Right Audiogram'].box

        box = this['Right Speech'].box
        // box.elements = ["SAT", "SRT", "MCL", "UCL", "SDS"];
        // box.name = this['Right Speech'].name;

        box = this['Report'].box;
        ({ width, height } = box)
        box.elements = [
            { type: 'line', x1: 0, y1: height, x2: width, y2: height },
            { type: 'label', x: width, y: 5, value: 'توضیحات:', className: 'common-label' },
            { type: 'input', name: 'description', x: width - 16, y: 5, className: 'common-text' },
        ]

        box = this['Footer'].box;
        ({ width, height } = box)
        box.elements = [
            // { type: 'line', x1: 0, y1: 0, x2: width, y2: 0 },
            { type: 'label', x: width, y: 5, value: 'آدرس:', className: 'common-label' },
            { type: 'label', x: width - 120, y: 5, value: 'تلفن:', className: 'common-label' },
            { type: 'input', name: 'address', x: width - 10, y: 5, className: 'common-text' },
            { type: 'input', name: 'tel', x: width - 128, y: 5, className: 'common-text' },
        ]





    },


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

