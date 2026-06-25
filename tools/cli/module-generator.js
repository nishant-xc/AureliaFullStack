import fs from "fs";
import path from "path";

export function generateModule(moduleName) {
    const base = path.join("src", "modules", moduleName);

    const folders = ["controllers", "routes", "services", "repositories", "validators"];

    if (!fs.existsSync(base)) {
        fs.mkdirSync(base, {
            recursive: true,
        });
    }

    folders.forEach((folder) => {
        fs.mkdirSync(
            path.join(base, folder),

            {
                recursive: true,
            }
        );
    });

    console.log("");

    console.log("===================================");

    console.log(`Module '${moduleName}' created successfully.`);

    console.log("");

    folders.forEach((folder) => {
        console.log(`${base}/${folder}`);
    });

    console.log("");

    console.log("===================================");
}
