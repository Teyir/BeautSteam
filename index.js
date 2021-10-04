//Import
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents, MessageEmbed} = require('discord.js');
const { clientId, guildId } = require('./config.json');
const { MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
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

    //Embed Stats
    const embedStats = new MessageEmbed()
        .setColor('#2a475e')
        .setTitle('Informations du joueur PSEUDO')
        .setURL('https://steamcommunity.com/profiles/76561198141578851')
        .setAuthor('PSEUDO', 'https://avatars.githubusercontent.com/u/60007549?s=40&v=4', 'https://steamcommunity.com/profiles/7656119814157885')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png')
        .addFields(
            { name: 'NOM JEUX', value: 'HEURES DE JEUX' },
            { name: 'NOM JEUX', value: 'HEURES DE JEUX' },
            { name: 'NOM JEUX', value: 'HEURES DE JEUX' },
            { name: 'NOM JEUX', value: 'HEURES DE JEUX' },
            { name: 'NOM JEUX', value: 'HEURES DE JEUX' },
        )
        .setTimestamp()
        .setFooter('Généré automatiquement pour le joueur PSEUDO', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png');





    if (commandName === 'stats') {
        //Bouton link profile
        const btnProfile = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setURL('https://steamcommunity.com/profiles/76561198141578851')
                    .setLabel('Profile du joueur')
                    .setStyle('LINK'),
            );
        await interaction.reply({ embeds: [embedStats], components: [btnProfile] });
    } else if (commandName === 'statsp') {
        await interaction.reply({ embeds: [embedStats] });
    } else if (commandName === 'testargs'){

    }
});




//Intégration du token pour la connexion du bot
client.login(process.env.TOKEN);

