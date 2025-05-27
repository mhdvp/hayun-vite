import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";


export default class Header {
    constructor({ container }) {
        this.container = container;
    }

    draw({ dims, stroke = true }) {

        this.inputs = dims.inputs
        let value;
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;

        const svg = putSVG({ x, y, width, height, style: 'direction: rtl !important; user-select: none;' })

        // Logo 
        let image = document.createElementNS(svgNS, "image");
        image.setAttribute("data-name", "officeLogo")
        image.setAttribute("width", "17");
        image.setAttribute("height", height - 1);
        image.setAttribute("x", width - 16);
        image.setAttribute("y", 0.5);
        svg.appendChild(image);

        let style = `
            user-select: none;
            direction: rtl;
            /* text-align: center; */
            font-family: vazirmatn;
            font-size: 0.8mm;
            font-weight: bolder;
            text-anchor: start; /*تراز افقی*/
            dominant-baseline: auto; /* تراز عمودی*/  
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

        // محل اینپوت‌های دیتا
        let name;
        dims.inputs.forEach(input => {
            ({ name, x, y, style } = input);
            putText({ container: svg, x, y, style, name });
        });

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        const borderRect = putRect({ container: svg, x: 0, y: 0, width, height, name: "header" });;
        this.borderRect = borderRect;
        this.container.appendChild(svg);
        // this.header = svg;
    }

    update(data) {
        this.container.querySelector("[data-name=officeName]").innerHTML = data?.officeName || "";
        this.container.querySelector("[data-name=date]").innerHTML = data?.createDate || "";
        this.container.querySelector("[data-name=officeLogo]").setAttribute("href", data?.officeLogo || "");

    }

}