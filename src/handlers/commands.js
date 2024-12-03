import { readdirSync } from 'fs';
import chalk from 'chalk';

const initializeCommands = (client) => {
    console.log('\n');
    console.log(`${chalk.bold.blue("Slash command (/) lists ->")}`);

    let commandlist = [];
    readdirSync('./src/commands/').forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            import(`../commands/${dir}/${file}`).then((pull) => {
                if (pull.default.data.name) {
                    client.commands.set(pull.default.data.name, pull.default);
                    console.log(`${pull.default.name} ${chalk.gray(`(./src/${dir}/${file})`)} | ${pull.default.data.description} | ${chalk.bold.green("RUNNING")}`);
                    commandlist.push(pull.default.data);
                } else {
                    console.log(`${file} | ${chalk.bold.redBright("FAILED TO LOAD!")} -> May contain a bug`);
                }
            }).catch(err => console.error(`Failed to load ${file}: ${err.message}`));
        }
    });

    // Log to confirm commands are initialized
    console.log('Slash commands initialized');
};

export default initializeCommands;