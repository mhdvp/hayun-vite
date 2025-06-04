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
        svg: 'user-select: none; direction: ltr !important; font-family: Vazir;',
        textLable: `
            font-size: 4.2;
            font-weight: bold;
            text-anchor: end;
            dominant-baseline: middle; 
        `,
        numberlabel: `
            font-size: 4.2;
            font-weight: 700;
            text-anchor: middle;   
            dominant-baseline: middle;   
        `,
        inputNumber: `
            font-size: 4.2;
            font-weight: 700;
            text-anchor: middle;   
            dominant-baseline: middle;  
        `,
    },
}

export default units;