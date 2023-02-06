const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');
const fetch = require('node-fetch');

const { version: discordjsVersion, MessageEmbed, WebhookClient } = require("discord.js");

const { prefix } = require("../config/settings.json");
const main_json = require("../config/settings.json");

const request = require("request");

let lastTimestamp = Math.floor(Date.now() / 1000);
let botReady;

let GuildChis;
let ChannelChis;

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const vortexlistapi = require("discordz.xyz");
const { AutoPoster } = require('topgg-autoposter')
const { InfinityAutoPoster } = require('ibl-autopost')

async function vortexlist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VORTEXLIST]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VortexList]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VortexList]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                const vortexlistdbl = new vortexlistapi(apikey, client1);
                vortexlistdbl.serverCount();
                console.log("[VortexList]: Server count posted")
            }
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function topgglist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[TOPGG]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[TopGG]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[TopGG]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        //setInterval(() => {
            if (botReady) {
                const ap = AutoPoster(apikey, client1)

                ap.on('posted', () => {
                    console.log('[TopGG]: Server count posted')
                })
            }
        //}, 5 * 60 * 1000); // 5 Minutes
    }
}

async function infinitybots(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[INFINITYBOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[InfinityBots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[InfinityBots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        //setInterval(() => {
            if (botReady) {
                const infinitybotsdbl = InfinityAutoPoster(apikey, client1)
    
                infinitybotsdbl.on('posted', () => {
                    console.log('[InfinityBots]: Server count posted')
                })
            }
        //}, 5 * 60 * 1000); // 5 Minutes
    }
}

async function ondiscord(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[BOTSONDISCORD]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[BotsOnDiscord]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[BotsOnDiscord]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let ondiscordpostreq = {
                    "guildCount": client1.guilds.cache.size
                };
            
                let ondiscordheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://bots.ondiscord.xyz/bot-api/bots/${client1.user.id}/guilds`, {
                    method: 'POST',
                    body: JSON.stringify(ondiscordpostreq),
                    headers: ondiscordheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[BotsOnDiscord]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function discordlabs(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[DISCORDLABS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[DiscordLabs]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[DiscordLabs]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let discordlabspostreq = {
                    "server_count": client1.guilds.cache.size
                };
            
                let discordlabsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://bots.discordlabs.org/v2/bot/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(discordlabspostreq),
                    headers: discordlabsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[DiscordLabs]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function discordbotlist(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[DISCORDBOTLIST]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[DiscordBotList]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[DiscordBotList]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let discordbotlistpostreq = {
                    "guilds": client1.guilds.cache.size
                };
            
                let discordbotlistheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://discordbotlist.com/api/v1/bots/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(discordbotlistpostreq),
                    headers: discordbotlistheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[DiscordBotList]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function botsgg(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[BOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[Bots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[Bots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let botspostreq = {
                    "guildCount": client1.guilds.cache.size
                };
            
                let botsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://discord.bots.gg/api/v1/bots/${client1.user.id}/stats`, {
                    method: 'POST',
                    body: JSON.stringify(botspostreq),
                    headers: botsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[Bots]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function voidbots(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VOIDBOTS]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VoidBots]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VoidBots]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
                let voidbotspostreq = {
                    "server_count": client1.guilds.cache.size,
                    "shard_count": 0
                };
            
                let voidbotsheaderreq = {
                    'Content-Type': 'application/json',
                    'Authorization': apikey
                };
            
                fetch(`https://api.voidbots.net/bot/stats/${client1.user.id}`, {
                    method: 'POST',
                    body: JSON.stringify(voidbotspostreq),
                    headers: voidbotsheaderreq
                }).then(res => res.json()).then(json => {
                    console.log('[VoidBots]: Server count posted')
                });
            }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

async function vcodez(apikey, client1, botReady) {
    console.log("");
    console.log(chalk.red.bold("——————————[VCODEZ]——————————"));
    if (apikey == "" || apikey == null) {
        return console.log(
            chalk.gray(
                `[VCodez]: Not Setup, Please Set this up if Required?`
            )
        );
    } else {
        console.log(
            chalk.gray(
                `[VCodez]: I have been setup, I refresh every 5 Minuteds on Site Provent API Floods`
            )
        );
        setInterval(() => {
            if (botReady) {
            
                var bodycount = {
                    'serverCount': client1.guilds.cache.size
                }

                fetch(`https://topiclist.xyz/api/bots/${client1.user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': apikey
                    },
                    body: JSON.stringify(bodycount)
                }).then(res => res.json()).then(json => {
                    console.log('[VCodez]: Server count posted')
                });
             }
    
        }, 5 * 60 * 1000); // 5 Minutes
    }
}

client.on("ready", async () => {

        botReady = true;

        var blotlistapi = {
            "vortexlist": main_json.botlistapi.vortexlist.apitoken,
            "topgg": main_json.botlistapi.top.apitoken,
            "infinitybots": main_json.botlistapi.infinitybots.apitoken,
            "ondiscord": main_json.botlistapi.ondiscord.apitoken,
            "discordlabs": main_json.botlistapi.discordlabs.apitoken,
            "discordbotlist": main_json.botlistapi.discordbotlist.apitoken, 
            "botsgg": main_json.botlistapi.bots.apitoken, 
            "voidbots": main_json.botlistapi.voidbots.apitoken,
            "vcodez": main_json.botlistapi.vcodez.apitoken
        };

        if (botReady) {
            console.log("");
            console.log(chalk.red.bold("——————————[CHECK BOT LIST API]——————————"));
            console.log(
                chalk.gray(
                    `[BOT LIST API]: CHECKING BOT LISTS API IF VALID!`
                )
            );
            await vortexlist(blotlistapi.vortexlist, client, botReady);
            await topgglist(blotlistapi.topgg, client, botReady);
            await infinitybots(blotlistapi.infinitybots, client, botReady);
            await ondiscord(blotlistapi.ondiscord, client, botReady);
            await discordlabs(blotlistapi.discordlabs, client, botReady);
            await discordbotlist(blotlistapi.discordbotlist, client, botReady);
            await botsgg(blotlistapi.botsgg, client, botReady);
            await voidbots(blotlistapi.voidbots, client, botReady);
            await vcodez(blotlistapi.vcodez, client, botReady);
        }
});
