/// <reference path="fourslash.ts" />
// @checkJs: true
// @filename: jsxtransformer.js
//// 
//// function parseObjectPropertyKey() {
////     var marker = markerCreate(),
////         token = lex(),
////         propertyKey,
////         result
//// 
////     // Note: This function is called only from parseObjectProperty(), where
////     // EOF and Punctuator tokens are already filtered out.
//// 
////     if (
////         token.type === Token.StringLiteral ||
////         token.type === Token.NumericLiteral
////     ) {
////         if (strict && token.octal) {
////             throwErrorTolerant(token, Messages.StrictOctalLiteral)
////         }
////         return markerApply(marker, delegate.createLiteral(token))
////     }
//// 
////     if (token.type === Token.Punctuator && token.value === "[") {
////         propertyKey = parseAssignmentExpression()
////         return markerApply(marker, propertyKey)
////     }
//// 
////     return markerApply(marker, delegate.createIdentifier(token.value))
//// }
//// 
//// function parseObjectProperty() {
////     var token,
////         key,
////         id,
////         param,
////         computed,
////         marker = markerCreate(),
////         returnType,
////         typeParameters
//// 
////     token = lookahead
////     computed = token.value === "[" && token.type === Token.Punctuator
//// 
////     if (token.type === Token.Identifier || computed || matchAsync()) {
////         id = parseObjectPropertyKey()
////         if (match("(") || match("<")) {
////             return markerApply(
////                 marker,
////                 delegate.createProperty(
////                     "init",
////                     id,
////                     parsePropertyMethodFunction({
////                         generator: false,
////                         async: false,
////                         typeParameters: typeParameters
////                     }),
////                     true,
////                     false,
////                     computed
////                 )
////             )
////         }
//// 
////         // Property Assignment: Getter and Setter.
//// 
////         if (token.value === "get") {
////             key = parseObjectPropertyKey()
//// 
//// 
////             return markerApply(
////           /*1*/ marker,
////                 delegate.createProperty(
////                     "get",
////                     key,
////                     parsePropertyFunction({
////                         generator: false,
////                         async: false,
////                         returnType: returnType
////                     }),
////                     false,
////                     false,
////                     computed
////                 )
////             )
////         }
////     }
//// 
////     key = parseObjectPropertyKey()
////     if (match(":")) {
////         lex()
////         return markerApply(
////             marker,
////             delegate.createProperty(
////                 "init",
////                 key,
////                 parseAssignmentExpression(),
////                 false,
////                 false,
////                 false
////             )
////         )
////     }
////     if (match("(") || match("<")) {
////         if (match("<")) {
////             typeParameters = parseTypeParameterDeclaration()
////         }
////         return markerApply(
////             marker,
////             delegate.createProperty(
////                 "init",
////                 key,
////                 parsePropertyMethodFunction({
////                     generator: false,
////                     typeParameters: typeParameters
////                 }),
////                 true,
////                 false,
////                 false
////             )
////         )
////     }
////     throwUnexpected(lex())
//// }
//// 
//// function parseObjectSpreadProperty() {
////     var marker = markerCreate()
////     expect("...")
////     return markerApply(
////         marker,
////         delegate.createSpreadProperty(parseAssignmentExpression())
////     )
//// }
//// 
//// function parseObjectInitialiser() {
////     var properties = [],
////         property,
////         name,
////         kind,
////         storedKind,
////         map = new StringMap(),
////         marker = markerCreate(),
////         toString = String
//// 
////     expect("{")
//// 
////     while (!match("}")) {
////         if (match("...")) {
////             property = parseObjectSpreadProperty()
////         } else {
////             property = parseObjectProperty()
//// 
////             if (property.key.type === Syntax.Identifier) {
////                 name = property.key.name
////             } else {
////                 name = toString(property.key.value)
////             }
////             kind =
////                 property.kind === "init"
////                     ? PropertyKind.Data
////                     : property.kind === "get"
////                     ? PropertyKind.Get
////                     : PropertyKind.Set
//// 
////             if (map.has(name)) {
////                 storedKind = map.get(name)
////                 if (storedKind === PropertyKind.Data) {
////                     if (strict && kind === PropertyKind.Data) {
////                         throwErrorTolerant(
////                             {},
////                             Messages.StrictDuplicateProperty
////                         )
////                     } else if (kind !== PropertyKind.Data) {
////                         throwErrorTolerant(
////                             {},
////                             Messages.AccessorDataProperty
////                         )
////                     }
////                 } else {
////                     if (kind === PropertyKind.Data) {
////                         throwErrorTolerant(
////                             {},
////                             Messages.AccessorDataProperty
////                         )
////                     } else if (storedKind & kind) {
////                         throwErrorTolerant({}, Messages.AccessorGetSet)
////                     }
////                 }
////                 map.set(name, storedKind | kind)
////             } else {
////                 map.set(name, kind)
////             }
////         }
//// 
////         properties.push(property)
//// 
////         if (!match("}")) {
////             expect(",")
////         }
////     }
//// 
////     expect("}")
//// 
////     return markerApply(marker, delegate.createObjectExpression(properties))
//// }
//// 
//// function parseTemplateElement(option) {
////     var marker = markerCreate(),
////         token = scanTemplateElement(option)
////     if (strict && token.octal) {
////         throwError(token, Messages.StrictOctalLiteral)
////     }
////     return markerApply(
////         marker,
////         delegate.createTemplateElement(
////             { raw: token.value.raw, cooked: token.value.cooked },
////             token.tail
////         )
////     )
//// }
//// 
//// function parseTemplateLiteral() {
////     var quasi,
////         quasis,
////         expressions,
////         marker = markerCreate()
//// 
////     quasi = parseTemplateElement({ head: true })
////     quasis = [quasi]
////     expressions = []
//// 
////     while (!quasi.tail) {
////         expressions.push(parseExpression())
////         quasi = parseTemplateElement({ head: false })
////         quasis.push(quasi)
////     }
//// 
////     return markerApply(
////         marker,
////         delegate.createTemplateLiteral(quasis, expressions)
////     )
//// }
//// 
//// // 11.1.6 The Grouping Operator
//// 
//// function parseGroupExpression() {
////     var expr, marker, typeAnnotation
//// 
////     expect("(")
//// 
////     ++state.parenthesizedCount
//// 
////     marker = markerCreate()
//// 
////     expr = parseExpression()
//// 
////     if (match(":")) {
////         typeAnnotation = parseTypeAnnotation()
////         expr = markerApply(
////             marker,
////             delegate.createTypeCast(expr, typeAnnotation)
////         )
////     }
//// 
////     expect(")")
//// 
////     return expr
//// }
//// 
//// function matchAsyncFuncExprOrDecl() {
////     var token
//// 
////     if (matchAsync()) {
////         token = lookahead2()
////         if (token.type === Token.Keyword && token.value === "function") {
////             return true
////         }
////     }
//// 
////     return false
//// }
//// 
//// // 11.1 Primary Expressions
//// 
//// function parsePrimaryExpression() {
////     var marker, type, token, expr
//// 
////     type = lookahead.type
//// 
////     if (type === Token.Identifier) {
////         marker = markerCreate()
////         return markerApply(marker, delegate.createIdentifier(lex().value))
////     }
//// 
////     if (type === Token.StringLiteral || type === Token.NumericLiteral) {
////         if (strict && lookahead.octal) {
////             throwErrorTolerant(lookahead, Messages.StrictOctalLiteral)
////         }
////         marker = markerCreate()
////         return markerApply(marker, delegate.createLiteral(lex()))
////     }
//// 
////     if (type === Token.Keyword) {
////         if (matchKeyword("this")) {
////             marker = markerCreate()
////             lex()
////             return markerApply(marker, delegate.createThisExpression())
////         }
//// 
////         if (matchKeyword("function")) {
////             return parseFunctionExpression()
////         }
//// 
////         if (matchKeyword("class")) {
////             return parseClassExpression()
////         }
//// 
////         if (matchKeyword("super")) {
////             marker = markerCreate()
////             lex()
////             return markerApply(marker, delegate.createIdentifier("super"))
////         }
////     }
//// 
////     if (type === Token.BooleanLiteral) {
////         marker = markerCreate()
////         token = lex()
////         token.value = token.value === "true"
////         return markerApply(marker, delegate.createLiteral(token))
////     }
//// 
////     if (type === Token.NullLiteral) {
////         marker = markerCreate()
////         token = lex()
////         token.value = null
////         return markerApply(marker, delegate.createLiteral(token))
////     }
//// 
////     if (match("[")) {
////         return parseArrayInitialiser()
////     }
//// 
////     if (match("{")) {
////         return parseObjectInitialiser()
////     }
//// 
////     if (match("(")) {
////         return parseGroupExpression()
////     }
//// 
////     if (match("/") || match("/=")) {
////         marker = markerCreate()
////         expr = delegate.createLiteral(scanRegExp())
////         peek()
////         return markerApply(marker, expr)
////     }
//// 
////     if (type === Token.Template) {
////         return parseTemplateLiteral()
////     }
//// 
////     if (match("<")) {
////         return parseJSXElement()
////     }
//// 
////     throwUnexpected(lex())
//// }
//// 
//// // 11.2 Left-Hand-Side Expressions
//// 
//// function parseArguments() {
////     var args = [],
////         arg
//// 
////     expect("(")
//// 
////     if (!match(")")) {
////         while (index < length) {
////             arg = parseSpreadOrAssignmentExpression()
////             args.push(arg)
//// 
////             if (match(")")) {
////                 break
////             } else if (arg.type === Syntax.SpreadElement) {
////                 throwError({}, Messages.ElementAfterSpreadElement)
////             }
//// 
////             expect(",")
////         }
////     }
//// 
////     expect(")")
//// 
////     return args
//// }
//// 
//// function parseSpreadOrAssignmentExpression() {
////     if (match("...")) {
////         var marker = markerCreate()
////         lex()
////         return markerApply(
////             marker,
////             delegate.createSpreadElement(parseAssignmentExpression())
////         )
////     }
////     return parseAssignmentExpression()
//// }
//// 
//// function parseNonComputedProperty() {
////     var marker = markerCreate(),
////         token = lex()
//// 
////     if (!isIdentifierName(token)) {
////         throwUnexpected(token)
////     }
//// 
////     return markerApply(marker, delegate.createIdentifier(token.value))
//// }
//// 
//// function parseNonComputedMember() {
////     expect(".")
//// 
////     return parseNonComputedProperty()
//// }
//// 
//// function parseComputedMember() {
////     var expr
//// 
////     expect("[")
//// 
////     expr = parseExpression()
//// 
////     expect("]")
//// 
////     return expr
//// }
//// 
//// function parseNewExpression() {
////     var callee,
////         args,
////         marker = markerCreate()
//// 
////     expectKeyword("new")
////     callee = parseLeftHandSideExpression()
////     args = match("(") ? parseArguments() : []
//// 
////     return markerApply(marker, delegate.createNewExpression(callee, args))
//// }
//// 
//// function parseLeftHandSideExpressionAllowCall() {
////     var expr,
////         args,
////         marker = markerCreate()
//// 
////     expr = matchKeyword("new")
////         ? parseNewExpression()
////         : parsePrimaryExpression()
//// 
////     while (
////         match(".") ||
////         match("[") ||
////         match("(") ||
////         lookahead.type === Token.Template
////     ) {
////         if (match("(")) {
////             args = parseArguments()
////             expr = markerApply(
////                 marker,
////                 delegate.createCallExpression(expr, args)
////             )
////         } else if (match("[")) {
////             expr = markerApply(
////                 marker,
////                 delegate.createMemberExpression(
////                     "[",
////                     expr,
////                     parseComputedMember()
////                 )
////             )
////         } else if (match(".")) {
////             expr = markerApply(
////                 marker,
////                 delegate.createMemberExpression(
////                     ".",
////                     expr,
////                     parseNonComputedMember()
////                 )
////             )
////         } else {
////             expr = markerApply(
////                 marker,
////                 delegate.createTaggedTemplateExpression(
////                     expr,
////                     parseTemplateLiteral()
////                 )
////             )
////         }
////     }
//// 
////     return expr
//// }
//// 
//// function parseLeftHandSideExpression() {
////     var expr,
////         marker = markerCreate()
//// 
////     expr = matchKeyword("new")
////         ? parseNewExpression()
////         : parsePrimaryExpression()
//// 
////     while (match(".") || match("[") || lookahead.type === Token.Template) {
////         if (match("[")) {
////             expr = markerApply(
////                 marker,
////                 delegate.createMemberExpression(
////                     "[",
////                     expr,
////                     parseComputedMember()
////                 )
////             )
////         } else if (match(".")) {
////             expr = markerApply(
////                 marker,
////                 delegate.createMemberExpression(
////                     ".",
////                     expr,
////                     parseNonComputedMember()
////                 )
////             )
////         } else {
////             expr = markerApply(
////                 marker,
////                 delegate.createTaggedTemplateExpression(
////                     expr,
////                     parseTemplateLiteral()
////                 )
////             )
////         }
////     }
//// 
////     return expr
//// }
//// 
//// // 11.3 Postfix Expressions
//// 
//// function parsePostfixExpression() {
////     var marker = markerCreate(),
////         expr = parseLeftHandSideExpressionAllowCall(),
////         token
//// 
////     if (lookahead.type !== Token.Punctuator) {
////         return expr
////     }
//// 
////     if ((match("++") || match("--")) && !peekLineTerminator()) {
////         // 11.3.1, 11.3.2
////         if (
////             strict &&
////             expr.type === Syntax.Identifier &&
////             isRestrictedWord(expr.name)
////         ) {
////             throwErrorTolerant({}, Messages.StrictLHSPostfix)
////         }
//// 
////         if (!isLeftHandSide(expr)) {
////             throwError({}, Messages.InvalidLHSInAssignment)
////         }
//// 
////         token = lex()
////         expr = markerApply(
////             marker,
////             delegate.createPostfixExpression(token.value, expr)
////         )
////     }
//// 
////     return expr
//// }
//// 
//// // 11.4 Unary Operators
//// 
//// function parseUnaryExpression() {
////     var marker, token, expr
//// 
////     if (
////         lookahead.type !== Token.Punctuator &&
////         lookahead.type !== Token.Keyword
////     ) {
////         return parsePostfixExpression()
////     }
//// 
////     if (match("++") || match("--")) {
////         marker = markerCreate()
////         token = lex()
////         expr = parseUnaryExpression()
////         // 11.4.4, 11.4.5
////         if (
////             strict &&
////             expr.type === Syntax.Identifier &&
////             isRestrictedWord(expr.name)
////         ) {
////             throwErrorTolerant({}, Messages.StrictLHSPrefix)
////         }
//// 
////         if (!isLeftHandSide(expr)) {
////             throwError({}, Messages.InvalidLHSInAssignment)
////         }
//// 
////         return markerApply(
////             marker,
////             delegate.createUnaryExpression(token.value, expr)
////         )
////     }
//// 
////     if (match("+") || match("-") || match("~") || match("!")) {
////         marker = markerCreate()
////         token = lex()
////         expr = parseUnaryExpression()
////         return markerApply(
////             marker,
////             delegate.createUnaryExpression(token.value, expr)
////         )
////     }
//// 
////     if (
////         matchKeyword("delete") ||
////         matchKeyword("void") ||
////         matchKeyword("typeof")
////     ) {
////         marker = markerCreate()
////         token = lex()
////         expr = parseUnaryExpression()
////         expr = markerApply(
////             marker,
////             delegate.createUnaryExpression(token.value, expr)
////         )
////         if (
////             strict &&
////             expr.operator === "delete" &&
////             expr.argument.type === Syntax.Identifier
////         ) {
////             throwErrorTolerant({}, Messages.StrictDelete)
////         }
////         return expr
////     }
//// 
////     return parsePostfixExpression()
//// }
//// 
//// function binaryPrecedence(token, allowIn) {
////     var prec = 0
//// 
////     if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
////         return 0
////     }
//// 
////     switch (token.value) {
////         case "||":
////             prec = 1
////             break
//// 
////         case "&&":
////             prec = 2
////             break
//// 
////         case "|":
////             prec = 3
////             break
//// 
////         case "^":
////             prec = 4
////             break
//// 
////         case "&":
////             prec = 5
////             break
//// 
////         case "==":
////         case "!=":
////         case "===":
////         case "!==":
////             prec = 6
////             break
//// 
////         case "<":
////         case ">":
////         case "<=":
////         case ">=":
////         case "instanceof":
////             prec = 7
////             break
//// 
////         case "in":
////             prec = allowIn ? 7 : 0
////             break
//// 
////         case "<<":
////         case ">>":
////         case ">>>":
////             prec = 8
////             break
//// 
////         case "+":
////         case "-":
////             prec = 9
////             break
//// 
////         case "*":
////         case "/":
////         case "%":
////             prec = 11
////             break
//// 
////         default:
////             break
////     }
//// 
////     return prec
//// }
//// 
//// // 11.5 Multiplicative Operators
//// // 11.6 Additive Operators
//// // 11.7 Bitwise Shift Operators
//// // 11.8 Relational Operators
//// // 11.9 Equality Operators
//// // 11.10 Binary Bitwise Operators
//// // 11.11 Binary Logical Operators
//// 
//// function parseBinaryExpression() {
////     var expr,
////         token,
////         prec,
////         previousAllowIn,
////         stack,
////         right,
////         operator,
////         left,
////         i,
////         marker,
////         markers
//// 
////     previousAllowIn = state.allowIn
////     state.allowIn = true
//// 
////     marker = markerCreate()
////     left = parseUnaryExpression()
//// 
////     token = lookahead
////     prec = binaryPrecedence(token, previousAllowIn)
////     if (prec === 0) {
////         return left
////     }
////     token.prec = prec
////     lex()
//// 
////     markers = [marker, markerCreate()]
////     right = parseUnaryExpression()
//// 
////     stack = [left, token, right]
//// 
////     while ((prec = binaryPrecedence(lookahead, previousAllowIn)) > 0) {
////         // Reduce: make a binary expression from the three topmost entries.
////         while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
////             right = stack.pop()
////             operator = stack.pop().value
////             left = stack.pop()
////             expr = delegate.createBinaryExpression(operator, left, right)
////             markers.pop()
////             marker = markers.pop()
////             markerApply(marker, expr)
////             stack.push(expr)
////             markers.push(marker)
////         }
//// 
////         // Shift.
////         token = lex()
////         token.prec = prec
////         stack.push(token)
////         markers.push(markerCreate())
////         expr = parseUnaryExpression()
////         stack.push(expr)
////     }
//// 
////     state.allowIn = previousAllowIn
//// 
////     // Final reduce to clean-up the stack.
////     i = stack.length - 1
////     expr = stack[i]
////     markers.pop()
////     while (i > 1) {
////         expr = delegate.createBinaryExpression(
////             stack[i - 1].value,
////             stack[i - 2],
////             expr
////         )
////         i -= 2
////         marker = markers.pop()
////         markerApply(marker, expr)
////     }
//// 
////     return expr
//// }
//// 
//// // 11.12 Conditional Operator
//// 
//// function parseConditionalExpression() {
////     var expr,
////         previousAllowIn,
////         consequent,
////         alternate,
////         marker = markerCreate()
////     expr = parseBinaryExpression()
//// 
////     if (match("?")) {
////         lex()
////         previousAllowIn = state.allowIn
////         state.allowIn = true
////         consequent = parseAssignmentExpression()
////         state.allowIn = previousAllowIn
////         expect(":")
////         alternate = parseAssignmentExpression()
//// 
////         expr = markerApply(
////             marker,
////             delegate.createConditionalExpression(
////                 expr,
////                 consequent,
////                 alternate
////             )
////         )
////     }
//// 
////     return expr
//// }
//// 
//// // 11.13 Assignment Operators
//// 
//// // 12.14.5 AssignmentPattern
//// 
//// function reinterpretAsAssignmentBindingPattern(expr) {
////     var i, len, property, element
//// 
////     if (expr.type === Syntax.ObjectExpression) {
////         expr.type = Syntax.ObjectPattern
////         for (i = 0, len = expr.properties.length; i < len; i += 1) {
////             property = expr.properties[i]
////             if (property.type === Syntax.SpreadProperty) {
////                 if (i < len - 1) {
////                     throwError({}, Messages.PropertyAfterSpreadProperty)
////                 }
////                 reinterpretAsAssignmentBindingPattern(property.argument)
////             } else {
////                 if (property.kind !== "init") {
////                     throwError({}, Messages.InvalidLHSInAssignment)
////                 }
////                 reinterpretAsAssignmentBindingPattern(property.value)
////             }
////         }
////     } else if (expr.type === Syntax.ArrayExpression) {
////         expr.type = Syntax.ArrayPattern
////         for (i = 0, len = expr.elements.length; i < len; i += 1) {
////             element = expr.elements[i]
////             /* istanbul ignore else */
////             if (element) {
////                 reinterpretAsAssignmentBindingPattern(element)
////             }
////         }
////     } else if (expr.type === Syntax.Identifier) {
////         if (isRestrictedWord(expr.name)) {
////             throwError({}, Messages.InvalidLHSInAssignment)
////         }
////     } else if (expr.type === Syntax.SpreadElement) {
////         reinterpretAsAssignmentBindingPattern(expr.argument)
////         if (expr.argument.type === Syntax.ObjectPattern) {
////             throwError({}, Messages.ObjectPatternAsSpread)
////         }
////     } else {
////         /* istanbul ignore else */
////         if (
////             expr.type !== Syntax.MemberExpression &&
////             expr.type !== Syntax.CallExpression &&
////             expr.type !== Syntax.NewExpression
////         ) {
////             throwError({}, Messages.InvalidLHSInAssignment)
////         }
////     }
//// }
//// 
//// // 13.2.3 BindingPattern
//// 
//// function reinterpretAsDestructuredParameter(options, expr) {
////     var i, len, property, element
//// 
////     if (expr.type === Syntax.ObjectExpression) {
////         expr.type = Syntax.ObjectPattern
////         for (i = 0, len = expr.properties.length; i < len; i += 1) {
////             property = expr.properties[i]
////             if (property.type === Syntax.SpreadProperty) {
////                 if (i < len - 1) {
////                     throwError({}, Messages.PropertyAfterSpreadProperty)
////                 }
////                 reinterpretAsDestructuredParameter(
////                     options,
////                     property.argument
////                 )
////             } else {
////                 if (property.kind !== "init") {
////                     throwError({}, Messages.InvalidLHSInFormalsList)
////                 }
////                 reinterpretAsDestructuredParameter(options, property.value)
////             }
////         }
////     } else if (expr.type === Syntax.ArrayExpression) {
////         expr.type = Syntax.ArrayPattern
////         for (i = 0, len = expr.elements.length; i < len; i += 1) {
////             element = expr.elements[i]
////             if (element) {
////                 reinterpretAsDestructuredParameter(options, element)
////             }
////         }
////     } else if (expr.type === Syntax.Identifier) {
////         validateParam(options, expr, expr.name)
////     } else if (expr.type === Syntax.SpreadElement) {
////         // BindingRestElement only allows BindingIdentifier
////         if (expr.argument.type !== Syntax.Identifier) {
////             throwError({}, Messages.InvalidLHSInFormalsList)
////         }
////         validateParam(options, expr.argument, expr.argument.name)
////     } else {
////         throwError({}, Messages.InvalidLHSInFormalsList)
////     }
//// }
//// 
//// function reinterpretAsCoverFormalsList(expressions) {
////     var i, len, param, params, defaults, defaultCount, options, rest
//// 
////     params = []
////     defaults = []
////     defaultCount = 0
////     rest = null
////     options = {
////         paramSet: new StringMap()
////     }
//// 
////     for (i = 0, len = expressions.length; i < len; i += 1) {
////         param = expressions[i]
////         if (param.type === Syntax.Identifier) {
////             params.push(param)
////             defaults.push(null)
////             validateParam(options, param, param.name)
////         } else if (
////             param.type === Syntax.ObjectExpression ||
////             param.type === Syntax.ArrayExpression
////         ) {
////             reinterpretAsDestructuredParameter(options, param)
////             params.push(param)
////             defaults.push(null)
////         } else if (param.type === Syntax.SpreadElement) {
////             assert(
////                 i === len - 1,
////                 "It is guaranteed that SpreadElement is last element by parseExpression"
////             )
////             if (param.argument.type !== Syntax.Identifier) {
////                 throwError({}, Messages.InvalidLHSInFormalsList)
////             }
////             reinterpretAsDestructuredParameter(options, param.argument)
////             rest = param.argument
////         } else if (param.type === Syntax.AssignmentExpression) {
////             params.push(param.left)
////             defaults.push(param.right)
////             ++defaultCount
////             validateParam(options, param.left, param.left.name)
////         } else {
////             return null
////         }
////     }
//// 
////     if (options.message === Messages.StrictParamDupe) {
////         throwError(
////             strict ? options.stricted : options.firstRestricted,
////             options.message
////         )
////     }
//// 
////     if (defaultCount === 0) {
////         defaults = []
////     }
//// 
////     return {
////         params: params,
////         defaults: defaults,
////         rest: rest,
////         stricted: options.stricted,
////         firstRestricted: options.firstRestricted,
////         message: options.message
////     }
//// }
//// 
//// function parseArrowFunctionExpression(options, marker) {
////     var previousStrict, previousYieldAllowed, previousAwaitAllowed, body
//// 
////     expect("=>")
//// 
////     previousStrict = strict
////     previousYieldAllowed = state.yieldAllowed
////     state.yieldAllowed = false
////     previousAwaitAllowed = state.awaitAllowed
////     state.awaitAllowed = !!options.async
////     body = parseConciseBody()
//// 
////     if (strict && options.firstRestricted) {
////         throwError(options.firstRestricted, options.message)
////     }
////     if (strict && options.stricted) {
////         throwErrorTolerant(options.stricted, options.message)
////     }
//// 
////     strict = previousStrict
////     state.yieldAllowed = previousYieldAllowed
////     state.awaitAllowed = previousAwaitAllowed
//// 
////     return markerApply(
////         marker,
////         delegate.createArrowFunctionExpression(
////             options.params,
////             options.defaults,
////             body,
////             options.rest,
////             body.type !== Syntax.BlockStatement,
////             !!options.async
////         )
////     )
//// }
//// 
//// function parseAssignmentExpression() {
////     var marker,
////         expr,
////         token,
////         params,
////         oldParenthesizedCount,
////         startsWithParen = false,
////         backtrackToken = lookahead,
////         possiblyAsync = false
//// 
////     if (matchYield()) {
////         return parseYieldExpression()
////     }
//// 
////     if (matchAwait()) {
////         return parseAwaitExpression()
////     }
//// 
////     oldParenthesizedCount = state.parenthesizedCount
//// 
////     marker = markerCreate()
//// 
////     if (matchAsyncFuncExprOrDecl()) {
////         return parseFunctionExpression()
////     }
//// 
////     if (matchAsync()) {
////         // We can't be completely sure that this 'async' token is
////         // actually a contextual keyword modifying a function
////         // expression, so we might have to un-lex() it later by
////         // calling rewind(backtrackToken).
////         possiblyAsync = true
////         lex()
////     }
//// 
////     if (match("(")) {
////         token = lookahead2()
////         if (
////             (token.type === Token.Punctuator && token.value === ")") ||
////             token.value === "..."
////         ) {
////             params = parseParams()
////             if (!match("=>")) {
////                 throwUnexpected(lex())
////             }
////             params.async = possiblyAsync
////             return parseArrowFunctionExpression(params, marker)
////         }
////         startsWithParen = true
////     }
//// 
////     token = lookahead
//// 
////     expr = parseConditionalExpression()
//// 
////     if (
////         match("=>") &&
////         (state.parenthesizedCount === oldParenthesizedCount ||
////             state.parenthesizedCount === oldParenthesizedCount + 1)
////     ) {
////         if (expr.type === Syntax.Identifier) {
////             params = reinterpretAsCoverFormalsList([expr])
////         } else if (
////             expr.type === Syntax.AssignmentExpression ||
////             expr.type === Syntax.ArrayExpression ||
////             expr.type === Syntax.ObjectExpression
////         ) {
////             if (!startsWithParen) {
////                 throwUnexpected(lex())
////             }
////             params = reinterpretAsCoverFormalsList([expr])
////         } else if (expr.type === Syntax.SequenceExpression) {
////             params = reinterpretAsCoverFormalsList(expr.expressions)
////         }
////         if (params) {
////             params.async = possiblyAsync
////             return parseArrowFunctionExpression(params, marker)
////         }
////     }
//// 
//// 
////     if (matchAssign()) {
////         // 11.13.1
////         if (
////             strict &&
////             expr.type === Syntax.Identifier &&
////             isRestrictedWord(expr.name)
////         ) {
////             throwErrorTolerant(token, Messages.StrictLHSAssignment)
////         }
//// 
////         // ES.next draf 11.13 Runtime Semantics step 1
////         if (
////             match("=") &&
////             (expr.type === Syntax.ObjectExpression ||
////                 expr.type === Syntax.ArrayExpression)
////         ) {
////             reinterpretAsAssignmentBindingPattern(expr)
////         } else if (!isLeftHandSide(expr)) {
////             throwError({}, Messages.InvalidLHSInAssignment)
////         }
//// 
////         expr = markerApply(
////             marker,
////             delegate.createAssignmentExpression(
////                 lex().value,
////                 expr,
////                 parseAssignmentExpression()
////             )
////         )
////     }
//// 
////     return expr
//// }
//// 
//// // 11.14 Comma Operator
//// 
//// function parseExpression() {
////     return [parseAssignmentExpression()]
//// }
//// 
//// 
//// function parseObjectTypeIndexer(marker, isStatic) {
////     var id, key, value
//// 
////     id = parseObjectPropertyKey()
////     key = parseType()
////     value = parseType()
//// 
////     return delegate.createObjectTypeIndexer(id, key, value, isStatic)
//// }
//// 
//// 
//// function parseObjectTypeMethod(marker, isStatic, key) {
////     return parseObjectTypeMethodish(marker)
//// }
//// 
//// function parseObjectTypeCallProperty(marker, isStatic) {
////     return parseObjectTypeMethodish(markerCreate())
//// }
//// 
//// function parseObjectType(allowStatic) {
////     var callProperties = [],
////         indexers = [],
////         marker,
////         optional = false,
////         properties = [],
////         propertyKey,
////         propertyTypeAnnotation,
////         token,
////         isStatic,
////         matchStatic
//// 
////     if (match("[")) {
////         indexers.push(parseObjectTypeIndexer(marker, isStatic))
////     } else if (match("(") || match("<")) {
////         callProperties.push(
////             parseObjectTypeCallProperty(marker, allowStatic)
////         )
////     } else {
////         if (isStatic && match(":")) {
////             propertyKey = markerApply(
////                 marker,
////                 delegate.createIdentifier(token)
////             )
////             throwErrorTolerant(token, Messages.StrictReservedWord)
////         } else {
////             propertyKey = parseObjectPropertyKey()
////         }
////         if (match("<") || match("(")) {
////             // This is a method property
////             properties.push(
////                 parseObjectTypeMethod(marker, isStatic, propertyKey)
////             )
////         } else {
////             propertyTypeAnnotation = parseType()
////             properties.push(
////                 markerApply(
////                     marker,
////                     delegate.createObjectTypeProperty(
////                         propertyKey,
////                         propertyTypeAnnotation,
////                         optional,
////                         isStatic
////                     )
////                 )
////             )
////         }
////     }
//// 
////     return [
////         properties,
////         indexers,
////         callProperties
////     ]
//// }
//// 
//// function parseGenericType() {
////     var marker = markerCreate(),
////         typeParameters = null,
////         typeIdentifier
//// 
////     typeIdentifier = parseVariableIdentifier()
//// 
////     while (match(".")) {
////         expect(".")
////         typeIdentifier = markerApply(
////             marker,
////             delegate.createQualifiedTypeIdentifier(
////                 typeIdentifier,
////                 parseVariableIdentifier()
////             )
////         )
////     }
//// 
////     if (match("<")) {
////         typeParameters = parseTypeParameterInstantiation()
////     }
//// 
////     return markerApply(
////         marker,
////         delegate.createGenericTypeAnnotation(typeIdentifier, typeParameters)
////     )
//// }
//// 
//// function parseTypeofType() {
////     var argument,
////         marker = markerCreate()
////     expectKeyword("typeof")
////     argument = parsePrimaryType()
////     return markerApply(
////         marker,
////         delegate.createTypeofTypeAnnotation(argument)
////     )
//// }
//// 
//// // The parsing of types roughly parallels the parsing of expressions, and
//// // primary types are kind of like primary expressions...they're the
//// // primitives with which other types are constructed.
//// function parsePrimaryType() {
////     var params = null,
////         returnType = null,
////         marker = markerCreate(),
////         rest = null,
////         tmp,
////         typeParameters,
////         token,
////         type,
////         isGroupedType = false
//// 
////     switch (lookahead.type) {
////         case Token.Identifier:
////             switch (lookahead.value) {
////                 case "any":
////                     lex()
////                     return markerApply(
////                         marker,
////                         delegate.createAnyTypeAnnotation()
////                     )
////                 case "bool": // fallthrough
////                 case "boolean":
////                     lex()
////                     return markerApply(
////                         marker,
////                         delegate.createBooleanTypeAnnotation()
////                     )
////                 case "number":
////                     lex()
////                     return markerApply(
////                         marker,
////                         delegate.createNumberTypeAnnotation()
////                     )
////                 case "string":
////                     lex()
////                     return markerApply(
////                         marker,
////                         delegate.createStringTypeAnnotation()
////                     )
////             }
////             return markerApply(marker, parseGenericType())
////         case Token.Punctuator:
////             switch (lookahead.value) {
////                 case "{":
////                     return markerApply(marker, parseObjectType())
////                 case "<":
////                     typeParameters = parseTypeParameterDeclaration()
////                     expect("(")
////                     tmp = parseFunctionTypeParams()
////                     params = tmp.params
////                     rest = tmp.rest
////                     expect(")")
//// 
////                     expect("=>")
//// 
////                     returnType = parseType()
//// 
////                     return markerApply(
////                         marker,
////                         delegate.createFunctionTypeAnnotation(
////                             params,
////                             returnType,
////                             rest,
////                             typeParameters
////                         )
////                     )
////                 case "(":
////                     lex()
////                     // Check to see if this is actually a grouped type
////                     if (isGroupedType) {
////                         return parseType()
////                     }
//// 
////                     tmp = parseFunctionTypeParams()
////                     returnType = parseType()
//// 
////                     return markerApply(
////                         marker,
////                         delegate.createFunctionTypeAnnotation(
////                             params,
////                             returnType,
////                             rest,
////                             null /* typeParameters */
////                         )
////                     )
////             }
////             break
////         case Token.Keyword:
////             return markerApply(marker, parseTypeofType())
////             break
////     }
//// 
////     throwUnexpected(lookahead)
//// }
//// 
//// function parsePostfixType() {
////     return parsePrimaryType()
//// }
//// 
//// function parsePrefixType() {
////     return parsePostfixType()
//// }
//// 
//// function parseIntersectionType() {
////     var marker = markerCreate(),
////         type,
////         types
////     type = parsePrefixType()
////     types = [type]
////     while (match("&")) {
////         lex()
////         types.push(parsePrefixType())
////     }
//// 
////     return types.length === 1
////         ? type
////         : markerApply(
////               marker,
////               delegate.createIntersectionTypeAnnotation(types)
////           )
//// }
//// 
//// function parseUnionType() {
////     var marker = markerCreate(),
////         type,
////         types
////     type = parseIntersectionType()
////     types = [type]
////     while (match("|")) {
////         lex()
////         types.push(parseIntersectionType())
////     }
////     return types.length === 1
////         ? type
////         : markerApply(marker, delegate.createUnionTypeAnnotation(types))
//// }
//// 
//// function parseType() {
////     var oldInType = state.inType,
////         type
////     state.inType = true
//// 
////     type = parseUnionType()
//// 
////     state.inType = oldInType
////     return type
//// }
//// 
//// function parseTypeAnnotation() {
////     var marker = markerCreate(),
////         type
//// 
////     expect(":")
////     type = parseType()
//// 
////     return markerApply(marker, delegate.createTypeAnnotation(type))
//// }
//// 
//// function parseClassElement() {
////     var computed = false,
////         generator = false,
////         key,
////         marker = markerCreate(),
////         isStatic = false,
////         possiblyOpenBracketToken
////     key = parseObjectPropertyKey()
//// 
////     if (!generator && lookahead.value === ":") {
////         return markerApply(
////             marker,
////             parseClassProperty(key, computed, isStatic)
////         )
////     }
//// 
////     return markerApply(
////         marker,
////         parseMethodDefinition(key, isStatic, generator, computed)
////     )
//// }
//// 
//// function parseClassBody() {
////     var classElements = []
////     while (index < length) {
////         classElements.push(parseClassElement({}))
////     }
////     return markerApply(marker, delegate.createClassBody(classElements))
//// }
//// 
//// function parseClassExpression() {
////     var id,
////         implemented,
////         previousYieldAllowed,
////         superClass = null,
////         superTypeParameters,
////         marker = markerCreate(),
////         typeParameters,
////         matchImplements
//// 
////     return markerApply(
////         marker,
////         delegate.createClassExpression(
////             id,
////             superClass,
////             parseClassBody(),
////             typeParameters,
////             superTypeParameters,
////             implemented
////         )
////     )
//// }
verify.baselineCompletions()
