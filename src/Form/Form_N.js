const svgNS = "http://www.w3.org/2000/svg";

import printForm from "./printForm.js";
import Template from "./Templates/Template.js";
import Template1 from "./Templates/Template1.js";
import Template2 from "./Templates/Template2.js";
import Template3 from "./Templates/Template3.js";


export default class Form {
    constructor({ name, container } = {}) {
        // ایجاد یک دیو برای قرار دادن دکمه ها و لینک های فرم
        const div = document.createElement('div');
        div.style = 'border: 1px solid brown; margin: 0; padding: 0;'
        container.appendChild(div);
        // اضافه کردن دکمه به دیو فرم
        const btn1 = this.putButton({ container: div, text: 'Form 1', id: 'template1' });
        const btn2 = this.putButton({ container: div, text: 'Form 2', id: 'template2' });
        const btn3 = this.putButton({ container: div, text: 'Form 3', id: 'template3' });
        const printBtn = this.putButton({ container: div, text: 'Print', id: 'print' });

        // this.container = div;

        // یک دیو تعریف میکنیم که سمت ادیولاگ برای تعریف لیستنر استفاده می‌شود
        this.div = document.createElement('div'); // این بخش فقط شامل بخش اس‌وی‌جی هست
        container.appendChild(this.div)

        this.template1 = new Template({ container: this.div });
        this.template2 = new Template2({ container: this.div });
        this.template3 = new Template3({ container: this.div });

        // تعریف رویداد دکمه چاپ فرم نمایشی
        printBtn.addEventListener('click', () => { printForm({ container: this.activeForm }) })

        // ایجاد المنت چک باکس با برچسب
        // const checkBox = document.createElement('input');
        // checkBox.setAttribute('type', 'checkbox');
        // checkBox.setAttribute('id', 'chkb');
        // const label = document.createElement('label');
        // label.innerHTML = 'Select for Print';
        // label.setAttribute('for', checkBox.getAttribute('id'))
        // div.appendChild(checkBox)
        // div.appendChild(label)

        this.draw2();
        // نمایش پیش‌فرض فرم شماره یک
        this.template1.form.style.display = 'block';
        this.activeForm = this.template1.form;

        btn1.addEventListener('click', () => {
            this.template2.form.style.display = 'none'
            this.template3.form.style.display = 'none'
            this.template1.form.style.display = 'block';
            this.activeForm = this.template1.form;
            console.log(this.activeForm);

        });

        btn2.addEventListener('click', () => {
            this.template1.form.style.display = 'none'
            this.template3.form.style.display = 'none'
            this.template2.form.style.display = 'block';
            this.activeForm = this.template2.form;

        });

        btn3.addEventListener('click', () => {
            this.template1.form.style.display = 'none'
            this.template2.form.style.display = 'none'
            this.template3.form.style.display = 'block';
            this.activeForm = this.template3.form;

        });
        // for Develop
        this.event();

    }

    draw2() {
        this.template1.draw();
        this.template2.draw();
        this.template3.draw();

    }

    draw() { }

    event() {
        this.div.addEventListener('click', (e) => {
            console.log(e.target);
        })
    }

    update({ template, data, officeData, patientData, sessionIndex = 0 }) {

        this.template1.update({ data, officeData, patientData, sessionIndex })
        this.template2.update({ data, officeData, patientData, sessionIndex })
        this.template3.update({ data, officeData, patientData, sessionIndex })

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
        let style = `
            background-color:rgb(0, 149, 149);
            /* Green background */
            border: none;
            /* Remove borders */
            color: white;
            /* White text */
            padding: 15px 32px;
            /* Some padding */
            text-align: center;
            /* Centered text */
            text-decoration: none;
            /* Remove underline */
            display: inline-block;
            /* Make the button inline */
            font-size: 16px;
            /* Increase font size */
            margin: 4px 2px;
            /* Add some margin */
            cursor: pointer;
            /* Pointer cursor on hover */
            border-radius: 8px;
            /* Rounded corners */
            transition: background-color 0.3s;
            /* Smooth transition */
        `;
        const button = document.createElement('button');
        button.setAttribute('id', id);
        button.setAttribute('style', style);
        button.innerHTML = text;

        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'rgb(54, 115, 115)'; // Change color on hover
        });
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'rgb(0, 149, 149)'; // Revert color when not hovering
        });

        container.appendChild(button);
        return button;

    }

}