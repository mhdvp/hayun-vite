import Audiogram from "./Audiogram";

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


		const dims = {
			"blank": false,
			"name": "RAudiogram",
			"w": 100,
			"h": 90,
			"margin": {
				"left": 1,
				"top": 1,
				"right": 1,
				"bottom": 1
			},
			"display": "inline",
			"borderBox": "display",
			"width": 600,
			"height": 600
		}
		this.rcontainer = document.getElementById('r-audiogram')
		this.rchart = new Audiogram({ container: this.rcontainer, side: 'R', dims })


		this.lcontainer = document.getElementById('l-audiogram')
		this.lchart = new Audiogram({ container: this.lcontainer, side: 'L', dims })

	}

	update({ data } = {}) {

		this.rchart.update({ data: data.R, side: 'R' })
		this.lchart.update({ data: data.L, side: 'L' })
		// if (data) {
		// 	this.rchart.update(data.R, this.rcontainer)
		// 	this.lchart.update(data.L, this.lcontainer)
		// 	this.data = { R: data.R, L: data.L }
		// } else
		// // اگر این تابع بدون پارامتر فراخوانی شود مقادیر اینپوت کاربر گرفته و دیتاآبجکت را آپدیت کند
		// {
		// 	console.log('without param');

		// 	this.rchart.fetchInputUserData()
		// 	this.lchart.fetchInputUserData()
		// 	this.data.R = this.rchart.data
		// 	this.data.L = this.lchart.data
		// }

	}
}

export default new AudiogramUI()

