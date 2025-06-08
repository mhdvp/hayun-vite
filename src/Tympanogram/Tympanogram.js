import putRect from "../common/putRect.js";
import putSVG from "../common/putSVG.js";
import putText from "../common/putText.js";
import units from "./units.js";
const svgNS = "http://www.w3.org/2000/svg";

export default class Tympanogram {
    constructor({ container, side, dims }) {
        this.container = container;
        this.side = side
        this.dims = dims
        this.draw({ dims })
    }

    draw({ dims }) {
        // پاک کردن چارت قبلی اگر وجود دارد
        this.chart && this.chart.remove()

        // داده‌های یونتیت خوانده میشود و بعد داده‌های دیمز به آن اضافه می‌‌شودکه می‌تواند جایگزین داده‌های قبلی یونیتز شود
        dims = { ...units, ...dims }

        let { width, height } = dims
        let x = dims.margin.left;
        let y = dims.margin.top;
        const { extraCompliance, compensated } = dims

        const { pressure, padding, styles } = units

        const compliance = extraCompliance ? units.compliance.extra : units.compliance.normal

        let { vbWidth, vbHeight } = units;

        // کل چارت
        let style
        style = styles.svg
        vbHeight = (vbWidth * height) / width // متناسب سازی ارتفاع ویباکس با پهنا و ارتفاع ورودی
        const viewBox = [-padding.left, -padding.top, vbWidth, vbHeight].join(' ')
        const svg = putSVG({ x, y, width, height, viewBox, style })
        this.chart = svg;
        // این خط شد دو خط کد طلایی که مشکل سایز فونت در دیسپلی و کاغذ رو حل کرد
        width = vbWidth; // ثابت می‌ماند همیشه
        height = vbHeight // با نسبت پهنا و ارتفاع ورودی تغییر میکند 

        const pressureAxiosLength = {
            dapa: pressure.max - pressure.min,
            mm: width - (padding.left + padding.right)
        }

        const complianceAxiosLength = {
            ml: compliance.max - compliance.min,
            mm: height - (padding.top + padding.bottom)
        }

        this.chartInfo = {
            pressure, compliance, padding,
            pressureAxiosLength, complianceAxiosLength, compensated,
        }

        // point({ container: svg, x: getX(pressure.min), y: getY(compliance.max), color: 'red' })
        // point({ container: svg, x: getX(pressure.max), y: getY(compliance.min), color: 'green' })
        // point({ container: svg, x: getX(pressure.min), y: getY(compliance.min), color: 'brown' })


        // Drawing Chart Lines
        {
            // Pressure Axios (Horizontal)
            style = `
                stroke-width: 0.15mm;
                stroke: black;
            `;
            putLine({
                x1: getX(pressure.min), y1: getY(compliance.min),
                x2: getX(pressure.max), y2: getY(compliance.min), style
            })

            // Compliance Axios (Vertical)
            putLine({
                x1: getX(pressure.min), y1: getY(compliance.min),
                x2: getX(pressure.min), y2: getY(compliance.max), style
            })

            // Pressure Zero Line
            style = `
                stroke-width: 0.07mm;
                stroke: black;
                stroke-dasharray: 0.4;
                stroke-opacity: 0.5;
            `;
            putLine({
                x1: getX(0), y1: getY(compliance.min),
                x2: getX(0), y2: getY(compliance.max), style
            })

            // Compliance Zero Line
            putLine({
                x1: getX(pressure.min), y1: getY(0),
                x2: getX(pressure.max), y2: getY(0), style
            })
        }

        // Texts Chart (Captions & Labels)
        {

            // Captions:
            style = styles.caption;

            putText({
                container: svg, value: "Compliance (ml)", style,
                x: getX(pressure.min), y: getY(compliance.max), dx: 5, dy: -3
            })

            putText({
                container: svg, value: "Pressure (dapa)", style: style,
                x: getX(pressure.max), y: getY(compliance.min), dx: -8, dy: 6,
            })

            // Lables
            style = styles.label;

            putText({
                container: svg, value: "ECV:", style: style,
                x: getX(pressure.min), y: getY(compliance.min), dy: 10
            })

            putText({
                container: svg, value: "MEP:", style,
                x: getX(-300), y: getY(compliance.min), dy: 10
            })

            putText({
                container: svg, value: "SC:", style: style,
                x: getX(0), y: getY(compliance.min), dy: 10
            });


            putText({
                container: svg, value: "G:", style,
                x: getX(280), y: getY(compliance.min), dy: 10
            });

            style = styles.type;
            putText({
                container: svg, value: "Type", style: style,
                x: getX(-500), y: getY(2.5),
            });
        }

        // Tympanogram Values (Inputs)
        {
            let color = (this.side === 'R') ? 'red' : 'blue';
            style = styles.input

            putText({
                container: svg, value: "", style: style + 'fill: ' + color, name: 'ECV',
                x: getX(pressure.min), y: getY(compliance.min), dy: 10, dx: 11
            })

            putText({
                container: svg, value: "", style: style + 'fill: ' + color, name: 'MEP',
                x: getX(-300), y: getY(compliance.min), dy: 10, dx: 11
            })

            putText({
                container: svg, value: "", style: style + 'fill: ' + color, name: 'SC',
                x: getX(0), y: getY(compliance.min), dy: 10, dx: 8
            })

            putText({
                container: svg, value: "", style: style + 'fill: ' + color, name: 'G',
                x: getX(300), y: getY(compliance.min), dy: 10, dx: 4
            })

            putText({
                container: svg, value: "", style: style + 'fill: ' + color, name: 'Type',
                x: getX(-500), y: getY(2.5), dx: 9
            })
        }

        // Compliance Axios digits
        style = styles.compliance;
        x = getX(pressure.min);
        for (let c = compliance.min + compliance.step; c <= compliance.max; c += compliance.step) {
            c = Math.round(c * 10) / 10 // برای اون پدیده اعشاری غیرمنتظر
            putText({
                container: svg, value: c.toFixed(1),
                x, y: getY(c), dx: -1,
                style,
            });
        }

        // Pressure Axios digits
        style = styles.pressure;
        for (let p = pressure.min; p <= pressure.max; p += pressure.step) {
            putText({
                container: svg, value: p,
                x: getX(p), y: getY(compliance.min), dy: 1,
                style,
            });
        }

        // مربع احاطه‌کننده کل جدول برای راهنمای توسعه
        style = 'fill: transparent; stroke: green; stroke-width: 0.5;';
        // یک بوردر راهنمای توسعه برای اس‌ وی جی به تمام پهنا و ارتفاع رسم می‌کنیم
        putRect({ container: svg, x: -padding.left, y: -padding.top, width, height, name: dims.name, style })
        this.container.appendChild(svg);
        // اگر آبجکت از قبل دیتایی دارد اون رو آپدیت کن
        this.data && this.update(this.data)

        // بلاک توابع داخلی مورد نیاز تابع اصلی
        // توابع تبدیل فشار و کامپلیانس به مختصات میلیمتر
        function getX(p) {
            return (p - pressure.min) * (pressureAxiosLength.mm / pressureAxiosLength.dapa)
        }

        function getY(c) {
            return (compliance.max - c) * (complianceAxiosLength.mm / complianceAxiosLength.ml)
        }

        // تابع رسم خط
        function putLine({ x1, y1, x2, y2, style }) {
            let line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("style", style)
            svg.appendChild(line);
        }

        // تابع ایجاد و رسم نقطه نشانگر رنگی
        function point({ container, x, y, color }) {
            let circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", '0.3mm');
            circle.setAttribute("stroke", color);
            container.appendChild(circle);
        }
    }

