class GraphicalElement {
    constructor() {
        this.img = null;
    }

    getImg() {
        return this.img;
    }

    createImg(args) {
        throw new Error('Not implemented');
    }

    static serialize(obj) {
        throw new Error('Not implemented');
    }

    static deserialize(str) {
        throw new Error('Not implemented');
    }
}

export default GraphicalElement; 