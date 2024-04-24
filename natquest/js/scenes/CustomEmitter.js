let instance = null;

export default class CustomEmitter extends Phaser.Events.EventEmitter {
    constructor() {
        super();
        if (!instance) {
            instance = this;
            this.events = {};
        }
        return instance;
    }

    // Method to subscribe to events
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    // Method to emit events
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => {
                listener(...args);
            });
        }
    }
}
