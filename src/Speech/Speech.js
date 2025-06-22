// https://docs.google.com/document/d/19Pgsi0eHRDgsxjkbxweHLRKVB60jrH4fzV52I83-6CM/edit?tab=t.977lyzmcu5uu#heading=h.sd8yc08kbsfo
import putRect from "../common/putRect.js";
import putText from "../common/putText.js";
import putSVG from "../common/putSVG.js";
import units from "./units.js";
import putPoint from "../common/putPoint.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Speech {
    constructor({ container, side = 'R', dims }) {

        this.container = container;
        this.side = side;
        this.data = {}
        this.inputDims = [] // پراپرتی نگهداری مختصات مرکز اینپوت ها
        this.draw({ dims })
    }

    draw({ container, dims }) {

        // دریافت اطلاعات مختصات چاپ ورودی ها به جز عادی محاسبه شده 
        this.inputs = (dims.forceInsert) ? dims.forceInputs : dims.inputs
        let style;
        let w = dims.width;
        let h = dims.height;
        let x = dims.margin.left;
        let y = dims.margin.top;
        let { styles, vbWidth, vbHeight } = units;
        let cx, cy, pcx, pcy

        // کل چارت
        vbHeight = (vbWidth * h) / w // متناسب سازی ارتفاع ویباکس با پهنا و ارتفاع ورودی
        const viewBox = [0, 0, vbWidth, vbHeight].join(' ');
        const svg = putSVG({ x, y, width: w, height: h, viewBox })
        // این خط شد دو خط کد طلایی که مشکل سایز فونت در دیسپلی و کاغذ رو حل کرد
        const width = vbWidth; // ثابت می‌ماند همیشه
        const height = vbHeight // با نسبت پهنا و ارتفاع ورودی تغییر میکند 
        const kx = w / width
        const ky = h / height

        const labels = dims.labels;
        this.labels = labels;
        // یک جدول 6*2  - ۲ سطر و ۶ ستون
        const rows = 2;
        const columns = labels.length;
        const cw = width / columns; // پهنای هر خانه
        const ch = height / rows; // ارتفاع هر خانه
        // تعریف آبجکتی چارت
        const chart = {
            width, height,
            rows: 2, column: labels.length,
            cell: { width: 1, height: 1 },
            calc1: function () {
                this.cell.width = this.width / this.column
            }
        }

        // ایجاد ماتریکس سلول های چارت که آدرس و مختصات مرکز هر سلول را نگهداری میکند
        const matrix = [
            [],
            []
        ];
        this.matrix = matrix;

        for (let i = 0; i < rows; i++) {
            cx = cw / 2
            cy = ch / 2 + ch * i
            for (let j = 0; j < columns; j++) {
                // مختصات پیکسلی
                // استفاده ش برای رسم اینپوت های دیو ورود اطلاعات
                pcx = cx * kx
                pcy = cy * ky
                matrix[i][j] = { i, j, cx, cy, pcx, pcy }
                cx += cw
            }
        }

        style = styles.label;
        // برچسب های سطر اول
        // برای فرم های پیش چاپ شده انجام نمیشود
        !dims.hideContext &&
            matrix[0].forEach((cell, index) =>
                putText({
                    container: svg, value: labels[index],
                    x: cell.cx, y: cell.cy, dx: 0, dy: 1, style
                }));

        style = styles.svgInput
        style += (this.side === 'R') ? 'fill: red;' : 'fill: blue;';

        const inputBox = {
            width: width / 5 * 0.80, height: height / 2 * 0.95,
            rx: width / 100
        }
        // محاسبه کمان گردی بر اساس مقدار پهنا
        inputBox.rx = inputBox.width / 10
        let dx = 0, dy = -2;
        // باکس و تکست مقادیر
        matrix[1].forEach((cell, index) => {
            // برای فرم های پیش چاپ شده باکس رسم نمیشود
            !dims.hideContext &&
                putRect({
                    container: svg, cx: cell.cx, cy: cell.cy, dx, dy,
                    width: inputBox.width, height: inputBox.height,
                    rx: inputBox.rx,
                });
            // اینپوت‌های نگهداری مقادیر که بعدا توسط متد آپدیت مقدارگذاری می‌شوند
            if (!dims.forceInsert) {
                // putPoint({ container: svg, x: cell.cx, y: cell.cy, r: 0.5, dx, dy })
                putText({ container: svg, value: "", x: cell.cx, y: cell.cy, dx, dy, style, name: labels[index] });
                // مختصات مرکز باکس ها رو توی یک پراپرتی کلاس میذاریم
                // که بتونیم برای المنت های اینپوت بعدا استفاده کنیم
                this.inputDims.push({ name: labels[index], x: (cell.cx + dx) * kx, y: (cell.cy + dy) * ky })
            } else {
                // برای فرم های مثل رسا استفاده میشود
                let name;
                this.inputs.forEach(input => {
                    ({ name, x, y } = input);
                    putText({ container: svg, x, y, style, name });
                });
            }
        }
        );

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        let className = 'no-print'
        putRect({ container: svg, x: 0, y: 0, width, height, style, name: dims.name })
        this.chart = svg;
        // اگر متد خودش کانتینر داشت در کانتینر خودش افزوده بشه
        const parent = container ? container : this.container
        parent.appendChild(svg);

        // تبدیل مختصات ویوباکس به مختصات پیکسلی

    }

    update(data, container) {
        console.log(data);
        
        this.data = data
        // انتخاب اینکه اینپوت های کاربر را آپدیت کنه یا اس وی جی تکست ها رو
        // بر حسب اینکه پارامتر کانتینر باشه یا نباشه
        const prop = container ? 'value' : 'textContent'
        const elem = container ? 'input' : 'text';
        !container && (container = this.chart);

        this.labels.forEach((label) => {
            container.querySelector(`${elem}[name=${label}]`)[prop] = data?.[label] || "";
        })
    }

    createUserInput({ container }) {
        // استایل دهی نسبی به کانتینر
        container.style.position = 'relative'
        const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
        const height = 25 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش

        let style = `
            margin: 0;
            padding: 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: crimson;
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            border: none;
            color: blue;
        `
        const color = (this.side === 'R') ? 'crimson' : 'blue';
        // ایجاد یک المنت اینپوت
        // let input
        // آماده سازی اولین نود اینپوت از داکیومنت و سپس ساختن بقیه نودها از روی آن
        // const firstInput = input // نگهداری اولین اینپوت برای برگشت و فوکوس کردن بهش
        let inputDims = this.inputDims

        inputDims.forEach(dims => {
            const input = document.createElement('input')
            input.name = 'SAT'
            input.type = 'text'
            input.maxLength = 4
            input.autocomplete = 'off'
            input.placeholder = '---'
            input.style = style
            input.style.color = color
            input.style.left = dims.x - width / 2 + 'px'
            input.style.top = dims.y - height / 2 + 'px'
            input.name = dims.name
            container.appendChild(input)
            // input = input.cloneNode() // در آخر  یک المنت اضافه ایجاد شده است - باگ بی آزار
        })
        // firstInput.focus()
    }

    // دریافت دیتای کاربر از اینپوت ها و جایگزین کردن در دیتای آبجکت کلاس
    // تغییر این دیتا باعث تغییر دیتای جاری می‌شود. چون آبجکت ها اشاره گر هستن
    fetchInputUserData() {
        ['SAT', 'SRT', 'MCL', 'UCL', 'SDS'].forEach(name => {
            const value = this.container.querySelector(`input[name= ${name}]`).value
            this.data[name] = value // جایگزین کردن پراپرتی آبجکت دیتای جاری و اینجا
        })
      
        console.log(this.data);

    }

}