const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

export default function suite() {
    it('can be drawn', function() {
        expect(() => {
            Toolbox.draw();
        }).to.not.throw();
    });
}