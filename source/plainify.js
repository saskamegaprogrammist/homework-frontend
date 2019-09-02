'use strict';

function plainify(object){
    let oldObject = {};
    for (let key in object){
        if (typeof object[key] == 'object') {
            let newObject = plainify(object[key]);
            for (let field in newObject){
                oldObject[`${key}.${field}`]=newObject[field];
            }
        } else {
            oldObject[`${key}`] = object[key];
        }
    }
    return oldObject;
}