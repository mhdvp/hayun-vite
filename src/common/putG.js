const svgNS = "http://www.w3.org/2000/svg";

export default function putG({ container, viewBox, className, style }) {
    const svg = document.createElementNS(svgNS, "g");
    viewBox && svg.setAttribute("viewBox", viewBox);
    style && svg.setAttribute("style", style);
    className && svg.setAttribute("class", className);
    container && container.appendChild(svg);
    return svg;
}