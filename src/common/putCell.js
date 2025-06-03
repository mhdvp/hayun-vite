const svgNS = "http://www.w3.org/2000/svg";

export default function putCell(
    {
        container, x, y, dx = 0, dy= 0 , width, height, rx,
        style = "fill: transparent; stroke: black; stroke-width: 0.2;",
    }) {
    let rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x - width / 2 + dx);
    rect.setAttribute("y", y - height / 2 + dy);
    rect.setAttribute("rx", rx);

    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("style", style);
    container.appendChild(rect);

}