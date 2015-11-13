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