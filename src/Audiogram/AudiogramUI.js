import Audiogram from "./Audiogram_box";

class AudiogramUI {
	constructor() {
		this.data = { R: '', L: '' }
	}

	draw({ containerId = '#app' } = {}) {

		document.querySelector(containerId).insertAdjacentHTML('beforeend', `
			<div class="center border">
				<section id="r-audiogram"></section>
				<section id="l-audiogram"></section>
			</div>
		`);



		this.rcontainer = document.getElementById('r-audiogram')
		this.rchart = new Audiogram({ box: { container: this.rcontainer, width: 600, height: 600 }, side: 'R' })


		this.lcontainer = document.getElementById('l-audiogram')
		this.lchart = new Audiogram({ box: { container: this.lcontainer, width: 600, height: 600 }, side: 'L' })

	}

	update({ data } = {}) {

		this.rchart.update({ data: data.R, side: 'R' })
		this.lchart.update({ data: data.L, side: 'L' })
	
	}
}

export default new AudiogramUI()

