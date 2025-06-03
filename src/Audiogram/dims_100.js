const units = {
    name: 'Audiogram',
    margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم
    // این فاصله خطوط محورهای بالا و چپ ادیوگرام از لبه ها هست
    chartPadding: { left: 4, top: 4, right: 3, bottom: 1 },
    // واحد ویوباکس - بدون واحد
    vbWidth: 70, // برای اینکه ضخامت خطوط تغییری ناهنجار نکند این ثابت میماند 
    vbHeight: 70, // این به نسبت تغییر می‌کند
    // پایینی شکل آبجکت بالایی هست
    // viewBoxObj: { 'min-x': -40, 'min-y': -40, width: 700, height: 700 },
    // viewBox: '-40 -40 700 700',
    // واحد پیکسل، میلیمتر، ...
    // اگر واحد پایینی توسط بیرون تغییر کرد ارتفاع ویوباکس  باید با نسبت پایینی تغییر کنند
    width: 700,
    height: 700,


    symbolDims: { width: 7, height: 7 },
    symbolsChart: {
        width: 240, height: 60
    },
    // virtual frequency 
    mainFrequencies: [125, 250, 500, 1000, 2000, 4000, 8000],
    frequencies: [
        { f: 125, vf: 0, label: false }, { f: 250, vf: 2 },
        { f: 500, vf: 4 }, { f: 750, vf: 5.2, semiOctav: true },
        { f: 1000, vf: 6 }, { f: 1500, vf: 7.2, semiOctav: true },
        { f: 2000, vf: 8 }, { f: 3000, vf: 9.2, semiOctav: true },
        { f: 4000, vf: 10 }, { f: 6000, vf: 11.2, semiOctav: true },
        { f: 8000, vf: 12 }, { f: 16000, vf: 14 },
    ],

    vf: { min: 0, max: 14, step: 1 }, // virtual frequency
    vfArray: [0, 2, 4, 5.2, 6, 7.2, 8, 9.2, 10, 11.2, 12],
    vfToF: { 0: 125, 2: 250, 4: 500, 5.2: 750, 6: 1000, 7.2: 1500, 8: 2000, 9.2: 3000, 10: 4000, 11.2: 6000, 12: 8000, 13: 12000, 14: 16000 },
    fToVf: { 125: 0, 250: 2, 500: 4, 750: 5.2, 1000: 6, 1500: 7.2, 2000: 8, 3000: 9.2, 4000: 10, 6000: 11.2, 8000: 12, 12000: 13.2, 16000: 14 },
    intensity: { min: -20, max: 130, step: 10 },
    styles: {
        frequency: ['text-anchor: middle', 'dominant-baseline: hanging', 'font: 2px Vazir', 'user-select: none', 'font-weight:bold'].join('; '),
        intensity: ['text-anchor: end', 'dominant-baseline: middle', 'font: 2px Vazir', 'user-select: none', 'font-weight:bold'].join('; '),
        mainFreqline: ['stroke: black', 'stroke-width: 0.1'].join('; '),
        semiOctavFreqline: ['stroke: black', 'stroke-width: 0.1', 'stroke-dasharray: 0.5'].join('; '),
        line: 'stroke: black; stroke-width: 0.1;',
        boldLine: 'stroke: black; stroke-width: 0.3;',
        juncDashLine: 'stroke-width: 0.1; stroke-opacity: 0.8; stroke-dasharray: 0.5;',
        juncLine: 'stroke-width: 0.1; stroke-opacity: 0.8;',
    },

}

export default units;