const svgNS = "http://www.w3.org/2000/svg";

export default function putImage({ container, name, href, x, y, width, height, className, style }) {
    let image = document.createElementNS(svgNS, "image");
    name && image.setAttribute("name", name)
    style && image.setAttribute("style", style)
    className && image.setAttribute("class", className)
    width && image.setAttribute("width", width);
    height && image.setAttribute("height", height - 1);
    x && image.setAttribute("x", x);
    y && image.setAttribute("y", y);
    href && image.setAttribute("href", href)

    container && container.appendChild(image);
    return image

}