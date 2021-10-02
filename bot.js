/**
* @Author HIIHBCB
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

client.on("ready", () => {
    database.initializeTables();
    deployCommands.execute();
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
        case prefix + "help":
            messages.helpCommand(interaction);
        break;
        case prefix + "text":
            messages.textCommand(interaction);
        break;
        case prefix + "quote":
            messages.quoteCommand(interaction);
        break;
    }
});
