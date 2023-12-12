import fs from "node:fs";
export default async function action(CommandList) {
  try {
    const moduleFolder = fs.readdirSync("./Commands");
    for (const folder of moduleFolder) {
      const moduleFiles = fs.readdirSync(`./Commands/${folder}`);
      for (const SecondFolder of moduleFiles) {
        const secondFolder = fs.readdirSync(
          `./Commands/${folder}/${SecondFolder}`,
        );
        for (const file of secondFolder) {
          const modulePath = `./../Commands/${folder}/${SecondFolder}/${file}`;
          if (file.endsWith(".js")) {
            const module = await import(modulePath);
            CommandList.set(module.default?.name, module.default);
            module.default?.alias.map((a) => CommandList.set(a, module.default));
          }
        }
      }
    }
    return CommandList;
  } catch (error) {
    throw new Error(error);
  }
}
