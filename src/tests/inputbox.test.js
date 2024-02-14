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
        })
    })

    it('can create simple input box and assign my callback function', function() {
        const callback = function() {};
        const oneItem = [{
            label: "Enter a value",
            key: "val",
            default: "42"
        }];

        const box = new InputBox(this.layer, [20, 30], oneItem, callback);

        expect(box.callbackFn).equal(callback);
    })

};