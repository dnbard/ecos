var container = {},
    nextId = 0;

module.exports = {
    set: function(obj){
        obj.id = nextId++;
        container[obj.id] = obj;

        return obj;
    },
    get: function(id){
        return container[id];
    },
    remove: function(id){
        delete container[id];
    },
    size: function(){
        return container.length;
    }
};
