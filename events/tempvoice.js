const client = require("../index");

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

client.on('voiceStateUpdate', async (newState) => {
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

    const [guildsettingstoggle] = await getGuildToggle(newState.guild.id).catch(console.error);

    const [dbprefix] = await getGuildSettings(newState.guild.id).catch(console.error);

    if (guildsettingstoggle.tempToggle != 0) {
        if (dbprefix.tempvcamount != 0) {
          console.log(dbprefix.tempvcamount)
          tempChannels.registerChannel(dbprefix.tempvchubid, {
            childCategory: dbprefix.tempvccatid,
            childAutoDeleteIfEmpty: true,
            childMaxUsers: dbprefix.tempvcamount,
            childFormat: (member, count) => `#${count} | ${member.user.username}'s Talk`
          });
        } else {
          
          tempChannels.registerChannel(dbprefix.tempvchubid, {
            childCategory: dbprefix.tempvccatid,
            childAutoDeleteIfEmpty: true,
            childFormat: (member, count) => `#${count} | ${member.user.username}'s Talk`
          });
        }

    } else {
        return
    }
})