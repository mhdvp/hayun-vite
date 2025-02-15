const svgNS = "http://www.w3.org/2000/svg";

export default function putSVG({ container, x, y, width, height, viewBox }) {
    const svg = document.createElementNS(svgNS, "svg");
    width && svg.setAttribute("width", width);
    height && svg.setAttribute("height", height);
    x && svg.setAttribute("x", x);
    y && svg.setAttribute("y", y);
    viewBox && svg.setAttribute("viewBox", viewBox);
    container.appendChild(svg);
    return svg;

}