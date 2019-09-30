class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error();
        this.config = config;
        this.state = config.initial;
        this.stateStack = [];
        this.redoStack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state, saveStack) {
        if (Object.keys(this.config.states).includes(state)) {
            this.redoStack = saveStack ? this.redoStack : [];
            this.stateStack.push(this.state);
            this.state = state;

        } else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (Object.keys(this.config.states[this.state].transitions).includes(event)) this.changeState(this.config.states[this.state].transitions[event]);
        else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.config.states);
        }

        return Object.keys(this.config.states).filter(state => Object.keys(this.config.states[state].transitions).includes(event));
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateStack.length) {
            this.changeState(this.stateStack.pop(), true);
            this.redoStack.push(this.stateStack.pop());
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoStack.length) {
            this.changeState(this.redoStack.pop(), true);
            return true;
        } else return false;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.redoStack = [];
        this.stateStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/