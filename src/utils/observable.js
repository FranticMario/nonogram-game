export default class Observable {
    constructor() {
        this.observers = [];
        this.state = null;
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }

    notify() {
        this.observers.forEach(observer => observer.update(this.state));
    }

    setState(newState) {
        this.state = newState;
        this.notify();  // Уведомляем всех наблюдателей, когда состояние изменяется
    }

    getState() {
        return this.state;
    }
}