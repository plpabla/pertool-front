const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Konva from 'konva';
import sinon from 'sinon';
import PointerState from '../states/PointerState';
import MilestoneState from '../states/MilestoneState';
import LinkFirstElState from '../states/LinkFirstElState';
import LinkSecondElState from '../states/LinkSecondElState';
import GetMilestoneNameState from '../states/GetMilestoneNameState';
import GetTaskLengthState from '../states/GetTaskLengthState';
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

    function createClickedObject(objName, clickedObjectInstance) 
    {
        let objInstance = clickedObjectInstance;
        if (objInstance === undefined) {
            objInstance = {
                getName: function() {return "test"; },
                img: {
                    attrs: {
                        x: 0,
                        y: 0
                    }
                }
            }
        }

        return {
            target: {
                parent: {
                    attrs: {
                        objInstance: objInstance
                    }
                }, 
                attrs: {
                    name: objName
                }}
            }
    };

    it('starts with pointer state', function() {
        expect(this.e).to.have.property('state');
        expect(this.e.state).instanceOf(PointerState);
    });

    const states = [{from: PointerState, clickOn:"pointer", to: PointerState},
                    {from: PointerState, clickOn:"milestone", to: MilestoneState},
                    {from: PointerState, clickOn:"link", to: LinkFirstElState},
                    {from: PointerState, clickOn: undefined, to: PointerState},

                    {from: MilestoneState, clickOn:"pointer", to: PointerState},
                    {from: MilestoneState, clickOn:"milestone", to: MilestoneState},
                    {from: MilestoneState, clickOn:"link", to: LinkFirstElState},
                    {from: MilestoneState, clickOn: undefined, to: GetMilestoneNameState},

                    {from: LinkFirstElState, clickOn:"pointer", to: PointerState},
                    {from: LinkFirstElState, clickOn:"milestone", to: MilestoneState},
                    {from: LinkFirstElState, clickOn:"link", to: LinkFirstElState},
                    {from: LinkFirstElState, clickOn: undefined, to: LinkFirstElState},
                    {from: LinkFirstElState, clickOn: "milestone-element", to: LinkSecondElState},

                    {from: LinkSecondElState, clickOn:"pointer", to: PointerState},
                    {from: LinkSecondElState, clickOn:"milestone", to: MilestoneState},
                    {from: LinkSecondElState, clickOn:"link", to: LinkFirstElState},
                    {from: LinkSecondElState, clickOn: undefined, to: LinkSecondElState},
                    {from: LinkSecondElState, clickOn: "milestone-element", to: GetTaskLengthState},
    ];

    states.forEach(function(testCase){
        it(`given in ${testCase.from.getName()} when clicked on ${testCase.clickOn} item, then ${testCase.to.getName()} is reached`, function() {
            const menu = this.e.toolbox.menuItems;
            this.e.state = new testCase.from(this.e, new Milestone(10,10,"test"));

            this.e.state = this.e.state.onClick(createClickedObject(testCase.clickOn, new Milestone(20,20,"other")));

            expect(this.e.state).instanceOf(testCase.to);
        });
    });

    describe('in Milestone state', function() {
        it('When clicked on the canvas, input box object is created', function() {
            this.e.state = new MilestoneState(this.e);
        
            this.e.state.onClick(createClickedObject(undefined));

            expect(this.InputBoxStub.called).to.be.true;
        });

        it('When clicked on the canvas and passed a string, a milestone state is reached', function() {
            this.e.state = new MilestoneState(this.e);
        
            this.e.state.onClick(createClickedObject(undefined));

            expect(this.e.state).instanceOf(MilestoneState);
        });

        it('When clicked on the canvas and passed an empty string, a pointer state is reached', function() {
            this.e.state = new MilestoneState(this.e);
            this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                callbackFn("");
            });
        
            this.e.state.onClick(createClickedObject(undefined));

            expect(this.e.state).instanceOf(PointerState);
        });

        it('When clicked on the canvas and passed an empty string, a pointer state is reached so the border is around that component', function() {
            this.e.state = new MilestoneState(this.e);
            const pointer = this.e.toolbox.menuItems.find((item)=>item.name === "pointer");
        
            this.e.state.onClick(createClickedObject(undefined));

            expect(pointer.border.strokeEnabled()).to.be.true;
        });

        it('When clicked on the canvas and passed a string, a milestone is added', function() {
            this.e.state = new MilestoneState(this.e);

            this.e.state.onClick(createClickedObject(undefined));

            expect(this.e.model.milestones).length(2);
        });
    });

    describe('in LinkSecondElState', function() {
        it('When clicked on the same milestone, we remain in the same state', function() {
            const milestone = new Milestone(10,10,"test");
            this.e.state = new LinkSecondElState(this.e, milestone);

            this.e.state.onClick(createClickedObject("milestone-element", milestone));

            expect(this.e.state).instanceOf(LinkSecondElState);
        });


        it('When clicked on a different milestone, input box object is created', function() {
            // Note - it can be complex form in the future
            const milestone = new Milestone(10,10,"test");
            const anotherMilestone = new Milestone(10, 10, "test as well");
            this.e.state = new LinkSecondElState(this.e, milestone);

            this.e.state.onClick(createClickedObject("milestone-element", anotherMilestone));

            expect(this.InputBoxStub.called).to.be.true;
        });

        const cases = [
            {descr: "numeric value", value: 42, createdLink: true, nextState: LinkFirstElState},
            {descr: "zero", value: 0, createdLink: true, nextState: LinkFirstElState},
            {descr: "empty field", value: "", createdLink: false, nextState: LinkFirstElState},
            {descr: "non-numeric value", value: "kopytko", createdLink: false, nextState: LinkFirstElState}
        ];

        cases.forEach(function(testCase) {
            it(`when passed ${testCase.descr}, link is ${testCase.createdLink ? "":"not "}created`, function() {
                const m1 = new Milestone(10, 20, "0");
                const m2 = new Milestone(10, 20, "1");
                this.e.model.milestones.push(m1);
                this.e.model.milestones.push(m2);
                const fakeArrow = sinon.fake();
                fakeArrow.destroy = sinon.fake();
                this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                    callbackFn(testCase.value);
                });

                const state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

                expect(this.e.model.links.length).equals(testCase.createdLink ? 1 : 0);
            });
    
            it(`when passed ${testCase.descr}, we move to ${testCase.nextState.getName()} state`, function() {
                const m1 = new Milestone(10, 20, "0");
                const m2 = new Milestone(10, 20, "1");
                this.e.model.milestones.push(m1);
                this.e.model.milestones.push(m2);
                const fakeArrow = sinon.fake();
                fakeArrow.destroy = sinon.fake();
                this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                    callbackFn(testCase.value);
                })

                const state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

                expect(this.e.state).instanceOf(testCase.nextState);
            })
        })
    })

    describe('in GetTaskLengthState', function() {
        it('link is created between given milestones', function() {
            const m1 = new Milestone(10, 20, "m1");
            const m2 = new Milestone(10, 20, "m2");
            this.e.model.milestones.push(m1);
            this.e.model.milestones.push(m2);
            const m1loc = this.e.model.findMilestoneIDByName("m1");
            const m2loc = this.e.model.findMilestoneIDByName("m2");
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                callbackFn("5");
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            expect(createdLink.sourceId).equals(m1loc);
            expect(createdLink.destId).equals(m2loc);
        })

        it('Link position corresponds to milestone location', function() {
            const m1 = new Milestone(10, 20, "m1");
            const m2 = new Milestone(50, 60, "m2");
            this.e.model.milestones.push(m1);
            this.e.model.milestones.push(m2);
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                callbackFn("5");
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            // TODO: Later I will include shifting so it will touch the border
            expect(createdLink.points).to.eqls([10,20,50,60]);
        })

        it('Link is created with given length, this length is stored', function() {
            const m1 = new Milestone(10, 20, "m1");
            const m2 = new Milestone(10, 20, "m2");
            this.e.model.milestones.push(m1);
            this.e.model.milestones.push(m2);
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, prompt, pos, callbackFn) {
                callbackFn("5");
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            expect(createdLink.taskLength).equals(5);
        })
    })
}
