// A Class for both R & L at same time. 
import getAllSymbolsSVG from "./getAllSymbolsSVG.js";
import symbolChart from "./symbolChart.js";

class Symbols {
    constructor() {
        // یک آبجکت از ناداس‌وی‌جی همه سمبل‌ها
        this.symbolsSVG = getAllSymbolsSVG();
        this.chart = {}
        this.selected = { R: "R_AC", L: "L_AC" }
    }

    draw({ container, side, events = true }) {

        this.chart[side] = symbolChart({ container: container, side: side, symbols: this.symbolsSVG, x: 0, y: 0 , w:700 });
        this.selected[side] = side + "_AC"; // default Selected symbol
        if (events) this.act(side);
    }

    // enable and set events on sybol chart
    act(side) {
        this.chart[side].addEventListener("click", (e) => {
            let v = e.target.getAttribute("data-name"); // Symbol Name earned
            // suddenly null ignored
            if (v) this.selected[side] = v; // Active symbol or so Selected Symbol
        })
    }
}

export default Symbols;