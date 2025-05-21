const svgNS = "http://www.w3.org/2000/svg";

export default function putTextBox(
    {
        container, x, y, dx = 0, dy= 0 , w, h, rx,
        style = "fill: transparent; stroke: black; stroke-width: 0.2;",
    }) {
    let rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x - w / 2 + dx);
    rect.setAttribute("y", y - h / 2 + dy);
    rect.setAttribute("rx", rx);

    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("style", style);
    container.appendChild(rect);

}