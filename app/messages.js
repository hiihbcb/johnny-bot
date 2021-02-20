//Set prefix
if (process.env.NODE_ENV == 'production') {
    var prefix = "!j";
} else if (process.env.NODE_ENV == 'staging') {
    var prefix = "!mj";
}

var message,
    command;

class Messages {
    newMessage(message) {
        if (!message.author.bot && message.content.startsWith(prefix)) {
            this.message = message;
            this.filterCommand();
        }
    }

    filterCommand() {
        var wordMatch = /\S*/g;
        this.command = this.message.content.match(wordMatch).filter(item => item != '');

        switch(this.command[1]) {
            case "nickname":
            break;
            case "text":
                this.textCommand(this.message, this.command);
            break;
            case "transfer":
            break;
            case "help":
            default:
                this.helpCommand(this.message);
            break;
        }
    }

    async helpCommand(message) {
        if (await database.getCorpo(message.channel.id)) {
            message.channel.send('Go fuck yourself you corpo fuck');
        } else {
            message.channel.send('!jonny help');
            message.channel.send('!text <player name|character name> <dialogue>');
            message.channel.send('-    Please use quotations if player/character name has spaces, not required for dialogue');
        }
    }

    async textCommand(message, command) {
        var data,
            sender,
            reciver,
            content;

        data = await Promise.all([
            database.getSender(message.channel.id),
            database.getReciver(command[2], message.member.id)
        ])

        sender = data[0];
        reciver = data[1];

        command.splice(0,3);
        content = command.join(' ');

        if (
            sender == null
            || reciver == null
            || content == null
        ) {
            message.delete();
            message.channel.send("Something doesn't exist, fuck.");
            return;
        }

        if (this.sendMessage(sender, reciver, content)) {
            message.react('✅');
        } else {
            message.delete();
            message.channel.send('Message did not send successfully');
        }
    }

    sendMessage(sender, reciver, text) {
        var createMessage = "`" + sender + ": " + text + "`",
            userChannel = Client.channels.cache.get(reciver);
        return userChannel.send(createMessage);
    }
}

module.exports = Messages;
