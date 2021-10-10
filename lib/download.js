const { promisify } = require("util");
module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  // ora => 状态标识
  const ora = require("ora");
  const process = ora(`下载中。。。。${repo}`);
  process.start();
  await download(repo, desc);
  process.succeed();
};
