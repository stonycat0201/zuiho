const express = require("express")

async function execute(client) {
	console.log(`${client.user.username} is now online.`)
	express()
		.get('/', (req, res) => {
			res.send(`AutoUptimer`)
		})
		.listen(3000)
}

module.exports = {
	name: "clientReady",
	once: true,
	execute,
};