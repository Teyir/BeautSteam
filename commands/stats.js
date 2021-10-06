//Command embed ( test )
exports.run = (client, message, args, MessageEmbed) => {

    const embed = {
        color: "#2a475e",
        title: 'Informations du joueur PSEUDO',
        url: 'https://steamcommunity.com/profiles/76561198141578851',
        author: {
            name: 'PSEUDO',
            icon_url: 'https://avatars.githubusercontent.com/u/60007549?s=40&v=4',
            url: 'https://steamcommunity.com/profiles/76561198141578851',
        },
        thumbnail: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png',
        },
        fields: [
            {
                name: 'NOM JEUX',
                value: 'HEURES DE JEUX',
            },
            {
                name: 'NOM JEUX',
                value: 'HEURES DE JEUX',
            },
            {
                name: 'NOM JEUX',
                value: 'HEURES DE JEUX',
            },
            {
                name: 'NOM JEUX',
                value: 'HEURES DE JEUX',
            },
            {
                name: 'NOM JEUX',
                value: 'HEURES DE JEUX',
            },

        ],
        timestamp: new Date(),
        footer: {
            text: 'Généré automatiquement pour le joueur PSEUDO',
            icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png',
        },
    };


    message.channel.send({ embeds: [embed] })


}
