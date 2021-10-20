
exports.run = (client,message,args) => {
    const embed = {
        title: 'Menu help',
        author: {
            name: `Beaut Steam | HELP ME STEBRO`,
            icon_url: 'https://cdn.discordapp.com/attachments/892692424265195521/900181116558925854/1stBOSS.png',
        },
        fields: [
            {
                name: "Commande pour afficher les Informations d'un joueur : ",
                value: '``?steam [Pseudo] Summary``',
            },
            {

                name: "Commande pour afficher le dernier jeu auquel un joueur a joué : ",
                value: '``?steam [Pseudo] Recent``',
            },

            {
                name: "Commande pour afficher les informations d'un joueur sur un jeu précis : ",
                value: '``?steam [Pseudo] [Nom Du Jeu]``',
            },
            {

                name: "Commande pour afficher les amis d'un joueur",
                value: '``?friends [Pseudo]``',
            },
            {

                name: "Commande pour afficher la suite de la liste d'amis du joueur",
                value: '``?steam [MemePseudo] next``',
            },
            {

                name: "Affiche la dernière entrée dans les logs",
                value: '``?logs``',
            },
            {

                name: "tout est dans le nom :'o ",
                value: '``?blague``',
            },
        ],
    }
    message.channel.send({embeds: [embed]});
}
