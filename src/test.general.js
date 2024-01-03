import frameworkTest from './tests/framework.test.js'
import milestoneTest from './tests/milestone.test.js'
import linkTest from './tests/link.test.js'
import modelCreateTest from './tests/model.create.test.js'
import modelAddMilestoneTest from './tests/model.addMilestone.test.js'
import modelAddLinkTest from './tests/model.addLink.test.js'
import modelSerializeTest from './tests/model.serialize.test.js'

describe('Framework', function(){
    this.slow(10);       // highlight all tasks slower than this limit
    this.timeout(500);   // timeout for each test
    describe('functions', frameworkTest.bind(this));
})


describe('Milestone object', function(){
    describe('creation', milestoneTest.bind(this));
})


describe('Link object', function() {
    describe('creation', linkTest.bind(this));
});


describe('Model', function() {
    describe('creation', modelCreateTest.bind(this));
    describe('adding milestone', modelAddMilestoneTest.bind(this));
    describe('adding link', modelAddLinkTest.bind(this));
    describe('serialization', modelSerializeTest.bind(this));

})