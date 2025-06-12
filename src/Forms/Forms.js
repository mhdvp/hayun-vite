// import '../styles.css' // برای تست منتقل شد به فایل ایندکس اصلی اچ‌تی‌ام‌ال  و برای توسعه منتقل شده به ایندکس جی اس
import printForm from "./printForm.js"
import Form from "../Form/Form.js"
import putGrid from "../common/putGrid.js"

const svgNS = "http://www.w3.org/2000/svg"

import templCombo from "../../assets/templates/templCombo.js"  // این در حقیقیت یک تمپلت هست
import templAudiometry from "../../assets/templates/templAudiometry.js"

// کلاس جدید که فرم‌های مختلف را نمایش میدهد
export default class Forms {
    constructor({ assets, container, templates, defaultTemplateIndex = 0, mode = 'production' } = {}) {
        // console.log('I`M FROM Forms.constructor METHOD !!!!!!!!!!!!!!');
        
        this.container = container
        this.mode = mode;
        this.forms = [] // آرایه آبجکت های فرم های مختلف
        this.addForms({ templates, defaultTemplateIndex })
    }

    // افزودن فرم 
    addForms({ templates, defaultTemplateIndex }) {
        const forms = this.forms;
        const container = this.container
        // ایجاد یک دیو برای قرار دادن دکمه ها و لینک های فرم
        const div = document.createElement('div');
        div.style = 'border: 1px solid brown; margin: 0; padding: 0;'
        container.appendChild(div);

        // اضافه کردن دکمه به دیو فرم
        let className = 'button-form persian';
        const btns = [];

        templates.
            forEach((template, index) => {

                this.mode == 'develop' &&
                    (btns[index] = this.putButton({ container: div, text: template.label, className }))
                this.forms.push(new Form({ container, template, mode: this.mode }))
            })


        // انتخاب فرم پیش‌فرض  
        let selectedIndex = defaultTemplateIndex
        this.selectedIndex = selectedIndex // برای استفاده در متد آپدیت

        forms[selectedIndex].svg.style.display = 'block'
        // this.selectedForm = this.forms[selectedIndex] // سمی‌کالن واجب

        this.mode == 'develop' &&
            (btns[selectedIndex].style.backgroundColor = ' #1c15e1')  // اگر عبارت اول توی پرانتز باشه سمی‌کالن واجب

        // به ازای هر فرم یک دکمه هم به دیو بالای فرم اضافه میکند در حالت دولوپ
        // افزودن  دکمه مربوطه به فرمها به دام
        this.mode == 'develop' &&
            btns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Hide All forms
                    forms.forEach((form, i) => {
                        form.svg.style.display = 'none'
                        btns[i].style.backgroundColor = ' #7472e2'
                    })

                    forms[index].svg.style.display = 'block'
                    btns[index].style.backgroundColor = ' #1c15e1'

                    // this.selectedForm = forms[index]
                    selectedIndex = index
                    this.selectedIndex = selectedIndex
                    this.update(this.dataParams)
                })
            }) // سمی‌کالن واجب

        // افزودن چهار دکمه چاپ صفحه فرم انتخاب شده و تاگل پنهان یا نمایش
        this.mode == 'develop' &&
            this.addButtons({ container: div, className, svg: forms[selectedIndex].svg })
    }

    // افزودن چهار دکمه چاپ صفحه فرم انتخاب شده و تاگل پنهان یا نمایش
    addButtons({ container, className, svg }) {

        // تعریف دکمه و رویداد دکمه چاپ صفحه فرم نمایشی
        this.putButton({ container, text: 'چاپ', className })
            .addEventListener('click', () => {
                printForm({ container: this.forms[this.selectedIndex].svg })
            });

        // دکمه و رویداد نمایش و پنهان خطوط سکشن
        this.putButton({ container, text: 'Show/Hide Section Borders', className })
            .addEventListener('click', () => {
                this.toggleDisplay({ container: svg, borderName: 'section-border' })
            });

        // دکمه و رویداد نمایش و پنهان خطوط بوردر
        this.putButton({ container, text: 'Show/Hide Box Borders', className })
            .addEventListener('click', () => {
                this.toggleDisplay({ container: svg, borderName: 'box-border' })
            });

        // دکمه نمایش و پنهان شطرنجی
        this.putButton({ container, text: 'Show/Hide Grid', className })
            .addEventListener('mouseenter', () => {
                putGrid({ container: svg })
            });
        // فراخوانی تابع شطرنجی در اولین اجرا
        // putGrid({ container: forms[selectedIndex].svg })

    }

    // این تابع یک بار از بیرون کلاس فراخوانی میشه و یک بار وقتی از داخل تمپلت فرم را عوض میکنیم
    update({ officeData, patientData, sessionIndex = 0 }) {
        // console.log('I`M FROM Forms.update METHOD !!!!!!!!!!!!!!');

        // اگر هر دو دیتا وجود داشت  ادامه بده
        if (officeData && patientData) {
            // ذخیره کل دیتا برای استفاده داخلی آپدیت فرم انتخاب شده
            this.dataParams = { officeData, patientData, sessionIndex }
            // this.selectedForm.update({ officeData, patientData, sessionIndex })
            this.forms[this.selectedIndex].update(this.dataParams)
        }
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