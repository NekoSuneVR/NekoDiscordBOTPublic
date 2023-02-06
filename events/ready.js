const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');
const fetch = require('node-fetch');

const { version: discordjsVersion, MessageEmbed, WebhookClient } = require("discord.js");

const { prefix } = require("../config/settings.json");
const main_json = require("../config/settings.json");

const request = require("request");

let Parser = require('rss-parser');
let parser = new Parser({
    headers: {
        'User-Agent': 'ChisdealHDYT Discord BOT/V7.1'
    },
});

const entities = require('entities');
const validUrl = require('valid-url');

let lastTimestamp = Math.floor(Date.now() / 1000);
let botReady;

let GuildChis;
let ChannelChis;

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const characters ='abcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.replace(/ /g, '');
}

client.on("ready", async () => {

    var connection = client.sqlconn;
    
        GuildChis = client.guilds.cache.get("914992174943313931");
        if (GuildChis) {
            ChannelChis = GuildChis.channels.cache.get("932601382618419220");
        }

        console.log("");
        console.log(chalk.red.bold("———————————————[Ready MSG]———————————————"));

        if (!ChannelChis) {
            console.log("");
            console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
            console.log(
                chalk.gray(
                    `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.`
                )
            );
        } else {
            console.log("");
            console.log(chalk.red.bold("——————————[SERVER CHECK]——————————"));
            console.log(
                chalk.gray(
                    `[Checking Support Server]: CHECKING BOT IN SUPPORT SERVER\n[ChisDiscord] ${client.user.username} Discord BOT Ready Chis Discord!`
                )
            );
            botReady = true;
        }

        async function postAllServersChis(embed, link) {
            const dbprefix = await getChisAlerts().catch(console.error);
            dbprefix.forEach(element => {

                if (element.chisupdatealert == 0) return;
                client.guilds.cache.map(guild => {
                    var data = guild.channels.cache.find(channel => channel.id === element.chisupdatealert);
                    if (data == undefined) {
                        return;
                    } else {
                        const messageChannel = client.channels.cache.get(data.id);
                        messageChannel.send({
                            embeds: [embed]
                        }).then(() => {
                            console.log(`Sent message for new post ${link}`);
                        }).catch(err => {
                            console.log(embed, err);
                        });
                    }
                });
            });
      }
           

  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————

  client.user.setActivity(`STARTING UP... || NEKO BOT || LOADING COMMANDS / MODULES`,
  { type: "WATCHING" })

        setInterval(() => {

            fetch(`https://api.chisdealhd.co.uk/v3/social/api/twitch/nekosunevr`, {
                method: 'GET',
                headers: {
            		  'nekosunevr-api-key': `${client.config.API.MYAPIKEY}`,
            		  'Content-Type': 'application/json'
        		    },
            }).then(res => res.json()).then(json => {
                
                if (json.online == true) {
                    client.user.setActivity(`[LIVE] ${json.livestream.title}`,
                    { type: "STREAMING", "url": "https://www.twitch.tv/nekosunevr" })
                } else {

                    client.user.setActivity(`/help || RAWR! || IM BIG CUTIE`,
                    { type: "WATCHING" })

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || MY MASTER IS A CUTIE!`,
                        { type: "WATCHING" })
                    }, 30000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || NOTICE ME SENPAI!!`,
                        { type: "WATCHING" })
                    }, 40000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || BOT Version 7.5 (BETA)`,
                        { type: "WATCHING" })
                    }, 50000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || Connected: ${client.guilds.cache.size} ${
                            client.guilds.cache.size > 1 ? "Servers" : "Server"
                        }`, { type: "WATCHING" })
                    }, 60000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || Surving: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
                            client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                            ? "Users,"
                            : "User,"
                        }`, { type: "WATCHING" })
                    }, 70000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || READD BOT FROM PROFILE OR "/invite" To enabled SLASH COMMANDS ON YOUR SERVER`,
                        { type: "WATCHING" })
                    }, 80000)

                    setTimeout(function() {
                        client.user.setActivity(`/help || NEKO BOT || DONATE TO US KEEP OUR SERVERS ACTIVE ON OUR PATERON £1 a Month WITH PERKS /patreon in SERVERS`,
                        { type: "WATCHING" })
                    }, 90000)

                    setTimeout(function() {
                        let user = client.users.cache.get('540706221645103104');
                        client.user.setActivity(`/help || NEKO BOT || ${user.username} is my ULTIMATE CUTIE BECAUSE I LOVE HER <3`,
                        { type: "WATCHING" })
                    }, 100000)

                }

            });

        }, 110000)

        var connection = client.sqlconn;

        function getBlacklistServers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }
    
        function getBlacklistUsers() {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM profile_blacklist WHERE active='1'`, (err, rows) => {
                    if (err) return reject(err);
    
                    resolve(rows);
                });
            });
        }

        const BlacklistServers = await getBlacklistServers().catch(console.error);
    const BlacklistUsers = await getBlacklistUsers().catch(console.error);

    if (BlacklistServers.length == 0) {
        var blockservers = 0;
    } else {
       var blockservers = BlacklistServers.length;
    }

    if (BlacklistUsers.length == 0) {
        var blockusers = 0;
    } else {
       var blockusers = BlacklistUsers.length;
    }

  // ———————————————[Ready MSG]———————————————
  console.log("");
  console.log(chalk.red.bold("——————————[BOT DETAILS]——————————"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers," : "Server,"}`),
    chalk.red(`${blockusers}`),
    chalk.white(`${blockusers > 1 ? "Blocked Users," : "Blocked User,"}`),
    chalk.red(`${blockservers}`),
    chalk.white(`${blockservers > 1 ? "Blocked Servers." : "Blocked Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Slash Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});
