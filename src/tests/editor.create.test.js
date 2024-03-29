const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Toolbox from '../Toolbox';
import Model from '../Model';
import Konva from 'konva';
import sinon from 'sinon';

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.e = new Editor(this.stage);
    });

    it('has Toolbox object', function() {
        expect(this.e).to.have.property('toolbox');
        expect(this.e.toolbox).instanceOf(Toolbox);
    });

    it('has mode object', function() {
        expect(this.e).to.have.property('model');
        expect(this.e.model).instanceOf(Model);
    });

    it('has render() method', function() {
        expect(this.e).to.have.property('render');
    });
};