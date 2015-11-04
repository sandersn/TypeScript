function tuple<...T>(...args:...T): ...T {
    return args;
}
function noPredicates<...T>(...args): ...T is boolean {
}
function noArguments<...T, U>(...args): ...T<U> {
}
function noConstraints<...T extends string>(...args) {
}
