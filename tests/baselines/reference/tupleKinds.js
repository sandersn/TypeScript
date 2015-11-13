//// [tupleKinds.ts]
function tupleId<...V>(y:...V): ...V {
    return y;
}
function tuple<...T>(...args:...T): ...T {
    return args;
}

let inferredTupleId: [number, string, boolean] = tupleId([1, "foo", false]);

class C { }
let acceptType = tuple(4, "qux", false, new C());
// TODO: Negative cases don't fail yet when you supply complete type arguments
// TODO: Other negative cases
let typeArguments: [number, string, boolean, C] = tuple<[number, string, boolean, C]>(5, "quack", false, new C());
let inferred: [number, string, boolean, C] = tuple(6, "sequim", false, new C());

function spreadIntoUnionNotSupportedYet<...T>(tuple: number | ...T): number {
    if(typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}

//// [tupleKinds.js]
function tupleId(y) {
    return y;
}
function tuple() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return args;
}
var inferredTupleId = tupleId([1, "foo", false]);
var C = (function () {
    function C() {
    }
    return C;
})();
var acceptType = tuple(4, "qux", false, new C());
// TODO: Negative cases don't fail yet when you supply complete type arguments
// TODO: Other negative cases
var typeArguments = tuple(5, "quack", false, new C());
var inferred = tuple(6, "sequim", false, new C());
function spreadIntoUnionNotSupportedYet(tuple) {
    if (typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}
