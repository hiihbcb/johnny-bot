/**
* @Author HIIHBCB
* @License AGPL-3.0-or-later
*/

//Require Bot Dependencies

const { Client, Intents } = require('discord.js');
global.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

if (process.env.NODE_ENV == 'production') {
    client.login(process.env.BOT_TOKEN);
    global.prefix = "";
} else if (process.env.NODE_ENV == 'staging') {
    client.login(process.env.MAINTENANCE_TOKEN);
    global.prefix = "mm";
}

//Require observer classes
const App = require("./app")
const messages = new App.Messages();
global.database = new App.Database();
const deployCommands = new App.DeployCommands();
const models = new App.Models();

client.on("ready", async () => {
    await models.initializeTables();
    await deployCommands.execute();
    console.log("Bot is ready.");
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
        case prefix + "help":
            messages.helpCommand(interaction);
        break;
        case prefix + "text":
            messages.textCommand(interaction);
        break;
        case prefix + "quote":
            messages.quoteCommand(interaction);
        break;
        case prefix + "balance":
            messages.balanceCommand(interaction);
        break;
        case prefix + "update-balance":
            messages.updateBalanceCommand(interaction);
        break;
    }
});
