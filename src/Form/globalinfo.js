const svgNS = "http://www.w3.org/2000/svg";

// تعریف آبجکت مختصات ایکس - فرکانس در تیبل ادیوگرام
const xFrequency = {
  // مقدار کلید برابر با مختصات محلی فرکانس هست
  20: 250,
  40: 500,
  53: 750,
  60: 1000,
  73: 1500,
  80: 2000,
  93: 3000,
  100: 4000,
  113: 6000,
  120: 8000,
};
const freqToXObj = {
  // آبجکت تبدیل فرکانس به مختصات ایکس جدول ادیوگرام
  250: 20,
  500: 40,
  750: 53,
  1000: 60,
  1500: 73,
  2000: 80,
  3000: 93,
  4000: 100,
  6000: 113,
  8000: 120,
};
// تعریف آبجکت مختصات ایگرگ - شدت در تیبل ادیوگرام
const yIntensity = {
  5: -15,
  10: -10,
  15: -5,
  20: 0,
  25: 5,
  30: 10,
  35: 15,
  40: 20,
  45: 25,
  50: 30,
  55: 35,
  60: 40,
  65: 45,
  70: 50,
  75: 55,
  80: 60,
  85: 65,
  90: 70,
  95: 75,
  100: 80,
  105: 85,
  110: 90,
  115: 95,
  120: 100,
  125: 105,
  130: 110,
  135: 115,
  140: 120,
  145: 125,
};

export {
  svgNS,
  xFrequency,
  yIntensity,
  freqToXObj,
};
