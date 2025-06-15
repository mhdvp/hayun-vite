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
  "height": 20 * 6,
  "labels": [
    "SAT",
    "SRT",
    "MCL",
    "UCL",
    "SDS"
  ]
}

let container = document.querySelector('#r-speech')
const RSpeech = new Speech({ container, dims, side: 'R' })

const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
const height = 25 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
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
// آماده سازی اولین نود اینپوت از داکیومنت و سپس ساختن بقیه نودها از روی آن
let input = container.querySelector('[name=SAT]')
input.focus()
let inputDims = RSpeech.inputDims
input.style = style
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

container = document.querySelector('#l-speech')
const LSpeech = new Speech({ container, dims, side: 'L' })
input = container.querySelector('[name=SAT]')
inputDims = LSpeech.inputDims
input.style = style
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

// document.querySelector('#update-btn').addEventListener('click', e => {
//   const SAT = container.querySelector("[name='SAT']").value
//   patientData.sessions[0].speech.R.SAT = SAT
// })




