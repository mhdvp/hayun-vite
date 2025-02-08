// تابع قرار دادن سمبل انتخاب شده در نقطه مورد نظر
export default function insertSymbol({ container, symbolNode, x, y, w, h, freq, intens }) {
  symbolNode.setAttribute("x", x - w / 2);
  symbolNode.setAttribute("y", y - h / 2);
  symbolNode.setAttribute("width", w);
  symbolNode.setAttribute("height", h);
  symbolNode.setAttribute("data-freq", freq);
  symbolNode.setAttribute("data-intens", intens);
  container.appendChild(symbolNode);
}
