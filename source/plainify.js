'use strict';

const plainify = (object) => {
    const outerObject = {};
    for (let outerProperty in object) {
        if (typeof object[outerProperty] === 'object') {
            const innerObject = plainify(object[outerProperty]);
            for (let innerProperty in innerObject){
                outerObject[outerProperty + "." + innerProperty] = innerObject[innerProperty];
            }
        } else {
            outerObject[outerProperty] = object[outerProperty];
        }
    }
    return outerObject;
}