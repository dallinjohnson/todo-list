class PubSub {
  constructor() {
    this.events = {}; // Stores event subscribers
  }

  // Subscribe to an event
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []; // Initialize event if not already present
    }
    this.events[eventName].push(callback); // Add the callback to the event's subscriber list
  }

  // Unsubscribe from an event
  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== callback
    );
  }

  // Publish an event
  publish(eventName, data) {
    if (!this.events[eventName]) return; // Do nothing if no one is subscribed to the event

    this.events[eventName].forEach((callback) => {
      callback(data); // Call each subscriber with the data
    });
  }
}

// Create an instance of the PubSub manager
const pubsub = new PubSub();

export default pubsub;
