import putRect from "../common/putRect.js";
import putText from "../common/putText.js";

const svgNS = "http://www.w3.org/2000/svg";

export default class Speech {
    constructor({ container, side = 'R' }) {
        this.container = container;
    }

    draw({ dims, stroke = true }) {
        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        this.inputs = (dims.forceInsert) ? dims.forceInputs : dims.inputs

        let style;

        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;

        const labels = dims.labels;
        // const inputs = dims.inputs;
        const cn = labels.length;

        this.labels = labels;



        let sideCaption = this.side === "R" ? "Right" : "Left";
        // یک جدول 6*2  - ۲ سطر و ۶ ستون
        // const cw = width / 6; // پهنای هر خانه
        const cw = width / (cn + 1); // پهنای هر خانه
        const ch = height / 2; // ارتفاع هر خانه
        // بوردر کل چارت
        const svg = document.createElementNS(svgNS, "svg");
        // svg.setAttribute("id", id);
        svg.setAttribute("x", x);
        svg.setAttribute("y", y);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute("class", "speach");

        style = `
                user-select: none;
                direction: ltr !important;
                /* text-align: center; */
                font-family: Arial, Helvetica, sans-serif !important;
                font-size: 0.8mm;
                font-weight: bold;
                text-anchor: middle; /*تراز افقی*/
                dominant-baseline: hanging; /* تراز عمودی*/       
            `;
        // const lables = ["SAT", "SRT", "MCL", "UCL", "SDS"]; // مقادیر برچسب‌های سطر اول
        // let cw1 = width / 6; // پهنای خانه‌های سطر اول
        let cw1 = width / (cn + 1); // پهنای خانه‌های سطر اول
        let ch1 = height / 2; // ارتفاع خانه‌های سطر اول
        let ch2 = height / 2; // ارتفاع خانه‌های سطر دوم

        if (!dims.hideContext) {
            // چاپ برچسب‌های سطر اول
            labels.forEach((value, i) => {
                let x = cw1 / 2 + cw1 * (i + 1);
                let y = ch1 / 2;
                putText({ container: svg, value, x, y, style });
            })
            //چاپ پنج باکس سطر دوم
            for (let i = 1; i <= 5; i++) {
                let x = cw1 / 2 + cw1 * i;
                let y = ch1 + ch2 / 2;
                let bw = cw1 * 0.80; // پهنای هر باکس
                let bh = ch2 * 0.80; // ارتفاع هر باکس
                //رسم باکس با مختصات مرکز باکس
                putBox({ x, y, w: bw, h: bh });
            }

            style += 'text-anchor: start; dominant-baseline: middle; /* تراز عمودی*/ ';
            // برچسب راست و چپ سطر دوم
            putText({ container: svg, value: sideCaption, x: cw1 / 2, y: ch1 + ch2 / 2, style: style }); //با استایل تراز عمودی وسط  نسبت به خط پایه
        }
        // در سطر دوم
        // اینپوت‌ها
        style += 'text-anchor: middle; dominant-baseline: middle; /* تراز عمودی*/ ';


        // New
        if (!dims.forceInsert) {
            let index = 0;
            labels.forEach(label => {
                index++
                x = cw1 / 2 + cw1 * index;
                y = ch1 + ch2 / 2;
                putText({ container: svg, value: "", x: x, y: y, style: style, name: label })
            })
        } else {
            // برای فرم های مثل رسا استفاده میشود
            let name;
            this.inputs.forEach(input => {
                ({ name, x, y } = input);
                putText({ container: svg, x, y, style: style, name });
            });
        }
        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.chart = svg;
        this.container.appendChild(svg);

        // توابع داخلی مورد نیاز
        // تابع رسم نقطه برای راهنمای نقاط
        function putBox({ x, y, w, h, style }) {
            let rect = document.createElementNS(svgNS, "rect");
            rect.setAttribute("x", x - w / 2);
            rect.setAttribute("y", y - h / 2);
            rect.setAttribute("width", w);
            rect.setAttribute("height", h);
            rect.setAttribute("style", "fill: transparent; stroke: black; stroke-width: 0.2;");
            svg.appendChild(rect);
        }
    }

    update(data) {
        this.labels.forEach((label) => {
            this.chart.querySelector(`text[data-name=${label}]`).innerHTML = data?.[label] || "";
        })
        // this.chart.querySelector(`text[data-name="SAT"]`).innerHTML = data?.SAT || "";
        // this.chart.querySelector(`text[data-name="SRT"]`).innerHTML = data?.SRT || "";
        // this.chart.querySelector(`text[data-name="MCL"]`).innerHTML = data?.MCL || "";
        // this.chart.querySelector(`text[data-name="UCL"]`).innerHTML = data?.UCL || "";
        // this.chart.querySelector(`text[data-name="SDS"]`).innerHTML = data?.SDS || "";
    }

}