const svgNS = "http://www.w3.org/2000/svg";

// این لایه بالایی برای شناسایی توسط کلیک لیسنر استفاده میشود
export default function drawTopLayer({ container, dims }) {
    dims.forEach((dim) => {
        // بوردر راهنما
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", dim.x);
        rect.setAttribute("y", dim.y);
        rect.setAttribute("width", dim.width);
        rect.setAttribute("height", dim.height);
        rect.setAttribute("fill", "transparent");
        rect.setAttribute("stroke", "transparent");
        // rect.setAttribute("stroke-width", "1mm");
        rect.setAttribute("data-name", dim.name);
        container.appendChild(rect);
    });
}