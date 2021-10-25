const {promisify} = require("util");
// 字符放大显示
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const {clone} = require("./download");
const project = require("./promptModules/project");
const ora = require("ora");
const log = (content) => console.log(chalk.green(content));
// 封装spawn 将子进程的输出流合并至主进程 （默认子进程的输出不显示
const spawn = async (...args) => {
    const {spawn} = require("child_process");
    return new Promise((resolve) => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on("close", resolve);
    });
};
module.exports = async (name) => {
    // 打印欢迎界面
    clear();
    log(await figlet("LIE-CLI YES!"));
    log(`😈创建项目：${name}`);
    const {name: cliName, source} = await project.prompt();
    if (cliName === 'create-react-app') {
        await spawn(process.platform === 'win32' ? "npm.cmd" : 'npm', ["i", "-g", "create-react-app"],);
        await spawn("create-react-app.cmd", [name]);
    }
    //   初始化 几种源的表达方式
    //   1.指定github github:lie5860/fiber_study
    //   2.指定分支 github:lie5860/fiber_study#main
    //   3.直接下载文件 direct:https://github.com/lie5860/lie_cli/archive/refs/heads/main.zip
    await clone(
        source,
        name
    );
    const subProcess = ora("安装依赖中。。。");
    subProcess.start();
    await spawn(process.platform === 'win32' ? "npm.cmd" : 'npm', ["i"], {cwd: `./${name}`});
    subProcess.succeed();
    log("安装完成。。。");
};
