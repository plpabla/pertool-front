class State {
    constructor() {
        
    }

    onClick(args) {
        throw new Error('Not implemented');
    }

    static getName() {
        return "<<abstract>> State";
    }
}

export default State; 