//Import
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

//Déclaration du client (bot)
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//Log de la connexion du bot
client.once('ready', () => {
    console.log('Bot connecté !');
});

//Intégration du token pour la connexion du bot
client.login(token);