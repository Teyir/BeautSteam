const Discord = require("discord.js");
const fs = require("fs");
const { Intents, MessageEmbed } = require('discord.js');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
//Config
client.config = config;
const dotenv = require('dotenv').config();
const guild = config.guildId;
//Logs
var { insertLogBot } = require('./utils/logsBot.js');




//Log de la connexion du bot
client.once('ready', () => {
    client.user.setActivity("avec du JS", { type: "PLAYING"})
    console.log('Bot connecté !');
    //Insertion log
    insertLogBot("ready");
});

//Cette fonction permet de récupérer tous les fichiers dans le dossier events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

//Cette fonction permet de récupérer toutes les commandes présentes dans le dossier commandes
//Les commandes sont automatiquement chargés
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Chargement de la commande ${commandName}`);
        client.commands.set(commandName, props);
    });
});


//Inutile mais tranquille c'est sympatoche
client.on("message", (message) => {
    if(message.content === "uesh") {
        message.channel.send("Alors");
    }
    if(message.content === "pique") {
        message.channel.send("nique");
    }
    if(message.content === "gravy") {
        message.channel.send("Grand fou il est déjà couché à cette heure là!");
    }
    if(message.content === "apple") {
        message.channel.send("Bah oé on à des codageurs notepad ++ ici");
    }
    if(message.content === "fabien") {
        message.channel.send("Askip c'est un crack JS ^_^");
    }
    if(message.content === "axel") {
        message.channel.send("Il lui manque 10g donc il doit changer sa sensi...");
    }
    if(message.content === "cameron") {
        message.channel.send("aka l'arabe car il à volé 10g à Axelle");
    }
    if(message.content === "mathurin") {
        message.channel.send("Bah il est mort quoi");
    }

});


//On instencie de bot
client.login(process.env.TOKEN);
