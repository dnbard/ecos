var expect = (require('chai')).expect,
    entities = require('../src/entities.js');

describe('Entities', function(){
    afterEach(function(){
        entities.removeAll();
    });

    it('should return object', function(){
        expect(entities).to.be.an('object');
    });

    it('should return object with valid keys', function(){
        expect(entities).to.have.keys(['set', 'get', 'remove', 'size', 'removeAll']);
    });

    describe('#set', function(){
        it('should be a function', function(){
            expect(entities.set).to.be.a('function');
        });

        it('should throw an error on invalid argument', function(){
            expect(entities.set).to.throw(/Invalid argument/);
        });

        it('should store object in container', function(){
            var object = { value: Math.random() };

            entities.set(object);
            expect(entities.get(object.id)).to.be.deep.equal(object);
        });
    });

    describe('#get', function(){
        it('should be a function', function(){
            expect(entities.get).to.be.a('function');
        });

        it('should retrieve object from container', function(){
            var object = { value: Math.random() };

            entities.set(object);
            expect(entities.get(object.id)).to.be.deep.equal(object);
        });

        it('should return null if object not found', function(){
            expect(entities.get(Math.random())).to.be.null;
        });
    });

    describe('#remove', function(){
        it('should be a function', function(){
            expect(entities.remove).to.be.a('function');
        });

        it('should remove object from container', function(){
            var object = { value: Math.random() };

            entities.set(object);
            entities.remove(object.id);
            expect(entities.get(object.id)).to.be.null;
        });
    });

    describe('#size', function(){
        it('should be a function', function(){
            expect(entities.size).to.be.a('function');
        });

        it('should return objects count', function(){
            var object = { value: Math.random() };

            entities.set(object);
            expect(entities.size()).to.be.equal(1);
        });
    });

    describe('#removeAll', function(){
        it('should be a function', function(){
            expect(entities.removeAll).to.be.a('function');
        });

        it('should removeAll objects', function(){
            entities.set({ value: Math.random() });
            entities.set({ value: Math.random() });
            entities.removeAll();

            expect(entities.size()).to.be.equal(0);
        });
    });
});
