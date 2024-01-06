class GraphicalElement {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    draw() {
        throw new Error('Not implemented');
    }

    getPos() {
        return [this.x, this.y];
    }

    setPos(pos) {
        this.x = pos[0];
        this.y = pos[1];
    }
}

export default GraphicalElement; 