const clear = require("clear");
const inquirer = require("inquirer");
const A_PROJECT = 'a'
const B_PROJECT = 'b'
const projectSourceDict = {
    [A_PROJECT]: 'direct:https://github.com/lie5860/lie_cli/archive/refs/heads/main.zip',
    [B_PROJECT]: 'github:lie5860/fiber_study#main',
}
module.exports.prompt = async function () {
    clear()
    const {action} = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: `请选择脚手架:`,
            choices: [
                {name: 'a脚手架', value: A_PROJECT},
                {name: 'b脚手架', value: B_PROJECT},
                {name: 'create-react-app', value: 'create-react-app'},
            ],
        },
    ])
    return {name: action, source: projectSourceDict[action]}
}