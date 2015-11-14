function tupleId<...V>(y:...V): ...V {
    // binds, infers and returns a tuple kind
    return y;
}
function call<...T,U>(f: (ts:...T) => U, ts:...T): U {
    // binds, infers a tuple kind, then goes back to fill it in for a function argument
    return f(ts);
}
function tuple<...T>(...args:...T): ...T {
    // uses rest args
    return args;
}

let inferredTupleId: [number, string] = tupleId([1, "foo"]);
let acceptTupleId = tupleId([2, "bar"]);
let compareTupleId: [number, string] = acceptTupleId;

function f(t: [number, string]): number {
    return t[0];
}
let inferredCall: number = call(f, [3, "baz"]);
let acceptCall = call(f, [4, "qux"]);
let compareCall: number = acceptCall;

class C { }
let acceptType = tuple(4, "qux", false, new C());
let compareType: [number, string, boolean, C] = acceptType;
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