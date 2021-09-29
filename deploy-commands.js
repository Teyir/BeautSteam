const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const dotenv = require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('pingtxr').setDescription('Replies with pong !'),
    new SlashCommandBuilder().setName('servertxr').setDescription('Replies with server info !'),
    new SlashCommandBuilder().setName('usertxr').setDescription('Replies with user info!'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);