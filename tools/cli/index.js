#!/usr/bin/env node

import process from "process";
import { generateModule } from "./module-generator.js";

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log("");

    console.log("========================================");
    console.log("        Aurelia CLI");
    console.log("========================================");

    console.log("");

    console.log("Usage:");

    console.log("");

    console.log("node tools/cli/index.js make:module moduleName");

    console.log("");

    process.exit(0);
}

const command = args[0];

const moduleName = args[1];

switch (command) {
    case "make:module":
        generateModule(moduleName);

        break;

    default:
        console.log("Unknown command.");
}
