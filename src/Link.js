class Link {
    constructor(m1, m2) {
        this.m1 = m1;
        this.m2 = m2;
        this.m1.addLinkTo(this);
        this.m2.addLinkFrom(this);
    }
}

export default Link;