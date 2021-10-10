#!/usr/bin/env node
// 上面这行是定义脚本解释器 linux/unix会使用shebang(#!)来查找解释程序 windows是使用文件拓展名来执行脚本的
// /usr/bin/env就是告诉系统可以在PATH目录中查找
const commander = require("commander");
// 从package获取version是一个比较明智的做法
commander.version(require("../package.json").version);
// 埋个命令 为后续工作开展准备
commander
  .command("init <project-name>")
  .description("初始化项目")
  .action((name) => {
    console.log("name",name);
  });
//   解析用户输入 必须要加 不然上面的定义都不会被触发
commander.parse(process.argv);
