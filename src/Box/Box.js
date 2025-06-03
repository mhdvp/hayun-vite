import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Box {
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

        let style, className;
        style = `
        /* font-family: Arial, Helvetica, sans-serif !important; */
        font-size: 1mm;
        white-space: break-spaces;
        /* font-weight: bold; */
        direction: rtl !important;
        user-select: none;
        /* dominant-baseline: middle; /* تراز عمودی*/
        `;
        // بوردر کل چارت
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("x", x);
        svg.setAttribute("y", y);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.setAttribute('style', style)
        // svg.setAttribute('class', 'text-box')

        // اگر مقدار استروک درست بود لیبل ها را چاپ کن
        if (!dims.hideContext) {
            dims.elements
                .forEach(
                    element => {
                        switch (element.type) {
                            case 'text':
                                ({ x, y, value, style } = element);
                                putText({ container: svg, value, x, y, style, className: 'persian bold' });
                                break;
                            case 'line':
                                let { x1, y1, x2, y2 } = element;
                                putLine({ container: svg, x1, y1, x2, y2 });
                                break;
                        }
                    });
        }

        // محل اینپوت‌های دیتا
        let name;
        this.inputs && this.inputs.forEach(input => {
            ({ name, x, y } = input);
            putText({ container: svg, x, y, className: 'persian', name });
        });

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        const borderRect = putRect({
            container: svg, x: 0, y: 0, width, height,
            name: dims.name, className: 'no-print',
            style: 'stroke: transparent; fill: transparent '
        });
        this.borderRect = borderRect;
        // console.log(dims);

        this.container.appendChild(svg)
        // this.patient = svg;

    }

    update(data) {
        this.inputs.forEach(input => {
            let value = data?.[input.name];
            const textInput = this.container.querySelector(`text[data-name=${input.name}]`)

            // پیدا کردن کاراکترهای رفتن به سرخط در متن
            const textLines = value.toString().split(/\n|\r|\r\n/);
            const x = textInput.getAttribute('x')
            // اگر متن چند خطی بود 
            if (textLines.length >= 2) {
                let y = 5;
                textLines.forEach(value => {
                    putTspan({ container: textInput, value, x, y });
                    y += 6;
                })
            } else textInput.innerHTML = value || "";
        });
    }
}

function putTspan({ container, value, x , y = 5, dx = 0, dy = 0, style }) {
    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.setAttribute('x', x);
    tspan.setAttribute('y', y)
    tspan.textContent = value;
    container && container.appendChild(tspan)
    return tspan;
}
