// import { svgNS } from "../../globalinfo.js";
const svgNS = "http://www.w3.org/2000/svg";

// پهنا و ارتفاع ظرف را پیدا کن و آنرا شطرنجی کن
export default function drawGrid(container) {
  const viewBox = container.getAttribute("viewBox");
  const w = container.getAttribute("width");
  const h = container.getAttribute("height");
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", viewBox);
  // svg.setAttribute("width", 210);
  // svg.setAttribute("height", 297);
  
  // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
  let rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", 0);
  rect.setAttribute("y", 0);
  rect.setAttribute("width", 210);
  rect.setAttribute("height", 297);
  rect.setAttribute("style", "fill: transparent; stroke-width: 1;");
  svg.appendChild(rect);

  let line,
    x,
    y = 0;
  // رسم خطوط افقی با فاصله واحد ویوباکس
  for (y = 1; y <= 296; y++) {
    line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", 1);
    line.setAttribute("y1", y);
    line.setAttribute("x2", 209);
    line.setAttribute("y2", y);
    line.setAttribute(
      "style",
      "stroke: black; stroke-width: 0.1; stroke-opacity: 0.5; stroke-dasharray: 0.1;"
    );
    line.setAttribute("class", "gridLines");
    svg.appendChild(line);
  }

  // رسم خطوط عمودی با فاصله واحد ویوباکس
  for (x = 1; x <= 209; x++) {
    line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", 1);
    line.setAttribute("x2", x);
    line.setAttribute("y2", 296);
    line.setAttribute(
      "style",
      "stroke: black; stroke-width: 0.1; stroke-opacity: 0.5; stroke-dasharray: 0.1;"
    );
    line.setAttribute("class", "gridLines");

    svg.appendChild(line);
  }
  // رسم خط میانی افقی 
  line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", 1);
  line.setAttribute("y1", 297/2);
  line.setAttribute("x2", 209);
  line.setAttribute("y2", 297/2);
  line.setAttribute(
    "style",
    "stroke: black; stroke-width: 0.2; stroke-opacity: 0.8;"
  );
  line.setAttribute("class", "gridLines");

  svg.appendChild(line);

  // رسم خط میانی عمودی
  line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", 105);
    line.setAttribute("y1", 1);
    line.setAttribute("x2", 105);
    line.setAttribute("y2", 296);
    line.setAttribute(
      "style",
      "stroke: black; stroke-width: 0.2; stroke-opacity: 0.8;"
    );
    line.setAttribute("class", "gridLines");

    svg.appendChild(line);  
  container.appendChild(svg);
}
