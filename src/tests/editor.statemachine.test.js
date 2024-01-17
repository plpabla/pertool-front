const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Konva from 'konva';
import sinon from 'sinon';
import PointerState from '../states/Pointer';
import MilestoneState from '../states/Milestone';

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);

        this.e = new Editor(this.stage);
        this.e.toolbox.menuItems.forEach((item)=>{
            item.border.on('click', this.e.makeOnClicker());
        });
    });

    afterEach(function() {
    });


    it('starts with pointer state', function() {
        expect(this.e).to.have.property('state');
        expect(this.e.state).instanceOf(PointerState);
    });

    const states = [{from: PointerState, clickOn:"pointer", to: PointerState},
                    {from: PointerState, clickOn:"milestone", to: MilestoneState},
                    // {from: PointerState, clickOn:"link", to: LinkFirstElState},
                    // {from: PointerState, clickOn:"fake-link", to: LinkFirstElState},
                    {from: PointerState, clickOn: undefined, to: PointerState},
                    {from: MilestoneState, clickOn:"pointer", to: PointerState},
                    {from: MilestoneState, clickOn:"milestone", to: MilestoneState},
    ];

    states.forEach(function(testCase){
        it(`given in ${testCase.from.getName()} when clicked on ${testCase.clickOn} item, then ${testCase.to.getName()} is reached`, function() {
            const menu = this.e.toolbox.menuItems;
            const itemToClick = menu.find((item)=>item.name === testCase.clickOn);
            this.e.state = new testCase.from();

            if(testCase.clickOn) {
                itemToClick.border.fire('click');
            } else {
                // For undefined, trigger callback manually
                this.e.state = this.e.state.onClick({target: {attrs: {}}});
            }

    
            expect(this.e.state).instanceOf(testCase.to);
        });
    });
};