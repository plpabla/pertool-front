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
}

export default GraphicalElement; 