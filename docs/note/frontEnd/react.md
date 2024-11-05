# React

## React.ReactElement 和 React.ReactNode

ReactElement 和 ReactNode 的区别：

- ReactElement 是 React 用于描述界面元素的具体对象。
- ReactNode 则是一个更广泛的类型，可以包含 ReactElement 以及其他可渲染的内容，如字符串、数字、数组等。

## React.cloneElement

React.cloneElement 是 React 提供的一个实用函数，用于克隆并返回一个新的 React 元素。这个函数通常用于在不影响原始元素的情况下，向元素添加新的属性或替换现有的属性。这对于高阶组件（HOCs）和渲染 props 模式非常有用。
