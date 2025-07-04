const svgNS = "http://www.w3.org/2000/svg";

export default function putTspan({ container, value, x, y = 5, dx = 0, dy = 0, style }) {
    const tspan = document.createElementNS(svgNS, "tspan");
    tspan.setAttribute('x', x);
    tspan.setAttribute('y', y)
    tspan.textContent = value;
    container && container.appendChild(tspan)
    return tspan;
}