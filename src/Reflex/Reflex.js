import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
import units from "./units.js";

export default class Reflex {
    constructor({ container, side, dims }) {
        this.container = container;
        this.side = side; // این برای تعیین رنگ راست و چپ استفاده می‌شود
        this.draw({ dims })
    }

    draw({ dims }) {

        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;
        let style;

        // کل چارت
        // const svg = putSVG({ x, y, width, height, className: 'reflex' })
        let { styles, vbWidth, vbHeight } = units;

        // کل چارت
        style = styles.svg
        vbHeight = (vbWidth * height) / width // متناسب سازی ارتفاع ویباکس با پهنا و ارتفاع ورودی
        const viewBox = [0, 0, vbWidth, vbHeight].join(' ');
        const svg = putSVG({ x, y, width, height, viewBox, style })
        // این خط شد دو خط کد طلایی که مشکل سایز فونت در دیسپلی و کاغذ رو حل کرد
        width = vbWidth; // ثابت می‌ماند همیشه
        height = vbHeight // با نسبت پهنا و ارتفاع ورودی تغییر میکند 


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

        // مقادیر برچسب‌های ستون اول
        style = styles.textLable
        lable = ["Freq", "IPSI", "CONTRA"];
        // چاپ برچسب‌های ستون اول
        putText({ container: svg, value: "Freq", x: cw1, y: ch1 / 2, style: style })
        putText({ container: svg, value: "IPSI", x: cw1, y: ch1 * 3 / 2, style: style })
        putText({ container: svg, value: "CONTRA", x: cw1, y: ch1 * 5 / 2, style: style })

        //چاپ ده باکس سطر دوم و سوم
        const inputBox = {
            width: width / 5 * 0.80, height: height / 3 * 0.8,
            rx: width / 100
        }
        // محاسبه کمان گردی بر اساس مقدار پهنا
        inputBox.rx = inputBox.width / 10

        for (let j = 1; j <= 2; j++) {
            for (let i = 1; i <= 4; i++) {
                let cx = cw1 / 2 + cw1 * i;
                let cy = ch1 * j + ch2 / 2;
                //رسم باکس با مختصات مرکز باکس
                // مختصات مرکز باکس ها رو توی یک پراپرتی کلاس میذاریم که بتونیم برای المنت های اینپوت بعدا استفاده کنیم
                putRect({
                    container: svg, cx, cy,
                    width: inputBox.width, height: inputBox.height, rx: inputBox.rx
                });
            }
        }

        // مقادیر ورودی عددی
        style = styles.inputNumber
        // اضافه کردن رنگ قرمز یا آبی به استایل بر اساس جهت
        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        let names = ["IPSI_500", "IPSI_1000", "IPSI_2000", "IPSI_4000"];
        for (let index = 0; index < 4; index++) {
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 + ch2 / 2;
            putText({ container: svg, value: "", x, y, style, name: names[index] })
        }

        // المنت‌های تکست خالی با آیدی یکتا در سطر سوم
        // آرایه نام آیدی یکتا برای المنت تکست مقادیر برای استفاده تابع آپدیت
        names = ["CONTRA_500", "CONTRA_1000", "CONTRA_2000", "CONTRA_4000"];

        for (let index = 0; index < 4; index++) {
            // const idValue = idValues[index];
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 * 2 + ch2 / 2;
            putText({ container: svg, value: "", x, y, style, name: names[index] })
        }
        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه و دریافت رویداد کلیک روی فرم
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.container.appendChild(svg);
        this.chart = svg;

    }

    // جایگذاری داده های رفلکس
    update(data) {
        for (const key in data) {
            for (const freq in data[key]) {
                this.chart.querySelector(`text[data-name=${key}_${freq}]`).innerHTML = data?.[key]?.[freq] || "";
            }
        }
    }
}