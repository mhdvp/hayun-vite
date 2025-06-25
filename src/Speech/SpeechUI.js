import Speech from "./Speech"

class SpeechUI {
  constructor() {
    this.data = {R: '', L: ''}
  }

  draw({ containerId = '#app' } = {}) {
   
    document.querySelector(containerId).insertAdjacentHTML('beforeend', `
    <div name="speechs" class="border">
      <h1 class="title center">Speech Tests</h1>
      <div class="center">
        <div>
          <h2 class="side center red">Right</h2>
          <section id="r-speech"></section>
        </div>
        <div>
          <h2 class="side center blue">Left</h2>
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
      this.data.R = this.rchart.data
      this.data.L = this.lchart.data

    })
  }

  update({ data = {} } = {}) {
    this.rchart.update(data.R, this.rcontainer)
    this.lchart.update(data.L, this.lcontainer)
    this.data = {R: data.R, L: data.L}

  }
}


export default new SpeechUI()
// تابع زیر فقط در ایمپورت کل ماژول در فایل ایندکس اچ تی ام ال فراخوانی میشود و عملا با ایمپورت تابع فراخوانی میشود و برای تست هست
// ui()







