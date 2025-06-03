import putLine from "../common/putLine.js";
import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
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
            const { name, value, x, y, style } = element;

            switch (element.type) {
                case 'label':
                    // const { value, x, y, style } = element
                    putText({ container, value, x, y, style })
                    break;
                case 'input':
                    putText({ container, x, y, style, name });

                    break;
                default:
                    break;
            }

        });




        // Logo 
        let image = document.createElementNS(svgNS, "image");
        image.setAttribute("data-name", "officeLogo")
        image.setAttribute("width", "17");
        image.setAttribute("height", height - 1);
        image.setAttribute("x", width - 16);
        image.setAttribute("y", 0.5);
        this.container.appendChild(image);

        this.update({ officeName: 'دفتر ارزیابی شنوایی و خدمات سمعک سروش' })


        let style = `
            user-select: none;
            direction: rtl;
            /* text-align: center; */
            font-family: Vazir;
            font-size: 0.8mm;
            font-weight: bolder;
            text-anchor: start; /*تراز افقی*/
            dominant-baseline: auto; /* تراز عمودی*/  
        `;

        // this.container.appendChild(svg);
    }

    update(data) {
        this.container.querySelector("[data-name=officeName]").innerHTML = data?.officeName || "";
        this.container.querySelector("[data-name=date]").innerHTML = data?.createDate || "";
        this.container.querySelector("[data-name=officeLogo]").setAttribute("href", data?.officeLogo || "");
    }
}