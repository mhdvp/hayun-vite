// ساخت اس‌وی‌جی شانزده سمبل
const svgNS = "http://www.w3.org/2000/svg";
export default function createSymbolSVG({ side = "R", type = "AC", masked = false, NR = false }) {
  let r = 12 / 5; //
  let
    dot = [],
    points = [],
    dx,
    xNR,
    yNR,
    polyline,
    circle;

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "-6 -6 12 12");

  //افزودن اتریبیوت‌های دیتای سمبل
  svg.setAttribute("data-name", "symbol");
  svg.setAttribute("data-side", side);
  svg.setAttribute("data-type", type);
  svg.setAttribute("data-masked", masked);
  svg.setAttribute("data-nr", NR);


  if (side == "R" && type == "AC" && !masked) {
    // case "R_AC_NR":
    dot = [0, 0];
    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = r * Math.sin(Math.PI / 4);
    yNR = xNR;
    xNR *= -1;

    circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("stroke", "red");
    circle.setAttribute("stroke-width", "0.6px");
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("cx", 0);
    circle.setAttribute("cy", 0);
    circle.setAttribute("r", r);

    svg.appendChild(circle);
  }

  if (side == "R" && type == "AC" && masked) {
    dx = 2 * r * Math.tan(Math.PI / 6);

    points = [0, -r, dx, r, -dx, r, 0, -r];

    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-miterlimit", "0");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "red");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);

    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = -dx;
    yNR = r;
  }

  if (side == "R" && type == "BC" && !masked) {
    // مقدار جابجایی سمبل از مرکز
    dx = -r / 1.5;

    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = dx;
    yNR = r;

    dot = [0, -r, -r, 0, 0, r];
    points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "red");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);
  }

  if (side == "R" && type == "BC" && masked) {
    // مقدار جابجایی سمبل از مرکز
    dx = -r / 1.5;

    dot = [0, -r, -r, -r, -r, r, 0, r];

    points = `${dot[0] + dx}, ${dot[1]}, 
      ${dot[2] + dx}, ${dot[3]}, 
      ${dot[4] + dx}, ${dot[5]}, 
      ${dot[6] + dx}, ${dot[7]} 
      `;
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "red");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);
    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = -r + dx;
    yNR = r;
  }

  if (side == "L" && type == "AC" && !masked) {
    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = r;
    yNR = r;

    // const x1 = (Math.sqrt(2) / 2) * r;
    // const y1 = -x1;
    // dot = [x1, y1, -x1, -y1, -x1, y1, x1, -y1];

    points = [-r, -r, r, r];

    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "blue");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);

    points = [r, -r, -r, r];
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "blue");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);
  }

  if (side == "L" && type == "AC" && masked) {
    dot = [0, 0];
    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = r;
    yNR = r;

    // مختصات چهار نقطه مربع سمبل
    dot = [-r, -r, r, -r, r, r, -r, r, -r, -r];
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke", "blue");
    polyline.setAttribute("points", dot);
    svg.appendChild(polyline);
  }

  if (side == "L" && type == "BC" && !masked) {
    // مقدار جابجایی سمبل از مرکز
    dx = r / 1.5;

    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = dx;
    yNR = r;

    dot = [0, -r, r, 0, 0, r];
    points = [dot[0] + dx, dot[1], dot[2] + dx, dot[3], dot[4] + dx, dot[5]];
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "blue");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);
  }

  if (side == "L" && type == "BC" && masked) {
    // مقدار جابجایی سمبل از مرکز
    dx = r / 1.5;

    //مختصات نقطه اول سمبل عدم پاسخ
    xNR = r + dx;
    yNR = r;

    dot = [0, -r, r, -r, r, r, 0, r];
    points = `${dot[0] + dx}, ${dot[1]},
      ${dot[2] + dx}, ${dot[3]},
      ${dot[4] + dx}, ${dot[5]},
      ${dot[6] + dx}, ${dot[7]}
    `;
    polyline = document.createElementNS(svgNS, "polyline");
    polyline.setAttribute("stroke-width", "0.6px");
    polyline.setAttribute("fill", "transparent");
    polyline.setAttribute("stroke", "blue");
    polyline.setAttribute("points", points);
    svg.appendChild(polyline);
  }


  //رسم قسمت NR
  if (NR) {
    svg.appendChild(createNRSVG(side, xNR, yNR));
    // تابع ایجاد تصویر عدم پاسخ
    function createNRSVG(side, x, y) {
      let symColor = side === "R" ? "red" : "blue";
      let angle = side === "R" ? "135" : "45";
      const a = r / 2;
      const x1 = a * Math.cos(Math.PI / 6);
      const y1 = a * Math.sin(Math.PI / 6);
      // مختصات سه نقطه فلش
      //A, B, C
      let points = [-x1 + r + x, -y1 + y, r + x, y, -x1 + x + r, y1 + y];
      const g = document.createElementNS(svgNS, "g");
      let polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.4px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", symColor);
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      // مختصات خط فلش
      points = [x, y, x + r, y];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.4px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", symColor);
      polyline.setAttribute("points", points);
      g.setAttribute("transform", `rotate(${angle} ${x} ${y})`);
      g.appendChild(polyline);
      return g;
    }
  }
  // این رویی ترین اس‌وی‌جی برای اینکه تارگت کلیک روی محدوده سمبل رو بتونیم پیدا کنیم
  // یک بوردر برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", -6);
  rect.setAttribute("y", -6);
  rect.setAttribute("width", 12);
  rect.setAttribute("height", 12);
  rect.setAttribute("fill", "transparent");
  //
  //
  //
  // با حذف پایینی برای یافتن سمبل ها در دام به مشکل خواهیم خورد و باید راه حل جدید براش ایجاد کنیم
  let symbolName = side + "_" + type;
  if (masked) symbolName += "_M";
  if (NR) symbolName += "_NR";
  rect.setAttribute("data-name", symbolName);
  // rect.setAttribute("stroke-width", "0.5px");
  // rect.setAttribute("stroke", "green");
  svg.appendChild(rect);
  return svg;
}
