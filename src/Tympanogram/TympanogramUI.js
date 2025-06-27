import Tympanogram from "./Tympanogram";

class TympanogramUI {
	constructor() {
		this.data = { R: '', L: '' }
	}

	draw({ containerId = '#app' } = {}) {

		document.querySelector(containerId).insertAdjacentHTML('beforeend', `
			<div name="tympanograms">
				<h1 class="center title">Tympanograms</h1>
				<div class="center">
					<div>
						<h2 class="center side red">Right</h2>
						<section id="r-tympanogram"></section>
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
						<h2 class="center side blue">Left</h2>
						<section id="l-tympanogram"></section>
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

		this.dims = {
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

		// let data = {
		// 	type: "An",
		// 	ECV: '1.30',
		// 	SC: '0.80',
		// 	MEP: '-130',
		// 	G: 0.2,
		// 	expanded: false, // by default is false for expand pressure from -600 to +400

		// }
		const dims = this.dims
		

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
		this.rcontainer = document.getElementById('r-tympanogram')
		this.rchart = new Tympanogram({ container: this.rcontainer, dims, side: 'R' })
		// فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
		this.rchart.createUserInput({ container: this.rcontainer })


		this.lcontainer = document.getElementById('l-tympanogram')
		this.lchart = new Tympanogram({ container: this.lcontainer, dims, side: 'L' })
		// فراخوانی متد ایجاد اینپوت روی چارت اسپیچ
		this.lchart.createUserInput({ container: this.lcontainer })

		// cereateEvents(this.lcontainer, this.lchart, 'l-tympanogram')




	}

	update({ data } = {}) {
		if (data) {
			this.rchart.update(data.R, this.rcontainer)
			this.lchart.update(data.L, this.lcontainer)
			this.data = { R: data.R, L: data.L }
			// در اولین دیتادهی رویدادها ایجاد شود
			this.cereateEvents(this.rcontainer, this.rchart, 'r-tympanogram', data.R)
			this.cereateEvents(this.lcontainer, this.lchart, 'l-tympanogram', data.L)

		} else
		// اگر این تابع بدون پارامتر فراخوانی شود مقادیر اینپوت کاربر گرفته و دیتاآبجکت را آپدیت کند
		{
			console.log('without param');

			this.rchart.fetchInputUserData()
			this.lchart.fetchInputUserData()
			this.data.R = this.rchart.data
			this.data.L = this.lchart.data
			console.log(this.data.L);

		}
	}

	cereateEvents(container, tympanogram, containerId, data) {
		// کنترلرهای منحنی
		let cp = 70, cpp = 5, extraCompliance, compensated, dims
		
		container = document.querySelector(`[name=${containerId}]`)
		container.querySelector("[name=compensated]").addEventListener("input", e => {
			compensated = e.target.checked
			console.log(e.target.checked);
			dims = { ...this.dims, compensated }
			tympanogram.draw({ dims })
		})

		container.querySelector("[name=extra-sc]").addEventListener("input", e => {
			extraCompliance = e.target.checked
			console.log(e.target.checked);
			dims = { ...this.dims, extraCompliance }
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
	}

}

export default new TympanogramUI()













