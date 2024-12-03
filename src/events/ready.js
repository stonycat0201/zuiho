import express from 'express';

async function execute(client) {
    console.log(`${client.user.username} is now online.`);
    express()
        .get('/', (req, res) => {
            res.send('AutoUptimer');
        })
        .listen(3000);
}

const clientReady = {
    name: 'clientReady',
    once: true,
    execute,
};

export default clientReady;