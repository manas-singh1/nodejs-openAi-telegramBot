
const telegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const botToken = "6104213670:AAGH07c32hEmmE5TWTa1GS2i1NnXvqgr3X4";
const openAiToken = "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";

const configuration = new Configuration({
    apiKey: openAiToken,
});

const openai = new OpenAIApi(configuration);
const bot = new telegramBot(botToken, { polling: true });

bot.on("message", async (msg) => {
    const Id = msg.chat.id;

    const response = await openai.createCompletion({
        prompt: msg.text,
        max_tokens: 50, // maximum length of the response
        temperature: 0.1, // controls the randomness of the response
        model: "ada", //openAiModel
    });

    // Send the response back to the user
    bot.sendMessage(Id, response.data.choices[0].text);
});
