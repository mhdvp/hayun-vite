// src/core/BaseComponent.js
import { appState } from './AppState.js';

export class BaseComponent {
  constructor(selector, props = {}) {
    this.element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    this.props = props;
    this.subscriptions = [];
    this.children = new Map();
    this.mounted = false;
  }

  render() {
    // Override in child classes
    console.warn(`${this.constructor.name}: render() method not implemented`);
  }

  mount() {
    if (this.mounted) return;
    
    this.render();
    this.bindEvents();
    this.mounted = true;
  }

  unmount() {
    if (!this.mounted) return;
    
    // Unmount all child components first
    this.children.forEach(child => child.unmount());
    this.children.clear();
    
    // Clean up subscriptions
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
    
    // Clear element content
    if (this.element) {
      this.element.innerHTML = '';
    }
    
    this.mounted = false;
  }

  bindEvents() {
    // Override in child classes for event binding
  }

  subscribe(stateKey, callback) {
    const unsub = appState.subscribe(stateKey, callback);
    this.subscriptions.push(unsub);
    return unsub;
  }

  // Helper method to create and manage child components
  createChild(ComponentClass, selector, props = {}, key = null) {
    const childKey = key || `${ComponentClass.name}_${Date.now()}_${Math.random()}`;
    
    // Remove existing child if updating
    if (this.children.has(childKey)) {
      this.children.get(childKey).unmount();
    }
    
    const element = typeof selector === 'string' ? 
      this.element.querySelector(selector) : selector;
    
    if (!element) {
      console.error(`Element not found for selector: ${selector}`);
      return null;
    }
    
    const child = new ComponentClass(element, props);
    this.children.set(childKey, child);
    child.mount();
    
    return child;
  }

  updateChild(key, newProps) {
    const child = this.children.get(key);
    if (child) {
      child.props = { ...child.props, ...newProps };
      child.render();
    }
  }

  removeChild(key) {
    const child = this.children.get(key);
    if (child) {
      child.unmount();
      this.children.delete(key);
    }
  }
}
