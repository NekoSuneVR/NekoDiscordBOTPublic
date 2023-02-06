const client = require('../index')


client.on('guildMemberAdd', async (member) => {
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

    const [guildsettingstoggle] = await getGuildToggle(member.guild.id).catch(console.error);

    const [dbprefix] = await getGuildSettings(member.guild.id).catch(console.error);

    if (guildsettingstoggle.joinroleToggle != 0) {
        member.roles.add(dbprefix.autorole_id)
    } else {
        return
    }
})