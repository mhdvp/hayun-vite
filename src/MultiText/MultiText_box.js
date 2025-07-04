import putLine from "../common/putLine";
import putText from "../common/putText";
import putTspan from "../common/putTspan";
const svgNS = "http://www.w3.org/2000/svg";


export default class MultiText {
    constructor({ box }) {
        this.box = box;
        this.container = box.container;
        this.inputs = []
        this.draw({ box })

    }

    draw({ box }) {
        // همه چیز را توی کانتینر باکس آبجکت رسم کن
        const { container, elements, width, height } = box
        let style = ['user-select: none', 'direction: rtl', 'font-family: Vazirmatn', 'font-size: 1mm'].join('; ')

        elements?.forEach(element => {
            const { name, value, x, y, x1, y1, x2, y2, className, style } = element;


            switch (element.type) {
                case 'label':
                    putText({ container, value, x, y, className })
                    break;
                case 'input':
                    putText({ container, value: '', x, y, className, name });
                    this.inputs.push({ name, x, y })
                    break;
                case 'line':
                    putLine({ container, x1, y1, x2, y2, className: 'line' });
                    break;
                default:
                    break;
            }

        });

    }

    update(data) {
        this.inputs.forEach(input => {
            let value = data?.[input.name];
            const textInput = this.container.querySelector(`text[name=${input.name}]`)
            // پیدا کردن کاراکترهای رفتن به سرخط در متن
            if (value) {
                const textLines = value.toString().split(/\n|\r|\r\n/);
                const x = textInput.getAttribute('x')
                // اگر متن چند خطی بود 
                if (textLines.length >= 2) {
                    // اول از همه هر چی تی‌اسپن از قبل توی این تکست اینپوت هست پاک کن
                    textInput.textContent = ""

                    let y = 4;
                    textLines.forEach(value => {
                        putTspan({ container: textInput, value, x, y });
                        y += 6;
                    })
                } else textInput.textContent = value || "";
            }
        });
    }
}

