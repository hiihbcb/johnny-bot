//Require Bot Dependencies
const Discord = require("discord.js");
global.Client = new Discord.Client();

global.config = require('./config.json');

console.log(process.env.BOT_TOKEN);
if (!config.maintenance_mode) {
    Client.login(process.env.BOT_TOKEN);
} else {
    Client.login(process.env.MAINTENANCE_TOKEN);
}

global.ourUsers = require('./json_files/users.json');
global.ourChannels = require('./json_files/channels.json');

//Require observer classes
const Observers = require("./observers")
const messages = new Observers.Messages();

Client.on("ready", () => {
    console.log("I am ready!");
});

Client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

Client.once('disconnect', () => {
    console.log('Disconnect!');
});

Client.on("message", async message => {
    switch (messages.checkPrefix(message)) {
        case "text" :
            if (!messages.textMessage(message)) {
                messages.incomming(message, textPrefix);
            }
            break;
        case "jonny" :
            messages.incomming(message);
            break;
        default:
            break;
    };
});