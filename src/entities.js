var container = {},
    nextId = 0;

module.exports = {
    set: function(obj){
        if (!obj || typeof obj !== 'object'){
            throw new Error('Invalid argument: argument must be an object');
        }

        obj.id = nextId++;
        container[obj.id] = obj;

        return obj;
    },
    get: function(id){
        return container[id] || null;
    },
    remove: function(id){
        delete container[id];
    },
    size: function(){
        var count = 0, i;

        for (i in container) {
            if (container.hasOwnProperty(i)) {
                count++;
            }
        }

        return count;
    },
    removeAll: function(){
        container = {};
        nextId = 0;
    }
};
