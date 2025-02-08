import createSymbolSVG from "./createSymbolSVG.js"
export default function getAllSymbolsSVG() {
    return {
        R_AC: createSymbolSVG({ side: "R", type: "AC" }),
        R_AC_NR: createSymbolSVG({ side: "R", type: "AC", NR: true }),
        R_AC_M: createSymbolSVG({ side: "R", type: "AC", masked: true }),
        R_AC_M_NR: createSymbolSVG({ side: "R", type: "AC", masked: true, NR: true }),
        R_BC: createSymbolSVG({ side: "R", type: "BC" }),
        R_BC_NR: createSymbolSVG({ side: "R", type: "BC", NR: true }),
        R_BC_M: createSymbolSVG({ side: "R", type: "BC", masked: true }),
        R_BC_M_NR: createSymbolSVG({ side: "R", type: "BC", masked: true, NR: true }),
        L_AC: createSymbolSVG({ side: "L", type: "AC" }),
        L_AC_NR: createSymbolSVG({ side: "L", type: "AC", NR: true }),
        L_AC_M: createSymbolSVG({ side: "L", type: "AC", masked: true }),
        L_AC_M_NR: createSymbolSVG({ side: "L", type: "AC", masked: true, NR: true }),
        L_BC: createSymbolSVG({ side: "L", type: "BC" }),
        L_BC_NR: createSymbolSVG({ side: "L", type: "BC", NR: true }),
        L_BC_M: createSymbolSVG({ side: "L", type: "BC", masked: true }),
        L_BC_M_NR: createSymbolSVG({ side: "L", type: "BC", masked: true, NR: true }),

    }
}