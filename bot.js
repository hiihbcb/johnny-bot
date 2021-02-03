//Require Bot Dependencies
const Discord = require("discord.js");
global.Client = new Discord.Client();

const config = require('./json_files/auth.json');
Client.login(config.token);

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
        case "marge" :
            messages.incomming(message);
            break;
        default:
            break;
    };
});