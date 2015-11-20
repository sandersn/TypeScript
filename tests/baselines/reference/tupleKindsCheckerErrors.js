//// [tupleKindsCheckerErrors.ts]
// TODO:
// 1. Negative cases
function tupleId<...V>(y:...V): ...V {
    // binds, infers and returns a tuple kind
    return y;
}
function call<...T,U>(f: (ts:...T) => U, ts:...T): U {
    // binds, infers a tuple kind, then goes back to fill it in for a function argument
    return f(ts);
}
function tuple<...W>(...args:...W): ...W {
    // uses rest args
    return args;
}
class K<...X,Y> {
    uselessNestedCall(f: (ts:...X) => Y, ts:...X): Y {
        return f(ts);
    }
}

let tooFewId: [number, string] = tupleId([13]);
let tooManyId: [number, string] = tupleId([1, "foo", false]);
let wrongTypesId: [number, string] = tupleId(["bar", 2]);
// TODO: compareNoTuple and acceptNoTuple need to return an error -- acceptnoTuple doesn't even fail!
let compareNoTupleId: [number, string] = tupleId(12);
let acceptNoTupleId = tupleId(2);

function f(t: [number, string]): number {
    return t[0];
}
let noArgsCall = call(f, []);
let tooFewCall = call(f, [14]);
let tooManyCall = call(f, [15, "baz", false]);
let wrongTypesCall = call(f, ["qux", 16]);
let noTupleCall = call(f, 17);

let k = new K<[number, string], number>();
let noArgsNestedCall = k.uselessNestedCall(f, []);
let tooFewArgsNestedCall = k.uselessNestedCall(f, [18]);
let tooManyArgsNestedCall = k.uselessNestedCall(f, [19, "sequim", false]);
let wrongTypesNestedCall = k.uselessNestedCall(f, ["squish", 20]);
let noTupleNestedCall = k.uselessNestedCall(f, 21);

// rest parameters are not supported yet.
class C { }
let acceptRestType = tuple(4, "qux", false, new C());
let compareRestType: [number, string, boolean, C] = acceptRestType;
let restTypeArguments: [number, string, boolean, C] = tuple<[number, string, boolean, C]>(5, "quack", false, new C());
let inferredRestType: [number, string, boolean, C] = tuple(6, "sequim", false, new C());

function spreadIntoUnionNotSupportedYet<...T>(tuple: number | ...T): number {
    if(typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}

//// [tupleKindsCheckerErrors.js]
// TODO:
// 1. Negative cases
function tupleId(y) {
    // binds, infers and returns a tuple kind
    return y;
}
function call(f, ts) {
    // binds, infers a tuple kind, then goes back to fill it in for a function argument
    return f(ts);
}
function tuple() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    // uses rest args
    return args;
}
var K = (function () {
    function K() {
    }
    K.prototype.uselessNestedCall = function (f, ts) {
        return f(ts);
    };
    return K;
})();
var tooFewId = tupleId([13]);
var tooManyId = tupleId([1, "foo", false]);
var wrongTypesId = tupleId(["bar", 2]);
// TODO: compareNoTuple and acceptNoTuple need to return an error -- acceptnoTuple doesn't even fail!
var compareNoTupleId = tupleId(12);
var acceptNoTupleId = tupleId(2);
function f(t) {
    return t[0];
}
var noArgsCall = call(f, []);
var tooFewCall = call(f, [14]);
var tooManyCall = call(f, [15, "baz", false]);
var wrongTypesCall = call(f, ["qux", 16]);
var noTupleCall = call(f, 17);
var k = new K();
var noArgsNestedCall = k.uselessNestedCall(f, []);
var tooFewArgsNestedCall = k.uselessNestedCall(f, [18]);
var tooManyArgsNestedCall = k.uselessNestedCall(f, [19, "sequim", false]);
var wrongTypesNestedCall = k.uselessNestedCall(f, ["squish", 20]);
var noTupleNestedCall = k.uselessNestedCall(f, 21);
// rest parameters are not supported yet.
var C = (function () {
    function C() {
    }
    return C;
})();
var acceptRestType = tuple(4, "qux", false, new C());
var compareRestType = acceptRestType;
var restTypeArguments = tuple(5, "quack", false, new C());
var inferredRestType = tuple(6, "sequim", false, new C());
function spreadIntoUnionNotSupportedYet(tuple) {
    if (typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}
