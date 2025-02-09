import putLine from "../common/putLine.js";
import putPoint from "../common/putPoint.js";
import putRect from "../common/putRect.js";
import getAllSymbolsSVG from "../Symbol/getAllSymbolsSVG.js";
// import dims from "./dims.js";
// import '../style.css'


const svgNS = "http://www.w3.org/2000/svg";

export default class AudiogramChart {
  constructor({ container, side, x = 0, y = 0, pname, events = true, dims }) {
    
    const { width, height, chartPadding, symbolDims, vFrequency, vToFreq, freqToV, intensity, styles } = dims;

    x = dims.margin.left
    y = dims.margin.top

    this.symbolDims = symbolDims;
    this.vFrequency = vFrequency;
    this.freqToV = freqToV;
    this.intensity = intensity;
    this.styles = styles;


    const symbols = getAllSymbolsSVG();
    this.symbols = symbols;
    this.side = side;
    let style;


    const xArea = { min: chartPadding.left, max: width - (chartPadding.right) }

    const yArea = { min: chartPadding.top, max: height - (chartPadding.bottom) }
    const xAxiosLength = { mm: width - (chartPadding.left + chartPadding.right), hz: 14 }
    const yAxiosLength = height

    const vFrequencyAxiosLength = {
      mm: width - (chartPadding.left + chartPadding.right),
      hz: vFrequency.max - vFrequency.min
    }
    this.vFrequencyAxiosLength = vFrequencyAxiosLength;

    const intensityAxiosLength = {
      mm: height - (chartPadding.top + chartPadding.bottom),
      db: intensity.max - intensity.min,
    }
    this.intensityAxiosLength = intensityAxiosLength;

    const svg = document.createElementNS(svgNS, "svg");
    this.svg = svg;
    
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("x", x);
    svg.setAttribute("y", y);
    svg.setAttribute("viewBox", [-chartPadding.left, -chartPadding.top, width, height]);

    // محدوده مختصات خطوط جدول
    const chartArea = putRect({
      container: svg,
      x: this.getX(vFrequency.min), y: this.getY(intensity.min),
      width: vFrequencyAxiosLength.mm, height: intensityAxiosLength.mm,
      style: 'stroke-width: 0.4; stroke: gray; fill: transparent'
    })

    const currentPointer = putPoint({ container: svg, x: 0, y: 0, r: 4, color: 'black' });
    this.currentPointer = currentPointer;

    // رسم خطوط افقی از بالا به پایین
    let x1 = this.getX(vFrequency.min);
    let x2 = this.getX(vFrequency.max);
    for (let i = intensity.min; i <= intensity.max; i += intensity.step) {
      const y1 = this.getY(i)
      const y2 = y1
      putLine({ container: svg, x1, y1, x2, y2, style: styles.line })
    }

    // رسم خطوط عمودی از چپ به راست
    let y1 = this.getY(intensity.min)
    let y2 = this.getY(intensity.max)
    for (let f = vFrequency.min; f <= vFrequency.max; f += vFrequency.step) {
      const x1 = this.getX(f)
      const x2 = x1
      putLine({ container: svg, x1, y1, x2, y2, style: styles.line })
    }

    // یک بوردر راهنمای توسعه برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
    // این مربع مرزی را آخرین ایجاد میکنیم تا بالاترین لایه باشد و روی ریودادها درست عمل کند
    const borderRect = putRect({ container: svg, x: -chartPadding.left, y: -chartPadding.top, width, height, name: 'RAudiogram' });
    this.borderRect = borderRect;

    // ایجاد رویدادها روی فقط چارت جدول
    borderRect.addEventListener('mousemove', (e) => {
      const x = e.offsetX
      const y = e.offsetY

      currentPointer.setAttribute('cx', x - chartPadding.left)
      currentPointer.setAttribute('cy', y - chartPadding.top)
      console.log('x:', x, 'f:', getFreq(x));
      // تبدیل مختصات به مختصات فرکانس و شدت

    })

    // تبدیل مقدار ایکس مختصات به فرکانس 
    function getFreq(x) {
      return vToFreq[Math.round((x - xArea.min) * (xAxiosLength.hz / xAxiosLength.mm))]
    }

    container && container.appendChild(svg);

    // تست تابع آپدیت
    // this.update({
    //   data: {
    //     // R_AC_M: { 8000: 25, 2000: 5, 1500: 0, },
    //     R_AC: { 1000: 25, 500: 15, 750: 20, 250: 10, 6000: 35, 2000: 45 },
    //     R_AC_NR: { 1500: 85 },
    //     R_BC_M: { 2000: 25, 6000: 25 },
    //     R_BC_M_NR: { 3000: 85 },
    //     R_BC: { 1000: 20, 500: 10, 750: 15, 250: 5, 4000: 20 },
    //   },
    //   side: this.side,
    // })

  }

  getX(f) {
    return ((f - this.vFrequency.min) * (this.vFrequencyAxiosLength.mm / this.vFrequencyAxiosLength.hz)
    )
  }
  // تبدیل مقدار شدت به دسی بل به مقدار میلیمتر مختصات
  getY(i) {
    return ((i - this.intensity.min) * (this.intensityAxiosLength.mm / this.intensityAxiosLength.db)
    )
  }

  update({ data, side }) {
    const junctions = { AC: {}, BC: {}, side };
    this.junctions = junctions;
    // console.log(data);

    for (const symbolName in data) {

      for (const freq in data[symbolName]) {
        const x = this.getX(this.freqToV[freq]);
        const y = this.getY(data[symbolName][freq]);
        this.insertSymbol({ symbolName, x, y });
        // جمع آوری مختصات برای رسم خط بین سمبل ها اینجا انجام می‌شود
        // پراپرتی تایپ فقط راهنمای دیباگ هست و کاربردی ندارد
        let NR = (symbolName.at(-1) === 'R') ? true : false;
        (symbolName.slice(2, 4) === 'AC') && (junctions.AC[freq] = { x, y, NR, type: symbolName });
        (symbolName.slice(2, 4) === 'BC') && (junctions.BC[freq] = { x, y, NR, type: symbolName });
      }
    }
    this.drawJunctions();

    // بالا آوردن مستطیل احاطه کننده به بالاترین لایه برای دریافت صحیح رویدادهای موس
    this.svg.appendChild(this.borderRect)

  }

  drawJunctions() {
    // console.log(this.junctions);
    // رسم خط بین نقاط
    const junctions = this.junctions
    let color = (junctions.side === 'R') ? 'red' : 'blue';

    for (const type in junctions) {
      let x1, y1, x2, y2, NR1, NR2;
      for (const freq in junctions[type]) {
        x1 = x2; y1 = y2; NR1 = NR2
        x2 = junctions[type][freq].x
        y2 = junctions[type][freq].y
        NR2 = junctions[type][freq].NR
        let style =
          type === "BC"
            ? this.styles.juncDashLine + `stroke: ${color}`
            : this.styles.juncLine + `stroke: ${color}`;
        x1 && !NR1 && !NR2 && putLine({ container: this.svg, x1, y1, x2, y2, style });
      }
    }
  }

  insertSymbol({ symbolName, x, y }) {
    const width = this.symbolDims.width
    const symbol = this.getSymbol(symbolName);
    symbol.setAttribute('x', x - width / 2)
    symbol.setAttribute('y', y - width / 2)
    symbol.setAttribute('width', width)
    symbol.setAttribute('height', width)
    this.svg.appendChild(symbol)
  }

  getSymbol(symbolName) {
    const point = this.symbols[symbolName].cloneNode(true);
    return point
  }
}