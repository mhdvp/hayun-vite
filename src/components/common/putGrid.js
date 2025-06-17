import putLine from "./putLine";

export default function putGrid({ container }) {
       const {x, y, width, height} = container.viewBox.baseVal
        console.log(x, y, width, height);

        const cord = { xStart: x, yStart: y, xEnd: width + x, yEnd: height + y, xStep: 1, yStep: 1 }
        let { xStart, yStart, xEnd, yEnd, xStep, yStep } = cord

        // رسم خطوط افقی
        let style = 'stroke: blue; stroke-width: 0.05 ; stroke-opacity: 0.8; stroke-dasharray: 0.2;'
        let x1 = xStart
        let y1 

        let x2 = xEnd
        let y2

        for (let y1 = yStart; y1 <= yEnd; y1 += yStep) {
            y2 = y1
            putLine({ container, x1, y1, x2, y2, style, name: 'grid' })
        }

        // رسم خطوط عمودی
        y1 = yStart
        for (x1 = xStart; x1 <= xEnd; x1 += xStep) {
            const x2 = x1
            putLine({ container, x1, y1, x2, y2, style, name: 'grid' })
        }


    }