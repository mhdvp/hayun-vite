const svgNS = "http://www.w3.org/2000/svg";

export default function putG({ container, viewBox, className, style }) {
    const g = document.createElementNS(svgNS, "g");
    viewBox && g.setAttribute("viewBox", viewBox);
    style && g.setAttribute("style", style);
    className && g.setAttribute("class", className);
    container && container.appendChild(g);
    return g;
}