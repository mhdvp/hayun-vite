import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class TextBox {
    constructor({ container }) {
        this.container = container;
    }
    draw({ dims, stroke = true }) {
        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        this.inputs = (dims.forceInsert) ? dims.forceInputs : dims.inputs

        let value;
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;

        let style;
        // بوردر کل چارت
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("x", x);
        svg.setAttribute("y", y);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute('style', 'direction: rtl !important; user-select: none;')

        style = `
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 0.8mm;
            font-weight: bold;
            text-anchor: start; /*تراز افقی*/
            /* dominant-baseline: middle; /* تراز عمودی*/       
        `;
        // اگر مقدار استروک درست بود لیبل ها را چاپ کن
        if (!dims.hideContext) {
            dims.elements.forEach(element => {
                switch (element.type) {
                    case 'text':
                        ({ x, y, value } = element);
                        putText({ container: svg, value, x, y, style: style });
                        break;
                    case 'line':
                        let { x1, y1, x2, y2 } = element;
                        putLine({ container: svg, x1, y1, x2, y2 });
                        break;
                }
            });
        }

        style = `
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 0.8mm;
            text-anchor: start; /*تراز افقی*/
            /* dominant-baseline: middle; /* تراز عمودی*/       
        `;
        // محل اینپوت‌های دیتا

        let name;
        this.inputs.forEach(input => {
            ({ name, x, y } = input);
            putText({ container: svg, x, y, style: style, name });
        });

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        const borderRect = putRect({ container: svg, x: 0, y: 0, width, height, name: dims.name });
        this.borderRect = borderRect;
        // console.log(dims);
        
        this.container.appendChild(svg)
        // this.patient = svg;

    }

    update(data) {
        this.inputs.forEach(input => {
            this.container.querySelector(`text[data-name=${input.name}]`).innerHTML = data?.[input.name] || "";
        });
    }
}