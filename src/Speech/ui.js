import Speech from "./Speech";
document.querySelector('#app').insertAdjacentHTML('beforeend', `
<div name="speechs">
	<h1 class="center">Speech Tests</h1>
	<div class="center">
		<div>
			<h2 class="center red">Right</h2>
			<section id="r-speech" style="position: relative;">
				<input type="text" name="SAT" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
		</div>
		<div>
			<h2 class="center blue">Left</h2>
			<section id="l-speech" style="position: relative;">
				<input type="text" name="SAT" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
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

const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
const height = 25 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
let style = `
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: crimson;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  border: none;
`
let container = document.getElementById('r-speech')
let input = container.querySelector('[name=SAT]')
let chart = new Speech({ container, dims, side: 'R' })

insertInput({ container, chart, side: 'R' }).focus()
chart.update({ SAT: 50, SDS: 90 }, container)


container = document.getElementById('l-speech')
input = container.querySelector('[name=SAT]')
chart = new Speech({ container, dims, side: 'L' })

insertInput({ container, chart, side: 'L' })
chart.update({ SAT: 60 , SDS: 90 }, container)


function insertInput({ container, chart, side }) {
  // آماده سازی اولین نود اینپوت از داکیومنت و سپس ساختن بقیه نودها از روی آن
  const firstInput = input // نگهداری اولین اینپوت برای برگشت و فوکوس کردن بهش
  let inputDims = chart.inputDims
  input.style = style
  input.style.color = (side === 'R') ? 'crimson' : 'blue';

  input.style.left = inputDims[0].x - width / 2 + 'px'
  input.style.top = inputDims[0].y - height / 2 + 'px'
  inputDims.shift() // حذف اولین عنصر آرایه بخاط اینکه استفاده شد در نود بالایی

  inputDims.forEach(dims => {
    input = input.cloneNode()
    input.style.left = dims.x - width / 2 + 'px'
    input.style.top = dims.y - height / 2 + 'px'
    input.setAttribute('name', dims.name)
    container.appendChild(input)
  })

  return firstInput
}






