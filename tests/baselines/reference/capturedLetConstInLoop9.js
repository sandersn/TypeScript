//// [capturedLetConstInLoop9.ts]
for (let x = 0; x < 1; ++x) {
    let x;
    (function() { return x });
    {
        let x;
        (function() { return x });
    }

    try { }
    catch (e) {
        let x;
        (function() { return x });
    }

    switch (x) {
        case 1:
            let x;
            (function() { return x });
           break;
    }
    
    while (1 == 1) {
        let x;
        (function() { return x });
    }
    
    class A {
        m() {
            return x + 1;
        }
    }
}

declare function use(a: any);

function foo() {
    l0:
    for (let a of []) {
        
        if (a === 1) {
            break;
        }
        
        if (a === 2) {
            break l0;
        }
        
        for (let b of []) {
            var [{x, y:z}] = [{x:1, y:2}];
            if (b === 1) {
                break;
            }
            
            
            if (b === 2) {
                break l0;
            }
            
            l1:
            if (b === 3) {
                break l1;
            }
            
            return 50;
        }

        for (let b of []) {
            var [{x1, y:z1}] = [{x1:1, y:arguments.length}];
            if (b === 1) {
                break;
            }
            
            if (b === 2) {
                break l0;
            }
            
            () => b
            return 100;
        }

        
        () => a;
    }
    
    use(x);
    use(z);
    use(x1);
    use(z1);
}

function foo2() {
    for (let x of []) {
        if (x === 1) {
            break;
        }
        else if (x === 2) {
            continue;
        }
        
        while (1 === 1) {
            if (x) {
                break;
            }
            else {
                continue;
            }
        }
        
        switch(x) {
            case 1: break;
            case 2: continue;
        }
        
        for (let y of []) {
            switch(y) {
                case 1: break;
                case 2: continue;
            }
        }
    }
}

class C {
    constructor(private N: number) { }
    foo() {
        for (let i = 0; i < 100; i++) {
            let f = () => this.N * i;
        }
    }
}

function foo3 () {
    let x = arguments.length;
    for (let y of []) {
        let z = arguments.length;
        (function() { return y + z + arguments.length; });
    }
}

//// [capturedLetConstInLoop9.js]
var _loop_1 = function(x) {
    var x_1;
    (function () { return x_1; });
    {
        var x_2;
        (function () { return x_2; });
    }
    try { }
    catch (e) {
        var x_3;
        (function () { return x_3; });
    }
    switch (x_1) {
        case 1:
            var x_4;
            (function () { return x_4; });
            break;
    }
    var _loop_2 = function() {
        var x_5;
        (function () { return x_5; });
    };
    while (1 == 1) {
        _loop_2();
    }
    var A = (function () {
        function A() {
        }
        A.prototype.m = function () {
            return x_1 + 1;
        };
        return A;
    }());
};
for (var x = 0; x < 1; ++x) {
    _loop_1(x);
}
function foo() {
    var _loop_3 = function(a) {
        if (a === 1) {
            return "break";
        }
        if (a === 2) {
            return "break-l0";
        }
        for (var _i = 0, _a = []; _i < _a.length; _i++) {
            var b = _a[_i];
            _b = [{ x: 1, y: 2 }][0], x = _b.x, z = _b.y;
            if (b === 1) {
                break;
            }
            if (b === 2) {
                return "break-l0";
            }
            l1: if (b === 3) {
                break l1;
            }
            return { value: 50 };
        }
        var _loop_4 = function(b) {
            _c = [{ x1: 1, y: arguments_1.length }][0], x1 = _c.x1, z1 = _c.y;
            if (b === 1) {
                return "break";
            }
            if (b === 2) {
                return "break-l0";
            }
            (function () { return b; });
            return { value: 100 };
        };
        for (var _d = 0, _e = []; _d < _e.length; _d++) {
            var b = _e[_d];
            var state_3 = _loop_4(b);
            if (typeof state_3 === "object") return state_3;
            if (state_3 === "break") break;
            switch(state_3) {
                case "break-l0": return state_3;
            }
        }
        (function () { return a; });
    };
    var arguments_1 = arguments;
    var x, z, x1, z1;
    l0: for (var _f = 0, _g = []; _f < _g.length; _f++) {
        var a = _g[_f];
        var state_4 = _loop_3(a);
        if (typeof state_4 === "object") return state_4.value
        if (state_4 === "break") break;
        switch(state_4) {
            case "break-l0": break l0;
        }
    }
    use(x);
    use(z);
    use(x1);
    use(z1);
}
function foo2() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x = _a[_i];
        if (x === 1) {
            break;
        }
        else if (x === 2) {
            continue;
        }
        while (1 === 1) {
            if (x) {
                break;
            }
            else {
                continue;
            }
        }
        switch (x) {
            case 1: break;
            case 2: continue;
        }
        for (var _b = 0, _c = []; _b < _c.length; _b++) {
            var y = _c[_b];
            switch (y) {
                case 1: break;
                case 2: continue;
            }
        }
    }
}
var C = (function () {
    function C(N) {
        this.N = N;
    }
    C.prototype.foo = function () {
        var _this = this;
        var _loop_5 = function(i) {
            var f = function () { return _this.N * i; };
        };
        for (var i = 0; i < 100; i++) {
            _loop_5(i);
        }
    };
    return C;
}());
function foo3() {
    var x = arguments.length;
    var _loop_6 = function(y) {
        var z = arguments_2.length;
        (function () { return y + z + arguments.length; });
    };
    var arguments_2 = arguments;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var y = _a[_i];
        _loop_6(y);
    }
}
