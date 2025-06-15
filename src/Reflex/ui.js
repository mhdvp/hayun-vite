import Reflex from "./Reflex";

document.querySelector('#app').insertAdjacentHTML('beforeend', `
<div name = "reflexes">
	<h1 class="center">Acoustic Reflexes</h1>
	<div class="center">
		<div>
			<h2 class="center red">Right</h2>
			<section id="r-reflex" style="position: relative;">
				<input type="text" name="ipsi-500" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
		</div>
		<div>
			<h2 class="center blue">Left</h2>
			<section id="l-reflex" style="position: relative;">
				<input type="text" name="ipsi-500" maxlength="4" placeholder="---" autocomplete="off" />
			</section>
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

const width = 70 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
const height = 25 // به دست آوردن پهنای اینپوت برای محاسبه مختصات نقطه مرکزش
let style = `
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  border: none;
`
insertInputs({ containerID: "r-reflex", side: 'R' }).focus()
insertInputs({ containerID: "l-reflex", side: 'L' })


function insertInputs({ containerID, side }) {
    const container = document.getElementById(containerID)
    const RReflex = new Reflex({ container, dims, side });
    let input = container.querySelector('[name=ipsi-500]')
    // این رو به عنوان خروجی میدیم تا بتونیم فوکوس رو بهش بدیم
    const firstInput = input // اولین اینپوت 

    let inputDims = RReflex.inputDims
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






