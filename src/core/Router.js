// src/core/Router.js
import { BaseComponent } from './BaseComponent.js';

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.appContainer = null;
  }

  setContainer(selector) {
    this.appContainer = document.querySelector(selector);
    return this;
  }

  addRoute(path, componentClass) {
    this.routes.set(path, componentClass);
    return this;
  }

  navigate(path, state = {}) {
    if (window.location.pathname === path) return;
    
    history.pushState(state, null, path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const ComponentClass = this.routes.get(path);
    
    // Unmount current route
    if (this.currentRoute) {
      this.currentRoute.unmount();
      this.currentRoute = null;
    }
    
    // Mount new route
    if (ComponentClass && this.appContainer) {
      this.currentRoute = new ComponentClass(this.appContainer);
      this.currentRoute.mount();
    } else {
      // Handle 404 or default route
      this.handle404();
    }
  }

  handle404() {
    if (this.appContainer) {
      this.appContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-4xl font-bold text-gray-600 mb-4">404</h1>
          <p class="text-gray-500 mb-4">Page not found</p>
          <button onclick="history.back()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go Back
          </button>
        </div>
      `;
    }
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
    
    return this;
  }
}

// Create global router instance
export const router = new Router();