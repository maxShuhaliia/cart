//---------------------------------------- 7 ----------------------------
//function sum(a, b){
//    s = a + b;
//    return s;
//}
//
//function product(a, b) {
//    var p = a * b;
//    return p ;
//}
//
//s = 2;
//p = 5;
//
//p = sum(s, p);
//s = product(p, s);
//
//console.log("S = " + s + ", P = " + p);
//-------------------------------------------------  8  ------------------------------------

//var arr = [3, 4, 5];
//
//Array.prototype.each = function(){}
//
//
//for(var i in arr) {
//    console.log(i);
//}

//-------------------------------------------------  10  -------------------------------------------------

//(function(){
//    console.log(typeof arguments);
//})();
//------------------------------------------------- 12  ----------------------------------------------------

//(function(x) {
//    delete x;
//   console.log(x);
//})(1)

//-----------------------------------------------  14  ----------------------------------------------------

//var foo = {
//    bar : function() {
//        return this.baz;
//    },
//    baz: 1
//};
//(function() {
//        console.log(typeof arguments[0]());
//
//    }
//)(foo.bar)

//------------------------------------------------  17  ---------------------------------------------------
//(function(foo){
//    console.log(typeof foo.bar);
//})({foo:{bar:1}});
//
//-----------------------------------------------  18  ---------------------------------------------------
//(function f(){
//    function f(){ return 1};
//    console.log(f());
//    function f() { return 2};
//
//})();

var A = function(){}
A.sayHello = function(){
    console.log("hello");
}

var a = new A();

console.dir(a.__proto__);