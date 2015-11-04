//// [tupleKinds.ts]
function tuple<...T>(...args:...T): ...T {
    return args;
}
function noPredicates<...T>(...args): ...T is boolean {
}
function noArguments<...T, U>(...args): ...T<U> {
}
function noConstraints<...T extends string>(...args) {
}


//// [tupleKinds.js]
function tuple() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return args;
}
is;
boolean;
{
}
{};
string > ();
args;
{
}
