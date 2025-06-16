import Tympanogram from "./Tympanogram";

document.querySelector('#app').insertAdjacentHTML('beforeend', `
<div name="tympanograms">
	<h1 class="center">Tympanograms</h1>
	<div class="center">
		<div>
			<h2 class="center red">Right</h2>
			<section id="r-tympanogram" style="position: relative;">
				<input type="text" name="type" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
			<section name="r-tympanogram">
				<p>Curve settings:</p>
				<input type="range" id="cp" name="cp" min="10" max="150" value="70" step="5" />
				<label for="cp">cp</label>
				<input type="range" id="cpp" name="cpp" min="1" max="10" value="5" step="1" />
				<label for="cpp">cpp</label>
				<div>
					<input type="checkbox" name="extra-sc" id="r-extra-sc">
					<label for="r-extra-sc">Extra SC</label>
				</div>
				<div>
					<input type="checkbox" name="compensated" id="r-compensated">
					<label for="r-compensated">Compensated</label>
				</div>
			</section>
		</div>

		<div>
			<h2 class="center blue">Left</h2>
			<section id="l-tympanogram" style="position: relative;">
				<input type="text" name="type" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
			<section name="l-tympanogram">
				<p>Curve settings:</p>
				<input type="range" id="cp" name="cp" min="10" max="150" value="70" step="5" />
				<label for="cp">cp</label>
				<input type="range" id="cpp" name="cpp" min="1" max="10" value="5" step="1" />
				<label for="cpp">cpp</label>
				<div>
					<input type="checkbox" name="extra-sc" id="l-extra-sc">
					<label for="l-extra-sc">Extra SC</label>
				</div>
				<div>
					<input type="checkbox" name="compensated" id="l-compensated">
					<label for="l-compensated">Compensated</label>
			</section>
		</div>
	</div>
</div>
`);

let dims = {
	"name": "RTympanogram",
	"w": 100,
	"h": 60,
	"margin": {
		"left": 2,
		"top": 0,
		"right": 2,
		"bottom": 0
	},
	"display": "inline",
	"width": 100 * 6,
	"height": 60 * 6,
}

let data = {
	type: "An",
	ECV: '1.30',
	SC: '0.80',
	MEP: '-130',
	G: 0.2,
	expanded: false, // by default is false for expand pressure from -600 to +400

}

let cp = 70, cpp = 5, extraCompliance, compensated

const width = 50 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
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
insertInputs({ containerID: 'r-tympanogram', side: 'R', dims, style }).focus()

insertInputs({ containerID: 'l-tympanogram', side: 'L', dims, style })


function insertInputs({ containerID, side, dims, style }) {
	let container = document.getElementById(containerID)
	const tympanogram = new Tympanogram({ container, dims, side })
	tympanogram.update(data)

	let input = container.querySelector('[name=type]')
	const firstInput = input // اولین اینپوت 
	
	let inputDims = tympanogram.inputDims
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

	container = document.querySelector(`[name=${containerID}]`)
	console.log(container);
	
	container.querySelector("[name=compensated]").addEventListener("input", e => {
		compensated = e.target.checked
		console.log(e.target.checked);
		dims = { ...dims, compensated }
		tympanogram.draw({ dims })
	})

	container.querySelector("[name=extra-sc]").addEventListener("input", e => {
		extraCompliance = e.target.checked
		console.log(e.target.checked);
		dims = { ...dims, extraCompliance }
		tympanogram.draw({ dims })
	})

	container.querySelector("#cp").addEventListener("input", e => {
		cp = e.target.value
		console.log(cp);
		data = { ...data, cp }
		tympanogram.update(data)
	})

	container.querySelector("#cpp").addEventListener("input", e => {
		cpp = e.target.value
		console.log(cpp);
		data = { ...data, cpp }
		tympanogram.update(data)
	})

	return firstInput
}










