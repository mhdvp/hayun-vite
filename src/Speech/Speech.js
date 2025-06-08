// https://docs.google.com/document/d/19Pgsi0eHRDgsxjkbxweHLRKVB60jrH4fzV52I83-6CM/edit?tab=t.977lyzmcu5uu#heading=h.sd8yc08kbsfo
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
import putSVG from "../common/putSVG.js";
import units from "./units.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Speech {
    constructor({ container, side = 'R', dims }) {
        
        this.container = container;
        this.side = side;
        this.draw({ dims })
    }

    draw({ dims }) {

        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        this.inputs = (dims.forceInsert) ? dims.forceInputs : dims.inputs
        let style;
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;
        let { styles, vbWidth, vbHeight } = units;
        let cx, cy;

        // کل چارت
        vbHeight = (vbWidth * height) / width // متناسب سازی ارتفاع ویباکس با پهنا و ارتفاع ورودی
        const viewBox = [0, 0, vbWidth, vbHeight].join(' ');
        const svg = putSVG({ x, y, width, height, viewBox })
        // این خط شد دو خط کد طلایی که مشکل سایز فونت در دیسپلی و کاغذ رو حل کرد
        width = vbWidth; // ثابت می‌ماند همیشه
        height = vbHeight // با نسبت پهنا و ارتفاع ورودی تغییر میکند 

        const labels = dims.labels;
        this.labels = labels;
        // یک جدول 6*2  - ۲ سطر و ۶ ستون
        const rows = 2;
        const columns = labels.length;
        const cw = width / columns; // پهنای هر خانه
        const ch = height / rows; // ارتفاع هر خانه
        // تعریف آبجکتی چارت
        const chart = {
            width, height,
            rows: 2, column: labels.length,
            cell: { width: 1, height: 1 },
            calc1: function () {
                this.cell.width = this.width / this.column
            }
        }

        // ایجاد ماتریکس سلول های چارت که آدرس و مختصات مرکز هر سلول را نگهداری میکند
        const matrix = [
            [],
            []
        ];

        for (let i = 0; i < rows; i++) {
            cx = cw / 2;
            cy = ch / 2 + ch * i;
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = { i, j, cx, cy };
                cx += cw;
            }
        }

        style = styles.label;
        // برچسب های سطر اول
        // برای فرم های پیش چاپ شده انجام نمیشود
        !dims.hideContext &&
            matrix[0].forEach((cell, index) =>
                putText({
                    container: svg, value: labels[index],
                    x: cell.cx, y: cell.cy, dx: 0, dy: 1, style
                }));

        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        const inputBox = {
            width: width / 5 * 0.80, height: height / 2 * 0.95,
            rx: width / 100
        }
        // محاسبه کمان گردی بر اساس مقدار پهنا
        inputBox.rx = inputBox.width / 10

        // باکس و تکست مقادیر
        matrix[1].forEach((cell, index) => {
            // برای فرم های پیش چاپ شده باکس رسم نمیشود
            !dims.hideContext &&
                putRect({
                    container: svg, cx: cell.cx, cy: cell.cy, dy: -1,
                    width: inputBox.width, height: inputBox.height,
                    rx: inputBox.rx,
                });
            // مقدار نگه دارها
            if (!dims.forceInsert) {
                putText({ container: svg, value: "", x: cell.cx, y: cell.cy, style, name: labels[index] });
            } else {
                // برای فرم های مثل رسا استفاده میشود
                let name;
                this.inputs.forEach(input => {
                    ({ name, x, y } = input);
                    putText({ container: svg, x, y, style, name });
                });
            }
        }
        );

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        let className = 'no-print'
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.chart = svg;
        this.container.appendChild(svg);
    }

    update(data) {
        this.labels.forEach((label) => {
            this.chart.querySelector(`text[data-name=${label}]`).innerHTML = data?.[label] || "";
        })
    }
}