const svgNS = "http://www.w3.org/2000/svg";

// متن اس‌وی‌جی
export default function putText(
    { container, value = '', x, y, id, dx = 0, dy = 0, style, name, className }) {

    let text = document.createElementNS(svgNS, "text");
    name && text.setAttribute("name", name)
    className && text.setAttribute("class", className);
    style && (text.style = style);
    text.setAttribute("x", x + dx);
    text.setAttribute("y", y + dy);
    text.textContent = value;
    container.appendChild(text);
    return text;
}



