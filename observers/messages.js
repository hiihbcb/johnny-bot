//Set prefix
global.jonnyPrefix = /^!(jonny|\sjonny)\s/g;
global.textPrefix = /^!(text|\stext)\s/g;

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
            wordMatch = /\S*/g,
            command = this.getCommand(message, textPrefix),
            quoteArray,
            wordString,
            wordText,
            sendTo,
            sendMessage,
            sender = message.member.nickname,
            userNickname,
            userName,
            hit = false;

        quoteArray = command.match(quoteMatch);
        wordString = command.match(wordMatch);
        wordText = command.replace(wordString[0], '');

        if (wordString[0].startsWith('"') && quoteArray.length >= 1) {
            sendTo = quoteArray[0].replace(/['"]+/g, '');
            sendMessage = command.replace(quoteArray[0], '').substring(1);
        } else if (wordString[0] !== null
            && wordString[0] !== ''
            && wordText !== null
            && wordText !== ''
            && wordText.length >= 2
        ) {
            sendTo = wordString[0];
            sendMessage = command.replace(wordString[0], '').substring(1);
        } else {
            message.channel.send('Nothing entered you fuck');
            return false;
        }

        sendTo = sendTo.toLowerCase();

        for (var user in ourUsers) {
            userNickname = ourUsers[user].nickname.toLowerCase();
            userName = ourUsers[user].name.toLowerCase();
            if (sendTo == userNickname || sendTo == userName || sendTo == "group") {
                this.sendMessage(sender, ourUsers[user], sendMessage);
                hit = true;
            }
        }
        if (hit) {
            message.react('✅');
        } else {
            message.channel.send('Message did not send successfully');
            message.channel.send('Name was recorded as ' + sendTo);
        }
        return true;
    }

    sendMessage(sender, user, text) {
        var createMessage = "`" + sender + ": " + text + "`";
        var userChannel = Client.channels.cache.get(user.channel_id);
        userChannel.send(createMessage);
    }
}

module.exports = Messages;