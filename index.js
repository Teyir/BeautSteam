



const { Client, Intents } = require('discord.js');
const { guildId } = require('./config.json');
const dotenv = require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });



client.once('ready', () => {
    console.log('Bot connecté !');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'axeping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'axeserver') {
        await interaction.reply('Server info.');
    } else if (commandName === 'axeuser') {
        await interaction.reply('User info.');
    }
});

client.login(process.env.TOKEN);