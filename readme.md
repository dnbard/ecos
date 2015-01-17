#Entity Component System

Simple system to create and utilize objects in the right way.

##Create objects
```js
var factory = require('eos').factory;
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
var objects = require('eos').objects;
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
* Each entity is stored in unified container `eos.objects` and accessible by its `id`
* Entity should not have direct link to other entities. Parent entity store identificators of child entities instead
* To get child entity just use `eos.objects.get(childId);`
* Since entities are stored only in one container then no memory leaks will occur when objects will be deleted
* Different entities can share same `methods` and `extenders` and inherit same behaviour without prototype inheritance