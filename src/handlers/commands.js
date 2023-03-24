const { readdirSync } = require("fs")
const chalk = require('chalk')
const db = require("quick.db")
const Client = require("../utils/Client.js")

module.exports = (client) => {

    console.log('\n');
    console.log(`${chalk.bold.blue("Slash command (/) lists ->")}`);

    let commandlist = []
    readdirSync("./src/commands/").forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            
            if (pull.data.name) {
                client.commands.set(pull.data.name, pull);
                console.log(`${pull.name} ${chalk.gray(`(./src/${dir}/${file})`) } | ${pull.data.description} | ${chalk.bold.green("RUNNING") }`);
                commandlist.push(pull.data);
            } else {
                console.log(`${file} | ${chalk.bold.redbright("FAILED TO LOAD!")} -> May contain a bug`);
                continue;
            }
        }
    });

    setTimeout(function () { db.set(`slashcommandlist`, commandlist) }, 10)
    Client.reloadSlashCmd();
}