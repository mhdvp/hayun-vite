const units = {

    name: 'Speech',
    margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم
    // اگر واحد پایینی توسط بیرون تغییر کرد ارتفاع ویوباکس  باید با نسبت پایینی تغییر کنند
    width: 100,
    height: 20,
    // این فاصله خطوط محورهای بالا و چپ ادیوگرام از لبه ها هست
    chartPadding: { left: 0, top: 0, right: 0, bottom: 0 },
    // واحد ویوباکس - بدون واحد
    vbWidth: 100, // برای اینکه ضخامت خطوط تغییری ناهنجار نکند این ثابت میماند 
    vbHeight: 20, // این به نسبت تغییر می‌کند
    // پایینی شکل آبجکت بالایی هست
    // viewBoxObj: { 'min-x': -0, 'min-y': 0, width: 100, height: 20 },
    // viewBox: [0, 0, 100, 20],
    // واحد پیکسل، میلیمتر، ...

    styles: {
        label: `
            user-select: none;
            direction: ltr;
            font-family: Vazirmatn;
            font-size: ${4.2};
            font-weight: 700;
            text-anchor: middle;
        `,
        svgInput: `
            user-select: none;
            direction: ltr;
            font-family: Vazirmatn;
            font-size: ${4.2};
            font-weight: 700;
            text-anchor: middle;
            dominant-baseline: middle; 

        `,
        center: `
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        `,
        title: `
            font: 2em Vazirmatn;
            font-weight: 500;
            margin: 0rem 0em 0em 0em;
        `,
        side: `
            font: 1.5rem Vazirmatn;
            font-weight: 500;
            margin: 0rem 0em 0em 0em;
        `,
        red:`color: red;`,
        blue: `color: blue;`,
        border:`border: 1px solid green;`,
    }
}

export default units