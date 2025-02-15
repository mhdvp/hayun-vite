import putLine from "../common/putLine.js";
import putPoint from "../common/putPoint.js";
import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
import getAllSymbolsSVG from "../Symbol/getAllSymbolsSVG.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Audiogram {
  constructor({ container, side, dims, events = true }) {
    this.container = container;
    this.events = events;
    this.side = side;
    this.dims = dims;
    this.data = {};
    const symbols = getAllSymbolsSVG();
    this.symbols = symbols;
    this.draw({ container, dims });
    events && this.addEvents();
  }

  draw() {
    const [container, dims] = [this.container, this.dims]
    const
      {
        width, height, chartPadding, symbolDims, vFrequency,
        vToFreq, freqToV, intensity, styles, frequencies
      }
        = dims;

    let x = dims.margin.left
    let y = dims.margin.top

    this.symbolDims = symbolDims;
    this.vFrequency = vFrequency;
    this.freqToV = freqToV;
    this.vToFreq = vToFreq;
    this.intensity = intensity;
    this.styles = styles;
    this.chartPadding = chartPadding;

    let style;
    const xArea = { min: chartPadding.left, max: width - (chartPadding.right) }
    this.xArea = xArea
    const yArea = { min: chartPadding.top, max: height - (chartPadding.bottom) }

    const xAxisLength = {
      vb: width - (chartPadding.left + chartPadding.right),
      hzi: vFrequency.max - vFrequency.min // 0, 1, 2, ... instead 125, ...
    }
    this.xAxisLength = xAxisLength

    const yAxisLength = {
      vb: height - (chartPadding.top + chartPadding.bottom),
      db: intensity.max - intensity.min
    }
    this.yAxisLength = yAxisLength

    // Main SVG for Audiogram
    const viewBox = [-chartPadding.left, -chartPadding.top, width, height]
    const svg = putSVG({ container, x, y, viewBox })
    this.svg = svg; // کل نودی که به کانتینر اپند میشه

    // برای فرم‌های پیش چاپ نشده
    if (!dims.blank) {
      // محدوده مختصات خطوط جدول
      const chartArea = putRect({
        container: svg,
        x: this.getX(vFrequency.min), y: this.getY(intensity.min),
        width: xAxisLength.vb, height: yAxisLength.vb,
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

      // برچسب های اعداد فرکانس
      style = styles.frequency
      const y = this.getY(-25)
      frequencies.forEach(freq => {
        const value = freq.value
        const x = this.getX(freq.x)
        !freq.semiOctav && putText({ container: svg, value, x, y, style })
      })

      // رسم اعداد شدت محور عمودی
      style = styles.intensity
      const x = this.getX(-0.1)
      for (let i = -20; i <= 140; i += 10) {
        const y = this.getY(i)
        const value = i
        putText({ container: svg, x, y, value, style })


      }

    }
    // یک بوردر راهنمای توسعه برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
    // این مربع مرزی را آخرین ایجاد میکنیم تا بالاترین لایه باشد و روی ریودادها درست عمل کند
    const borderRect = putRect({
      container: svg, x: -chartPadding.left, y: -chartPadding.top,
      width, height, name: '',
      style: 'fill: transparent; stroke: transparent;',
    });
    this.borderRect = borderRect;

    const lastCordinate = { f: 125, i: -20 }
    this.lastCordinate = lastCordinate
    const currentCordinate = { f: 125, i: -20 }
    this.currentCordinate = currentCordinate

    const chartArea = putRect({
      container: svg, x: 0, y: 0,
      width: xAxisLength.vb, height: yAxisLength.vb,
      style: 'fill: transparent; stroke: transparent;',
      name: 'RAudiogram',
    });
    
    this.chartArea = chartArea
    this.events && this.drawSymbolsChart();
    container.appendChild(svg);
  }

  addEvents() {
    // برای قابل فوکوس کردن چارت ادیوگرام و دریافت رویدادهای صفحه کلید
    this.svg.setAttribute('tabindex', 1)
    this.svg.focus({ focusVisible: true });

    this.svg.style.outline = 'none';


    // نقطه راهنما
    const pointer = putPoint({ container: this.svg, x: 0, y: 0, r: 4, color: 'black' });
    this.pointer = pointer;
    this.mouseMove();
    this.click();
    this.mouseEnter();
    this.mouseLeave();
    this.keyboard();


  }

  keyboard() {
    this.svg.addEventListener('keydown', e => {
      e.preventDefault();
      console.log(e.code)
      let f, fi, i, x, y
      switch (e.code) {
        case 'ArrowDown':
          i = this.currentCordinate.i += 5
          y = this.getY(i)
          this.pointer.setAttribute('cy', y)
          break;
        case 'ArrowUp':
          i = this.currentCordinate.i -= 5
          y = this.getY(i)
          this.pointer.setAttribute('cy', y)
          break;
        case 'ArrowRight':
          f = this.currentCordinate.f;
          fi = this.freqToV[f];
          fi++;
          this.currentCordinate.f = this.vToFreq[fi]
          x = this.getX(fi)
          this.pointer.setAttribute('cx', x)
          break;
        case 'ArrowLeft':
          f = this.currentCordinate.f;
          fi = this.freqToV[f];
          fi--;
          this.currentCordinate.f = this.vToFreq[fi]
          x = this.getX(fi)
          this.pointer.setAttribute('cx', x)
          break;
        case 'Space':
          this.updateFreqLine({ shiftKey: e.shiftKey })

        default:
          break;
      }


    })


  }

  drawSymbolsChart() {
    const { width, height } = this.dims.symbolsChart
    let style;
    let x = 0
    let y = 0

    const symbolsChart = putSVG({ container: this.container, width, height, x, y });
    symbolsChart.style.cursor = 'pointer'; // Change to pointer cursor
    let container = symbolsChart
    style = 'fill: none;'
    putRect({ container, x, y, width, height, style });

    const
      dw = width / 4 - 1,
      dh = height - 2,
      rect = {};
    x = 1; y = 1;
    style = 'fill: none; stroke: brown;';

    (this.side === 'R' ? ['R_AC', 'R_BC', 'R_AC_M', 'R_BC_M'] : ['L_AC', 'L_BC', 'L_AC_M', 'L_BC_M'])
      .forEach(symbolName => {
        const [width, height] = [dw, dh];
        rect[symbolName] = putRect({ container, x, y, width, height, name: symbolName, style });
        this.insertSymbol({ container, symbolName, x: x + dw / 2, y: dh / 2 })
        x += dw;
      });

    // تعیین سمبل پیش‌فرض
    this.currentSymbolName = this.side + '_AC';
    this.symbol = { current: { side: this.side, type: 'AC' }, last: {} }
    this.lastSymbolName = this.currentSymbolName;
    rect[this.currentSymbolName].style = 'fill: yellow; stroke: brown;'

    symbolsChart.onclick = (e) => {
      this.currentSymbolName = e.target.dataset.name
      // رنگی کردن مربع دور سمبل
      rect[this.lastSymbolName].style = 'fill: none; stroke: brown;'
      rect[this.currentSymbolName].style = 'fill: yellow; stroke: brown;'
      this.lastSymbolName = this.currentSymbolName
    }
  }

  mouseMove() {
    // وقتی کاربر صفحه را ریسایز می‌کند مختصات آفست تغییر میکند گه با تابع زیر همیشه این مختصات چک می‌شود
    const calcK = () => {
      // دریافت ابعاد بر مبنای پیکسل آفست و صفحه نمایش
      const clientDims = this.chartArea.getBoundingClientRect()
      // ادریافت ابعاد در واحد ویوباکس
      const vbDims = this.chartArea.getBBox()
      const kx = vbDims.width / clientDims.width
      const ky = vbDims.height / clientDims.height
      return { kx, ky }
    }

    this.chartArea.addEventListener('mousemove', (e) => {
      const { kx, ky } = calcK();
      let x = e.offsetX * kx
      let y = e.offsetY * ky

      const f = this.currentCordinate.f = this.getFreq(x);
      const i = this.currentCordinate.i = this.getIntensity(y)
      if (this.lastCordinate.f != this.currentCordinate.f) {
        x = this.getX(this.freqToV[f])
        this.pointer.setAttribute('cx', x)
      }
      if (this.lastCordinate.i != this.currentCordinate.i) {
        y = this.getY(i)
        this.pointer.setAttribute('cy', y)
      }
      this.lastCordinate.f = this.currentCordinate.f
      this.lastCordinate.i = this.currentCordinate.i
    })
  }

  click() {
    // رویداد کلیک برای فراخوانی تابع نشاندن سمبل انتخاب شده
    this.chartArea.addEventListener('click', (e) => {
      const shiftKey = e.shiftKey
      this.updateFreqLine({ shiftKey })
    })
  }

  updateFreqLine({ shiftKey }) {
    const nr = shiftKey;
    let symbolname = this.currentSymbolName;
    const f = this.currentCordinate.f
    const i = this.currentCordinate.i
    const type = symbolname.slice(2, 4)
    const side = symbolname[0]
    const masked = symbolname[5] === 'M' ? true : false;
    nr && (symbolname += '_NR');

    const x = this.getX(this.freqToV[f])
    const y = this.getY(i)
    const dataset = { f, i, symbolname, type, side, masked, nr }
    // اینجا رل های رسم را چک میکنیم 
    // اگر در این خط فرکانسی سمبل با تایپ مشابه داریم اول اون رو پاک کن
    // دیتا رو چک ببین این فرکانس هست
    this.removeSymbol({ container: this.svg, dataset })
    this.insertSymbol({ container: this.svg, symbolName: symbolname, x, y, dataset })
    // بالا آوردن لایه آخر برای دریافت رویدادهای موس
    this.svg.appendChild(this.chartArea)

    if (this.data[symbolname] === undefined) this.data[symbolname] = {}
    this.data[symbolname][f] = i

  }

  removeSymbol({ container, dataset }) {
    const { side, type, f, i, masked } = dataset
    const symbol = container.querySelector(`[data-type='${type}'][data-f='${f}']`);
    if (symbol) {
      const symbolname = symbol.dataset.symbolname;
      delete this.data[symbolname][f]
      symbol.remove();
    }
  }

  // ناپدید شدن خطوط
  mouseEnter() {
    this.chartArea.addEventListener('mouseenter', () => {
      this.svg.focus()
      this.svg.querySelectorAll('[data-name=junction]')
        .forEach(elem => elem.style.display = 'none');
    })
  }

  // آپدیت با دیتای جدید
  mouseLeave() {
    this.svg.addEventListener('mouseleave', () => {
      this.update({ data: this.data, side: this.side })
    })
  }

  // تبدیل مقدار ایکس مختصات به فرکانس 
  getFreq(x) {
    return this.vToFreq[Math.round((x - this.xArea.min) * (this.xAxisLength.hzi / this.xAxisLength.vb))]
  }

  // تبدیل مختصات ایگرگ سیستمی به مقدار شدت
  getIntensity(y) {
    let i = (this.intensity.min) + (y - this.chartPadding.top) * (this.yAxisLength.db / this.yAxisLength.vb)
    // رند کردن مقدار شدت با محدوده عدد پنج
    const roundStep = 5
    // console.log(Math.round(i / roundStep) * roundStep);

    return (Math.round(i / roundStep) * roundStep)
  }
  // fi = f index ~ 125: 0, 250: 2, 500: 4, 750:5, ...
  getX(fi) {
    return ((fi - this.vFrequency.min) * (this.xAxisLength.vb / this.xAxisLength.hzi)
    )
  }
  // تبدیل مقدار شدت به دسی بل به مقدار مختصات ایگرگ سیستم
  getY(i) {
    return ((i - this.intensity.min) * (this.yAxisLength.vb / this.yAxisLength.db)
    )
  }

  update({ data, side }) {
    this.data = data
    // پاک کردن نودهای سمبل دیتای قبلی در صورت وجود از نود مربوطه
    this.svg.querySelectorAll('[data-name=symbol]').forEach(symbol => symbol.remove())
    // پاک کردن خطوط اتصال دیتای قبلی در صورت وجود از نود مربوطه
    this.svg.querySelectorAll('[data-name=junction]').forEach(symbol => symbol.remove())

    const junctions = { AC: {}, BC: {}, side };
    this.junctions = junctions;
    for (const symbolName in data) {
      for (const f in data[symbolName]) {
        const i = data[symbolName][f];
        const x = this.getX(this.freqToV[f]);
        const y = this.getY(i);
        const dataset = { f: f, i: i, symbolname: symbolName }
        this.insertSymbol({ container: this.svg, symbolName, x, y, dataset });
        // جمع آوری مختصات برای رسم خط بین سمبل ها اینجا انجام می‌شود
        // پراپرتی تایپ فقط راهنمای دیباگ هست و کاربردی ندارد
        let NR = (symbolName.at(-1) === 'R') ? true : false;
        (symbolName.slice(2, 4) === 'AC') && (junctions.AC[f] = { x, y, NR, type: symbolName });
        (symbolName.slice(2, 4) === 'BC') && (junctions.BC[f] = { x, y, NR, type: symbolName });
      }
    }
    this.drawJunctions();
    // بالا آوردن مستطیل احاطه کننده به بالاترین لایه برای دریافت صحیح رویدادهای موس
    this.svg.appendChild(this.chartArea)
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

  insertSymbol({ container, symbolName, x, y, dataset }) {

    const width = this.symbolDims.width
    const symbol = this.getSymbol(symbolName);
    symbol.setAttribute('x', x - width / 2)
    symbol.setAttribute('y', y - width / 2)
    symbol.setAttribute('width', width)
    symbol.setAttribute('height', width)
    // مقادیر دیتاست را در پراپرتی های دیتا بذار
    for (const key in dataset) {
      symbol.setAttribute('data-' + key, dataset[key])
    }

    container.appendChild(symbol)
  }

  getSymbol(symbolName) {
    const point = this.symbols[symbolName].cloneNode(true);
    return point
  }
}