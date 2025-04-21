import putRect from "../common/putRect.js";
import putText from "../common/putText.js";

const svgNS = "http://www.w3.org/2000/svg";

export default class Reflex {
    constructor({ container, side }) {
        this.container = container;
        this.side = side; // این برای تعیین رنگ راست و چپ استفاده می‌شود
    }

    draw({ dims }) {
  
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;
        let style;

        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("x", x);
        svg.setAttribute("y", y);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("class", "reflex");

        let lable = ["", "500", "1000", "2000", "4000"]; // مقادیر برچسب‌های سطر اول
        // جدولی با ۳ سطر و ۵ ستون
        let cw1 = width / 5; // پهنای خانه‌های سطر اول
        let ch1 = height / 3; // ارتفاع خانه‌های سطر اول
        let ch2 = height / 3; // ارتفاع خانه‌های سطر دوم

        // چاپ برچسب‌های سطر اول
        style = `
            user-select: none;
            direction: ltr !important;
            /* text-align: center; */
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 0.9mm;
            font-weight: bold;
            text-anchor: middle; /*تراز افقی*/
            dominant-baseline: middle; /* تراز عمودی*/       
        `;
        lable.forEach((value, i) => {
            if (value != "") {
                let x = cw1 / 2 + cw1 * i;
                let y = ch1 / 2;
                // putText(value, x, y, "", "middle", "middle"); // با استایل تراز عمودی پایین نسبت به خط پایه
                putText({ container: svg, value, x, y, style })
            }
        });

        // مقادیر برچسب‌های ستون اول
        style = `
            user-select: none;
            direction: ltr !important;
            /* text-align: center; */
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 0.9mm;
            font-weight: bold;
            text-anchor: end; /*تراز افقی*/
            dominant-baseline: middle; /* تراز عمودی*/       
        `;
        lable = ["Freq", "IPSI", "CONTRA"];
        // چاپ برچسب‌های ستون اول
        putText({ container: svg, value: "Freq", x: cw1, y: ch1 / 2, style: style })
        putText({ container: svg, value: "IPSI", x: cw1, y: ch1 * 3 / 2, style: style })
        putText({ container: svg, value: "CONTRA", x: cw1, y: ch1 * 5 / 2, style: style })

        //چاپ ده باکس سطر دوم و سوم
        for (let j = 1; j <= 2; j++) {
            for (let i = 1; i <= 4; i++) {
                let x = cw1 / 2 + cw1 * i;
                let y = ch1 * j + ch2 / 2;
                let bw = cw1 * 0.8; // پهنای هر باکس
                let bh = ch2 * 0.7; // ارتفاع هر باکس
                //رسم باکس با مختصات مرکز باکس
                putBox(x, y, bw, bh);
            }
        }

        style = `
            user-select: none;
            direction: ltr !important;
            /* text-align: center; */
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 1mm;
            text-anchor: middle; /*تراز افقی*/
            dominant-baseline: middle; /* تراز عمودی*/
        `;
        // اضافه کردن رنگ قرمز یا آبی به استایل بر اساس جهت
        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        let names = ["IPSI_500", "IPSI_1000", "IPSI_2000", "IPSI_4000"];
        for (let index = 0; index < 4; index++) {
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 + ch2 / 2;
            putText({ container: svg, value: "", x: x, y: y, style: style, name: names[index] })
        }

        // المنت‌های تکست خالی با آیدی یکتا در سطر سوم
        // آرایه نام آیدی یکتا برای المنت تکست مقادیر برای استفاده تابع آپدیت
        names = ["CONTRA_500", "CONTRA_1000", "CONTRA_2000", "CONTRA_4000"];

        for (let index = 0; index < 4; index++) {
            // const idValue = idValues[index];
            x = cw1 / 2 + cw1 * (index + 1);
            y = ch1 * 2 + ch2 / 2;
            putText({ container: svg, value: "", x: x, y: y, style: style, name: names[index] })
        }
        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه و دریافت رویداد کلیک روی فرم
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.container.appendChild(svg);
        this.chart = svg;
        // return svg;

        // توابع داخلی مورد نیاز
        function putBox(x, y, w, h) {
            let rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", x - w / 2);
            rect.setAttribute("y", y - h / 2);
            rect.setAttribute("width", w);
            rect.setAttribute("height", h);
            rect.setAttribute("style", "fill: transparent; stroke: black; stroke-width: 0.2;");
            svg.appendChild(rect);
        }
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