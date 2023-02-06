const {
    Client,
    Collection,
    WebhookClient,
    MessageEmbed,
    Permissions,
    MessageAttachment
} = require("discord.js");
const client = require("../index");

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(".")) return;

    var connection = client.sqlconn;

    function getGuildToggle(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    function getGuildSettings(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM guild_settings WHERE guild_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    function getProfileRoles(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT isDonator, isPremium, isLegend, isMega, isTwitchSub, isMonthSupporter, isBetaTesters FROM profile_rank WHERE userid = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    function getBlacklistServers(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM guild_blacklist WHERE guild_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    function getBlacklistUsers(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM profile_blacklist WHERE user_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    const [guildsettingstoggle] = await getGuildToggle(message.guild.id).catch(console.error);

    const [dbprefix] = await getGuildSettings(message.guild.id).catch(console.error);

    const [BlacklistServers] = await getBlacklistServers(message.guild.id).catch(console.error);
    const [BlacklistUsers] = await getBlacklistUsers(message.author.id).catch(console.error);


    if (BlacklistUsers) return;

    if (BlacklistServers) return;

    if (guildsettingstoggle.globalToggle != 0) {
    
        if (message.channel.id === dbprefix.globalchannelid) {

            var blockedlinks = ["xvideos.com", "pornhub.com", "hentaihaven.com"];
            var blockedlinksfound = false;

            function findWord(word, str) {
				return str.split(' ').some(function(w){return w === word})
			}

            for (var i = 0; i < blockedlinks.length && !blockedlinksfound; i++) {
                if (findWord(blockedlinks[i], message.content)) {
                    blockedlinksfound = true;
                  break;
                }
            }

            if (message.content.includes(client.config.prefix)) return;
            if (message.content.includes(dbprefix.prefix)) return;
            if (blockedlinksfound) return;

            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Username: " + message.author.tag)
            .addField("Message:", message.content)
            .setFooter(`S: ${message.guild.name} | C: ${message.channel.name} | M: ${message.guild.members.cache.filter(m => !m.user.bot).size} | B: ${message.guild.members.cache.filter(m => m.user.bot).size} | T: ${message.guild.memberCount}`)
            if (message.attachments.size > 0){
                embed.setImage(message.attachments.first().url)
            }
            if (message.content.includes("discord.gg/")) {
                if (message.author.id === "100463282099326976") {
                    embed.setTitle("Come Join This Server")
                    embed.addField("Message:", message.content)
                    embed.setColor("RANDOM")
                } else {
                    message.delete();
                    message.reply("DONT SENT INVITE LINKS")
                    return;
                }
            }

            const [getroles] = await getProfileRoles(message.author.id).catch(console.error);

            let hasDonatorRole;
            let hasPremiumRole;
            let hasLegendRole;
            let hasMegaRole;
            let hasTwitchSubRole;
            let hasTwitchMODRole;
            let hasTwitchVIPRole;
            let displayHexColor;

            let guild = client.guilds.cache.get("914992174943313931");
            let member = guild.members.cache.get(message.author.id)
            if (member) {
                hasDonatorRole = member.roles.cache.some(role => role.id === '971557410454007858')
                hasPremiumRole = member.roles.cache.some(role => role.id === '971557608664227871')
                hasLegendRole = member.roles.cache.some(role => role.id === '971557706899017758')
                hasMegaRole = member.roles.cache.some(role => role.id === '971557752851824650')
                hasTwitchSubRole = member.roles.cache.some(role => role.id === '952997249812668456')
                hasTwitchMODRole = member.roles.cache.some(role => role.id === '914992997207269447')
                hasTwitchVIPRole = member.roles.cache.some(role => role.id === '914993264455721033')
                displayHexColor = member.displayHexColor;
            } else {
                hasDonatorRole = false;
                hasPremiumRole = false;
                hasLegendRole = false;
                hasMegaRole = false;
                hasTwitchSubRole = false;
                hasTwitchMODRole = false;
                hasTwitchVIPRole = false;
                displayHexColor = "RANDOM";
            }

            if (message.author.id === "100463282099326976") {
                embed.setColor(displayHexColor)
                embed.setTitle("BOT DEVELOPER: " + message.author.tag)
                embed.setDescription(`Role: Main Owner of BOT / Main Owner of AlloyXuast Community`);
            } else if (message.author.id === "124495978962092037") {
                embed.setColor(displayHexColor)
                embed.setTitle("BOT DEVELOPER: " + message.author.tag)
                embed.setDescription(`Role: Main Admin of BOT / Main Admin of AlloyXuast Community`);
            } else if (hasTwitchMODRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("TWITCH MODERATOR: " + message.author.tag)
            } else if (hasTwitchVIPRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("TWITCH VIP: " + message.author.tag)
            } else if (hasTwitchSubRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("TWITCH SUBSCRIBER: " + message.author.tag)
            } else if (hasMegaRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("MEGA (MONTHLY): " + message.author.tag)
            } else if (hasLegendRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("LEGEND (MONTHLY): " + message.author.tag)
            } else if (hasPremiumRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("PREMIUM (MONTHLY): " + message.author.tag)
            } else if (hasDonatorRole) {
                embed.setColor(displayHexColor)
                embed.setTitle("DONATOR (MONTHLY): " + message.author.tag)
            } else {
                embed.setColor(displayHexColor)
                embed.setTitle("Member: " + message.author.tag)
            }

            message.delete();
            client.guilds.cache.forEach(async g => {
                try {
                    const [guildchannelsglobal] = await getGuildSettings(g.id).catch(console.error);
                    
                    if (guildchannelsglobal.globalchannelid == 0) return;
                    
                    client.channels.cache.get(guildchannelsglobal.globalchannelid).send({
                        embeds: [embed]
                    }).then(() => {
                        console.log("Sended it over: " + g.name);
                    });
                } catch (e) {
                    return;
                }
            });
        }
    }

});