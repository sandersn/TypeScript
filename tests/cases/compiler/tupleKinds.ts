function tuple<...T>(...args:...T): ...T {
    return args;
}

class C { }
let inferred = tuple(1, "foo", false, new C());
let match: [number, string, boolean, C] = tuple(1, "foo", false, new C());