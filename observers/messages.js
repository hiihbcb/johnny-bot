//Set prefix
global.margePrefix = /^!(marge|\smarge)/g;
global.seshCreatePrefix = /^!(create|\screate)/g;

class Messages {
    checkPrefix(message) {
        if (!message.author.bot) {
            if (margePrefix.test(message.content)) return 'marge';
            if (message.channel.id == ourChannels.events.id) {
                if (seshCreatePrefix.test(message.content)) return 'seshCreate';
            }
        }
        return 'ignore';
    }

    getCommand(message, prefix = margePrefix) {
        var args = message.content.replace(prefix, '');
        return args.toLowerCase();
    }

    incomming(message) {
        this.logUser(message);
        if (!this.specificUsers(message)) return;

        this.defineCommand(message, this.getCommand(message));
    }

    logUser(message) {
        console.log(message.member.user.tag);
        console.log(message.member.id);
    }

    specificUsers(message) {
        switch (message.member.id) {
            case ourUsers.hiihbcb.id:
                message.channel.send('Having that gigantic cock must be pretty difficult huh.');
                break;
            case ourUsers.zadrack2.id:
                message.channel.send('BIG CHUNGUS');
                return;
            default:
                break;
        };

        return true;
    }

    defineCommand(message, command) {
        switch (command) {
            case "ignore" :
                break;
            case "help":
            default:
                message.channel.send('Homer, if you wanna talk to me you need to know these commands.');
                message.channel.send('!marge help');
                break;
        };
    }
}

module.exports = Messages;