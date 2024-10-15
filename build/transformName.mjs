import path, { basename } from "path";
import { fileURLToPath } from "url";
import { readdir, rename } from "node:fs/promises";

function transformName(name) {
  const comName = Array.from(name)
    .reduce((acc, char, index) => {
      if (/[A-Z]/.test(char)) {
        if (index === 0) {
          acc.push(char.toLowerCase());
        } else {
          acc.push("-" + char.toLowerCase());
        }
      } else {
        acc.push(char);
      }
      return acc;
    }, [])
    .join("");

  return comName;
}

const originPath = path.dirname(fileURLToPath(import.meta.url));
const comDirname = path.join(
  originPath,
  "../src/uni_modules/dyrl_ui/components"
);
console.log("--- originPath ---", originPath);
console.log("--- comDirname ---", comDirname);

try {
  const files = await readdir(comDirname);
  for (const file of files) {
    // const name = transformName(file);
    // console.log("--- file.slice(1) ---", file.slice(1));
    try {
      await rename(
        path.join(comDirname, file),
        path.join(comDirname, file.slice(1))
      );
      console.log(`文件夹已从 "${file}" 重命名为 "${file.slice(1)}"`);
    } catch (error) {
      console.error(`重命名文件夹失败: ${error.message}`);
    }
  }
} catch (err) {
  console.error(err);
}
