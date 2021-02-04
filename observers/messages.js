//Set prefix
global.jonnyPrefix = /^!(jonny|\sjonny)/g;
global.textPrefix = /^!(text|\stext)/g;

class Messages {
    checkPrefix(message) {
        if (!message.author.bot) {
            if (jonnyPrefix.test(message.content)) return 'jonny';
            if (textPrefix.test(message.content)) {
                for (var user in ourUsers) {
                    if (message.channel.id == ourUsers[user].channel_id) {
                        return 'text';
                    }
                }
                message.delete();
                message.channel.send('Wrong channel you fucking');
            }
        }
        return 'ignore';
    }

    getCommand(message, prefix) {
        var args = message.content.replace(prefix, '');
        return args;
    }

    incomming(message, prefix = jonnyPrefix) {
        this.defineCommand(message, this.getCommand(message, prefix));
    }

    defineCommand(message, command) {
        switch (command) {
            case "help":
            default:
            if (this.specificSender(message) == 'corpo') {
                message.channel.send('Go fuck yourself you corpo fuck');
            } else {
                message.channel.send("God, if I wanted your help, i'd fuck it");
                message.channel.send('!jonny help');
                message.channel.send('!text "<tag user>" "<dialogue>"');
            }
            break;
        };
    }

    specificSender(message) {
        switch (message.member.nickname.toLowerCase()) {
            case ourUsers.hentai.nickname:
                return 'corpo';
            default:
                return false;
        };
    }

    textMessage(message) {
        var quoteMatch = /".*?"/g,
            command = this.getCommand(message, textPrefix),
            commandArray,
            sendTo,
            sendMessage,
            sender = message.member.nickname,
            index,
            userNickname,
            userName;

        commandArray = command.match(quoteMatch);
        if (commandArray == null || commandArray.length != 2) {
            message.channel.send('Read the fucking help message you fuck');
            return false;
        }
        sendTo = commandArray[0].replace(/['"]+/g, '').toLowerCase();
        sendMessage = commandArray[1].replace(/['"]+/g, '');

        for (var user in ourUsers) {
            userNickname = ourUsers[user].nickname.toLowerCase();
            userName = ourUsers[user].name.toLowerCase();
            if (sendTo == userNickname || sendTo == userName || sendTo == "group") {
                this.sendMessage(sender, ourUsers[user], sendMessage);
            }
        }
        return true;
    }

    sendMessage(sender, user, text){
        var createMessage = "`" + sender + ": " + text + "`";
        var userChannel = Client.channels.cache.get(user.channel_id);
        userChannel.send(createMessage);
    }
}

module.exports = Messages;