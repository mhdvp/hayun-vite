// import { initPWA } from './pwa.js'

// src/main.js - Your app's entry point
import { BaseComponent } from './core/BaseComponent.js';
import { AudiogramUI, ReflexUI, SpeechUI, TympanogramUI } from './components/index.js';


// Main App component that orchestrates all other components
class App extends BaseComponent {
  constructor(selector) {
    super(selector);
    this.components = {};
  }

  render() {
    // Main layout structure
    this.element.innerHTML = `
        <div id="audiograms"></div>
        <div id="speechs"></div>
        <div id="tympanograms"></div>
        <div id="reflexes"></div>
    `;
  }

  mount() {
    super.mount();
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Header component
    this.components.speechUI = this.createChild(SpeechUI, '#speechs', {});
    // this.components.reflexUI = this.createChild(ReflexUI, '#reflexes', {});
    // this.components.TympanogramUI = this.createChild(TympanogramUI, '#tympanograms', {});
    // this.components.audiogramUI = this.createChild(AudiogramUI, '#audiograms', {});
  }
}

// Initialize the app when DOM is loaded
const app = new App('#app');
// app.mount();
// console.log(app);


document.addEventListener('DOMContentLoaded', () => {

  app.mount();

  console.log(app.components);


  console.log('Audiolog app initialized successfully!');
});

// initPWA(app)
