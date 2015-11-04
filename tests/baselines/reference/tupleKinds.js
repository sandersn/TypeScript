//// [tupleKinds.ts]
function tuple<...T>(...args:...T) {
    return args;
}


//// [tupleKinds.js]
function tuple() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return args;
}
