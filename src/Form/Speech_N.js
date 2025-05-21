import putTextBox from "../common/putTextBox.js";
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
import putSVG from "../common/putSVG.js";
import putPoint from "../common/putPoint.js";




const svgNS = "http://www.w3.org/2000/svg";

export default class Speech {
    constructor({ container, side = 'R' }) {
        this.container = container;
        this.side = side;
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
        this.labels = labels;
        // const cn = labels.length;
        let sideCaption = this.side === "R" ? "Right" : "Left";
        // یک جدول 6*2  - ۲ سطر و ۶ ستون
        const rows = 2;
        const column = labels.length;

        const cw = width / column; // پهنای هر خانه
        const ch = height / rows; // ارتفاع هر خانه

        // کل چارت
        const svg = putSVG({ x, y, width, height, className: 'speach' })

        const matrix = [
            [],
            []
        ];

        for (let i = 0; i < 2; i++) {
            x = cw / 2;
            y = ch / 2 + ch * i;
            for (let j = 0; j < 5; j++) {
                matrix[i][j] = { i, j, x, y };
                x += cw;
            }
        }
        style = `
            user-select: none;
            direction: ltr !important;
            /* text-align: center; */
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 1mm;
            font-weight: bold;
            text-anchor: middle; /*تراز افقی*/
        `;

        // برچسب های سطر اول
        // برای فرم های پیش چاپ شده انجام نمیشود
        !dims.hideContext &&
            matrix[0].forEach((cell, index) =>
                putText({ container: svg, value: labels[index], x: cell.x, y: cell.y, dx: 0, dy: 1, style }));

        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        // باکس و تکست مقادیر
        matrix[1].forEach((cell, index) => {
            // برای فرم های پیش چاپ شده باکس رسم نمیشود
            !dims.hideContext && putTextBox({ container: svg, x: cell.x, y: cell.y, dy: -1, w: 13, h: 7, rx: 1, });
            // مقدار نگه دارها
            if (!dims.forceInsert) {
                putText({ container: svg, value: "", x: cell.x, y: cell.y, style: style, name: labels[index] });
            } else {
                // برای فرم های مثل رسا استفاده میشود
                let name;
                this.inputs.forEach(input => {
                    ({ name, x, y } = input);
                    putText({ container: svg, x, y, style: style, name });
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