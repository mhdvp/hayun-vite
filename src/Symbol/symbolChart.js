// وارد کردن داده‌های سراسری
// import { r, svgNS } from "../../globalinfo.js";
import insertSymbol from "./insertSymbol.js";
// رسم پنل سمبل ها
const svgNS = "http://www.w3.org/2000/svg";

export default function symbolChart({ container, side = "R", x, y, symbols }) {

    const w = 240;
    const h = 60;
    const svg = document.createElementNS(svgNS, "svg");
    // svg.setAttribute("id", id);
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
    svg.setAttribute("viewBox", "-6 -6 48 12");
    svg.setAttribute("style", "border: 1px solid blue; user-select: none;");

    let dx = 12
    x = 0;
    y = 0;
   
    const symbolNames = {
        R: ["R_AC", "R_BC", "R_AC_M", "R_BC_M"],
        L: ["L_AC", "L_BC", "L_AC_M", "L_BC_M"]
    };
    const metadata = side + "SymbolChart";
    // اجرای تابع رسم سمبل در چارت در یک حلقه تکرار
    for (let i = 0; i < 4; i++) {
        const id = `${symbolNames[side][i]}-SymbolChart`;

        insertSymbol({ container: svg, symbolNode: symbols[symbolNames[side][i]], x: x, y: y, w: 12, h: 12 })
        // insertSymbol({
        //     container: svg, metadata: metadata,
        //     dataID: id, id: id, class: symbolNames[side][i], symbol: symbolNames[side][i],
        //     x: x, y: y, w: 12, h: 12
        // });
        x += dx;
    }

    container.appendChild(svg);

    return svg;
}




