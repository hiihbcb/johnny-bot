/**
* @Author HIIHBCB
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

class DeployCommands {
    async execute() {
        if (process.env.NODE_ENV == 'production') {
            let commands = await this.createCommands();

            this.sendApi(
                process.env.BOT_TOKEN,
                process.env.BOT_CLIENT_ID,
                process.env.GUILD_ID,
                commands
            );
            this.sendApi(
                process.env.MAINTENANCE_TOKEN,
                process.env.MAINTENANCE_CLIENT_ID,
                process.env.GUILD_ID,
                []
            );
        } else if (process.env.NODE_ENV == 'staging') {
            let commands = await this.createCommands('mm');

            this.sendApi(
                process.env.MAINTENANCE_TOKEN,
                process.env.MAINTENANCE_CLIENT_ID,
                process.env.GUILD_ID,
                commands
            );
        }
    }


    async createCommands(test = '') {

        var avalibleCharacters = await database.getAllNames();

        let help = new SlashCommandBuilder().setName(test + 'help')
                                            .setDescription('Get some fuckin\' help');

        let quote = new SlashCommandBuilder().setName(test + 'quote')
                                             .setDescription('Get a fuckin\' quote from the man himself, me.');

        let text = new SlashCommandBuilder().setName(test + 'text')
                                            .setDescription('Message some fuckin\' choomba')
                                            .addStringOption(option =>
                                                option.setName('character-name')
                                                      .setDescription('Some fuckin\' name.')
                                                      .setRequired(true)
                                                )
                                            .addStringOption(option =>
                                                option.setName('message')
                                                      .setDescription('Whatever fuckin\' message you wanna send')
                                                      .setRequired(true)
                                                )
                                            .addIntegerOption(option =>
                                                option.setName('payment')
                                                      .setDescription('If you wanna send some hard-earned eddies')
                                                      .setRequired(false)
                                                );

        for (let i = 0; i < avalibleCharacters.length; i++) {
            text.options[0].addChoice(avalibleCharacters[i].frontname, avalibleCharacters[i].name);
        }

        let balance = new SlashCommandBuilder().setName(test + 'balance')
                                    .setDescription('View your fuckin\' eddies');

        let eddies = new SlashCommandBuilder().setName(test + 'update-balance')
                                            .setDescription('add or remove some fuckin\' eddies')
                                            .addStringOption(option =>
                                                option.setName('option')
                                                      .setDescription('Add or remove eddies')
                                                      .setRequired(true)
                                                      .addChoice('Add', 'add')
                                                      .addChoice('Remove', 'remove')
                                                )
                                            .addIntegerOption(option =>
                                                option.setName('total')
                                                      .setDescription('Amount you wanna add/remove')
                                                      .setRequired(true)
                                                );

        var commands = [
        help,
        quote,
        text,
        balance,
        eddies
        ].map(command => command.toJSON());

        return commands;
    }

    sendApi(token, clientId, guildId, commands) {
        var rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                    );

                console.log('Successfully registered application commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}

module.exports = DeployCommands;
