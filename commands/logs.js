var mysql = require('mysql2');
const dotenv = require('dotenv').config();

//Logs
var path = require('path');
var { insertLog } = require('./../utils/logs');
var residCommande = path.basename(__filename);
reqidCommande = module.filename.slice(__filename.lastIndexOf(path.sep)+1, module.filename.length -3);

exports.run = (client, message, args, channel) => {


    //Log, get client id
    reqidClient = message.author.id;

//Appel de la fonction pour insérer des logs
insertLog(reqidCommande, reqidClient);

    select();

    //Cette fonction permet de selectionner les données dans la base de donnée
    //Pour le moment elle affiche uniquement la dernière entrée
    async function select(){

        //Définition des paramètres de connexion
        const pool = mysql.createPool({
            host: process.env.BDD_HOST,
            user: process.env.BDD_USER,
            password: process.env.BDD_PASSWORD,
            database: process.env.BDD_NAME
        });

        //Promise wrapper
        const promisePool = pool.promise();

        //Requête sql
        const [results, fields] = await promisePool.query('SELECT * FROM `logs` ORDER BY `logs`.`id` DESC');


        //Création de l'embed
            const embed = {
                color: "#2a475e",
                title: 'Dernière log entréee',
                fields: [
                    {
                        name: 'Id',
                        value: results[0].id.toString(),
                    },
                    {
                        name: 'Commande',
                        value: results[0].commande,
                    },
                    {
                        name: 'idClient',
                        value: results[0].idClient.toString(),
                    },
                    {
                        name: 'date',
                        value: results[0].date.toString(),
                    },

                ],
                timestamp: new Date(),
                footer: {
                    text: 'Logs.exe',
                },
            };


            //Envoie du message dans le channel
            message.channel.send({ embeds: [embed] });


    }


}