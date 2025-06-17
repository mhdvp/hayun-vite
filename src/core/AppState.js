// src/core/AppState.js
export class AppState {
  constructor() {
    this.state = {};
    this.listeners = new Map();
  }

  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(callback);
    
    // Return unsubscribe function
    return () => this.listeners.get(key)?.delete(callback);
  }

  setState(key, value) {
    this.state[key] = value;
    this.listeners.get(key)?.forEach(callback => callback(value));
  }

  getState(key) {
    return this.state[key];
  }

  // Batch update multiple state keys
  setStates(updates) {
    Object.entries(updates).forEach(([key, value]) => {
      this.setState(key, value);
    });
  }
}

// Create global state instance
export const appState = new AppState();