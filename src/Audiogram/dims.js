const dims = {
    name: 'Audiogram',
    margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم
    width: 800,
    height: 800,
    // این فاصله خطوط محورهای بالا و چپ ادیوگرام از لبه ها هست
    chartPadding: { left: 40, top: 50, right: 30, bottom: 20 },
    symbolDims: { width: 55, height: 55 },
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
        frequency: `text-anchor: middle; dominant-baseline: hanging;
             font: 1.3em Verdana, Helvetica, Arial, sans-serif; user-select: none;font-weight:bold;`,
        intensity: `text-anchor: end; dominant-baseline: middle;
             font: 1.3em Verdana, Helvetica, Arial, sans-serif; user-select: none;font-weight:bold;`,
        mainFreqline: `stroke: black; stroke-width: 1;`,
        semiOctavFreqline: `stroke: black; stroke-width: 1;  stroke-dasharray: 4;`,
        boldLine: 'stroke: black; stroke-width: 3;',

        juncDashLine: `stroke-width: 1 ; stroke-opacity: 0.8; stroke-dasharray: 4;`,
        juncLine: `stroke-width: 1; stroke-opacity: 0.8;`,
    },

    // پس از اضافه کردن هر آیتم در زیر این تمپلت رو هم آپدیت کنید
    // template: {
    //     margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم

    //     width: 700,
    //     height: 700,

    //     chartPadding: { left: 40, top: 50, right: 30, bottom: 10 },
    //     symbolDims: { width: 55, height: 55 },
    //     // virtual frequency 
    //     frequencies: [{ value: 125, x: 0 }, { value: 250, x: 2 }, { value: 500, x: 4 }, { value: 750, x: 5 }],

    //     iFrequency: { min: 0, max: 14, step: 1 },
    //     iToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
    //     fToVf: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
    //     intensity: { min: -20, max: 120, step: 10 },

    //     styles: {
    //         freq: ``,
    //         line: ``,
    //         juncDashLine: ``,
    //         juncLine: ``,
    //     }
    // },

    // display: {
    //     width: 800,
    //     height: 600,


    // },
    // rasa_audiometry: {
    //     blank: true, // define Blank Chart for PrePrinted Chart, Lines do not draw
    //     // width: 70.6,
    //     // height: 70,
    //     // margin: { left: 17, top: 18.5, },
    //     chartPadding: { left: 0, top: 0, right: 0, bottom: 0 },
    //     symbolDims: { width: 8, height: 8 },
    //     // virtual frequency 
    //     frequencies: [{ value: 125, x: 0 }, { value: 250, x: 2 }, { value: 500, x: 4 }, { value: 750, x: 5 }],

    //     iFrequency: { min: 0, max: 14, step: 1 },
    //     iToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
    //     fTovf: { 125: 0, 250: 2, 500: 4, 750: 5.2, 1000: 6, 1500: 7.2, 2000: 8, 3000: 9.2, 4000: 10, 6000: 11.2, 8000: 12, 12000: 13.2, 16000: 14 },
    //     intensity: { min: -20, max: 120, step: 10 },

    //     styles: {
    //         freq: ``,
    //         line: `stroke: black; stroke-width: 0.1;`,
    //         juncDashLine: `stroke-width: 0.1 ; stroke-opacity: 0.8; stroke-dasharray: 0.5;`,
    //         juncLine: `stroke-width: 0.2; stroke-opacity: 0.8;`,
    //     }
    // },
    // combo: {
    //     // width: 50,
    //     // height: 40,
    //     // margin: { left: 5, top: 5, right: 5, bottom: 5 },
    //     chartPadding: { left: 8, top: 8, right: 5, bottom: 3 },
    //     symbolDims: { width: 8, height: 8 },
    //     // virtual frequency 
    //     frequencies: [{ value: 125, x: 0 }, { value: 250, x: 2 }, { value: 500, x: 4 }, { value: 750, x: 5 }],

    //     iFrequency: { min: 0, max: 14, step: 1 },
    //     iToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
    //     freqToi: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
    //     intensity: { min: -20, max: 120, step: 10 },

    //     styles: {
    //         freq: ``,
    //         line: `stroke: black; stroke-width: 0.1;`,
    //         juncDashLine: `stroke-width: 0.1 ; stroke-opacity: 0.8; stroke-dasharray: 0.5;`,
    //         juncLine: `stroke-width: 0.2; stroke-opacity: 0.8;`,
    //     }
    // }
}

export default dims;