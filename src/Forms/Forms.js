const svgNS = "http://www.w3.org/2000/svg";

import printForm from "./printForm.js";
import Form from "../Form/Form.js";
// import combo from "./templates/combo.js"; // این در حقیقیت یک تمپلت هست
// import rasaAud from "./templates/rasa_audiometry.js";
// import rasaTymp from './templates/rasa_tymp_reflex.js'

// خط کد زیر لازم هست
// import '/fonts/webfonts/Vazirmatn-Regular.woff2'
import '../styles.css'
import putLine from "../common/putLine.js";

// کلاس جدید که فرم‌های مختلف را نمایش میدهد
export default class Forms {
    constructor({ assets, container, templates, defaultTemplateIndex = 0, mode = 'production' } = {}) {
        this.container = container
        this.mode = mode;
        // this.addForms({ templates: [rasaAud, rasaTymp, combo], defaultTemplateIndex })
        this.addForms({ templates, defaultTemplateIndex })
    }

    // افزودن فرم 
    addForms({ templates, defaultTemplateIndex }) {
        const container = this.container
        // ایجاد یک دیو برای قرار دادن دکمه ها و لینک های فرم
        const div = document.createElement('div');

        div.style = 'border: 1px solid brown; margin: 0; padding: 0;'
        container.appendChild(div);

        // اضافه کردن دکمه به دیو فرم
        let className = 'button-form persian';
        const btns = [];

        const forms = []; // آرایه آبجکت های فرم های مختلف
        this.forms = forms;

        templates.
            forEach((template, index) => {
                this.mode == 'develop' &&
                    (btns[index] = this.putButton({ container: div, text: template.label, className }));
                this.forms.push(new Form({ container, template }));
            });

        // انتخاب فرم پیش‌فرض  
        let selectedIndex = defaultTemplateIndex;
        forms[selectedIndex].page.style.display = 'block';
        this.selectedForm = this.forms[selectedIndex];
        (this.mode == 'develop') && (btns[selectedIndex].style.backgroundColor = ' #1c15e1');

        if (this.mode == 'develop') {

            const printBtn = this.putButton({ container: div, text: 'چاپ', className });
            // تعریف رویداد دکمه چاپ فرم نمایشی
            printBtn.addEventListener('click', () => { printForm({ container: this.selectedForm.page }) });

            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Hide All forms
                    forms.forEach((form, i) => {
                        form.page.style.display = 'none'
                        btns[i].style.backgroundColor = ' #7472e2'

                    });

                    forms[index].page.style.display = 'block';
                    btns[index].style.backgroundColor = ' #1c15e1'

                    this.selectedForm = forms[index];
                    selectedIndex = index
                    this.update(this.allData);
                })
            })

            // دکمه نمایش و پنهان خطوط سکشن
            this.putButton({ container: div, text: 'Show/Hide Section Borders', className })
                .addEventListener('click', () => {
                    this.toggleDisplay({ container: forms[selectedIndex].page, borderName: 'section-border' })
                });

            // دکمه نمایش و پنهان خطوط بوردر
            this.putButton({ container: div, text: 'Show/Hide Box Borders', className })
                .addEventListener('click', () => {
                    this.toggleDisplay({ container: forms[selectedIndex].page, borderName: 'box-border' })
                });

            // دکمه نمایش و پنهان شطرنجی
            this.putButton({ container: div, text: 'Show/Hide Grid', className })
                .addEventListener('mouseenter', () => {
                    this.grid({ container: forms[selectedIndex].page })
                });
            // فراخوانی تابع شطرنجی در اولین اجرا
            this.grid({ container: forms[selectedIndex].page })
        }
    }

    grid({ container }) {
        console.log(container);
        const cord = { xStart: -5, yStart: -5, xEnd: 210 - 5, yEnd: 297 - 5, xStep: 1, yStep: 1 }
        let { xStart, yStart, xEnd, yEnd, xStep, yStep } = cord

        // رسم خطوط افقی
        let style = 'stroke: blue; stroke-width: 0.05 ; stroke-opacity: 0.8; stroke-dasharray: 0.2;'
        let x1 = xStart
        let y1 

        let x2 = xEnd
        let y2

        for (let y1 = yStart; y1 <= yEnd; y1 += yStep) {
            y2 = y1
            putLine({ container, x1, y1, x2, y2, style, name: 'grid' })
        }

        // رسم خطوط عمودی
        y1 = yStart
        for (x1 = xStart; x1 <= xEnd; x1 += xStep) {
            const x2 = x1
            putLine({ container, x1, y1, x2, y2, style, name: 'grid' })
        }


    }

    // این تابع یک بار از بیرون کلاس فراخوانی میشه و یک بار وقتی از داخل تمپلت فرم را عوض میکنیم
    update({ data, officeData, patientData, sessionIndex = 0 }) {
        // ذخیره کل دیتا برای استفاده داخلی آپدیت فرم انتخاب شده
        this.allData = { data, officeData, patientData, sessionIndex }
        this.selectedForm.update({ data, officeData, patientData, sessionIndex })
    }

    // توابع داخلی ایجاد دکمه و لینک های بالای فرم
    putButton({ container, id, text, className }) {
        const button = document.createElement('button');
        button.setAttribute('id', id);
        className && button.setAttribute('class', className);
        button.innerHTML = text;
        container.appendChild(button);
        return button;
    }

    // تابع تاگل نمایش و مخفی کردن خطوط راهنمای طراحی
    toggleDisplay({ container, borderName }) {
        container.querySelectorAll(`[data-name=${borderName}]`)
            .forEach(element => {
                element.style.display = (element.style.display === '') ? 'none' : '';
            });

    }
}