import frameworkTest from './tests/framework.test.js';
import milestoneTest from './tests/milestone.test.js';
import milestoneDrawTest from './tests/milestone.draw.test.js';
import milestoneSerializeTest from './tests/milestone.serialize.test.js';
import linkTest from './tests/link.test.js';
import linkSerializeTest from './tests/link.serialize.test.js';
import modelCreateTest from './tests/model.create.test.js';
import modelAddMilestoneTest from './tests/model.addMilestone.test.js';
import modelAddLinkTest from './tests/model.addLink.test.js';
import modelSerializeTest from './tests/model.serialize.test.js';
import toolboxCreateTest from './tests/toolbox.create.test.js';
import editorCreateTest from './tests/editor.create.test.js';
import editorRenderTest from './tests/editor.render.test.js';
import editorSMTest from './tests/editor.statemachine.test.js';

// describe('Framework', function(){
//     this.slow(10);       // highlight all tasks slower than this limit
//     this.timeout(500);   // timeout for each test
//     describe('functions', frameworkTest.bind(this));
// })


describe('Milestone object', function(){
    describe('creation', milestoneTest.bind(this));
    describe('drawing', milestoneDrawTest.bind(this));
    describe('serialization', milestoneSerializeTest.bind(this));
})


describe('Link object', function() {
    describe('creation', linkTest.bind(this));
    describe('serialization', linkSerializeTest.bind(this));
});


describe('Model', function() {
    describe('creation', modelCreateTest.bind(this));
    describe('adding milestone', modelAddMilestoneTest.bind(this));
    describe('adding link', modelAddLinkTest.bind(this));
    describe('serialization', modelSerializeTest.bind(this));
});


describe('Toolbox', function() {
    describe('creation', toolboxCreateTest.bind(this));
});

describe('Editor', function() {
    describe('creation', editorCreateTest.bind(this));
    describe('renderintg', editorRenderTest.bind(this));
    describe('state machine', editorSMTest.bind(this));
})