import putCell from "../common/putCell.js";
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
import putSVG from "../common/putSVG.js";
import units from "./units.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Speech {
    constructor({ box, side = 'R' }) {
        // const { container, width, height, elements } = box
        // this.container = container;
        this.side = side;
        this.draw({ box })
    }

    draw({ box }) {
        const { container, width, height, margin, elements, name} = box

        // console.log(dims);

        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        // this.inputs = (dims.forceInsesrt) ? dims.forceInputs : dims.inputs
        let style;
        // let width = dims.width;
        // let height = dims.height;
        let x = margin.left;
        let y = margin.top;

        // کل چارت
        // const svg = putSVG({ x, y, width, height, viewBox: [0, 0, width, height] })



        const labels = elements;
        this.labels = labels;
        let { styles } = units;
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
            x = cw / 2;
            y = ch / 2 + ch * i;
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = { i, j, x, y };
                x += cw;
            }
        }

        style = styles.label;
        // برچسب های سطر اول
        // برای فرم های پیش چاپ شده انجام نمیشود
        // !dims.hideContext &&
        matrix[0].forEach((cell, index) =>
            putText({ container, value: labels[index], x: cell.x, y: cell.y, dx: 0, dy: 1, style }));

        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        const inputBox = {
            width: width / 5 * 0.78, height: height / 2 * 0.85,
            rx: width / 100
        }
        // محاسبه کمان گردی بر اساس مقدار پهنا
        inputBox.rx = inputBox.width / 10

        // باکس و تکست مقادیر
        matrix[1].forEach((cell, index) => {
            // برای فرم های پیش چاپ شده باکس رسم نمیشود
            // !dims.hideContext &&
            putCell({
                container, x: cell.x, y: cell.y, dy: -1,
                width: inputBox.width, height: inputBox.height,
                rx: inputBox.rx,
            });
            // مقدار نگه دارها
            // if (!dims.forceInsert) {
            putText({ container, value: "", x: cell.x, y: cell.y, style, name: labels[index] });
            // } else {
            //     // برای فرم های مثل رسا استفاده میشود
            //     let name;
            //     this.inputs.forEach(input => {
            //         ({ name, x, y } = input);
            //         putText({ container: svg, x, y, style, name });
            //     });
            // }
        }
        );


        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        let className = 'no-print'
        putRect({ container, x: 0, y: 0, width, height, style, name })
        // this.chart = svg;
        // container.appendChild(svg);
    }

    update(data) {
        this.labels.forEach((label) => {
            this.chart.querySelector(`text[data-name=${label}]`).innerHTML = data?.[label] || "";
        })
    }
}