const units = {
    name: 'Tympanogram',
    margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم

    // واحد ویوباکس - بدون واحد
    vbWidth: 100, // برای اینکه ضخامت خطوط تغییری ناهنجار نکند این ثابت میماند 
    vbHeight: 60, // این به نسبت تغییر می‌کند

    // واحد پیکسل، میلیمتر، ...
    // اگر واحد پایینی توسط بیرون تغییر کرد واحدهای بالایی باید با نسبت پایینی تغییر کنند
    width: 100,
    height: 60,

    pressure: { min: -600, max: +400, step: 200 },
    compliance: {
        normal: { min: -0.50, max: 3, step: 0.50 },
        extra: { min: -0.50, max: 6, step: 0.50 }
    },
    padding: { right: 5, left: 8, top: 7, bottom: 14 },


    styles: {
        svg: 'user-select: none; direction: ltr !important; font-family: Vazir;',
        pressure: `
            font-size: 3;
            text-anchor: middle; 
            dominant-baseline: hanging; 
        `,
        caption: `
            font-size: 3;
            text-anchor: middle; 
            dominant-baseline: middle; 
        `,
        label: `
            font-size: 4.2;
            font-weight: bold;
            text-anchor: start;
            dominant-baseline: middle;       
        `,
        input: `
            font-size: 4.2;
            font-weight: bold;
            text-anchor: start;
            dominant-baseline: middle;       
        `,
        type: `
            font-size: 1mm;
            font-weight: bold;
            text-anchor: start;
            dominant-baseline: middle;   
        `,
        compliance: `
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