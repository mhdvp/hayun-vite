import putRect from "../common/putRect";

export default class Sections {
    constructor({ container, dims }) {
        this.dims = dims
        // console.log(this.dims.sections);
        this.container = container;
        this.margins = dims.margin;

        this.width = dims.width;
        this.height = dims.height;

        this.left = 0; // برای این فعلا برنامه ای ندارم وقتی دو سکشن در یک خط لازم شد میام سراغش
        this.top = 0;
        // از پایینی برای رسم تاپ لایر استفاده میکنم
        this.cords = []; // آرایه نگهداری مختصات و طول و عرض هر سکشن

        // یک حلقه آرایه ایجاد میکنیم همه سکشن ها رسم شود
        this.create()



    }
    // ایجاد سکشن‌ها
    create() {
        // console.log(this.dims.sections);
        const margins = this.margins;

        this.dims.sections.forEach(section => {
            let name = section.name;
            let width = section.w;
            let height = section.h;
            const display = section.display;
            // اگر مقدار دیسپلی اینلاین بود به بلوک بعد نمیره

            // یک کادر چهارگوش با نام 
            const svgNS = "http://www.w3.org/2000/svg";
            // const w = dims.header.width, h = dims.header.height;
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("data-name", name);
            svg.setAttribute("width", width);
            svg.setAttribute("height", height);
            svg.setAttribute("x", this.left);
            svg.setAttribute("y", this.top);

            // نگهداری مختصات رسم بوردر هر سکشن برای استفاده در متد داخلی رسم بودر تاپ لایر 
            this.cords.push({ name: name, width: width, height: height, x: this.left, y: this.top });

            putRect({
                container: svg, x: 0, y: 0, width, height,
                style: 'fill: transparent; stroke: blue; stroke-width: 0.2',
                className: 'no-print'
            })
            this[name] = svg;
            this.container.appendChild(svg)

            // به روز کردن ارتفاع نقطه خالی برای رسم سکشن بعدی
            // با توجه بلاک یا اینلاین بودن سکشن بالا و چپ را تغییر بده
            // else { this.left = margins.left; this.top += height; }
            if (display === 'block') { this.left = 0; this.top += height; }
            if (display === 'inline') { this.left += width; }


            // if (this.left >= this.width) { this.left = margins.left; this.top += height; }
        });
    }

}