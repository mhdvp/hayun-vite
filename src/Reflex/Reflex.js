import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
import units from "./units.js";

export default class Reflex {
    constructor({ container, side, dims }) {
        this.container = container;
        this.side = side; // این برای تعیین رنگ راست و چپ استفاده می‌شود
        this.inputDims = [] // پراپرتی نگهداری مختصات مرکز اینپوت ها
        this.draw({ dims })
    }

    draw({ dims }) {

        let w = dims.width;
        let h = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;
        let style;

        // کل چارت
        // const svg = putSVG({ x, y, width, height, className: 'reflex' })
        let { styles, vbWidth, vbHeight } = units;

        // کل چارت
        style = styles.svg
        vbHeight = (vbWidth * h) / w // متناسب سازی ارتفاع ویباکس با پهنا و ارتفاع ورودی
        const viewBox = [0, 0, vbWidth, vbHeight].join(' ');
        const svg = putSVG({ x, y, width: w, height: h, viewBox, style })
        // این خط شد دو خط کد طلایی که مشکل سایز فونت در دیسپلی و کاغذ رو حل کرد
        const width = vbWidth; // ثابت می‌ماند همیشه
        const height = vbHeight // با نسبت پهنا و ارتفاع ورودی تغییر میکند 
        const kx = w / width // ضرایب برای محاسبه مختصات پیکسلی
        const ky = h / height

        // چاپ برچسب‌های سطر اول
        style = styles.numberlabel;
        let lable = ["", "500", "1000", "2000", "4000"]; // مقادیر برچسب‌های سطر اول
        // جدولی با ۳ سطر و ۵ ستون
        let cw1 = width / 5; // پهنای خانه‌های سطر اول
        let ch1 = height / 3; // ارتفاع خانه‌های سطر اول
        let ch2 = height / 3; // ارتفاع خانه‌های سطر دوم

        lable.forEach((value, i) => {
            if (value != "") {
                let x = cw1 / 2 + cw1 * i;
                let y = ch1 / 2;
                putText({ container: svg, value, x, y, style })
            }
        });

        let dx = 0, dy = 0
        // مقادیر برچسب‌های ستون اول
        style = styles.textLable
        lable = ["Freq", "IPSI", "CONTRA"];
        // چاپ برچسب‌های ستون اول
        putText({ container: svg, value: "Freq", x: cw1, y: ch1 / 2, dx, dy, style })
        putText({ container: svg, value: "IPSI", x: cw1, y: ch1 * 3 / 2, dx, dy, style })
        putText({ container: svg, value: "CONTRA", x: cw1, y: ch1 * 5 / 2, dx, dy, style })

        //چاپ ده باکس سطر دوم و سوم
        const inputBox = {
            width: width / 5 * 0.80, height: height / 3 * 0.8,
            rx: width / 100
        }
        // محاسبه کمان گردی بر اساس مقدار پهنا
        inputBox.rx = inputBox.width / 10
        dy = -1
        for (let j = 1; j <= 2; j++) {
            for (let i = 1; i <= 4; i++) {
                let cx = cw1 / 2 + cw1 * i;
                let cy = ch1 * j + ch2 / 2;
                //رسم باکس با مختصات مرکز باکس
                putRect({
                    container: svg, cx, cy, dx, dy,
                    width: inputBox.width, height: inputBox.height, rx: inputBox.rx
                });
            }
        }

        // مقادیر ورودی عددی
        style = styles.inputNumber
        // اضافه کردن رنگ قرمز یا آبی به استایل بر اساس جهت
        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        let names = ["ipsi-500", "ipsi-1000", "ipsi-2000", "ipsi-4000"];
        for (let index = 0; index < 4; index++) {
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 + ch2 / 2;
            putText({ container: svg, value: "", x, y, dx, dy, style, name: names[index] })
            // مختصات مرکز باکس ها رو توی یک پراپرتی کلاس میذاریم
            // که بتونیم برای المنت های اینپوت بعدا استفاده کنیم
            this.inputDims.push({ name: names[index], x: (x + dx) * kx, y: (y + dy) * ky })
        }

        // المنت‌های تکست خالی با آیدی یکتا در سطر سوم
        // آرایه نام آیدی یکتا برای المنت تکست مقادیر برای استفاده تابع آپدیت
        names = ["contra-500", "contra-1000", "contra-2000", "contra-4000"];

        for (let index = 0; index < 4; index++) {
            // const idValue = idValues[index];
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 * 2 + ch2 / 2;
            putText({ container: svg, value: "", x, y, style, name: names[index] })
            // مختصات مرکز باکس ها رو توی یک پراپرتی کلاس میذاریم
            // که بتونیم برای المنت های اینپوت بعدا استفاده کنیم
            this.inputDims.push({ name: names[index], x: (x + dx) * kx, y: (y + dy) * ky })
        }
        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه و دریافت رویداد کلیک روی فرم
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.container.appendChild(svg);
        this.chart = svg;

    }

    // جایگذاری داده های رفلکس
    update(data) {
        
        this.data = data

        for (const key in data) {
            for (const freq in data[key]) {
                this.chart.querySelector(`text[name=${key}-${freq}]`).innerHTML = data?.[key]?.[freq] || "";
            }
        }
    }

    createUserInput({ container }) {
        // استایل دهی نسبی به کانتینر
        // برای قرار دادن اینپوت ها در مختصات کانتینر
        container.style.position = 'relative'
        const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
        const height = 30 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش

        let style = `
            all: revert;
            width: ${width}px;
            height: ${height}px;
            box-sizing: border-box;
            border: none;
            /* Ensures padding doesn't increase height */
            position: absolute;
            padding-top: 4px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            font-family: Vazirmatn;
        `
        const color = (this.side === 'R') ? 'crimson' : 'blue';
        // ایجاد یک المنت اینپوت
        // let input
        // آماده سازی اولین نود اینپوت از داکیومنت و سپس ساختن بقیه نودها از روی آن
        // const firstInput = input // نگهداری اولین اینپوت برای برگشت و فوکوس کردن بهش
        let inputDims = this.inputDims

        inputDims.forEach(dims => {
            const input = document.createElement('input')
            // input.className = 'user-input'
            input.name = dims.name
            input.type = 'text'
            input.maxLength = 4
            input.autocomplete = 'off'
            input.placeholder = '---'
            input.style = style
            input.style.color = color
            input.style.left = dims.x - width / 2 + 'px'
            input.style.top = dims.y - height / 2 + 'px'
            container.appendChild(input)
            // input = input.cloneNode() // در آخر  یک المنت اضافه ایجاد شده است - باگ بی آزار
        })
        // firstInput.focus()
    }
}