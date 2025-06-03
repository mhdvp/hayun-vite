const units = {
    name: 'Acoustic Reflexes',
    margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم

    // واحد ویوباکس - بدون واحد
    vbWidth: 100, // برای اینکه ضخامت خطوط تغییری ناهنجار نکند این ثابت میماند 
    vbHeight: 30, // این به نسبت تغییر می‌کند

    // واحد پیکسل، میلیمتر، ...
    // اگر واحد پایینی توسط بیرون تغییر کرد واحدهای بالایی باید با نسبت پایینی تغییر کنند
    width: 100,
    height: 30,

    styles: {
        pressure: `
            user-select: none;
            direction: ltr !important;
            font-family: Vazir;
            font-size: 3;
            text-anchor: middle; 
            dominant-baseline: hanging; 
        `,
        caption: `
            user-select: none;
            direction: ltr !important;
            font-family: Vazir;
            font-size: 3;
            text-anchor: middle; 
            dominant-baseline: middle; 
        `,
        label: `
            user-select: none;
            direction: ltr !important;
            font-family: Vazir;
            font-size: 1mm;
            text-anchor: start;
            dominant-baseline: middle;       
        `,
        type: `
            user-select: none;
            direction: ltr !important;
            font-family: Vazir;
            font-size: 1mm;
            font-weight: bold;
            text-anchor: start;
            dominant-baseline: middle;   
        `,
        compliance: `
            user-select: none;
            direction: ltr !important;
            font-family: Vazir;
            font-size: 0.7mm;
            text-anchor: end; 
            dominant-baseline: middle; 
        `,
        mainFreqline: `stroke: black; stroke-width: 1;`,
        semiOctavFreqline: `stroke: black; stroke-width: 1;  stroke-dasharray: 4;`,
        boldLine: 'stroke: black; stroke-width: 3;',

        juncDashLine: `stroke-width: 1 ; stroke-opacity: 0.8; stroke-dasharray: 4;`,
        juncLine: `stroke-width: 1; stroke-opacity: 0.8;`,
    },
}

export default units;