const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Toolbox from '../Toolbox';
import Konva from 'konva';

export default function suite() {
    beforeEach(function() {
        this.t = new Toolbox(new Konva.Layer());
    })

    it('can be drawn', function() {
        expect(() => {
            this.t.draw();
        }).to.not.throw();
    });

    it('uses Konva layer to be drawn at', function() {
        expect(this.t.layer).instanceOf(Konva.Layer);
    });
}