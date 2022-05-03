---
date: 2022-03-21 16:55:00
title: ES6 学习笔记
feed:
  enable: true
---
# ES6 学习

## let 和 const 命令

### let

`let` 可以用来声明变量,与`var`类似,但是只在**所在代码块有效**,在代码块外无效,在一个代码块中,`let`命令声明的变量**强制绑定了对应的变量名**,此变量名无法做它用,即,若是`let`在代码块中声明了一个与外界变量相同名称的变量,则**外界的变量就不能在此代码块中使用**,在`let`声明这个变量之前的区域,使用此变量名称的变量就会报错.

`let`无法重复声明同一个名称的变量

### const

`const`声明的变量是只读的,声明后变量无法被改变.如果没有初始化,则会报错.`const`作用域与`let`相同.

`const`的只读实际上是对于变量指向的地址而言,如果是简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

## 变量的解构赋值

`ES6 `允许这样进行赋值,等号右边值的数量必须大于或等于左边变量的数量,否则会有部分变量解构失败,就是等于`undefined`

```javascript
let [a, b, c] = [1, 2, 3];
```

解构不仅可以用于数组，还可以用于对象,这时候就是按照属性名与变量名的对应关系来进行赋值.

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
```

如果想要变量与属性名不一样,则需要这样写,变量`baa`就可以获得右边对象中`foo`属性的值:

```javascript
let { foo: baa } = { foo: 'aaa', bar: 'bbb' };
```

解构也可以用于嵌套结构的对象:

```javascript
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

也可以指定默认值:

```javascript
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5
```

字符串也可以被解构:

```javascript
const [a, b, c, d, e] = 'hello';
```

调用函数的时候,其参数也可以使解构来赋值:

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

也可以解构`Map`:

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```



## 字符串的扩展

字符串可以被遍历:

```javascript
for (let codePoint of 'foo') {
  console.log(codePoint)
}
```

可以使用模板字符串,它是使用  **`**  符号包裹起来,可以定义多行的字符串也可以嵌入变量或者调用方法或者其他表达式,如果使用模板字符串表示多行字符串:

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
let name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
```

如果想要在模板字符串中使用  **`**  ,可以用反斜杠转义:

```javascript
let greeting = `\`Yo\` World!`;
```

### 新增方法

1. String.fromCodePoint()

   用于从 Unicode 码点返回对应字符

2. String.raw()

   该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串

3. 实例方法:codePointAt()

   用于返回对应位置的一个字符的码点

4. 实例方法:normalize()

   用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

5. 实例方法：includes(), startsWith(), endsWith()

   - **includes()**：返回布尔值，表示是否找到了参数字符串。
   - **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
   - **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

6. 实例方法：repeat()  

   `repeat`方法返回一个新字符串，表示将原字符串重复n次。

7. 实例方法：padStart()，padEnd()

   `padStart()`用于将字符从头部补全到指定长度

   `padEnd()`用于将字符从尾部补全到指定长度。

   第一个参数是补全后的字符串长度,第二个参数是补充所使用的字符串

8. 实例方法：trimStart()，trimEnd()

   `trimStart()`消除字符串头部的空格

   `trimEnd()`消除尾部的空格

9. 实例方法：matchAll()

   `matchAll()`方法返回一个正则表达式在当前字符串的所有匹配

## 正则表达式的扩展

如果`RegExp`构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```javascript
new RegExp(/abc/ig, 'i').flags
// "i"
```

添加了`u`修饰符,用于处理大于`\uFFFF`的 Unicode 字符,例如使用正则表达式的`.`匹配大于`\uFFFF`的 Unicode 字符时,匹配不到,使用`u`修饰符即可匹配到:

```javascript
var s = '𠮷';

