const svgNS = "http://www.w3.org/2000/svg";

import printForm from "./printForm.js";
import Form from "./Form.js";
import combo from "./templates/combo.js"; // این در حقیقیت یک تمپلت هست
import rasaAud from "./templates/rasa_audiometry.js";
import rasaTymp from './templates/rasa_tymp_reflex.js'

// خط کد زیر لازم هست
// import './fonts/Vazirmatn-Regular.woff2'
import '../style.css'

// کلاس جدید که فرم‌های مختلف را نمایش میدهد
export default class Forms {
    constructor({ assets, container, defaultFormIndex = 0 } = {}) {
        this.container = container
        // this.addForms({ templates: [rasaAud, rasaTymp, combo], defaultFormIndex })
        this.addForms({ templates: [combo], defaultFormIndex })
    }

    // افزودن فرم 
    addForms({ templates, defaultFormIndex }) {
        const container = this.container
        // ایجاد یک دیو برای قرار دادن دکمه ها و لینک های فرم
        const div = document.createElement('div');
        container.addEventListener('click', e => {
            console.log(e.target);
        })

        div.style = 'border: 1px solid brown; margin: 0; padding: 0;'
        container.appendChild(div);

        // اضافه کردن دکمه به دیو فرم
        let className = 'button-form persian';
        const btns = [];

        const forms = []; // آرایه آبجکت های فرم های مختلف
        this.forms = forms;

        templates.forEach((template, index) => {
            btns[index] = this.putButton({ container: div, text: template.label, className });
            this.forms.push(new Form({ container, template }));
        });

        const printBtn = this.putButton({ container: div, text: 'چاپ', className });

        // تعریف رویداد دکمه چاپ فرم نمایشی
        printBtn.addEventListener('click', () => { printForm({ container: this.selectedForm.form }) });

        // انتخاب فرم پیش‌فرض  
        let selectedIndex = defaultFormIndex;
        forms[selectedIndex].form.style.display = 'block';
        this.selectedForm = this.forms[selectedIndex]
        btns[selectedIndex].style.backgroundColor = ' #1c15e1'


        btns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Hide All forms
                forms.forEach((form, i) => {
                    form.form.style.display = 'none'
                    btns[i].style.backgroundColor = ' #7472e2'

                });

                forms[index].form.style.display = 'block';
                btns[index].style.backgroundColor = ' #1c15e1'

                this.selectedForm = forms[index];
                selectedIndex = index
                this.update(this.allData);
            })
        })

        this.putButton({ container: div, text: 'Show/Hide', className })
            .addEventListener('click', () => { this.toggleDisplay({ container: forms[selectedIndex].form }) });
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
    toggleDisplay({ container }) {
        container.querySelectorAll(`[data-name='guide-border']`)
            .forEach(element => {
                element.style.display = (element.style.display === '') ? 'none' : '';
            });

    }
}