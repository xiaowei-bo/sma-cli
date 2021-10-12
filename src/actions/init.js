import { downloadLocal } from "../utils/download";
import ora from "ora";
import inquirer from "inquirer";
import fs from "fs";
import chalk from "chalk";

const symbol = {
	info: chalk.blue('ℹ'),
	success: chalk.green('✔'),
	warning: chalk.yellow('⚠'),
	error: chalk.red('✖')
};

// 命令行交互问答
const askQuestions = (defaultProjectName) => {
    const questions = [
        {
            name: "projectName",
            type: "input",
            message: "Please enter the project name: ",
            default: defaultProjectName
        },{
            name: "description",
            type: "input",
            message: "Please enter the project description: "
        },{
            name: "author",
            type: "input",
            message: "Please enter the project author: "
        },
    ];
    return inquirer.prompt(questions);
};

export default async(action, defaultProjectName) => {
    const { projectName, description, author } = await askQuestions(defaultProjectName);
    if(fs.existsSync(projectName)) {
        console.log(symbol.error, chalk.red(`${projectName} fold already exists!`));
        return;
    }
    const loading = ora(`${projectName} is downloading now ...`);
    loading.start();
    try {
        await downloadLocal(projectName)
        const fileName = `${projectName}/package.json`;
        if(!fs.existsSync(fileName)) return loading.fail();
        const data = fs.readFileSync(fileName).toString();
        const json = JSON.parse(data);
        json.name = projectName;
        json.author = author;
        json.description = description;
        fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
        console.log(symbol.success, chalk.green(`${projectName} download is finish`));
        loading.succeed();
    } catch (error) {
        console.error(error);
        loading.fail();
    }
}