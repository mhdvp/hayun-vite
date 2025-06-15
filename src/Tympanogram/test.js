import Tympanogram from "./Tympanogram";


document.querySelector('#app').innerHTML = `
    <div id="tympanogram"></div>
    <p>Curve settings:</p>
    <div>
      <input type="range" id="cp" name="cp" min="10" max="150" value="70" step="5" />
      <label for="cp">cp</label>
      <input type="range" id="cpp" name="cpp" min="1" max="10" value="5" step="1" />
      <label for="cpp">cpp</label>
      <div>
        <input type="checkbox" name="extra-sc" id="extra-sc">
        <label for="extra-sc">Extra SC</label>
      </div>
      <div>
        <input type="checkbox" name="compensated" id="compensated">
        <label for="compensated">Compensated</label>
      </div>
    </div>
`

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
    "width": 100 * 12,
    "height": 60 * 12,
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

document.querySelector("#compensated").addEventListener("input", e => {
    compensated = e.target.checked
    console.log(e.target.checked);
    dims = { ...dims, compensated }
    RTympanogram.draw({ dims })

})

document.querySelector("#extra-sc").addEventListener("input", e => {
    extraCompliance = e.target.checked
    console.log(e.target.checked);
    dims = { ...dims, extraCompliance }
    RTympanogram.draw({ dims })

})

document.querySelector("#cp")
    .addEventListener("input", e => {
        cp = e.target.value
        console.log(cp);
        data = { ...data, cp }

        RTympanogram.update(data)
    })


document.querySelector("#cpp")
    .addEventListener("input", e => {
        cpp = e.target.value
        console.log(cpp);
        data = { ...data, cpp }

        RTympanogram.update(data)
    })

const container = document.getElementById('tympanogram')

const RTympanogram = new Tympanogram({ container, dims, side: 'R' })
RTympanogram.update(data)

