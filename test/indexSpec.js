var expect = (require('chai')).expect,
    index = require('../index.js'),
    factoryModule = require('../src/factory'),
    entitiesModule = require('../src/entities'),
    extendersEnum = require('../src/extenders');

describe('Index', function(){
    it('should return valid object', function(){
        expect(index).to.be.an('object');
        expect(index).to.have.keys(['factory', 'entities', 'extenders']);
    });

    it('should return valid factory module', function(){
        expect(index.factory).to.be.deep.equal(factoryModule);
    });

    it('should return valid entities module', function(){
        expect(index.entities).to.be.deep.equal(entitiesModule);
    });

    it('should return valid extenders enum', function(){
        expect(index.extenders).to.be.deep.equal(extendersEnum);
    });
});
