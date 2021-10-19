var mysql = require('mysql2');
const dotenv = require('dotenv').config();

//Fonction qui permet d'insérer des logs dans la base de donnée
async function insertLogBot(status){

    //Définition des paramètres de connexion
    const connection = mysql.createConnection({
        host: process.env.BDD_HOST,
        user: process.env.BDD_USER,
        password: process.env.BDD_PASSWORD,
        database: process.env.BDD_NAME
    });


    //Requête SQL
    connection.query('INSERT INTO `connexion_bot`(`status`) VALUES (?)',[status],
        function (error, results, fields){
            console.log("Insert effectué")
        });

}


//Export de la fonction
module.exports = {
    insertLogBot
}
