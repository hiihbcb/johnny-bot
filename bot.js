/**
* @Author HIIHBCB
*/

//Require Bot Dependencies
const { Client, Intents } = require('discord.js');
global.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

if (process.env.NODE_ENV == 'production') {
    client.login(process.env.BOT_TOKEN);
} else if (process.env.NODE_ENV == 'staging') {
    client.login(process.env.MAINTENANCE_TOKEN);
}

//Require observer classes
const App = require("./app")
const messages = new App.Messages();
global.database = new App.Database();

client.on("ready", () => {
    database.initializeTables();
    console.log("I am ready!");
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on("interactionCreate", async interaction  => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    switch(commandName) {
        case "help":
            messages.helpCommand(interaction);
        break;
        case "text":
            messages.textCommand(interaction);
        break;
    }
});
