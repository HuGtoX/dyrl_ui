# TypeScript

## 1. keyof

- 用途：keyof 操作符用于获取一个对象类型的所有键的联合类型。
- 语法：keyof T
- 示例：

```typescript
interface Person {
  name: string;
  age: number;
}

type PersonKey = keyof Person; // "name" | "age"
```

## 2. typeof

- 用途: typeof 操作符用于获取一个值的类型。
- 语法: typeof v
- 示例一:

```typescript
const person = { name: "TypeScript", age: 18 };
type PersonType = typeof person; // { name: string; age: number; }
```

- 示例二:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

type AddParameters = Parameters<typeof add>; // [a: number, b: number]
type AddReturnType = ReturnType<typeof add>; // number
```

## 3. 泛型

泛型指的是在定义函数/接口/类型时，不预先指定具体的类型，而是在使用的时候在指定类型限制的一种特性。

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

示例解析：

1. 泛型参数
   <code><T, K extends keyof T></code>
   T 是一个泛型参数，表示传入的对象的类型。
   K 是另一个泛型参数，表示传入的键的类型。K extends keyof T 表示 K 必须是 T 类型对象的键之一。
2. 函数签名
   <code>function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]</code>
   - obj: T：表示函数的第一个参数 obj 是类型为 T 的对象。
   - key: K：表示函数的第二个参数 key 是类型为 K 的键，K 必须是 T 类型对象的键之一。
   - T[K] 表示函数的返回值类型是 T 类型对象中 key 对应的值的类型。
3. 函数体
   <code>return obj[key];</code>
   这行代码返回 obj 对象中 key 对应的值。由于 key 是 T 类型对象的键之一，因此 obj[key] 的类型是 T[K]。

## 4. extends

::: info
[typescript-继承:extends](https://www.cnblogs.com/jiaxin2015/p/16712041.html)
:::

在 TypeScript 中，extends 关键字主要用于泛型约束和继承。下面分别介绍这两种用法，并提供相应的示例。

**1. 泛型约束**  
 在泛型中，extends 关键字用于限制泛型参数的类型，确保它满足某些条件。这可以提高类型安全性，使代码更加健壮。

```typescript
interface Ia {
  id: string;
}
// T extends Ia  T继承了Ia，Ia拥有id属性，所以T必须拥有id属性
// 所以调用该函数传递的参数必须包括id属性，从而实现了类型约束
function logName<T extends Ia>(val: T) {}
```

:::warning 注意
需要理解的是，这里A extends B，是指类型A必须要包含类型B，而不是说类型A是类型B的子集。
:::

**2. 类继承**  
 在类中，extends 关键字用于实现类的继承，子类可以继承父类的属性和方法。

```typescript
  class Ca {
      id：string
  }
  class Cb extends Ca {
      name：string
  }
```

**3. 接口继承**  
 在接口中，extends 关键字用于实现接口的继承，子接口可以继承父接口的属性和方法。

```js
interface Ia {
    id：string
}
// 接口Ib继承了Ia，Ib拥有Ia的所有属性，并且可以有自己的属性
interface Ib extends Ia {
    name：string
}
```

**4. 条件类型与高阶类型**  
extends 还有一大用途就是用来判断一个类型是不是可以分配给另一个类型，这在写高级类型的时候非常有用。

```js
  type A1 = "x" extends "x" ? string : number; // string
  type A2 = "x" | "y" extends "x" ? string : number; // number
  type P<T> = T extends "x" ? string : number;
  type A3 = P<"x" | "y">; // ?
```

- A1和A2是extends条件判断的普通用法，即泛型约束中所提到的条件判断。
- P是带参数T的泛型类型，其表达式和A1，A2的形式完全相同，A3是泛型类型P传入参数'x' | 'y'得到的类型
- 如果将'x' | 'y'带入泛型类的表达式中是什么结果。

```js
type P<T> = T extends "x" ? string : number;
type A3 = P<"x" | "y">; // A3的类型是 string | number
```

该例中，extends的前参为T，T是一个泛型参数。在A3的定义中，给T传入的是'x'和'y'的联合类型'x' | 'y'，满足分配律，于是'x'和'y'被拆开，分别代入P(T) 然后将每一项代入得到的结果联合起来，得到string | number

总之，满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型

:::tip
extends在ts中是比较重要的基础类型，在后续出现的类型原理中都会借用到该类型来实现，建议认真阅读一下案例并理解其用法。
:::

## 5. Pick

用于从已有的类型中选择一组属性，生成一个新的类型  
示例：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
type UserContactInfo = Pick<User, "name" | "email">;

const contactInfo: UserContactInfo = {
  name: "Moment",
  email: "moment@qq.com",
};
```

约束泛型参数的高级写法，即Pick类型的实现原理

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// P in K 表示循环 K 中的每个属性 P，并将其添加到新的类型中。
```

## 6. Omit

Omit则刚好与Pick相反，用于从已有的类型中排除一组属性，生成一个新的类型

```typescript
interface User {
  name: string;
  age: number;
  like: string;
}
type User1 = Omit<User, "name" | "age">;
// 相当于
interface User1 {
  like: string;
}
```

实现原理  
这一部分的实现原理使用到了Exclude类型，可以先看Exclude部分，理解完Exclude后再返回来看。

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

## 7. Exclude

Exclude<T,U>简单来说就是取T的差集，也就是T中不存在于U中的属性集合。

示例：

```typescript
type A = "age" | "name";
type B = "like" | "name";
type C = Exclude<A, B>;

// 相当于
type C = "age";
type A = "age" | "name";
type B = "age" | "name" | "height";
type C = Exclude<A, B>;

// 相当于
never;
```

实现原理  
这一部分不理解的话可以复习一下extends的条件类型与高阶类型用法。

```typescript
// Exclude源码
type Exclude<T, U> = T extends U ? never : T;
```
