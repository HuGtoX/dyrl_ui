# Javascript 部分

::: info
前端面试汇总(https://www.yuque.com/cuggz/interview/vgbphi#06e885655e9c032917ba41737b624d8d)
:::

## 一、数据类型

### 1. JavaScript的数据类型

JS一共有八种数据类型：Undefined、Null、Boolean、Number、String、Symbol、Object、BigInt。

#### ES6中新增的数据类型：

##### (1) Symbol

Symbol用于创建一个唯一的标识符，表示独一无二不可改变的值，它主要是为了解决可能出现的全局变量冲突的问题。  
 **用法：**

```js
// 创建 Symbol 的时候，可以添加一个描述。
const flag = Symbol("flag");
// ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
flag.description; // "flag"
```

**实例：消除魔术字符串**  
 通常我们会使用键值对来定义变量，避免它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

```js
const shapeType = {
triangle: "Triangle",
};
function getArea(shape) {
let area = 0;
if(shape === shapeType.triangle) {....}
return
}
getArea(shapeType.triangle);
```

如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```js
const shapeType = {
  triangle: Symbol(),
};
```

##### (2) BigInt

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

### 2. 判断数据类型的方法

#### (1) typeof

- 语法：typeof operand，其中operand是要判断类型的变量或表达式。
- 用途：用于确定一个变量的数据类型，返回一个字符串表示该变量的类型。例如：

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof []); // object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

::: warning
其中数组、对象、null都会被判断为object，其他判断都正确。
:::

#### (2) instanceof

instanceof可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

- 语法：object instanceof constructor，其中object是一个对象实例，constructor是一个构造函数。
- 用途：用于判断一个对象是否是某个构造函数的实例。例如：

```js
console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false

console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

::: warning
可以看到，instanceof只能正确判断引用数据类型，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
:::

#### (3) constructor

```js
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true
```

::: warning
constructor有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了：
:::

#### (4) Object.prototype.toString.call ()

这是一种较为准确和通用的判断数据类型的方法。它通过调用对象的toString方法，并传入要判断的变量，返回一个表示数据类型的字符串。例如：

```js
const types = [
  42,
  "hello",
  true,
  undefined,
  null,
  {},
  function () {},
  new Date(),
  /regex/,
  new Error(),
];

types.forEach((type) => {
  console.log(Object.prototype.toString.call(type));
});

// 输出结果
[object Number]
[object String]
[object Boolean]
[object Undefined]
[object Null]
[object Object]
[object Function]
[object Date]
[object RegExp]
[object Error]
```

同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？
::: warning
这是因为toString是Object的原型方法，而Array、function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。
:::
