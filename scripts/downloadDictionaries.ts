import { $ } from "bun";
import { rimraf } from "rimraf";
import fs from "fs/promises";
import path from "path";

const urls = {
  jmdict:
    "https://github.com/scriptin/jmdict-simplified/releases/download/3.5.0%2B20240129121603/jmdict-eng-3.5.0+20240129121603.json.tgz",
  jmnedict:
    "https://github.com/scriptin/jmdict-simplified/releases/download/3.5.0%2B20240129121603/jmnedict-all-3.5.0+20240129121603.json.tgz",
  kanjidic2:
    "https://github.com/scriptin/jmdict-simplified/releases/download/3.5.0%2B20240129121603/kanjidic2-en-3.5.0+20240129121603.json.tgz",
};

const targetDir = path.resolve("./dictionaries");

// Clean target dir first
await rimraf(targetDir).then(async () => {
  // Create target dir using fs
  await fs.mkdir(targetDir, { recursive: true });

  for (const [lang, url] of Object.entries(urls)) {
    const targetPath = `${targetDir}/${lang}.json.tgz`;

    // Curl files
    await $`curl -L ${url} -o ${targetPath}`;

    // Extract files
    await $`tar -xzf ${targetPath} -C ${targetDir}`;

    // Remove tar files
    await $`rm ${targetPath}`;
  }
});

// Rename jsons
// split using - and the first part is the name
for (const file of await fs.readdir(targetDir)) {
  const [name] = file.split("-");
  await fs.rename(`${targetDir}/${file}`, `${targetDir}/${name}.json`);
}
