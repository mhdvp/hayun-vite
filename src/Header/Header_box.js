import putImage from "../common/putImage.js";
import putLine from "../common/putLine.js";
import putText from "../common/putText.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Header {
    constructor({ box }) {
        this.box = box;
        this.container = box.container;
        this.draw({ box })
    }

    draw({ box }) {
        // همه چیز را توی کانتینر باکس آبجکت رسم کن
        const { container, elements, width, height } = box

        elements.forEach(element => {
            const { name, value, x, y, x1, y1, x2, y2, style, width, className } = element;

            switch (element.type) {
                case 'label':
                    putText({ container, value, x, y, className })
                    break;
                case 'input':
                    putText({ container, x, y, name, className });
                    break;
                case 'line':
                    putLine({ container, x1, y1, x2, y2, className: 'line' });
                    break;
                case 'image':
                    // Logo 
                    putImage({ container: this.container, name, width, height, x, y })
                    break;
                default:
                    break;
            }

        });

        let style = `
            user-select: none;
            direction: rtl;
            /* text-align: center; */
            font-family: Vazirmatn;
            font-size: 0.8mm;
            font-weight: bolder;
            text-anchor: start; /*تراز افقی*/
            dominant-baseline: auto; /* تراز عمودی*/  
        `;

    }

    update(data) {
        const { title, logo } = data
        // const logo = logos[selectedLogoIndex]
        this.container.querySelector("[name=title]").innerHTML = title || "";
        this.container.querySelector("[name=date]").innerHTML = data?.createDate || "";
        this.container.querySelector("[name=logo]")?.setAttribute("href", logo || "");

        // this.container.querySelector("[data-name=officeName]").innerHTML = data?.officeName || "";
        // this.container.querySelector("[data-name=date]").innerHTML = data?.createDate || "";
        // this.container.querySelector("[data-name=officeLogo]").setAttribute("href", data?.officeLogo || "");
    }
}