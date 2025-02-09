const svgNS = "http://www.w3.org/2000/svg";

import printForm from "./printForm.js";
import Form from "./Form.js";
import combo from "./templates/combo.js"; // این در حقیقیت یک تمپلت هست
import rasaAud from "./templates/rasaAud.js";
import rasaAudImage from './templates/rasaAud.png'
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
        const btn1 = this.putButton({ container: div, text: 'پرنده پرپر' });
        const btn2 = this.putButton({ container: div, text: combo.label });
        const printBtn = this.putButton({ container: div, text: 'Print', id: 'print' });

        // یک دیو تعریف میکنیم که سمت ادیولاگ برای تعریف لیستنر استفاده می‌شود
        this.div = document.createElement('div'); // این بخش فقط شامل بخش اس‌وی‌جی هست
        container.appendChild(this.div)

        this.forms = []; // آرایه آبجکت های فرم های مختلف
        this.forms.push(new Form({ container: this.div, template: rasaAud, image: rasaAudImage }));
        this.forms.push(new Form({ container: this.div, template: combo }));

        // انتخاب فرم پیش‌فرض  
        this.forms[0].form.style.display = 'block';
        this.selectedForm = this.forms[0]

        // تعریف رویداد دکمه چاپ فرم نمایشی
        printBtn.addEventListener('click', () => { printForm({ container: this.selectedForm.form }) })

        btn1.addEventListener('click', () => {
            this.forms[1].form.style.display = 'none'
            // this.forms[2].form.style.display = 'none'
            this.forms[0].form.style.display = 'block';
            this.selectedForm = this.forms[0];
            this.update(this.allData);

        });

        btn2.addEventListener('click', () => {
            this.forms[0].form.style.display = 'none'
            // this.forms[2].form.style.display = 'none'
            this.forms[1].form.style.display = 'block';
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
        this.event();
    }

    event() {
        this.div.addEventListener('click', (e) => {
            console.log(e.target);
        })
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
    putButton({ container, id, text, }) {
        let style
        //     style = `
        //     background-color:rgb(0, 149, 149);
        //     /* Green background */
        //     border: none;
        //     /* Remove borders */
        //     color: white;
        //     /* White text */
        //     padding: 15px 32px;
        //     /* Some padding */
        //     text-align: center;
        //     /* Centered text */
        //     text-decoration: none;
        //     /* Remove underline */
        //     display: inline-block;
        //     /* Make the button inline */
        //     font-size: 16px;
        //     /* Increase font size */
        //     margin: 4px 2px;
        //     /* Add some margin */
        //     cursor: pointer;
        //     /* Pointer cursor on hover */
        //     border-radius: 8px;
        //     /* Rounded corners */
        //     transition: background-color 0.3s;
        //     /* Smooth transition */
        // `;
        const button = document.createElement('button');
        button.setAttribute('id', id);
        button.setAttribute('style', style);
        button.innerHTML = text;

        // button.addEventListener('mouseenter', () => {
        //     button.style.backgroundColor = 'rgb(54, 115, 115)'; // Change color on hover
        // });
        // button.addEventListener('mouseleave', () => {
        //     button.style.backgroundColor = 'rgb(0, 149, 149)'; // Revert color when not hovering
        // });

        container.appendChild(button);
        return button;

    }
}