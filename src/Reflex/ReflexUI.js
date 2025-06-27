import Reflex from "./Reflex";

class ReflexUI {
    constructor() {
        this.data = { R: '', L: '' }
    }
    draw({ containerId = '#app' }) {
        document.querySelector(containerId).insertAdjacentHTML('beforeend', `
            <div name = "reflexes" class="border">
                <h1 class="center title">Acoustic Reflexes</h1>
                <div class="center">
                    <div>
                        <h2 class="side center red">Right</h2>
                        <section id="r-reflex"></section>
                    </div>
                    <div>
                        <h2 class="side center blue">Left</h2>
                        <section id="l-reflex"></section>
                    </div>
                </div>
            </div>
        `);

        // ابعاد جداول تمپانوگرام
        const dims = {
            "name": "RTympanogram",
            "w": 100,
            "h": 30,
            "margin": {
                "left": 1,
                "top": 0,
                "right": 10,
                "bottom": 0
            },
            "display": "inline",
            "width": 100 * 6,
            "height": 30 * 6
        }

        this.rcontainer = document.getElementById('r-reflex')
        this.rchart = new Reflex({ container: this.rcontainer, dims, side: 'R' })

        // فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
        this.rchart.createUserInput({ container: this.rcontainer })

        this.lcontainer = document.getElementById('l-reflex')
        this.lchart = new Reflex({ container: this.lcontainer, dims, side: 'L' })
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

            this.rchart.fetchInputUserData()
            this.lchart.fetchInputUserData()
            this.data.R = this.rchart.data
            this.data.L = this.lchart.data
            console.log('without param', this.data.R);

        }

    }
}

export default new ReflexUI()







