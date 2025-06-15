const svgNS = "http://www.w3.org/2000/svg";

export default function putPoint({ container, x, y, dx = 0, dy = 0, r = 0.1, style = 'color: red; ', color = 'black', fill = 'black' }) {
    let circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x + dx);
    circle.setAttribute("cy", y + dy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", color);
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke-width", 0)
    container.appendChild(circle);
    return circle;
}