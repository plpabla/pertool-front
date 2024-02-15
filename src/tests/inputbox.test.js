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

        this.twoItems = [{
            label: "Milestone ID",
            key: "id",
            default: "42"
        }, {
            label: "Milestone name",
            key: "name",
            default: ""
        }]
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

    it('input box has one OK button', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);

        const childNodes = Array.from(box.form.childNodes);
        const btn = childNodes.filter(e=>e.nodeName === "BUTTON");
        expect(btn.length).equal(1);
    })

    it('when OK button is pressed, callback function is called', function() {
        const callback = sinon.stub();
        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);
        const childNodes = Array.from(box.form.childNodes);
        const btn = childNodes.find(e=>e.nodeName === "BUTTON");

        btn.click();

        assert(callback.calledOnce);
    })

    it('callback for one item is called with correct data structure', function() {
        const callback = sinon.stub();
        const box = new InputBox(this.layer, [20, 30], this.oneItem, callback);
        const childNodes = Array.from(box.form.childNodes);
        const btn = childNodes.find(e=>e.nodeName === "BUTTON");
        const input = childNodes.find(e=>e.nodeName === "INPUT");

        input.value = "100";
        btn.click();

        const callArgs = callback.firstCall.args[0];
        expect(callArgs).eqls({val: "100"});
    })

    it('I can create InputBox with more than one field', function() {
        const callback = function() {};

        const box = new InputBox(this.layer, [20, 30], this.twoItems, callback);

        const childNodes = Array.from(box.form.childNodes);
        const labels = childNodes.filter(e=>e.nodeName === "LABEL");
        expect(labels.length).equal(2);
    })

    it('For more than one field, default values are returned correctly', function() {
        const callback = sinon.stub();
        const box = new InputBox(this.layer, [20, 30], this.twoItems, callback);
        const childNodes = Array.from(box.form.childNodes);
        const btn = childNodes.find(e=>e.nodeName === "BUTTON");

        btn.click();

        const callArgs = callback.firstCall.args[0];
        expect(callArgs).eqls({id: "42", name: ""});
    })

    it('For more than one field, I get an object with 2 fields', function() {
        const callback = sinon.stub();
        const box = new InputBox(this.layer, [20, 30], this.twoItems, callback);
        const childNodes = Array.from(box.form.childNodes);
        const btn = childNodes.find(e=>e.nodeName === "BUTTON");
        const inputFields = childNodes.filter(e=>e.nodeName === "INPUT");

        inputFields[0].value = "69";
        inputFields[1].value = "my description";
        btn.click();

        const callArgs = callback.firstCall.args[0];
        expect(callArgs).eqls({id: "69", name: "my description"});
    })
};