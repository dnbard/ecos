#Entity Object System - eos.js

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
var entity = objects.get(1);

console.log(entity);
{
    x: undefined,
    y: undefined,
    id: 0,
    type: 'my_entity'
}
```