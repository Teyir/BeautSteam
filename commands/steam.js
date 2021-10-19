const SteamAPI = require('steamapi');
const Console = require("console");
const {replaceResultTransformer} = require("common-tags");

const {Embed} = require("@discordjs/builders");
//necessaire pour utiliser L'API steam.
const steam = new SteamAPI('9740ADC804221A3DAC5A638868BD945A');

const inspect = json => console.dir(json, { depth: null }); //Inspecter le retour des valeurs des élements de L'API utilisées.

//Logs
var path = require('path');
var { insertLog } = require('./../utils/logs');
var residCommande = path.basename(__filename);
reqidCommande = module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length -3);


//Run AXE-BOT by Axel Baudoin

exports.run = (client,message, args) => {

    //Log, get client id
    reqidClient = message.author.id;

    //Appel de la fonction pour insérer des logs
    insertLog(reqidCommande, reqidClient);

    const url = 'https://steamcommunity.com/id/' + args[0];
    steam.resolve(url).then(async id => {
        //Initialisation des Variables nécéssaires pour le bon fonctionnement des Retours de L'apiSteam.
        let summaryUse= '';
        let RecentGameInfo = '';
        let OwnedGame = '';
        const names = args[0];
        const names2 = args[1];

        //Utilisation de L'API Steam -> On récupère une liste d'informations en fonction du domaine demandée.
        await steam.getUserSummary(id).then((result)=> summaryUse = result);
        await steam.getUserRecentGames(id).then((result) => RecentGameInfo = result);
        await steam.getUserOwnedGames(id).then((result) => OwnedGame = result);
        const Globalavatar = summaryUse.avatar.medium;

        //On détecte les arguments rentrés dans la commandes.
        //Puis on analyse sa valeur afin de retourner la bonne information.

        //Affichage Jeu le plus récent.
        if (names2 === 'Recent') {
            const recentgamename = RecentGameInfo[0].name;
            const recentgameplaytime = RecentGameInfo[0].playTime / 60;
            const recentgameplaytime2 = RecentGameInfo[0].playTime2 / 60;

            //Création de l'embed : Jeu Récent.
            const embed = {
                color: "#2a475e",
                title: 'Jeu le plus récent du joueur ' + names,
                author: {
                    name: `Steam Services | ` + names,
                    icon_url: Globalavatar,
                },
                fields: [

                    {
                        name: recentgamename,
                        value: 'Heures de jeu : ' + recentgameplaytime,

                    },
                    {
                        name: 'Heure de jeu (15 derniers jours)',
                        value: recentgameplaytime2 + ' heures',

                    },
                ],
            }
            message.channel.send({embeds: [embed]}); //Affichage de L'embed dans discord.
        }

//Affichage Profile d'un Joueur
        else if (names2 === "Summary")  {
            //Affectation des variables via Les retour de l'API steam.
            const UserInfoId = summaryUse.steamID;
            const UserInfoName = names;
            let  UserInfoState = '';

            //On analyse le status d'un joueur que nous retourne l'API steam.
            //Et on affecte un status a une variable afin de pouvoir l'afficher proprement dans l'Embed.
            if(summaryUse.personaState === 0 )
                UserInfoState = 'Offline'

            else if(summaryUse.personaState === 1)
                UserInfoState = 'Online'

            else if(summaryUse.personaState === 2)
                UserInfoState = 'Busy'

            else if(summaryUse.personaState === 3)
                UserInfoState = 'Away'

            else if(summaryUse.personaState === 4)
                UserInfoState = 'Snooze'

            else if(summaryUse.personaState === 5)
                UserInfoState = 'looking to trade'

            else if(summaryUse.personaState === 6) {
                UserInfoState = 'looking to play.'
            }


            //Création de l'embed : Summary.
            const embed = {
                color: "#2a475e",
                title: 'Informations du joueur ' + names,
                url: 'https://steamcommunity.com/profiles/' + id,
                author: {
                    name: `Steam Services | ` + names,
                    icon_url: Globalavatar,
                },
                fields: [
                    {
                        name: 'Id',
                        value: '->'+UserInfoId,
                    },
                    {
                        name: 'Nom',
                        value: '->'+UserInfoName,
                    },
                    {
                        name: 'Status',
                        value: '->'+UserInfoState,
                    },
                    {
                        name: 'Url du profile' +UserInfoName,
                        value: '->'+url,
                    },
                ],
                image: {
                    url: Globalavatar,
                },
            }
            message.channel.send({embeds: [embed]});
        }
        //Affichage des informations d'un joueur sur un jeu.
        else if (names2) {
            for (let i = 0; i < OwnedGame.length; i++) { //On parcour la liste que nous retourne L'API steam dans le domaine GetOwnedGame.
                if (OwnedGame[i].name === names2) { //On trouve le jeu qui correspond au deuxieme argument de la commande.
                    //puis on affecte les valeurs retournées dans des variabels.
                    const ownedGamePlayTime = OwnedGame[i].playTime / 60;
                    const ownedGamePlayTime2 = OwnedGame[i].playTime2;
                    const ownedGameName = OwnedGame[i].name;

                    //Création de l'embed : Summary.
                    const embed = {
                        color: 0xFF0000,
                        title: 'Informations sur le jeu ' + ownedGameName,
                        author: {
                            name: `Steam Services | ` + names,
                            icon_url: Globalavatar,
                        },
                        fields: [

                            {
                                name: names2,
                                value: 'Heures de jeux : ' + ownedGamePlayTime,
                            },

                            {
                                name: 'Heure de jeu (15 derniers jours)',
                                value: ownedGamePlayTime2 + ' heures ',

                            },
                        ],
                    }
                    message.channel.send({embeds: [embed]});
                }
            }
        }
    });
}

/*if (names==='help') {
    const embed = {
        color: "#2a475e",
        title: 'Menu help' + names,
        author: {
            name: `Steam Services | `,
            icon_url :'https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/help.png',
        },
        fields:[
            {
                name: "Commande pour afficher les Informations d'un joueur : ",
                value:'?steam [Pseudo]',
            },
            {
                name: "Commande pour afficher le dernier jeu auquel un joueur a joué : ",
                value:'?steam [Pseudo] Recent',
            },
            {
                name: "Commande pour afficher les informations d'un joueur sur un jeu précis : ",
                value:'?steam [Pseudo] [Nom Du Jeu]',
            },
        ],
    }
    message.channel.send({embed: [embed]} );
}*/