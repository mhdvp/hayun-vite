// for 
const dims = {
    name: 'Audiogram',
    // پس از اضافه کردن هر آیتم در زیر این تمپلت رو هم آپدیت کنید
    template: {
        margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم

        width: 700,
        height: 700,

        chartPadding: { left: 30, top: 45, right: 30, bottom: 10 },
        symbolDims: { width: 55, height: 55 },
        // virtual frequency 
        vFrequency: { min: 0, max: 14, step: 1 },
        vToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
        freqToV: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
        intensity: { min: -20, max: 120, step: 10 },

        styles: {
            line: ``,
            juncDashLine: ``,
            juncLine: ``,
        }
    },

    display: {
        margin: { left: 0, top: 0, }, // در کانتینر دیو این عمل نمیکنه. مگر در کانتینر اس وی جی بذاریم

        width: 700,
        height: 700,

        chartPadding: { left: 30, top: 45, right: 30, bottom: 10 }, // این فاصله خطوط جدول از لبه ها هست
        symbolDims: { width: 55, height: 55 },
        // virtual frequency 
        vFrequency: { min: 0, max: 14, step: 1 },
        vToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
        freqToV: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
        intensity: { min: -20, max: 130, step: 10 },

        styles: {
            line: `stroke: black; stroke-width: 1;`,
            juncDashLine: `stroke-width: 1 ; stroke-opacity: 0.8; stroke-dasharray: 4;`,
            juncLine: `stroke-width: 1; stroke-opacity: 0.8;`,
        }
    },
    rasa_audiometry: {
        blank: true, // define Blank Chart for PrePrinted Chart, Lines do not draw
        // width: 70.6,
        // height: 70,
        // margin: { left: 17, top: 18.5, },
        chartPadding: { left: 0, top: 0, right: 0, bottom: 0 },
        symbolDims: { width: 8, height: 8 },
        // virtual frequency 
        vFrequency: { min: 0, max: 14, step: 1 },
        vToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
        freqToV: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
        intensity: { min: -20, max: 120, step: 10 },

        styles: {
            line: `stroke: black; stroke-width: 0.1;`,
            juncDashLine: `stroke-width: 0.1 ; stroke-opacity: 0.8; stroke-dasharray: 0.5;`,
            juncLine: `stroke-width: 0.2; stroke-opacity: 0.8;`,
        }
    },
    combo: {
        // width: 50,
        // height: 40,
        // margin: { left: 5, top: 5, right: 5, bottom: 5 },
        chartPadding: { left: 8, top: 8, right: 5, bottom: 3 },
        symbolDims: { width: 8, height: 8 },
        // virtual frequency 
        vFrequency: { min: 0, max: 14, step: 1 },
        vToFreq: { 0: 125, 2: 250, 4: 500, 5: 750, 6: 1000, 7: 1500, 8: 2000, 9: 3000, 10: 4000, 11: 6000, 12: 8000, 13: 12000, 14: 16000 },
        freqToV: { 125: 0, 250: 2, 500: 4, 750: 5, 1000: 6, 1500: 7, 2000: 8, 3000: 9, 4000: 10, 6000: 11, 8000: 12, 12000: 13, 16000: 14 },
        intensity: { min: -20, max: 120, step: 10 },

        styles: {
            line: `stroke: black; stroke-width: 0.1;`,
            juncDashLine: `stroke-width: 0.1 ; stroke-opacity: 0.8; stroke-dasharray: 0.5;`,
            juncLine: `stroke-width: 0.2; stroke-opacity: 0.8;`,
        }
    }
}

export default dims;