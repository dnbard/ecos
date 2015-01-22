var expect = (require('chai')).expect,
    factory = require('../src/factory.js'),
    _ = require('lodash');

var fixtures = [{
    name: 'fixture',
    props: ['x', 'y'],
    default: {
        x: 5
    },
    custom:{
        basic:{
            x: 42
        }
    },
    methods: ['genericMethod']
}];

describe('Factory', function(){
    afterEach(function(){
        factory.reset();
    });

    describe('Module', function(){
        it('should export valid object', function(){
            expect(factory).to.have.keys(['create', 'registerMethod', 'registerPreset', 'registerExtender', 'reset']);
        });
    });

    describe('#create', function(){
        it('should be a function', function(){
            expect(factory.create).to.be.a('function');
        });

        it('should return an object', function(){
            expect(factory.create({
                name: 'generic0'
            })).to.be.an('object');
        });
    });

    describe('#registerMethod', function(){
        it('should be a function', function(){
            expect(factory.registerMethod).to.be.a('function');
        });

        it('should throw an error on invalid method name', function(){
            expect(factory.registerMethod).to.throw('Invalid argument: name');
            expect(function(){
                factory.registerMethod(1);
            }).to.throw('Invalid argument: name');
        });

        it('should throw an error on invalid method handler', function(){
            expect(function(){
                factory.registerMethod('1');
            }).to.throw('Invalid argument: handler');

            expect(function(){
                factory.registerMethod('2', 1);
            }).to.throw('Invalid argument: handler');
        });

        it('should throw an error on duplicate method', function(){
            factory.registerMethod('1', function(){});
            expect(function(){
                factory.registerMethod('1', function(){});
            }).to.throw(/is already initialized/);
        });
    });

    describe('#registerPreset', function(){
        it('should be a function', function(){
            expect(factory.registerPreset).to.be.a('function');
        });

        it('should throw an error on invalid preset name', function(){
            expect(factory.registerPreset).to.throw('Invalid argument: name');
            expect(function(){
                factory.registerPreset(1);
            }).to.throw('Invalid argument: name');
        });

        it('should throw an error on invalid preset', function(){
            expect(function(){
                factory.registerPreset('1');
            }).to.throw('Invalid argument: preset');

            expect(function(){
                factory.registerPreset('2', 1);
            }).to.throw('Invalid argument: preset');
        });

        it('should throw an error on duplicate preset', function(){
            factory.registerPreset('1', {});
            expect(function(){
                factory.registerPreset('1', {});
            }).to.throw(/is already initialized/);
        });
    });

    describe('#registerExtender', function(){
        it('should be a function', function(){
            expect(factory.registerExtender).to.be.a('function');
        });

        it('should throw an error on invalid extender name', function(){
            expect(factory.registerExtender).to.throw('Invalid argument: name');
            expect(function(){
                factory.registerExtender(1);
            }).to.throw('Invalid argument: name');
        });

        it('should throw an error on invalid extender', function(){
            expect(function(){
                factory.registerExtender('1');
            }).to.throw('Invalid argument: extender');

            expect(function(){
                factory.registerExtender('2', 1);
            }).to.throw('Invalid argument: extender');
        });

        it('should throw an error on duplicate extender', function(){
            factory.registerExtender('1', {});
            expect(function(){
                factory.registerExtender('1', {});
            }).to.throw(/is already initialized/);
        });
    });

    describe('#reset', function(){
        it('should be a function', function(){
            expect(factory.reset).to.be.a('function');
        });

        it('should reset factory', function(){
            factory.registerExtender('1', {});
            factory.reset();
            expect(function(){
                factory.registerExtender('1', {});
            }).to.not.throw(/already initialized/);
        });
    });

    describe('factory.#create', function(){
        var fixtureFactory;

        beforeEach(function(){
            factory.registerMethod('genericMethod', function(){});
            fixtureFactory = factory.create(fixtures[0]);
        });

        afterEach(function(){
            fixtureFactory = null;
        });

        it('should be present by default', function(){
            expect(fixtureFactory.create).to.be.a('function');
        });

        it('should create entities', function(){
            expect(fixtureFactory.create()).to.be.a('object');
        });

        it('should create entities with same fields', function(){
            expect(_.keys(fixtureFactory.create())).to.be.deep.equal(_.keys(fixtureFactory.create()));
        });

        it('should create entities with different id field value', function(){
            expect(fixtureFactory.create().id).to.not.be.equal(fixtureFactory.create().id);
        });

        it('should create entities with proper fields', function(){
            expect(fixtureFactory.create()).to.contain.keys(fixtures[0].props);
        });

        it('should create entities with proper methods', function(){
            var entity = fixtureFactory.create();
            expect(entity).to.contain.keys(fixtures[0].methods);
            _.each(fixtures[0].methods, function(methodName){
                expect(entity[methodName]).to.be.a('function');
            });
        });

        it('should create entities with default properties', function(){
            var entity = fixtureFactory.create();
            expect(entity).to.contain.keys(_.keys(fixtures[0].default));
            _.each(fixtures[0].default, function(value, key){
                expect(entity[key]).to.be.equal(value);
            });
        });

        describe('Entities', function(){
            it('should contain id field', function(){
                expect(fixtureFactory.create()).to.contain.keys('id');
            });

            it('should contain type field', function(){
                expect(fixtureFactory.create()).to.contain.keys('type');
            });

            it('should have valid type field', function(){
                expect(fixtureFactory.create().type).to.be.equal(fixtures[0].name)
            });
        });
    });

    describe('Custom constructor', function(){
        var customConstructorName = 'basic',
            fixtureFactory;

        beforeEach(function(){
            factory.registerMethod('genericMethod', function(){});
            fixtureFactory = factory.create(fixtures[0]);
        });

        afterEach(function(){
            fixtureFactory = null;
        });

        it('should be created', function(){
            expect(fixtureFactory[customConstructorName]).to.be.a('function');
        });

        it('should create entities', function(){
            expect(fixtureFactory[customConstructorName]()).to.be.a('object');
        });

        it('should create entities with same fields', function(){
            expect(_.keys(fixtureFactory[customConstructorName]())).to.be.deep.equal(_.keys(fixtureFactory[customConstructorName]()));
        });

        it('should create entities with different id field value', function(){
            expect(fixtureFactory[customConstructorName]().id).to.not.be.equal(fixtureFactory[customConstructorName]().id);
        });

        it('should create entities with proper fields', function(){
            expect(fixtureFactory[customConstructorName]()).to.contain.keys(fixtures[0].props);
        });

        it('should create entities with proper methods', function(){
            var entity = fixtureFactory[customConstructorName]();
            expect(entity).to.contain.keys(fixtures[0].methods);
            _.each(fixtures[0].methods, function(methodName){
                expect(entity[methodName]).to.be.a('function');
            });
        });

        it('should create entities with custom fields', function(){
            var entity = fixtureFactory[customConstructorName]();
            expect(entity).to.contain.keys(_.keys(fixtures[0].custom.basic));
            _.each(fixtures[0].custom.basic, function(value, key){
                expect(entity[key]).to.be.equal(value);
            });
        });
    });
});
