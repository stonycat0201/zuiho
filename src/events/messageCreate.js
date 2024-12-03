async function execute(message) {
    if (message.author.bot) return;

    // You can add basic message handling logic here if needed.
    console.log(`Message received: ${message.content}`);
}

const messageCreate = {
    name: 'messageCreate',
    once: false,
    execute,
};

export default messageCreate;
