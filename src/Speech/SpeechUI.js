import { BaseComponent } from "../core/BaseComponent.js";
import { ui } from "./ui.js";

export class SpeechUI extends BaseComponent {
  constructor(selector, props = {}) {
    super(selector, props);
  }

  render() {
    ui()
  }

  bindEvents() {

  }
}
