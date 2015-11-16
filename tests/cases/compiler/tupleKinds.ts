// TODO:
// 2. Concatenated tuples (implicitly, since I don't want to write the syntax yet)
// 3. As many positive examples as I can get from the proposal
function tupleId<...V>(y:...V): ...V {
    // binds, infers and returns a tuple kind
    return y;
}
function call<...T,U>(f: (ts:...T) => U, ts:...T): U {
    // binds, infers a tuple kind, then goes back to fill it in for a function argument
    return f(ts);
}
class K<...T,U> {
    uselessNestedCall(f: (ts:...T) => U, ts:...T): U {
        return f(ts);
    }
}

let noArgId = tupleId([]);
let inferredTupleId: [number, string] = tupleId([1, "foo"]);
let acceptTupleId = tupleId([2, "bar"]);
let compareTupleId: [number, string] = acceptTupleId;

function f(t: [number, string]): number {
    return t[0];
}
let inferredCall: number = call(f, [3, "baz"]);
let acceptCall = call(f, [4, "qux"]);
let compareCall: number = acceptCall;

let k = new K<[number, string], number>();
let inferredNestedCall: number = k.uselessNestedCall(f, [7, "squawk"]); 
let acceptNestedCall = k.uselessNestedCall(f, [8, "squish"]);
let compareNestedCall: number = acceptNestedCall;
