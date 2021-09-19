/**
* @Author HIIHBCB
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = '';
const clientId = '';
const guildId = '';

const commands = [
    new SlashCommandBuilder().setName('help')
                             .setDescription('Get some fuckin\' help'),
    new SlashCommandBuilder().setName('text')
                             .setDescription('Message some fuckin\' choomba')
                             .addStringOption(option =>
                                option.setName('character-name')
                                      .setDescription('Some fuckin\' name. Use list for names')
                                      .setRequired(true)
                                      .addChoice('Aicha', 'Aicha')
                                      .addChoice('Connor', 'Connor')
                                      .addChoice('Diesel', 'Diesel')
                                      .addChoice('Dr Teeth', 'Dr_Teeth')
                                      .addChoice('GM', 'GM')
                                      .addChoice('Jason', 'Jason')
                                      .addChoice('Khalil', 'Khalil')
                                      .addChoice('Lil Dragon', 'Lil_Dragon')
                                      .addChoice('Mazdak', 'Mazdak')
                                      .addChoice('Rasputin', 'Rasputin')
                                      .addChoice('Santori', 'Santori')
                                      .addChoice('Tox', 'Tox')
                                )
                             .addStringOption(option =>
                                option.setName('message')
                                      .setDescription('Whatever fuckin\' message you wanna send')
                                      .setRequired(true)
                                )
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

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
