function tuple<...T>(...args:...T): ...T {
    return args;
}

class C { }
let inferred = tuple(1, "foo", false, new C());
let match: [number, string, boolean, C] = tuple(1, "foo", false, new C());
function notSupportedYet<...T>(tuple: number | ...T): number {
    if(typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}