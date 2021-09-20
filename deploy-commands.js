/**
* @Author HIIHBCB
*/

const dotenv = require('dotenv');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

dotenv.config();

sendApi(process.env.BOT_TOKEN, process.env.BOT_CLIENT_ID, process.env.GUILD_ID, createCommands());

sendApi(process.env.MAINTENANCE_TOKEN, process.env.MAINTENANCE_CLIENT_ID, process.env.GUILD_ID, createCommands('mm'));

function createCommands(test = '') {
  var commands = [
      new SlashCommandBuilder().setName(test + 'help')
                               .setDescription('Get some fuckin\' help'),
      new SlashCommandBuilder().setName(test + 'quote')
                               .setDescription('Get a fuckin\' quote from the man himself, me.'),
      new SlashCommandBuilder().setName(test + 'text')
                               .setDescription('Message some fuckin\' choomba')
                               .addStringOption(option =>
                                  option.setName('character-name')
                                        .setDescription('Some fuckin\' name.')
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
                               .addIntegerOption(option =>
                                  option.setName('payment')
                                        .setDescription('If you wanna send some hard-earned eddies')
                                        .setRequired(false)
                                  )
  ].map(command => command.toJSON());

  return commands;
}

function sendApi(token, clientId, guildId, commands) {
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
