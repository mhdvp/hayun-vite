import putLine from "../common/putLine.js";
import putPoint from "../common/putPoint.js";
import putRect from "../common/putRect.js";
import getAllSymbolsSVG from "../Symbol/getAllSymbolsSVG.js";
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
    this.svg = svg; // کل نودی که به کانتینر اپند میشه
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("x", x);
    svg.setAttribute("y", y);
    svg.setAttribute("viewBox", [-chartPadding.left, -chartPadding.top, width, height]);


    const currentPointer = putPoint({ container: svg, x: 0, y: 0, r: 4, color: 'black' });
    this.currentPointer = currentPointer;
    // برای فرم‌های پیش چاپ شده
    if (!dims.blank) {
      // محدوده مختصات خطوط جدول
      const chartArea = putRect({
        container: svg,
        x: this.getX(vFrequency.min), y: this.getY(intensity.min),
        width: vFrequencyAxiosLength.mm, height: intensityAxiosLength.mm,
        style: 'stroke-width: 0.4; stroke: gray; fill: transparent'
      })
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
    }
    // یک بوردر راهنمای توسعه برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
    // این مربع مرزی را آخرین ایجاد میکنیم تا بالاترین لایه باشد و روی ریودادها درست عمل کند
    const borderRect = putRect({ container: svg, x: -chartPadding.left, y: -chartPadding.top, width, height, name: 'RAudiogram', style: style = 'fill: transparent;' });
    this.borderRect = borderRect;
    // ایجاد رویدادها روی فقط چارت جدول
    borderRect.addEventListener('mousemove', (e) => {
      const x = e.offsetX
      const y = e.offsetY
      currentPointer.setAttribute('cx', x - chartPadding.left)
      currentPointer.setAttribute('cy', y - chartPadding.top)
      console.log('x:', x, 'f:', getFreq(x));
    })

    container && container.appendChild(svg);

    // تبدیل مقدار ایکس مختصات به فرکانس 
    function getFreq(x) {
      return vToFreq[Math.round((x - xArea.min) * (xAxiosLength.hz / xAxiosLength.mm))]
    }
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
    // پاک کردن نودهای سمبل دیتای قبلی در صورت وجود از نود مربوطه
    this.svg.querySelectorAll('[data-name=symbol]').forEach(symbol => symbol.remove())
    // پاک کردن خطوط اتصال دیتای قبلی در صورت وجود از نود مربوطه
    this.svg.querySelectorAll('[data-name=junction]').forEach(symbol => symbol.remove())


    const junctions = { AC: {}, BC: {}, side };
    this.junctions = junctions;
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
        x1 && !NR1 && !NR2 && putLine({ container: this.svg, x1, y1, x2, y2, style, name: 'junction' });
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