// تابع رسم خط
const svgNS = "http://www.w3.org/2000/svg";

export default function putLine({ container, x1, y1, x2, y2, style, name, className }) {

    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    style && line.setAttribute("style", style)
    name && line.setAttribute("data-name", name)
    className && line.setAttribute('class', className)


    container.appendChild(line);

}