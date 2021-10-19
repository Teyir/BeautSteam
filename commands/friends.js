const SteamAPI = require("steamapi");
const key = process.env.STEAMAPI;
const steam = new SteamAPI(key);
let friendsSum = [];
let friendsUsr = [];
let friendsLvl = [];
let result = "";
let info = "";
let usr = "";
let urlUsr = "";
let avatar = "";
let tmp = 0;
let nbNext = 5;

//Logs
var path = require('path');
var { insertLog } = require('./../utils/logs');
var residCommande = path.basename(__filename);
reqidCommande = module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length -3);



// Déclaration des variables essentielles au fonctionnement de la commande "friends".
// Cette commande permet de lister les amis d'un utilisateur en fournisant son id STEAM (par example : .friends HowBaka)

exports.run = (client, message, args) => {

    //Log, get client id
    reqidClient = message.author.id;

    //Appel de la fonction pour insérer des logs
    insertLog(reqidCommande, reqidClient);


    // Je commence par vérifier si j'ai bien mon premier argument qui est nessesaire à l'execution de la requete pour l'API STEAM
    if (args[0] === undefined) {
        message.channel.send("Vous devez rajouter votre pseudo STEAM:tm: pour que la commande fonctionne :warning:").catch(console.error); // Message d'erreur pour l'utilisateur
    } else {
        // Requete pour l'API STEAM afin de récuperer en premier l'ID de l'utilisateur rentré (requete sous forme d'une promesse)
        steam.resolve('https://steamcommunity.com/id/' + args[0]).then(async (id) => {
            // Récupération de la liste d'amis à partir de l'ID récupéré par la requete
            result = await steam.getUserFriends(id);

            // Récupération du "Summary" du compte rentré dans la commande afin de pouvoir aficher des informations comme l'avatar STEAM ou bien l'URL liée à ce compte
            await steam.getUserSummary(id).then((result) => info = result);
            usr = info.nickname;
            urlUsr = info.url;
            avatar = info.avatar.medium;

            // Ici je vérifie la présence du 2e argument "next²" afin de pouvoir afficher la suite des amis d'un joueur
            // ² : L'argument "next" permet d'afficher les 5 prochains amis d'un compte STEAM, on peut ainsi voir tous
            // les amis d'un joueur en répétant cette commande plusieurs fois

            if (args[1] === "next") {
                for (tmp; tmp < 5; tmp++) {
                    // Je vérifie que je ne demande pas le steamID de quelque chose de non-défini
                    if (result[tmp + nbNext] === undefined) {
                        break;
                    } else {
                        // Je récupère le "Summary" et le "Level" des 5 premiers amis du joueur
                        await steam.getUserSummary(result[tmp + nbNext].steamID).then((result) => friendsSum[tmp] = result);
                        await steam.getUserLevel(result[tmp + nbNext].steamID).then((result) => friendsLvl[tmp] = result);
                    }
                }
                tmp = 0;
                nbNext += 5;
                // Si jamais le 2e argument n'est pas présent, je récupère les informations mentionées plus haut mais je n'affiche que les 5 premiers amis dans tous les cas
            } else if (args[1] === undefined) {
                nbNext = 5;
                for (let i = 0; i < 5; i++) {
                    await steam.getUserSummary(result[i].steamID).then((result) => friendsSum[i] = result);
                    await steam.getUserLevel(result[i].steamID).then((result) => friendsLvl[i] = result);
                }
            }
            for (let x = 0; x < friendsSum.length; x++) {
                // Ici je récupère le pseudo des amis que l'on a récupéré dans un tableau
                friendsUsr[x] = friendsSum[x].nickname;
            }

            // Dans la let suivante je construit l'embed qui va recevoir la data récupérée et traitée
            let embed = {
                "content": null,
                "description": "Vous pouvez trouver ici la liste de vos amis STEAM:tm:",
                "title": "Steam friend list of " + usr,
                "color": 1100794,

                "fields": [
                    {
                        "name": "Friend " + (1 + nbNext - 5), // Grace au nbNext je peux afficher le numéro de l'ami affiché même si j'effectue la commande avec l'argument next
                        "value": friendsUsr[0] + " >>> Level : " + friendsLvl[0]
                    },
                    {
                        "name": "Friend " + (2 + nbNext - 5),
                        "value": friendsUsr[1] + " >>> Level : " + friendsLvl[1]
                    },
                    {
                        "name": "Friend " + (3 + nbNext - 5),
                        "value": friendsUsr[2] + " >>> Level : " + friendsLvl[2]
                    },
                    {
                        "name": "Friend " + (4 + nbNext - 5),
                        "value": friendsUsr[3] + " >>> Level : " + friendsLvl[3]
                    },
                    {
                        "name": "Friend " + (5 + nbNext - 5),
                        "value": friendsUsr[4] + " >>> Level : " + friendsLvl[4]
                    }
                ],

                "author": {
                    "name": usr,
                    "url": urlUsr,
                    "icon_url": avatar
                },
                "footer": {
                    "text": "Made by " + usr
                },
                "timestamp": new Date(),
            }
            // Je vérifie si l'utilisateur veut afficher des amis alors qu'il n'en a plus à afficher
            if (args[1] === "next" && result.length <= nbNext) {
                message.channel.send("Vous n'avez plus d'amis à afficher :sob:").catch(console.error);
            } else {
                // Et j'envoie l'embed construit plus haut ici
                message.channel.send({embeds: [embed]})
            }
        });
    }
}