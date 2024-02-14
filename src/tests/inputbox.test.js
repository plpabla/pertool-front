const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Konva from 'konva';
import sinon from 'sinon';
import InputBox from '../InputBox';

export default function suite() {
    before(function() {
        this.layer = sinon.createStubInstance(Konva.Layer);
        this.layer.getStage = sinon.stub(function() {
            return {
                container: function() {
                    return {
                        getBoundingClientRect: function() {return [1,2,3,4];}
                    }
                }
            }
        });
    });

    beforeEach(function() {
        this.oneItem = [{
            label: "Enter a value",
            key: "val",
            default: "42"
        }];
    })

    it('can create simple input box and assign my callback function', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        expect(box.callbackFn).equal(callback);
    })

    it('when created, a form is built', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        expect(box.form).is.not.null;
    })

    it('form contains given label', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const label = childNodes.find(e=>e.nodeName === "LABEL");
        expect(label.innerHTML).equal(this.oneItem[0].label);
    })

    it('label for contains passed id', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const label = childNodes.find(e=>e.nodeName === "LABEL");
        expect(label.getAttribute('for')).equal(this.oneItem[0].key);
    })

    it('form contains input box with given default value', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const input = childNodes.find(e=>e.nodeName === "INPUT");
        expect(input.value).equal(this.oneItem[0].default);
    })

    it('input box has correct name', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const input = childNodes.find(e=>e.nodeName === "INPUT");
        expect(input.getAttribute('name')).equal(this.oneItem[0].key);
    })

    it('input box has correct id', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const input = childNodes.find(e=>e.nodeName === "INPUT");
        expect(input.getAttribute('id')).equal(this.oneItem[0].key);
    })
};