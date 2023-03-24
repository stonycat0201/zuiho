
// Exclusively for OPENAI GPT-3

const zuihouAI = require("../zuihouAI/zuihouAI.js");
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = './src/zuihouAI/prompt.txt'
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt = '';
let prompt2 = '';

fs.readFile(path, 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    prompt = data;
});

async function execute(message) {
	if (message.author.bot) return;

    await zuihouAI.execute(prompt, openai, message);

    fs.writeFile(path, prompt, (err) => {
        if (err) console.error(err);
    });
}

module.exports = {
    name: "messageCreate",
    once: false,
	execute,
};