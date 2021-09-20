/**
* @Author HIIHBCB
*/

const { MessageEmbed } = require('discord.js');

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
            content = interaction.options.getString('message'),
            payment = interaction.options.getInteger('payment');

        if (
            sender == null || reciver == null || content == null
        ) {
            await interaction.reply({ content: "Could not send: " + content, ephemeral: true });
            return;
        }

        if (this.sendMessage(interaction, reciver, sender, payment, content)) {
            await interaction.reply('Sent ' + content + ' to ' + interaction.options.getString('character-name'));
        } else {
            await interaction.reply({ content: "Could not send: " + content, ephemeral: true });
        }
    }

    async quoteCommand(interaction) {
        let quotes = await database.getQuotes(),
            randomNumber = Math.floor(Math.random() * quotes.length);

        interaction.reply(quotes[randomNumber].quote);
    }

    sendMessage(interaction, reciver, sender, payment, text) {
        var userChannel = client.channels.cache.get(reciver),
            embedMessage = new MessageEmbed().setColor('#FF0000')
                                             .setTitle(text)
                                             .setAuthor(sender, interaction.user.avatarURL())
                                             .setTimestamp();

        if (payment !== null) {
            embedMessage.setDescription("Received: " + payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "eb");
        }

        return userChannel.send({ embeds: [embedMessage] });
    }
}

module.exports = Messages;
