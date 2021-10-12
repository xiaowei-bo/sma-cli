import program from "commander";
import config from "./utils/config";
import chalk from "chalk";
import commandMap from "./utils/commandMap";
import * as actions from "./actions";

for(const command in commandMap) {
    const { description, alias } = commandMap[command];
    const instance = program.command(command);
    instance.description(description);
    instance.alias(alias);
    instance.action(() => {
        actions[command](command, ...process.argv.slice(3));
    });
}

program.usage('<command> [options]');
program.version(config.version, "-V, --version");
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    console.log(chalk.green(program.helpInformation()));
}