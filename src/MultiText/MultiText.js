import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class MultiText {
    constructor({ container, dims }) {
        this.container = container;
        this.draw({ dims })
    }

    draw({ dims }) {
        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        this.inputs = (dims.forceInsert) ? dims.forceInputs : dims.inputs;

        let value;
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;

        let style, className;
        style = `
        font-family: Vazirmatn; 
        font-size: 1mm;
        white-space: break-spaces;
        /* font-weight: bold; */
        direction: rtl !important;
        user-select: none;
        dominant-baseline: middle;
        `;
        const svg = putSVG({ x, y, width, height, style })

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
        this.inputs && this.inputs.
            forEach(input => {
                ({ name, x, y } = input);
                putText({ container: svg, x, y, className: 'persian', name });
            });

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        const borderRect = putRect({
            container: svg, x: 0, y: 0, width, height,
            name: dims.name, className: 'no-print',
            style: 'stroke: transparent; fill: transparent; stroke-width: 0.3;'
        });
        this.borderRect = borderRect;
        this.container.appendChild(svg)

        // Box Border for Design guid with Brown Color
        dims.boxBorder === 'display' && putRect({
            container: svg, x: 0, y: 0, width, height,
            style: 'fill: transparent; stroke-width: 0.3; stroke: brown;',
            name: 'box-border',
            className: 'no-print',
        })

        this.container.appendChild(svg)
    }

    update(data) {
        this.inputs.forEach(input => {
            let value = data?.[input.name];
            const textInput = this.container.querySelector(`text[name=${input.name}]`)

            // پیدا کردن کاراکترهای رفتن به سرخط در متن
            if (value) {
                const textLines = value.toString().split(/\n|\r|\r\n/);
                const x = textInput.getAttribute('x')
                // اگر متن چند خطی بود 
                if (textLines.length >= 2) {
                    // اول از همه هر چی تی‌اسپن از قبل توی این تکست اینپوت هست پاک کن
                    textInput.textContent = ""

                    let y = 5;
                    textLines.forEach(value => {
                        putTspan({ container: textInput, value, x, y });
                        y += 6;
                    })
                } else textInput.textContent = value || "";
            }
        });
    }
}

function putTspan({ container, value, x, y = 5, dx = 0, dy = 0, style }) {
    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.setAttribute('x', x);
    tspan.setAttribute('y', y)
    tspan.textContent = value;
    container && container.appendChild(tspan)
    return tspan;
}
