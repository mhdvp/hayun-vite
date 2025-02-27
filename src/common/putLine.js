// تابع رسم خط
const svgNS = "http://www.w3.org/2000/svg";

export default function putLine({ container, x1, y1, x2, y2, style = 'stroke: black; stroke-width: 0.5;', name }) {
    
    let line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("style", style)
    line.setAttribute("data-name", name)
    // line.setAttribute("stroke", "black");
    // line.setAttribute("stroke-width", 0.5);
    container.appendChild(line);

}