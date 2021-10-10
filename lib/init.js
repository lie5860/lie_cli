const { promisify } = require("util");
// 字符放大显示
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  log(await figlet("LIE-CLI YES!"));
};
