import Speech from "./Speech_Box"

class SpeechUI {
  constructor() {
    this.data = { R: '', L: '' }
  }

  draw({ containerId = '#app' } = {}) {

    document.querySelector(containerId).insertAdjacentHTML('beforeend', `
      <div name="speechs" class="border">
        <h1 class="center title">Speech Tests</h1>
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
    let box = { container: this.rcontainer, width: 600, height: 100, margin: { left: 1, right: 1, top: 1, bottom: 1 } }
    this.rchart = new Speech({ box, side: 'R' })

    // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
    this.rchart.createUserInput({ container: this.rcontainer })


    this.lcontainer = document.getElementById('l-speech')
    box = { container: this.lcontainer, width: 600, height: 100, margin: { left: 1, right: 1, top: 1, bottom: 1 } }
    this.lchart = new Speech({ box, side: 'L' })

    // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
    this.lchart.createUserInput({ container: this.lcontainer })


  }

  update({ data } = {}) {
    if (data) {
      this.rchart.update(data.R, this.rcontainer)
      this.lchart.update(data.L, this.lcontainer)
      this.data = { R: data.R, L: data.L }
    } else
    // اگر این تابع بدون پارامتر فراخوانی شود مقادیر اینپوت کاربر گرفته و دیتاآبجکت را آپدیت کند
    {
      console.log('without param', this.data);

      this.rchart.fetchInputUserData()
      this.lchart.fetchInputUserData()
      this.data.R = this.rchart.data
      this.data.L = this.lchart.data
    }

  }
}


export default new SpeechUI()
// تابع زیر فقط در ایمپورت کل ماژول در فایل ایندکس اچ تی ام ال فراخوانی میشود و عملا با ایمپورت تابع فراخوانی میشود و برای تست هست
// ui()







