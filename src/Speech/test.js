import Speech from "./Speech";

const app = document.querySelector('#app').insertAdjacentHTML('beforeend', `
  <div style="display:flex; align-items: center; justify-content: space-around;">
    <section id="speech" style="position: relative;">
      <input type="text" name="SAT" maxlength="4" placeholder="---" autocomplete="off" />
    </section>
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
  "width": 100 * 5,
  "height": 20 * 5,
  "labels": [
    "SAT",
    "SRT",
    "MCL",
    "UCL",
    "SDS"
  ]
}

const container = document.querySelector('#speech')
const RSpeech = new Speech({ container, dims, side: 'R' })

let input = document.querySelector("[name='SAT']")
const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
const height = 25 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
const inputDims = RSpeech.matrix[1] // مختصات اینپوت‌های سطر دوم در یک آرایه
let left = inputDims[0].pcx - width / 2
let top = inputDims[0].pcy - height / 2 - 6 // توی رسم افست دادیم به مستطیل کادر جبران اون 
let style = `
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: crimson;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  border: none;
`
// input.style = style;
input.setAttribute('style', style + ' left: ' + left + 'px; ' + 'top: ' + top + 'px;')
input.focus() // فوکوس روی اینپوت اول

// نود اول رو که در داکیومنت داریم. پس از نود دوم به بعد را از روی نود اول ایجاد می‌کنیم
// و مقدار دهی می‌کنیم
for (let i = 1; i < dims.labels.length; i++) {
  input = input.cloneNode()
  left = inputDims[i].pcx - width / 2
  top = inputDims[i].pcy - height / 2 - 6 // توی رسم افست دادیم به مستطیل کادر جبران اون 
  // input.setAttribute('style', style + ' left: ' + left + 'px; ' + 'top: ' + top + 'px;')
  input.style = style
  input.style.left = left + 'px'
  input.style.top = top + 'px'
  input.setAttribute('data-name', dims.labels[i])
  container.appendChild(input)

}


