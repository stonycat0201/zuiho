const chalk = require("chalk");
const { readdirSync } = require('fs');

module.exports = (client) => {
    console.log('\n');
    console.log(`${chalk.bold.blue("Events ->")}`);

    const files = readdirSync('./src/events').filter((file) => file.endsWith(".js"));
    for (const file of files) {
        const event = require(`../events/${file}`);

        if (event.rest) {
            if (event.once)
                client.rest.once(event.name, (...args) =>
                    event.execute(...args, client)
                );
            else
                client.rest.on(event.name, (...args) =>
                    event.execute(...args, client)
                );
        } else {
            if (event.once)
                client.once(event.name, async (args) => event.execute(args, client));
            else client.on(event.name, async (args) => event.execute(args, client));
        }
        
        console.log(`${event.name} | ${chalk.bold.green("RUNNING") }`);
        
        continue;

    }
    console.log('\n');
}