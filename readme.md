#Entity Component System

Simple system to create and utilize objects in the right way.

##Create objects
```js
var factory = require('ecos').factory;
var entityFactory = factory.create({
    props: ['x', 'y'],
    name: 'my_entity'
});

var entity = entityFactory.create();
console.log(entity);
{
    x: undefined,
    y: undefined,
    id: 0,
    type: 'my_entity'
}
```

##Get objects
```js
var objects = require('ecos').objects;
var entity = objects.get(0);

console.log(entity);
{
    x: undefined,
    y: undefined,
    id: 0,
    type: 'my_entity'
}
```

##Ideas behind this library
* Each entity is stored in unified container `ecos.objects` and accessible by its `id`
* Entity should not have direct link to other entities. Parent entity store identificators of child entities instead
* To get child entity just use `ecos.objects.get(childId);`
* Since entities are stored only in one container then no memory leaks will occur when objects will be deleted
* Different entities can share same `methods` and `extenders` and inherit same behaviour without prototype inheritance

##Instalation

As `npm` package:
```bash
npm install ecos --save
```

As `bower` package:
```bash
bower install ecos --save
```

##Documentation

###Factory

To create an entity first you need to create a `factory` that will produce entities:
```js
var factory = require('ecos').factory;
var entityFactory = factory.create(options);
```

####Options:
* **name** - factory identificator, *required* *string*
* **props** - list of entity properties that will be initialized with `undefined`, *[ string ]*
* **methods** - list of entity methods, all methods must be registered with `factory.registerMethod`, *[ string ]*
* **extend** - list of extenders that will be applied to entity, all extenders must be registered with `factory.registerExtender`, *[ string ]*
* **presets** - list of presets that will be applied to entity, all presets must be registered with `factory.registerPreset`. *[ string ]*
* **default** - list of entity properties with predefined values, will overwrite `props` options, *{ propName: propValue }*
* **custom** - list of entity properties with predefined values, will overwrite `props` and `default` options, is entity with this set will be accessible through `entityFactory.customEntity()` call, *{ customEntityName: { propName: propValue } }*

####Create basic entity:
Will create entity with fields.
```js
var factory = require('ecos').factory;
var entityFactory = factory.create({
    props: [ 'x', 'y' ],
    name: 'example'
});
entityFactory.create();
```
Result:
```
{
    type: 'example',
    x: undefined,
    y: undefined,
    id: 0
}
```

If you pass object with fields to entity constructor then factory will create entity with specified fields defined:
```js
entityFactory.create({x: 100, y: 200});
```
Result:
```
{
    type: 'example',
    x: 100,
    y: 200,
    id: 0
}
```

####Create entity with method:
Use `factory.registerMethod` to register method that can be assigned to entity:
```js
factory.registerMethod('console', function(text){
    console.log(text);
});

var entityFactory = factory.create({
    methods: ['console'],
    name: 'example'
});
entityFactory.create();
```
Result:
```
{
    type: 'example',
    console: function
    id: 0
}
```

####Create entity with GETSET extender:
This extender will create field with defined getter and setter.

```js
var extenders = require('ecos').extenders;

factory.registerExtender('value-extender', {
    get: function(){
        return this._value;
    },
    set: function(val){
        this._value = val;
        console.log('Value set to ' + val);
    },
    name: 'value',
    type: extenders.GETSET
});

var entityFactory = factory.create({
    extend: ['value-extender'],
    name: 'example'
});

entityFactory.create();
entity.value = Math.random();
```
Result:
```
Value set to 0.758898114
```
If you wont specify `get` or `set` function in extender definition then resulting field wont have getter or setter defined.

####Create entity with FUNCTION extender:
This extender will run custom function on object creation.

```js
factory.registerExtender('function-extender', {
    type: extenders.FUNCTION,
    handler: function(thisObject){
        console.log('Creating ' + JSON.stringify(thisObject));
    }
});

var entityFactory = factory.create({
    extend: ['function-extender'],
    name: 'example'
});

entityFactory.create();
```
Result:
```
Creating {"type":"example", "id":0}
```