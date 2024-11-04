# Nodejs

## cjs/esm module

Node.js 有两个模块系统：CommonJS 模块和 ECMAScript 模块。

1. 关于全局变量引用问题

   在cjs中，每个模块都有自己的exports、require、module、**filename、**dirname等全局变量，可以理解为模块的私有变量。

   ```js
   // 在执行模块代码之前，Node.js 将使用如下所示的函数封装器对其进行封装：
   (function (exports, require, module, __filename, __dirname) {
     // Module code actually lives in here
   });
   ```

   它有助于提供一些实际特定于模块的全局变量，例如：

   - module 和 exports 对象，实现者可以用来从模块中导出值。
   - 便利变量 **\_\_filename** 和 **\_\_dirname**，包含模块的绝对文件名和目录路径

   因此在esm文件的写法中要实现\_\_filename和\_\_dirname，需要使用import.meta.url进行转换

   ***

   (1) import.meta.url  
    import.meta 包含当前模块的一些信息，其中 import.meta.url 表示当前模块的 file: 绝对路径，拿到这个绝对路径我们就可以配合其他 API 来实现 \_\_filename 和 \_\_dirname。

   ```js
   console.log(import.meta.url);
   ```

   (2) fileURLToPath  
    接下来需要把 file 协议转换成路径，我们需要借助 Node.js 内部 url 模块的 fileURLToPath API。

   ```js
   import { fileURLToPath } from "node:url";
   console.log(fileURLToPath(import.meta.url));
   ```

   (3) \_\_filename  
    通过 import.meta.url 和 fileURLToPath 我们能很容易模仿 \_\_filename API。

   ```js
   const __filename = fileURLToPath(import.meta.url);
   ```

   (4) \_\_dirname  
   path.dirname() 方法返回 path 的目录名  
   我们已经拿到了 \_\_filename 的值，实现 \_\_dirname 就简单了，借助 Node.js 的内部模块 path 的 dirname 方法来实现：

   ```js
   import { dirname } from "node:path";
   import { fileURLToPath } from "node:url";

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);
   ```
