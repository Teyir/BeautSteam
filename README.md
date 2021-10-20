# Bienvenue sur la page git du bot Discord BeautSteam
## Ce bot Discord à pour but de vous ajouter des commandes uniques concernant vos profiles steam!

Pour utiliser notre bot merci de suivre scrupuleusement ces étapes:
- Installer nodeJS 16

Exécutez les commandes suivantes dans votre terminal:

- npm i --save discord.js
- npm i --save common-tags
- npm i --save console
- npm i --save dotenv
- npm i --save mysql2
- npm i --save steamapi

Une fois tous ces packages installés vous pouvez importer le code du Bot dans votre racine.
Voici à quoi ressembler votre projet:
![Projet](https://media.discordapp.net/attachments/892672010629562418/900171685062397992/oqLxw6UncmiLyvVkBQoKRDKcpHBJD4yZPyZbG4as5bfWfaZjDqQFFBJgcAhq1YceeOj2jwoHSkQhgKBQhZGA6lMUiBsBQiysHuAy.png)



Avant de commencer à utiliser le bot vous devez créer un fichier .env à la racine de votre projet et y intégrer la configuration suivante:
```bash
TOKEN= TOKEN DU BOT DISCORD
STEAMAPI= TOKEN STEAM API
BDD_NAME= NOM DE LA BASE DE DONNÉE
BDD_USER= UTILISATEUR DE LA BASE DE DONNÉE
BDD_PASSWORD= MOT DE PASSE DE LA BASE DE DONNÉE
BDD_HOST= ADRESSE DE CONNEXION DE LA BASE DE DONNÉE
```

Là dernière étape avant de pouvoir profiter de ce magnifique bot c'est de configurer le fichier config.json
```json
{
  "guildId": "ID DE VOTRE SERVEUR",
  "clientId": "ID DE VOTRE BOT",
  "prefix": "-" //Préfix utilisé pour l'utilisation des commandes, exemple: -friends Teyir
}
```

... Bon d'accord il reste une dernière chose à faire et c'est la mise en place de la base de donnée.
Pour ce faire vous devez simplement coller ce code dans votre base de donnée MySQL !! (promis il y à pas de trojan car nous sommes de gentils B2 bien intentionnés)

```sql
CREATE TABLE `connexion_bot` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `commande` varchar(255) NOT NULL,
  `idClient` int(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `connexion_bot`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `connexion_bot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
```

## Et voilà vous y êtes, pour lancer le bot faites la simple commande ``node index.js``

Voici la liste des commandes disponibles:
| Commande | arguments |
| ------ | ------ |
| logs | NONE |
| steam | <IDSTEAM> Summary |
| friends| <IDSTEAM> (next)|
| blague | NONE |


**-La beautTeam**


