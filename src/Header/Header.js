import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Header {
    constructor({ container }) {
        
        this.container = container;
    }

    draw({ dims }) {

        this.inputs = dims.inputs
        let value;
        let width = dims.width;
        let height = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;

        const svg = putSVG({ x, y, width, height, style: 'font-family: Vazir; direction: rtl !important; user-select: none;' })

        // Logo 
        let image = document.createElementNS(svgNS, "image");
        image.setAttribute("name", "officeLogo") // برای تابع آپدیت استفاده می‌شود
        image.setAttribute("width", "17");
        image.setAttribute("height", height - 1);
        image.setAttribute("x", width - 16);
        image.setAttribute("y", 0.5);
        svg.appendChild(image);

        let style = `
            font-size: 0.8mm;
            font-weight: bolder;
            text-anchor: start; 
            dominant-baseline: auto; 
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
        // console.log('I`m from header.update');
        
        this.container.querySelector("[name=officeName]").innerHTML = data?.officeName || "";
        this.container.querySelector("[name=date]").innerHTML = data?.createDate || "";
        this.container.querySelector("[name=officeLogo]").setAttribute("href", data?.officeLogo || "");
    }
}