const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Konva from 'konva';
import sinon from 'sinon';
import PointerState from '../states/Pointer';
import MilestoneState from '../states/Milestone';
import LinkFirstElState from '../states/LinkFirstEl';
import LinkSecondElState from '../states/LinkSecondEl';
import GetMilestoneNameState from '../states/GetMilestoneName';
import InputBox from '../InputBox';
import Milestone from '../Milestone';

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.stage.getPointerPosition = sinon.stub(function() {return {x: 0, y: 0};});
        this.stage.getRelativePointerPosition = sinon.stub(function() {return {x: 0, y: 0};});

        this.e = new Editor(this.stage);
        this.e.toolbox.menuItems.forEach((item)=>{
            item.border.on('click', this.e.makeOnClicker());
        });

        this.InputBoxStub = sinon.stub(InputBox.prototype, 'init');
        this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
            callbackFn("name entered in the input box");
        });
    });

    afterEach(function() {
        this.InputBoxStub.restore();
    });


    it('starts with pointer state', function() {
        expect(this.e).to.have.property('state');
        expect(this.e.state).instanceOf(PointerState);
    });

    const states = [{from: PointerState, clickOn:"pointer", to: PointerState},
                    {from: PointerState, clickOn:"milestone", to: MilestoneState},
                    {from: PointerState, clickOn:"link", to: LinkFirstElState},
                    {from: PointerState, clickOn:"fake-link", to: LinkFirstElState},
                    {from: PointerState, clickOn: undefined, to: PointerState},

                    {from: MilestoneState, clickOn:"pointer", to: PointerState},
                    {from: MilestoneState, clickOn:"milestone", to: MilestoneState},
                    {from: MilestoneState, clickOn:"link", to: LinkFirstElState},
                    {from: MilestoneState, clickOn:"fake-link", to: LinkFirstElState},
                    {from: MilestoneState, clickOn: undefined, to: GetMilestoneNameState},

                    {from: LinkFirstElState, clickOn:"pointer", to: PointerState},
                    {from: LinkFirstElState, clickOn:"milestone", to: MilestoneState},
                    {from: LinkFirstElState, clickOn:"link", to: LinkFirstElState},
                    {from: LinkFirstElState, clickOn:"fake-link", to: LinkFirstElState},
                    {from: LinkFirstElState, clickOn: undefined, to: LinkFirstElState},
                    {from: LinkFirstElState, clickOn: "milestone-element", to: LinkSecondElState},

                    {from: LinkSecondElState, clickOn:"pointer", to: PointerState},
                    {from: LinkSecondElState, clickOn:"milestone", to: MilestoneState},
                    {from: LinkSecondElState, clickOn:"link", to: LinkFirstElState},
                    {from: LinkSecondElState, clickOn: undefined, to: LinkSecondElState},
                    // {from: LinkSecondElState, clickOn: "milestone-element", to: GetTaskLengthState},
    ];

    states.forEach(function(testCase){
        it(`given in ${testCase.from.getName()} when clicked on ${testCase.clickOn} item, then ${testCase.to.getName()} is reached`, function() {
            const menu = this.e.toolbox.menuItems;
            this.e.state = new testCase.from(this.e, new Milestone(10,10,"test"));

            this.e.state = this.e.state.onClick({
                target: {
                    parent: {
                        attrs: {
                            objInstance: {
                                getName: function() {return "test"; },
                                img: {
                                    attrs: {
                                        x: 0,
                                        y: 0
                                    }
                                }
                            }
                        }
                    }, 
                    attrs: {
                        name: testCase.clickOn
                    }}
                });

            expect(this.e.state).instanceOf(testCase.to);
        });
    });

    it('When clicked on the canvas while in Milestone state, input box object is created', function() {
        this.e.state = new MilestoneState(this.e);
       
        this.e.state.onClick({target: {attrs: {}}});

        expect(this.InputBoxStub.called).to.be.true;
    });

    it('When clicked on the canvas while in Milestone state and passed a string, a milestone state is reached', function() {
        this.e.state = new MilestoneState(this.e);
       
        this.e.state.onClick({target: {attrs: {}}});

        expect(this.e.state).instanceOf(MilestoneState);
    });

    it('When clicked on the canvas while in Milestone state and passed an empty string, a pointer state is reached', function() {
        this.e.state = new MilestoneState(this.e);
        this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
            callbackFn("");
        });
       
        this.e.state.onClick({target: {attrs: {}}});

        expect(this.e.state).instanceOf(PointerState);
    });

    it('When clicked on the canvas while in Milestone state and passed an empty string, a pointer state is reached so the border is around that component', function() {
        this.e.state = new MilestoneState(this.e);
        const pointer = this.e.toolbox.menuItems.find((item)=>item.name === "pointer");
       
        this.e.state.onClick({target: {attrs: {}}});

        expect(pointer.border.strokeEnabled()).to.be.true;
    });

    it('When clicked on the canvas while in Milestone state and passed a string, a milestone is added', function() {
        this.e.state = new MilestoneState(this.e);

        this.e.state.onClick({target: {attrs: {}}});

        expect(this.e.model.milestones).length(2);
    });

    it('When clicked on the same milestone in LinkSecondElState, we remain in the same state', function() {
        this.skip();
        const milestone = new Milestone(10,10,"test");
        this.e.state = new LinkSecondElState(this.e, milestone);

        this.e.state = this.e.state.onClick({
            target: {
                parent: {
                    attrs: {
                        objInstance: {
                            getName: function() {return "test"; },
                            img: {
                                attrs: {
                                    x: 0,
                                    y: 0
                                }
                            }
                        }
                    }
                }, 
                attrs: {
                    name: "milestone"
                }}
            });

        expect(this.e.state).instanceOf(LinkSecondElState);
    });
};