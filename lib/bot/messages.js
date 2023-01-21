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

            message += '\n\/text <character name> <dialogue> {payment}' +
                       '\n-    texts a character from your character';

            message += '\n\/quote' +
                       '\n-    gets a quote from the man himself, me';

            message += '\n\/balance' +
                       '\n-    get your eddie balance, to see how much debt you can pay off to the fucking corps';

            message += '\n\/update-balance' +
                       '\n-    update your eddie balance, to either pay off the corps or add more money to the bank to pay them off with';

            await interaction.reply(message);
        }
    }

    async textCommand(interaction) {
        var sender = await database.getChannelCharacterName(interaction.channel.id),
            reciver = await database.getCharacterChannelId(interaction.options.getString('character-name')),
            content = interaction.options.getString('message'),
            payment = interaction.options.getInteger('payment'),
            alias = interaction.options.getString('alias');

        if (
            sender == null || reciver == null || content == null
        ) {
            await interaction.reply({
                content: "Could not send: " + content,
                ephemeral: true
            });
            return;
        }

        if (this.sendMessage(interaction, reciver, sender, content, payment, alias)) {
            if (alias) { alias = " as " + alias; }
            await interaction.reply({
                content: 'Sent ' + content + ' to ' + interaction.options.getString('character-name') + alias,
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "Could not send: " + content,
                ephemeral: true
            });
        }

        if (payment != null) {
            var userChannel = client.channels.cache.get(reciver),
                reciverName = await database.getChannelCharacterName(userChannel.id),

                senderBalance = await database.getBalance(interaction.channel.id),
                sendernewBalance = Number(senderBalance) - Number(payment),

                reciverBalance = await database.getBalance(userChannel.id),
                reciverNewBalance = Number(reciverBalance) + Number(payment);

            await database.updateBalance(interaction.channel.id, sendernewBalance);
            await database.updateBalance(userChannel.id, reciverNewBalance);
        }
    }

    sendMessage(interaction, reciver, sender, text, payment, alias) {
        var userChannel = client.channels.cache.get(reciver),
            embedMessage = new MessageEmbed().setColor('#FF0000')
                                             .setTitle(text)
                                             .setAuthor({name: sender, iconURL: interaction.user.avatarURL()})
                                             .setTimestamp();
        if (alias) {
            embedMessage.setAuthor({name: alias});
        }

        if (payment != null) {
            embedMessage.setDescription('Received: ' + payment + 'eb' );
        }

        return userChannel.send({
            embeds: [embedMessage]
        });
    }

    async quoteCommand(interaction) {
        let quotes = await database.getQuotes(),
            randomNumber = Math.floor(Math.random() * quotes.length);

        interaction.reply(quotes[randomNumber].quote);
    }

    async balanceCommand(interaction) {
        let balance = await database.getBalance(interaction.channel.id),
            sender = await database.getChannelCharacterName(interaction.channel.id);

        this.sendBalance(interaction, balance, sender);
    }

    async updateBalanceCommand(interaction) {
        let balance = await database.getBalance(interaction.channel.id),
            sender = await database.getChannelCharacterName(interaction.channel.id),
            option = interaction.options.getString('option'),
            total = interaction.options.getInteger('total');

        switch(option) {
            case 'add':
                var newBalance = Number(balance) + Number(total);
            break;
            case 'remove':
                var newBalance = Number(balance) - Number(total);
            break;
            case 'set':
                var newBalance = Number(total);
            break;
        }

        await database.updateBalance(interaction.channel.id, newBalance);

        this.sendBalance(interaction, newBalance, sender, balance);
    }

    sendBalance(interaction, balance, owner, oldBalance = null) {
        balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'eb'
        let embedMessage = new MessageEmbed().setColor('#FFF820')
                                     .setTitle('Balance: ' + balance)
                                     .setAuthor('Account Owner: ' + owner)
                                     .setTimestamp();

        if (oldBalance !== null) {
            embedMessage.setDescription('Old Balance: ' + oldBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'eb' );
        }

        interaction.reply({
            embeds: [embedMessage],
            ephemeral: true
        });
    }
}

module.exports = Messages;
