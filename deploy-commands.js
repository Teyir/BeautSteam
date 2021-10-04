const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');

const dotenv = require('dotenv').config();

const commands = [
    new SlashCommandBuilder().setName('stats').setDescription('Affiche les stats du joueur pour ses 5 derniers jeux lancés.'),
    new SlashCommandBuilder().setName('statsp').setDescription('Affiche les stats du joueur sur un jeux choisis.'),
    new SlashCommandBuilder().setName('testargs')
        .setDescription('Test cmd avec arguments')
        .
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Les commandes ont étés enregistrés avec succès'))
    .catch(console.error);