const SteamAPI = require("steamapi");
const key = "6BAC7EADF17507E1244304EF8EECE594";
const steam = new SteamAPI(key);
let friends = [];
let friendsSum = [];
let friendsUsr = [];
let friendsLvl = [];
let result = "";
let info = "";
let usr = "";
let name = "";

exports.run = (client, message, args) => {

    steam.resolve('https://steamcommunity.com/id/DuBendo').then(async (id) => {
        result = await steam.getUserFriends(id);
        for (let i = 0; i < result.length; i++) {
             friends[i] = result[i].steamID;
        }
        for (let y = 0; y < friends.length; y++) {
             steam.getUserSummary(friends[y]).then((result) => friendsSum[y] = result);
             steam.getUserLevel(friends[y]).then((result) => friendsLvl[y] = result);
        }
        for (let x = 0; x < friendsSum.length; x++) {
            friendsUsr[x] = friendsSum[x].nickname;
        }
        for (let z = 0; z < friendsUsr.length; z++) {
            message.channel.send("Friend " + (z + 1) + " : " + friendsUsr[z] + " :arrow_right: lvl " + friendsLvl[z] + " :clown:").catch(console.error);
        }
    });
}