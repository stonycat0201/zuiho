/*
    This file contains the trained Zuihou chat bot
*/

// Use paid OpenAI GPT-3 for initial functionality testing!

async function execute(prompt, openai, message) {
    prompt += `User: ${message.content}\n`;

    const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.88,
        max_tokens: 60,
        top_p: 0.96,
        frequency_penalty: 0.01,
        presence_penalty: 0.14,
        stop: [" User:", " Zuiho:"],
    });

    message.reply(`${gptResponse.data.choices[0].text.substring(8)}`);

    return prompt += `${gptResponse.data.choices[0].text}\n`;
}

const zuihouAI = {
    name: "zuihouAI",
    execute
};

export default zuihouAI;