let path = require('path');


/**
 * Creates a Map from a test suite dictionary. 
 * 
 * @param {string} dictionary 
 * @returns {Map} Map 
 */
exports.CreateMapFromTestDictionary = function (dictionary) {  
    const map = new Map();

    for (let key in dictionary) {
        const mapKey = path.normalize(key);
        const mapValue = dictionary[key];
        map.set(mapKey, mapValue);
    }

    return map;
};