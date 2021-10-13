const Discord = require("discord.js");
const fs = require("fs");
const { Intents, MessageEmbed } = require('discord.js');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");
//Config
client.config = config;
const dotenv = require('dotenv').config();

//Log de la connexion du bot
client.once('ready', () => {
    client.user.setActivity("tes morts", {type: "LISTENING"})
    console.log('Bot connecté !');
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

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

client.login(process.env.TOKEN);