/^.$/.test(s) // false
/^.$/u.test(s) // true
```

## 数值的扩展

1. 二进制和八进制表示法

   ES6 提供了二进制和八进制数值的新的写法，分别用前缀`0b`（或`0B`）和`0o`（或`0O`）表示。

   `0b`表示二进制

   `0o`表示八进制

   ```javascript
   0b111110111 === 503 // true
   0o767 === 503 // true
   ```

2. `Number.isFinite()`

用来检查一个数值是否为有限的

3. `Number.isNaN()`

   用来检查一个值是否是`NaN`

4. `Number.parseInt()`

   解析为整型

5. `Number.parseFloat()`

   解析为浮点型

6. `Number.isInteger()`

   判断一个数值是否是整数

7. Number.EPSILON

   表示1 与大于 1 的最小浮点数之间的差

8. Number.isSafeInteger()

   `JavaScript`中超出 2 的 53 次方之后,一个数就不精确了。这个方法用来判断一个整数是否落在这个范围之内

9. 指数运算符

   新增了一个指数运算符（`**`）

   ```javascript
   2 ** 2 // 4
   2 ** 3 // 8
   ```

10. BigInt 数据类型

    BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。为了与 Number 类型区别，BigInt 类型的数据必须添加后缀`n`。

    ```javascript
    1234 // 普通整数
    1234n // BigInt
    
    // BigInt 的运算
    1n + 2n // 3n
    ```

    BigInt 不能与普通数值进行混合运算。

    ```javascript
    1n + 1.3 // 报错
    ```

11. 

12. 

13. 



## 函数的扩展

1. ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

```javascript
function log(x, y = 'World') {
  console.log(x, y);
}
```

使用参数默认值时，函数不能有同名参数,并且有默认值的参数必须在参数列表的末尾.

2. 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

```javascript
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo()
// Error: Missing parameter
```

3. rest 参数

   rest 参数（形式为`...变量名`），用于获取函数的多余参数

   ```javascript
   function add(...values) {
     let sum = 0;
   
     for (var val of values) {
       sum += val;
     }
   
     return sum;
   }
   ```

   rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

4. name 属性

   函数的`name`属性，返回该函数的函数名。

   ```javascript
   function foo() {}
   foo.name // 
   ```

5. 箭头函数

   允许使用“箭头”（`=>`）定义函数。

   ```javascript
   var f = v => v;
   ```

   如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。

   ```javascript
   var sum = (num1, num2) => { return num1 + num2; }
   ```

   **箭头函数有几个使用注意点:**

   （1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

   （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

   （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

   （4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

6. 尾调用优化

   尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接**用内层函数的调用帧，取代外层函数的调用帧**就可以了。在尾递归调用中可以节省很多的资源.

7.  Function.prototype.toString()

   `toString()`方法返回函数代码本身，包括注释和空格。

8. catch 命令的参数省略

   ```javascript
   try {
     // ...
   } catch {
     // ...
   }
   ```

## 数组的扩展

1. 扩展运算符

   扩展运算符（spread）是三个点（`...`）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。可以复制数组,合并数组

2. Array.from

   `Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

   下面是一个类似数组的对象，`Array.from`将它转为真正的数组。

   ```javascript
   let arrayLike = {
       '0': 'a',
       '1': 'b',
       '2': 'c',
       length: 3
   };
   
   // ES5的写法
   var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
   
   // ES6的写法
   let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
   ```

3. Array.of

   `Array.of`方法用于将一组值，转换为数组。

