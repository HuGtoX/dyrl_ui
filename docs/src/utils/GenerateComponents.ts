function extractComponentName(path) {
  const regex = /\/([^/]+)\/index\.vue$/;
  const match = path.match(regex);
  return match ? match[1] : null;
}
/**
 * 注册组件到应用上下文中。
 *
 * @param appContext 应用上下文对象
 * @param name 组件名称
 * @param mod 组件模块
 */
function registerComponent(appContext, name, mod) {
  if (mod.default) {
    appContext.component(name, mod.default);
  } else {
    console.warn(
      `Skipped registration for ${name} as it does not have a default export or name.`
    );
  }
}

async function GenerateComponents(appContext) {
  try {
    const modules = import.meta.glob(
      "@root/src/uni_modules/dyrl_ui/components/*/*.vue"
    );
    for (const path in modules) {
      const component_name = extractComponentName(path);
      if (!component_name) {
        console.warn(
          `Skipped registration for ${path} due to invalid path format.`
        );
        continue;
      }
      try {
        const mod = await modules[path]();
        registerComponent(appContext, component_name, mod);
      } catch (err) {
      }
    }
  } catch (error) {
    console.error("An error occurred during component registration: ", error);
  }
  return appContext;
}

export default GenerateComponents;
