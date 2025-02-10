const svgNS = "http://www.w3.org/2000/svg";

import printForm from "./printForm.js";
import Form from "./Form.js";
import combo from "./templates/combo.js"; // این در حقیقیت یک تمپلت هست
import rasaAud from "./templates/rasa_audiometry.js";
// import rasaAudImage from './templates/rasaAud.png'
import rasaAudImage from './templates/rasa_audiometry.png'

// خط کد زیر لازم هست
import '../fonts/Vazirmatn-Regular.woff2'
import '../style.css'

// کلاس جدید که فرم‌های مختلف را نمایش میدهد
export default class Forms {
    constructor({ assets, container } = {}) {
        // ایجاد یک دیو برای قرار دادن دکمه ها و لینک های فرم
        const div = document.createElement('div');
        div.style = 'border: 1px solid brown; margin: 0; padding: 0;'
        container.appendChild(div);
        // اضافه کردن دکمه به دیو فرم
        let className = 'button-form persian';
        const btn = [];
        btn[0] = this.putButton({ container: div, text: rasaAud.label, className });
        btn[1] = this.putButton({ container: div, text: combo.label, className });
        const printBtn = this.putButton({ container: div, text: 'چاپ', className });

        // یک دیو تعریف میکنیم که سمت ادیولاگ برای تعریف لیستنر استفاده می‌شود
        this.div = document.createElement('div'); // این بخش فقط شامل بخش اس‌وی‌جی هست
        container.appendChild(this.div)

        this.forms = []; // آرایه آبجکت های فرم های مختلف
        this.forms.push(new Form({ container: this.div, template: rasaAud, image: rasaAudImage }));
        this.forms.push(new Form({ container: this.div, template: combo }));

        // انتخاب فرم پیش‌فرض  
        this.forms[0].form.style.display = 'block';
        this.selectedForm = this.forms[0]
        btn[0].style.backgroundColor = ' #1c15e1'

        // تعریف رویداد دکمه چاپ فرم نمایشی
        printBtn.addEventListener('click', () => { printForm({ container: this.selectedForm.form }) })

        btn[0].addEventListener('click', () => {
            this.forms[1].form.style.display = 'none'
            btn[1].style.backgroundColor = ' #7472e2'

            // this.forms[2].form.style.display = 'none'
            this.forms[0].form.style.display = 'block';
            btn[0].style.backgroundColor = ' #1c15e1'

            this.selectedForm = this.forms[0];
            this.update(this.allData);

        });

        btn[1].addEventListener('click', () => {
            this.forms[0].form.style.display = 'none'
            btn[0].style.backgroundColor = ' #7472e2'

            // this.forms[2].form.style.display = 'none'
            this.forms[1].form.style.display = 'block';
            btn[1].style.backgroundColor = ' #1c15e1'

            this.selectedForm = this.forms[1];
            // آپدیت فرم انتخاب شده
            this.update(this.allData);
        });

        // btn3.addEventListener('click', () => {
        //     this.forms[0].form.style.display = 'none'
        //     this.forms[1].form.style.display = 'none'
        //     this.forms[2].form.style.display = 'block';
        //     this.selectedForm = this.forms[2]
        //     // آپدیت فرم انتخاب شده
        //     this.update(this.allData);

        // });
        // for Develop
        // this.event();
    }
    // این تابع یک بار از بیرون کلاس فراخوانی میشه و یک بار وقتی از داخل تمپلت فرم را عوض میکنیم
    update({ data, officeData, patientData, sessionIndex = 0 }) {
        // ذخیره کل دیتا برای استفاده داخلی آپدیت فرم انتخاب شده
        this.allData = { data, officeData, patientData, sessionIndex }
        this.selectedForm.update({ data, officeData, patientData, sessionIndex })
    }
    // ایجاد دکمه تاگل خطوط مرزی فرم و سکشن و المان
    toggleBorders({ activeForm, container = 'form' }) {
        const borders = activeForm.querySelectorAll(`[data-name="${container}-border"]`);
        // آبجکت نگهداری رنگ بوردرها
        const color = { form: 'black', section: 'blue', element: 'green' }
        borders.forEach(border => {
            // console.log(border.style.stroke);
            border.style.stroke = (border.style.stroke === 'transparent') ? color[container] : 'transparent';
        })
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
}