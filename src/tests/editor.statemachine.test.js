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
import EditMilestoneState from '../states/EditMilestoneState';
import EditLinkState from '../states/EditLinkState';
import InputBox from '../InputBox';
import Milestone from '../Milestone';
import Link from '../Link';
import * as $ from 'jquery';

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
        this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
            callbackFn({
                name: "name entered in the input box",
                taskLen: "10"
            });
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

    function createMilestone(editor, x, y, name, description) {
        editor.addMilestone(x,y,name,description);
        return editor.model.getMilestoneByName(name);
    }

    function createLink(editor, m1, m2, taskLen) {
        const id = editor.model.addLink(m1, m2, taskLen);
        return editor.model.getLinkWithId(id);
    }

    it('starts with pointer state', function() {
        expect(this.e).to.have.property('state');
        expect(this.e.state).instanceOf(PointerState);
    });

    const states = [{from: PointerState, clickOn:"pointer", to: PointerState},
                    {from: PointerState, clickOn:"milestone", to: MilestoneState},
                    {from: PointerState, clickOn:"link", to: LinkFirstElState},
                    {from: PointerState, clickOn: undefined, to: PointerState},
                    {from: PointerState, clickOn: "milestone-element", to: PointerState},
                    {from: PointerState, clickOn: "link-element", to: PointerState},

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
            const m1 = createMilestone(this.e, 10, 20, "test");
            const m2 = createMilestone(this.e, 30, 40, "test2");
            
            this.e.state = new testCase.from(this.e, m1);

            this.e.state = this.e.state.onClick(createClickedObject(testCase.clickOn, m2));

            expect(this.e.state).instanceOf(testCase.to);
        });
    });


    describe('in Pointer state', function() {
        it('when state is created, focus is pointing to null element', function() {

            this.e.state = new PointerState(this.e);

            expect(this.e.state.getFocusedEl()).equal(null);
        })

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        it('when state is created, keypress listener is assgined to it', function() {
            this.skip("To do - I have no energy to do it now ;(");
            this.e.state = new PointerState(this.e);
            // const CODE_ESC=27;
            // const CODE_DEL=127;
            const onKeyPressSpy = sinon.spy(this.e.state, "onKeyPress");
            const e = $.Event( 'keydown', { which: $.ui.keyCode.ESCAPE } );

            $('document').trigger(e);

            expect(onKeyPressSpy.callCount).to.equal(1);
            onKeyPressSpy.restore();
        })

        it('given no compoment is focused, when I press esc, focus remains unset', function() {
            this.e.state = new PointerState(this.e);

            this.e.state.onKeyPress({key:"Escape"});

            expect(this.e.state.getFocusedEl()).is.null;
        })

        it('given any component is focused, when I press esc, focus is removed', function() {
            const m = createMilestone(this.e, 10, 20, "test");
            this.e.state = new PointerState(this.e);
            this.e.state._switchFocus(m);

            this.e.state.onKeyPress({key:"Escape"});

            expect(this.e.state.getFocusedEl()).is.null;
        })

        it('given any component focused, when I press del, focus is removed', function() {
            const m = createMilestone(this.e, 10, 20, "test");
            this.e.state = new PointerState(this.e);
            this.e.state._switchFocus(m);

            this.e.state.onKeyPress({key:"Delete"});

            expect(this.e.state.getFocusedEl()).is.null;
        })

        it('given link focused, when I press del, link is removed from a model', function() {
            const l = createLink(
                this.e,
                createMilestone(this.e, 10, 10, "m1"),
                createMilestone(this.e, 20, 20, "m2"),
                15);
            this.e.state = new PointerState(this.e);
            this.e.state._switchFocus(l);

            this.e.state.onKeyPress({key:"Delete"});

            expect(this.e.model.links).not.contains(l);
        })

        it('given milestone focused, when I press del, milestone is removed from a model', function() {
            const m1 = createMilestone(this.e, 10, 10, "m1");
            this.e.state = new PointerState(this.e);
            this.e.state._switchFocus(m1);

            this.e.state.onKeyPress({key:"Delete"});

            expect(this.e.model.milestones).not.contains(m1);
        })

        it('when I click on milestone-element, focused element points to corresponding milestone', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");

            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));

            expect(this.e.state.getFocusedEl()).equal(m);
        })

        it('when I click on link-element, focused element points to corresponding milestone', function() {
            this.e.state = new PointerState(this.e);
            const l = new Link(1,2,0,[1,2,3,4]);

            this.e.state = this.e.state.onClick(createClickedObject("link-element", l));

            expect(this.e.state.getFocusedEl()).equal(l);
        })

        it('when I click on milestone-element, PointerState._switchFocus() is called', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");
            const switchFocusSpy = sinon.spy(this.e.state, "_switchFocus");

            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));

            expect(switchFocusSpy.callCount).to.equal(1);
            switchFocusSpy.restore();
        })

        it('when I click on milestone-element, Milestone.focus(true) is called', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");
            const focusSpy = sinon.spy(m, "focus");

            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));

            expect(focusSpy.getCall(0).args[0]).equal(true);
            focusSpy.restore();
        })

        it('when I click on link-element, Link.focus(true) is called', function() {
            this.e.state = new PointerState(this.e);
            const l = new Link(1,2,0,[1,2,3,4]);
            const focusSpy = sinon.spy(l, "focus");

            this.e.state = this.e.state.onClick(createClickedObject("link-element", l));

            expect(focusSpy.getCall(0).args[0]).equal(true);
            focusSpy.restore();
        })

        it('when I click on second milestone-element, focus(false) for first and focus(true) for second is called to switch focus', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");
            const m2 = createMilestone(this.e, 10, 20, "another one");
            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));
            const focusSpy = sinon.spy(m, "focus");
            const focusSpy2 = sinon.spy(m2, "focus");

            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m2));

            expect(focusSpy.getCall(0).args[0]).equal(false);
            expect(focusSpy2.getCall(0).args[0]).equal(true);
            focusSpy.restore();
        })

        it('when I click on the same milestone-element, Milestone.focus(false) and then (true) is not called, focus remains', function() {
            this.skip("It doesn't work as I'm using lambda fn and it is executed for a test");
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");
            const obj = createClickedObject("milestone-element", m);
            this.e.state = this.e.state.onClick(obj);
            const focusSpy = sinon.spy(m, "focus");

            this.e.state = this.e.state.onClick(obj);

            expect(focusSpy.callCount).equal(0);
            focusSpy.restore();
        })

        it('when I click on milestone-element, and then on undefined, focus from milestone is removed', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");
            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));
            const focusSpy = sinon.spy(m, "focus");

            this.e.state = this.e.state.onClick(createClickedObject(undefined));

            expect(focusSpy.getCall(0).args[0]).equal(false);
            focusSpy.restore();
        })

        it('when I click on the same milestone twice, EditMilestone state is achieved', function() {
            this.e.state = new PointerState(this.e);
            const m = createMilestone(this.e, 10, 20, "test");

            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));
            this.e.state = this.e.state.onClick(createClickedObject("milestone-element", m));

            expect(this.e.state).instanceOf(EditMilestoneState);
        })

        it('when I click on the same link twice, EditLink state is achieved', function() {
            this.e.state = new PointerState(this.e);
            const link = createLink(
                this.e,
                createMilestone(this.e, 10, 20, "test"), 
                createMilestone(this.e, 10, 20, "test"),
                5);

            this.e.state = this.e.state.onClick(createClickedObject("link-element", link));
            this.e.state = this.e.state.onClick(createClickedObject("link-element", link));

            expect(this.e.state).instanceOf(EditLinkState);
        })
    })

    describe('in EditMilestone state', function() {
        it('when I get into that state, input box contains data which was stored in clicked milestone', function () {
            const m = createMilestone(this.e, 10, 20, "m0", "description");
            let items;
            this.InputBoxStub.callsFake(function(layer, pos, _items, callbackFn) {
                items = _items;
            });

            this.e.state = new EditMilestoneState(this.e, m);

            const nameEl = items.find(i => i['key'] === 'name');
            const valEl = items.find(i => i['key'] === 'text');
            expect(nameEl['default']).equals("m0");
            expect(valEl['default']).equals("description");
        })

        it('when I edit milestone name, it is changed in milestone', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "description");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });

            this.e.state = new EditMilestoneState(this.e, m);

            expect(m.getName()).equals("42");
        })

        it('when I edit milestone description, it is changed in milestone', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "description");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });

            this.e.state = new EditMilestoneState(this.e, m);

            expect(m.getDescription()).equals("updated description");
        })

        it('when I edit milestone name, it is changed in milestone image text field', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "description");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });
            const img = m.getImg();
            const txtField = img.findOne(".milestone-name-field");

            this.e.state = new EditMilestoneState(this.e, m);

            expect(txtField.text()).equals("42");
        })

        it('when I edit description, it is changed in milestone image text field', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "description");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });
            const img = m.getImg();
            const txtField = img.findOne(".milestone-description-field");

            this.e.state = new EditMilestoneState(this.e, m);

            expect(txtField.text()).equals("updated description");
        })

        it('I can add description and it is displayed even if it was not present earlier', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });
            const img = m.getImg();
            const txtField = img.findOne(".milestone-description-field");

            this.e.state = new EditMilestoneState(this.e, m);

            expect(txtField.text()).equals("updated description");
        });

        it('edited text is centered', function() {
            const m = createMilestone(this.e, 10, 20, "m0", "");
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({
                    name: "42",
                    text: "updated description"
                });
            });
            const img = m.getImg();
            const txtField = img.findOne(".milestone-description-field");

            this.e.state = new EditMilestoneState(this.e, m);

            expect(txtField.offsetX()).not.equals(0);
        })
    })

    describe('in EditLink state', function() {
        it('when I click, I reach back PointerState', function() {
            this.skip("I don't know how to trigger it as I'm using InputBox stub here");
            const link = sinon.fake();
            link.getTaskLength = sinon.fake(()=>42);
            link.setTaskLength = sinon.fake(n=>0);
            link.focus = sinon.fake();
            this.e.state = new EditLinkState(this.e, link);

            // ??????

            expect(this.e.state).instanceOf(PointerState);
        })

        it('when I get into that state, input box contains data which was stored in clicked link', function () {
            const m1 = createMilestone(this.e, 10, 20, "m1");
            const m2 = createMilestone(this.e, 20, 20, "m2");
            const model = this.e.model;
            const INITIAL_TASK_LENGTH = 5;
            const linkId = model.addLink(m1, m2, INITIAL_TASK_LENGTH);
            const link = model.getLinkWithId(linkId);

            let items;
            this.InputBoxStub.callsFake(function(layer, pos, _items, callbackFn) {
                items = _items;
            });

            this.e.state = new EditLinkState(this.e, link);

            const taskLenEl = items.find(i => i['key'] === 'taskLen');
            expect(taskLenEl['default']).equals(INITIAL_TASK_LENGTH);
        })  
    })

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
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
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
            const milestone = createMilestone(this.e, 10, 20, "test");
            this.e.state = new LinkSecondElState(this.e, milestone);

            this.e.state.onClick(createClickedObject("milestone-element", milestone));

            expect(this.e.state).instanceOf(LinkSecondElState);
        });


        it('When clicked on a different milestone, input box object is created', function() {
            // Note - it can be complex form in the future
            const milestone  = createMilestone(this.e, 10, 20, "test");
            const anotherMilestone  = createMilestone(this.e, 10, 20, "another");
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
                const m1 = createMilestone(this.e, 10, 20, "0");
                const m2 = createMilestone(this.e, 10, 20, "1");

                const fakeArrow = sinon.fake();
                fakeArrow.destroy = sinon.fake();
                this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                    callbackFn({taskLen: testCase.value});
                });

                const state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

                expect(this.e.model.links.length).equals(testCase.createdLink ? 1 : 0);
            });
    
            it(`when passed ${testCase.descr}, we move to ${testCase.nextState.getName()} state`, function() {
                const m1 = createMilestone(this.e, 10, 20, "0");
                const m2 = createMilestone(this.e, 10, 20, "1");
                const fakeArrow = sinon.fake();
                fakeArrow.destroy = sinon.fake();
                this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                    callbackFn(testCase.value);
                })

                const state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

                expect(this.e.state).instanceOf(testCase.nextState);
            })
        })
    })

    describe('in GetTaskLengthState', function() {
        it('link is created between given milestones', function() {
            const m1 = createMilestone(this.e, 10, 20, "m1");
            const m2 = createMilestone(this.e, 10, 20, "m2");
            const m1loc = this.e.model.findMilestoneIDByName("m1");
            const m2loc = this.e.model.findMilestoneIDByName("m2");
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({taskLen: "5"});
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            expect(createdLink.sourceId).equals(m1loc);
            expect(createdLink.destId).equals(m2loc);
        })

        it('Link position corresponds to milestone location', function() {
            const m1 = createMilestone(this.e, 10, 20, "m1");
            const m2 = createMilestone(this.e, 100, 20, "m2");
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({taskLen: "5"});
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            expect(createdLink.points).to.eqls([10+Milestone.radius,20,100-Milestone.radius,20]);
        })

        it('Link is created with given length, this length is stored', function() {
            const m1 = createMilestone(this.e, 10, 20, "m1");
            const m2 = createMilestone(this.e, 100, 20, "m2");
            const fakeArrow = sinon.fake();
            fakeArrow.destroy = sinon.fake();
            
            this.InputBoxStub.callsFake(function(layer, pos, items, callbackFn) {
                callbackFn({taskLen: "5"});
            });
            this.e.state = new GetTaskLengthState(this.e, m1, m2, fakeArrow);

            const createdLink = this.e.model.links[0];
            expect(createdLink.taskLength).equals(5);
        })
    })
}
