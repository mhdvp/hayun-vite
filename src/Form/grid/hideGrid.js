export default function hideGrid() {

  let gridLines = document.getElementsByClassName("gridLines");

  for (const line of gridLines) {
    line.style = "stroke: transparent; fill: transparent;"
  }

}