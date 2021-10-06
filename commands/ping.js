//Command ping (pour test si tout fonctionne)
exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
}