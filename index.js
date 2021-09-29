//Import
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { clientId, guildId } = require('./config.json');

//Token (.env)
const dotenv = require('dotenv').config();

//Déclaration du client (bot)
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Log de la connexion du bot
client.once('ready', () => {
    console.log('Bot connecté !');
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'pingtxr') {
        await interaction.reply('Pong!');
    } else if (commandName === 'servertxr') {
        await interaction.reply('Server info.');
    } else if (commandName === 'usertxr') {
        await interaction.reply('User info.');
    }
});




//Intégration du token pour la connexion du bot
client.login(process.env.TOKEN);