4. 数组实例的 copyWithin()

   数组实例的`copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

   ```javascript
   Array.prototype.copyWithin(target, start = 0, end = this.length)
   ```

   它接受三个参数。

   - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
   - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
   - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

   ```javascript
   // 将3号位复制到0号位
   [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
   // [4, 2, 3, 4, 5]
   
   // -2相当于3号位，-1相当于4号位
   [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
   // [4, 2, 3, 4, 5]
   ```

5. 数组实例的 find() 和 findIndex()

   数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

   ```javascript
   [1, 4, -5, 10].find((n) => n < 0)
   // -5
   ```

   数组实例的`findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`。

6. 数组实例的 fill()

   `fill`方法使用给定值，填充一个数组。

   ```javascript
   ['a', 'b', 'c'].fill(7)
   // [7, 7, 7]
   
   new Array(3).fill(7)
   ```

   `fill`方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

7. 数组实例的 entries()，keys() 和 values()

   ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用`for...of`循环进行遍历，唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历。

8. 数组实例的 includes()

   `Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。

9. 数组实例的 flat()

   数组的成员有时还是数组，`Array.prototype.flat()`用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

   ```javascript
   [1, 2, [3, 4]].flat()
   // [1, 2, 3, 4]
   ```

   上面代码中，原数组的成员里面有一个数组，`flat()`方法将子数组的成员取出来，添加在原来的位置。

   `flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数，默认为1。

   ```javascript
   [1, 2, [3, [4, 5]]].flat()
   // [1, 2, 3, [4, 5]]
   
   [1, 2, [3, [4, 5]]].flat(2)
   // [1, 2, 3, 4, 5]
   ```

10. 数组实例的flatMap()

    `flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组。

    ```javascript
    // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
    [2, 3, 4].flatMap((x) => [x, x * 2])
    // [2, 4, 3, 6, 4, 8]
    ```

    `flatMap()`只能展开一层数组。

## 对象的扩展

1. 属性的简洁表示法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}
```

除了属性简写，方法也可以简写。

```javascript
const o = {
  method() {
    return "Hello!";
  }
};
```

2. 属性名表达式

   JavaScript 定义对象的属性，有两种方法。

   ```javascript
   // 方法一
   obj.foo = true;
   
   // 方法二
   obj['a' + 'bc'] = 123;
   ```

   允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

   ```javascript
   let propKey = 'foo';
   
   let obj = {
     [propKey]: true,
     ['a' + 'bc']: 123
   };
   ```

   表达式还可以用于定义方法名。

   ```javascript
   let obj = {
     ['h' + 'ello']() {
       return 'hi';
     }
   };
   ```

   **注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`**

3. 属性的遍历

   ES6 一共有 5 种方法可以遍历对象的属性。

   **（1）for...in**

   `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

   **（2）Object.keys(obj)**

   `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

   **（3）Object.getOwnPropertyNames(obj)**

   `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

   **（4）Object.getOwnPropertySymbols(obj)**

   `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

   **（5）Reflect.ownKeys(obj)**

   `Reflect.ownKeys`返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

4. super 关键字

   我们知道，`this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。

5. 扩展运算符

   对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

   ```javascript
   let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
   x // 1
   y // 2
   z // { a: 3, b: 4 }
   ```

   对象的扩展运算符（`...`）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

   ```javascript
   let z = { a: 3, b: 4 };
   let n = { ...z };
   n // { a: 3, b: 4 }
   ```

6. 链判断运算符

   “链判断运算符”`?.`可以判断左边的对象是否为`null`不是的话就继续运行下去.如果是`null`则返回`undefined`

7. Null 判断运算符

    Null 判断运算符`??`。它的行为类似`||`，但是只有运算符左侧的值为`null`或`undefined`时，才会返回右侧的值。

   ```javascript
   const headerText = response.settings.headerText ?? 'Hello, world!';
   const animationDuration = response.settings.animationDuration ?? 300;
   const showSplashScreen = response.settings.showSplashScreen ?? true;
   ```

## Set 和 Map 数据结构

### Set

`Set`本身是一个构造函数，用来生成 Set 数据结构。`Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。向 Set 加入值的时候，不会发生类型转换.

Set 结构的实例有以下属性。

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

四个操作方法:

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

遍历方法:

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

**WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。**

**首先，WeakSet 的成员只能是对象，而不能是其他类型的值。**

### Map

`map`类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

操作方法:

- `Map.set()`:设置键值对
- `Map.get()`:根据一个键获取一个值
- `Map.has()`:判断一个键是否存在
- `Map.delete()`:根据一个键删除一个键值对
- `Map.clear()`:清除所有键值对

遍历方法:

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。`WeakMap`的键名所指向的对象，不计入垃圾回收机制。