class State {
    constructor(context) {
        if(context === undefined)
        {
            throw new Error("Creating state without passing context!");
        }
        this.context = context;
    }

    onClick(args) {
        throw new Error('Not implemented');
    }

    static getName() {
        return "<<abstract>> State";
    }
}

export default State; 