    update(data) {
        this.data = data
        console.log(data);
        
        let { ECV, SC, MEP, G } = data

        // تبدبل اعداد رشته ای به عدد با دو رقم اعشاری
        ECV && (ECV = (+ECV).toFixed(2));
        SC && (SC = (+SC).toFixed(2));
        G && (G = (+G).toFixed(2));

        // جایگذاری مقادیر تمپانومتری در تکست‌باکس ها
        this.chart.querySelector(`text[data-name="Type"]`).innerHTML = data?.Type || "-";
        this.chart.querySelector(`text[data-name="ECV"]`).innerHTML = ECV || "-";
        this.chart.querySelector(`text[data-name="MEP"]`).innerHTML = data?.MEP || "-";
        this.chart.querySelector(`text[data-name="SC"]`).innerHTML = SC || "-";
        this.chart.querySelector(`text[data-name="G"]`).innerHTML = G || "-";
        // پاک کردن منحنی قبلی از کانتینر جاری
        this.chart.querySelector(`path[data-name="curve"]`)?.remove();
        // رسم منحنی
        this.drawCurve(data);
    }

    // توابع داخلی
    drawCurve(data) {
        let { Type, ECV, SC, MEP, G, expanded, cp, cpp } = data

        // Ensure to Convert to Numbers //
        SC = +SC
        ECV = +ECV
        MEP = +MEP
        G = +G
        cp = +cp
        cpp = +cpp

        // اگر این مقادیر وجود نداشته باشه مقدار صفر میدیم بهشون که خطا در رسم منحنی نخوریم
        SC || (SC = 0)
        MEP || (MEP = 0)

        const container = this.chart
        const { pressure, compliance, pressureAxiosLength, complianceAxiosLength, compensated } = this.chartInfo;

        let cmp = 0 // for non-compensated
        compensated && (cmp = ECV)

        // مقداردهی دستی برای تست شکل منحنی
        // data.SC = 0.5;
        // data.MEP = -75;
        // با توجه به اندازه اس ‌سی میشه برای مقادیر زیر یک سری رل گذاشت با منحنی قشنگ تر باشد
        // let cp = 70 // جابجایی نقطه کنترل منحنی های راست و چپ روی محور افقی
        !cp && (cp = 70)
        // let k = 0.5; // width and height change [0, 1]
        !cpp && (cpp = 5) //جابجایی نقطه کنترل قله ها روی محور افقی
        // رل‌هایی برای تغییر مقادیر بالا برای زیبایی بیشتر منحنی در نقطه قله
        // (data.SC <= 0.30)? k=0
        let k
        k = (SC > 0.30) ? 0.5 : 0.1 // width and height change [0, 1]
        k = (SC > 1.0) ? 0.2 : k
        // k = (data.SC < 1.0) ? 0 : k;

        let pw = 20 * k // نصف پهنای قله
        let ph = 0.1 * k // ارتفاع قله

        let zone = {
            normal: { min: -300, max: 250 },
            expanded: { min: -600, max: 400 },
        }
        // تعیین کرانه‌های منحنی بر حسب فشار گوش میانی
        let RV = zone.normal
        if (MEP <= -150 || MEP >= 100 || expanded) { RV = zone.expanded } else { RV = zone.normal }

        const curve = {
            R: {
                P1: { p: RV.max, c: cmp },
                P2: { p: MEP + pw, c: cmp + SC - ph },
                C: { p: MEP + cp, c: cmp }
            },
            RM: {
                P1: {}, // Define later
                P2: { p: MEP, c: cmp + SC },
                C: { p: MEP + cpp, c: cmp + SC }
            },
            LM: {
                P1: {}, // Define later
                P2: { p: MEP - pw, c: cmp + SC - ph },
                C: { p: MEP - cpp, c: cmp + SC }
            },
            L: {
                P1: {}, // Define later
                P2: { p: RV.min, c: cmp },
                C: { p: MEP - cp, c: cmp }
            }
        }

        // به دست آوردن مختصات نقاط کنترل بر حسب مختصات پیک
        curve.RM.P1 = curve.R.P2
        curve.LM.P1 = curve.RM.P2
        curve.L.P1 = curve.LM.P2

        let color = (this.side == "R") ? "red" : "blue";
        let path = document.createElementNS(svgNS, "path");
        path.setAttribute("fill", "none");
        path.setAttribute("data-name", "curve");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", "0.5px");
        path.setAttribute(
            "d", `
            M ${ctg(curve.R.P1)}
            Q ${ctg(curve.R.C)} ${ctg(curve.R.P2)}
            M ${ctg(curve.RM.P1)}
            Q ${ctg(curve.RM.C)} ${ctg(curve.RM.P2)}
            M ${ctg(curve.LM.P1)}
            Q ${ctg(curve.LM.C)} ${ctg(curve.LM.P2)}
            M ${ctg(curve.L.P1)}
            Q ${ctg(curve.L.C)} ${ctg(curve.L.P2)}
            `
        );
        container.appendChild(path);


        // تابع ایجاد و رسم نقطه نشانگر رنگی
        function point({ x, y, color }) {
            let circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 0.1);
            circle.setAttribute("stroke", color);
            container.appendChild(circle);
        }

        // تابعی که آبجکت مختصات را میگیرد و تبدیل به یک رشته با ترکیب دو عدد با ویرگول میکند
        function ctg(pc) {
            return `${getX(pc.p)} ${getY(pc.c)}`
        }

        function getX(p) {
            return (p - pressure.min) * (pressureAxiosLength.mm / pressureAxiosLength.dapa)
        }

        function getY(c) {
            return (compliance.max - c) * (complianceAxiosLength.mm / complianceAxiosLength.ml)
        }
    }
}