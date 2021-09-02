//Set prefix
if (process.env.NODE_ENV == 'production') {
    var prefix = "!j";
} else if (process.env.NODE_ENV == 'staging') {
    var prefix = "!mj";
}

class Messages {
    newMessage(message) {
        if (!message.author.bot && message.content.startsWith(prefix)) {
            this.filterCommand(message);
        }
    }

    filterCommand(message) {
        var wordMatch = /\S*/g,
            command = message.content.match(wordMatch).filter(item => item != '');

        switch(command[1]) {
            case "rm":
                this.findRemove(message, command);
            break;
            case "nickname":
                this.nicknameCommand(message, command);
            break;
            case "text":
                this.textCommand(message, command);
            break;
            case "list":
                this.listCommand(message);
            break;
            case "help":
            default:
                this.helpCommand(message);
            break;
        }
    }

    findRemove(message, command) {
        switch(command[2]) {
            case "nickname":
                this.removeNickname(message, command);
            break;
        }
    }

    async helpCommand(message) {
        if (await database.getCorpo(message.channel.id)) {
            message.channel.send('Go fuck yourself you corpo fuck');
        } else {
            message.channel.send('!j help');
            message.channel.send('!j nickname <character name> <nickname>');
            message.channel.send('-    adds a nickname used for the text command');
            message.channel.send('!j rm nickname <nickname>');
            message.channel.send('-    removes nickname');
            message.channel.send('!j text <nickname|character name> <dialogue>');
            message.channel.send('-    texts a character from your character');
            message.channel.send('!j list');
            message.channel.send('-    lists all avalible characters');
        }
    }

    async listCommand(message) {
        var avalibleCharacters = await database.getAllNames();
        for (let i = 0; i < avalibleCharacters.length; i++) {
            message.channel.send(avalibleCharacters[i].channelname);
        }
    }

    async textCommand(message, command) {
        var data,
            sender,
            reciver,
            content;

        data = await Promise.all([
            database.getSender(message.channel.id),
            database.getCharacterChannelId(command[2], message.member.id)
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

    async nicknameCommand(message, command) {
        var nickname = command[3],
            sender = message.member.id,
            result;

        result = await new Promise(function(resolve, reject) {
            resolve(database.checkNicknameExists(nickname, sender));
        }).then(function(result) {
            if (!result) {
                 return database.getCharacterId(command[2]);
             } else {
                message.channel.send('Nickname already exists');
                return false;
             }
        }).then(function(result){
            if (result !== undefined && result !== false) {
                 return database.addNickname(nickname, sender, result);
             } else if (result === undefined) {
                message.channel.send('Character does not exist');
                return false;
             }
        })

        if (result) {
            message.react('✅');
        }
    }

    async removeNickname(message, command) {
        var nickname = command[3],
            sender = message.member.id,
            result;

        result = await database.deleteNickname(nickname, sender);

        if (result) {
            message.react('✅');
        } else {
            message.channel.send('Nickname does not exist to remove');
        }
    }

    sendMessage(sender, reciver, text) {
        var createMessage = "`" + sender + ": " + text + "`",
            userChannel = Client.channels.cache.get(reciver);
        return userChannel.send(createMessage);
    }
}

module.exports = Messages;
