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

    // این فاصله خطوط محورهای بالا و چپ ادیوگرام از لبه ها هست
    chartPadding: { left: 40, top: 40, right: 30, bottom: 20 },
    symbolDims: { width: 55, height: 55 },
    symbolsChart: {
        width: 240, height: 60
    },
    // virtual frequency 
    mainFrequencies: [125, 250, 500, 1000, 2000, 4000, 8000],
   
    intensity: { min: -20, max: 130, step: 10 },
    
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