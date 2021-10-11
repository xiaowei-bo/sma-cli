import program from "commander";
import { VERSION } from "./utils/constants";
import apply from "./index";
import chalk from "chalk";
import commandMap from "./commandMap";

for(const command in commandMap) {
    const { description, alias } = commandMap[command];
    const instance = program.command(command);
    instance.description(description);
    instance.alias(alias);
    instance.action(() => {
        apply(command, ...process.argv.slice(3))
    });
}

function help() {
    console.log('\r\nUsage:');
    for(const command in commandMap) {
        commandMap[command].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    }
    console.log('\r');
}
program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp(chalk.green);
}