const svgNS = "http://www.w3.org/2000/svg";

export default function putRect({ container, x, y, width, height, style = 'fill: transparent; stroke: green; stroke-width: 0.5;', name }) {
    let rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("style", style);
    rect.setAttribute("data-name", name);
    container.appendChild(rect);
    return rect;

}