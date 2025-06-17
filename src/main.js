// import { initPWA } from './pwa.js'

// src/main.js - Your app's entry point
import { BaseComponent } from './core/BaseComponent.js';
import { SpeechUI } from './components/index.js';

// Main App component that orchestrates all other components
class App extends BaseComponent {
  constructor(selector) {
    super(selector);
    this.components = {};
  }

  render() {
    // Main layout structure
    this.element.innerHTML = `
        <div id="speechs"></div>
    `;
  }

  mount() {
    super.mount();
    this.initializeComponents();
  }

  initializeComponents() {
    // Initialize Header component
    this.components.speechUI = this.createChild(SpeechUI, '#speechs', {
    });
  }
}

// Initialize the app when DOM is loaded
const app = new App('#app');
// app.mount();
// console.log(app);


document.addEventListener('DOMContentLoaded', () => {

  app.mount();
  
  console.log(app.components.speechUI.element);


  console.log('Audiolog app initialized successfully!');
});

// initPWA(app)
