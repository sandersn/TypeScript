//// [tupleKindsParseErrors.ts]
function noPredicates<...T>(...args): ...T is boolean {
}
function noArguments<...T, U>(...args): ...T<U> {
}
function noConstraints<...T extends string>(...args) {
}


//// [tupleKindsParseErrors.js]
is;
boolean;
{
}
{};
string > ();
args;
{
}
