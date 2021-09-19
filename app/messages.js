/**
* @Author HIIHBCB
*/

class Messages {
    async helpCommand(interaction) {
        if (await database.getCorpo(interaction.channel.id)) {
            await interaction.reply('Go fuck yourself you corpo fuck');
        } else {
            let message = 'help';

            message += '\n\/text <character name> <dialogue>' +
                       '\n-    texts a character from your character';

            await interaction.reply(message);
        }
    }

    async textCommand(interaction) {
        var sender = await database.getSender(interaction.channel.id),
            reciver = await database.getCharacterChannelId(interaction.options.getString('character-name')),
            content = interaction.options.getString('message');

        if (
            sender == null || reciver == null || content == null
        ) {
            await interaction.reply({ content: "Could not send: " + content, ephemeral: true });
            return;
        }

        content = "`" + sender + ": " + content + "`";

        if (this.sendMessage(reciver, content)) {
            await interaction.reply('Sent ' + content + ' to ' + interaction.options.getString('character-name'));
        } else {
            await interaction.reply({ content: "Could not send: " + content, ephemeral: true });
        }
    }

    sendMessage(reciver, text) {
        var userChannel = client.channels.cache.get(reciver);
        return userChannel.send(text);
    }
}

module.exports = Messages;
