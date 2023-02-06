const client = require("../index");
const { MessageEmbed } = require("discord.js");
const main_json = require("../config/settings.json");

client.on("messageCreate", async (message) => {

    console.log("LEVEL XP STARTED!");

        var connection = client.sqlconn;

        setInterval(() => {
            connection.query('select 1')
        }, 120000)

        function getGuild(guildID) {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_settings WHERE guild_id = '${guildID}'`, (err, rows) => {
                    if (err) return reject(err);

                    resolve(rows);
                });
            });
        }

        function getGuildToggle(guildID) {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
                    if (err) return reject(err);

                    resolve(rows);
                });
            });
        }

        if (message.author.bot) return;
        if (!message.guild) return;

        const [guildsettings] = await getGuild(message.guild.id) // destructuring 'rows' array
            .catch(console.error);
        const [guildsettingstoggle] = await getGuildToggle(message.guild.id) // destructuring 'rows' array
            .catch(console.error);

            if (guildsettingstoggle == undefined) return console.log("DOESNT ESIST SERVER, ADDIGN NOW")
            if (guildsettings == undefined) return console.log("DOESNT ESIST SERVER, ADDIGN NOW")

        //const lvlchannel = guildsettings.levelChannel;

        //if (guildsettingstoggle)

        /*const lvltoggle = guildsettingstoggle.levelToggle

        if (lvltoggle == 1) {
            let sqlprofile = `
            SELECT * FROM profile_level WHERE user_id = '${message.author.id}'
            `;

            if (message.author.bot) return;
          			
            connection.query(sqlprofile, async function(err, results) {

                if (err) throw err;
                //var dusers = message.author.username; //encrypt(message.author.username);
                var dtag = message.author.discriminator; //encrypt(message.author.discriminator);
                if (results.length === 0) {

                    var discordusername = message.author.username;
                    var dusers = discordusername.replace(/[\u0800-\uFFFF]/g, '');

                    connection.query(`
                                INSERT INTO profile_level SET level_xp = '0', level = '0', points = '0', user_id = '${message.author.id}', username = '${message.author.username}'
                            `, err => {
                        if (err) throw err;

                        //console.log(dusers)
                        console.log("[AUTOMOD] Username has been Addded to Database");
                    });

                } else {

                    const randomXP = Math.floor(Math.random() * 10) + 10;
            		const level = results[0].level;
            		const XP = results[0].level_xp;
            		const XPneeded = level * 2 * 350 + 350;
                    
                    connection.query('UPDATE profile_level SET level_xp = ? WHERE user_id = ?', [XP + randomXP, message.author.id], err => {
                        if (err) throw err; // ${profile.level + 1} and you got ï¿½${i.money}
                        //console.log("Transfered "+user.username+" Data to Website");

                    });


                    if (XPneeded < XP) {

                        connection.query('UPDATE profile_level SET level_xp = ?, level = ?, points = ? WHERE user_id = ?', [0, level + 1, results[0].points + 100, message.author.id], err => {
                            if (err) throw err; // ${profile.level + 1} and you got ï¿½${i.money}
                            //console.log("Transfered "+user.username+" Data to Website");
                            if (results.length == 0) {
                                console.log("ERROR: We cant find that Database, Please check again`")
                            } else {
                                //console.log("LEVELED UP!")
                            }
                        });

                        var points1 = results[0].points + 100;
                        let embed = new MessageEmbed();
                        embed.setColor(0x9900FF)
                        embed.setAuthor("ChisdealHD Level UP / Balance", message.client.user.avatarURL, "")
                        embed.setTitle(message.author.username + "#" + message.author.discriminator + " Just Leveled UP!")
                        embed.setDescription("You Just Leveled up on Discord Server, You get Money or Rewards Every Levelup you get")
                        embed.addField("Level: ", `${level + 1}.`, inline = true)
                        embed.addField("Balance: ", "$" + points1, inline = true)
                        embed.setThumbnail("https://media.tenor.com/images/02bfcc250484dc13daecd15116b67fc1/tenor.gif")
                        embed.setTimestamp()
                        embed.setFooter("Sent via " + message.client.user.username, message.client.user.avatarURL)
                        if (guildsettings.levelChannel != 0) {
                            let lvlcustomchannel = message.client.channels.cache.find(x => x.id == guildsettings.levelChannel);
                            lvlcustomchannel.send({ embed })
                        } else {
                            message.channel.send({ embed })
                        }

                    }
                }

            })
        }*/

});