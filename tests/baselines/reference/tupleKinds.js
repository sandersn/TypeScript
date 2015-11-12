//// [tupleKinds.ts]
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

//// [tupleKinds.js]
function tuple() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return args;
}
var C = (function () {
    function C() {
    }
    return C;
})();
var inferred = tuple(1, "foo", false, new C());
var match = tuple(1, "foo", false, new C());
function notSupportedYet(tuple) {
    if (typeof tuple === 'number') {
        return tuple;
    }
    else {
        return -1;
    }
}
