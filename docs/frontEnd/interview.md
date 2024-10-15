# 面试复盘

## react面试题

### 1. 类组件和函数组件的区别

类组件和函数组件是两种不同的组件实现方式，但最终的呈现效果是一致的。

**区别**

1. 设计思想

- 类组件是OOP的设计思想，因此存在继承和状态管理等
- 函数组件则与普通函数一致，假定输入和输出存在某种关联的话，那么相同输入必定会有相同的输出

2. 写法不同

- 类组件使用类的语法进行定义，继承自 React.Component 类，需要实现 render() 方法返回 JSX；函数组件使用函数的语法定义，接收 props 对象作为参数，返回 JSX。

3. 灵活性

- 函数组件通常比类组件更简洁和易于理解，适合只需要根据输入 props 渲染内容的场景，
  并且可通过hooks替代类组件中的状态管理和生命周期的实现。

**总结**  
函数组件语法更短、更简单，这使得它更容易开发、理解和测试。

### 2. React Hooks有哪些？

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

1. State Hook : useState、useReducer
2. Context Hook : useContext
3. Ref Hook: useRef
4. Effect Hook: useEffect
5. Performance Hook ：useMemo、useCallback
