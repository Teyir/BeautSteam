//Import
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { clientId, guildId } = require('./config.json');

//Token (.env)
const dotenv = require('dotenv').config();

//Déclaration du client (bot)
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Log de la connexion du bot
client.once('ready', () => {
    console.log('Bot connecté !');
});

//Intégration du token pour la connexion du bot
client.login(process.env.TOKEN);