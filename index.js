



const { Client, Intents } = require('discord.js');
const { guildId } = require('./config.json');
const dotenv = require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Bot connecté !');
});


client.login(process.env.TOKEN);