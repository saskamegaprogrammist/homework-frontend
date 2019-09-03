'use strict';

const plainify = (object) => {
    const outerObject = {};
    for (let key in object) {
        if (typeof object[key] === 'object') {
            const innerObject = plainify(object[key]);
            for (let field in innerObject){
                outerObject[key + "." + field] = innerObject[field];
            }
        } else {
            outerObject[key] = object[key];
        }
    }
    return outerObject;
}