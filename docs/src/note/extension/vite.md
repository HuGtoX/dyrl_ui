# vite 配置

## vite.config.ts 配置常见问题

**问题：如何在配置文件中获取环境变量**  
参考： https://cn.vite.dev/config/

在node环境中，环境变量通常可以从 process.env 获得。  
但是 Vite 默认是不加载 .env 文件的，因为这些文件需要在执行完 Vite 配置后才能确定加载哪一个，举个例子，root 和 envDir 选项会影响加载行为。  
不过当你的确需要时，你可以使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件。

```ts
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
```
