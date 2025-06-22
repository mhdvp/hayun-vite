import Speech from "./Speech";

// export default function speechUI({ data = {} } = {}) {
// document.querySelector('#app').insertAdjacentHTML('beforeend', `
//     <div name="speechs">
//       <h1 class="center">Speech Tests</h1>
//       <div class="center">
//         <div>
//           <h2 class="center red">Right</h2>
//           <section id="r-speech"></section>
//         </div>
//         <div>
//           <h2 class="center blue">Left</h2>
//           <section id="l-speech"></section>
//         </div>
//       </div>
//       <button id="update">Update</button>
//     </div>
//   `)


// let dims = {
//   "name": "RSpeech",
//   "w": 89,
//   "h": 15,
//   "margin": {
//     "left": 1,
//     "top": 0,
//     "right": 10,
//     "bottom": 0
//   },
//   "display": "inline",
//   "stroke": true,
//   "width": 100 * 6,
//   "height": 20 * 5,
//   "labels": [
//     "SAT",
//     "SRT",
//     "MCL",
//     "UCL",
//     "SDS"
//   ]
// }

// let container = document.getElementById('r-speech')
// let rchart = new Speech({ container, dims, side: 'R' })

// // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
// rchart.createUserInput({ container })
// rchart.update(data.R, container)


// container = document.getElementById('l-speech')
// let lchart = new Speech({ container, dims, side: 'L' })

// // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
// lchart.createUserInput({ container })
// lchart.update(data.L, container)

// document.querySelector('#update').addEventListener('click', () => {
//   // مقادیر ورودی را بخوان و دیتای کلاس را آپدیت کن و آخر هم دیتای دریافتی تابع را جایگزین کن
//   // console.log(chart.data);
//   rchart.fetchInputUserData()
//   lchart.fetchInputUserData()

// })

// }

class SpeechUI {
  constructor() {


  }

  draw() {
    document.querySelector('#app').insertAdjacentHTML('beforeend', `
    <div name="speechs">
      <h1 class="center">Speech Tests</h1>
      <div class="center">
        <div>
          <h2 class="center red">Right</h2>
          <section id="r-speech"></section>
        </div>
        <div>
          <h2 class="center blue">Left</h2>
          <section id="l-speech"></section>
        </div>
      </div>
      <button id="update">Update</button>
    </div>
  `)

    let dims = {
      "name": "RSpeech",
      "w": 89,
      "h": 15,
      "margin": {
        "left": 1,
        "top": 0,
        "right": 10,
        "bottom": 0
      },
      "display": "inline",
      "stroke": true,
      "width": 100 * 6,
      "height": 20 * 5,
      "labels": [
        "SAT",
        "SRT",
        "MCL",
        "UCL",
        "SDS"
      ]
    }

    this.rcontainer = document.getElementById('r-speech')
    this.rchart = new Speech({ container: this.rcontainer, dims, side: 'R' })

    // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
    this.rchart.createUserInput({ container: this.rcontainer })


    this.lcontainer = document.getElementById('l-speech')
    this.lchart = new Speech({ container: this.lcontainer, dims, side: 'L' })

    // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
    this.lchart.createUserInput({ container: this.lcontainer })

    document.querySelector('#update').addEventListener('click', () => {
      // مقادیر ورودی را بخوان و دیتای کلاس را آپدیت کن و آخر هم دیتای دریافتی تابع را جایگزین کن
      // console.log(chart.data);
      this.rchart.fetchInputUserData()
      this.lchart.fetchInputUserData()

    })
  }

  update({ data = {} } = {}) {
    this.rchart.update(data.R, this.rcontainer)
    this.lchart.update(data.L, this.lcontainer)

  }



}


export default new SpeechUI()
// تابع زیر فقط در ایمپورت کل ماژول در فایل ایندکس اچ تی ام ال فراخوانی میشود و عملا با ایمپورت تابع فراخوانی میشود و برای تست هست
// ui()







