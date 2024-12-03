import chalk from 'chalk';
import { readdirSync } from 'fs';

const initializeEvents = (client) => {
    console.log('\n');
    console.log(`${chalk.bold.blue("Events ->")}`);

    const files = readdirSync('./src/events').filter((file) => file.endsWith('.js'));
    for (const file of files) {
        import(`../events/${file}`).then((eventModule) => {
            const event = eventModule.default;

            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, (...args) => event.execute(...args, client));
                } else {
                    client.rest.on(event.name, (...args) => event.execute(...args, client));
                }
            } else {
                if (event.once) {
                    client.once(event.name, async (args) => event.execute(args, client));
                } else {
                    client.on(event.name, async (args) => event.execute(args, client));
                }
            }

            console.log(`${event.name} | ${chalk.bold.green("RUNNING")}`);
        }).catch(err => console.error(`Failed to load ${file}: ${err.message}`));
    }
    console.log('\n');
};

export default initializeEvents;