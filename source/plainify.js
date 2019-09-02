'use strict';

function plainify(object){
    let oldObject = {};
    for (let key in object){
        if (typeof object[key] == 'object') {
            let newObject = plainify(object[key]);
            for (let field in newObject){
                //console.log(newObject);
                oldObject[`${key}.${field}`]=newObject[field];
            }
        } else {
            //key=String(key);
            oldObject[`${key}`] = object[key];
        }
    }
    return oldObject;
}/*
const nested1 = {
    deep: {
        foo: 'bar',
        baz: 42
    }
};
let plain = plainify({foo: 'bar', baz: 42});
console.log(plain);*/