const svgNS = "http://www.w3.org/2000/svg";

// متن اس‌وی‌جی
export default function putText({ container, value = '', x, y, id, dx = 0, dy = 0, style, name }) {
    let text = document.createElementNS(svgNS, "text");
    text.setAttribute("data-name", name)
    text.setAttribute("style", style);
    // text.setAttribute("dominant-baseline", "middle"); // تراز عمودی
    // text.setAttribute("fill", color);
    text.setAttribute("x", x + dx);
    text.setAttribute("y", y + dy);
    // آی دی برای تکست ها میذاریم و خط پایین میره داخل تابع آپدیت دیتای اسپیچ
    text.innerHTML = value;
    container.appendChild(text);
    return text;
}
