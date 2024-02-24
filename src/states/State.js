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

    static containsName(str, name) {
        let parts = [];
        if (str) {
            parts = str.split(" ");
        } else {
            return false;
        }
        return parts.includes(name);
    }
}

export default State; 