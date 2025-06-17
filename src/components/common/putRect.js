// https://docs.google.com/document/d/19Pgsi0eHRDgsxjkbxweHLRKVB60jrH4fzV52I83-6CM/edit?tab=t.0#heading=h.5zc9gsazq7wu
const svgNS = "http://www.w3.org/2000/svg";


export default function putRect({
    container, x, y, cx, cy, dx = 0, dy = 0, rx, width, height,
    style = 'fill: transparent; stroke: black; stroke-width: 0.2;', name, className
}
) {
    let rect = document.createElementNS(svgNS, "rect");
    cx && rect.setAttribute("x", cx - width / 2 + dx);
    cy && rect.setAttribute("y", cy - height / 2 + dy);
    rx && rect.setAttribute("rx", rx);
    x && rect.setAttribute("x", x + dx);
    y && rect.setAttribute("y", y + dy);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("style", style);
    className && rect.setAttribute("class", className);
    name && rect.setAttribute("data-name", name);
    container && container.appendChild(rect);

    return rect;

}