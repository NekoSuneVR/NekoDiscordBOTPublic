const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require('canvas');


module.exports = {
   name: "profile",
   description: "Your XP / Level System Profile",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES"],
   cooldowns: 2000,
   options: [{
    name: 'user',
    description: 'Select user by @USER',
    type: 'STRING',
    required: false
   }],

   run: async (client, interaction, args) => {

    var connection = client.sqlconn;

        function getGuildToggle(guildID) {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
                    if (err) return reject(err);

                    resolve(rows);
                });
            });
        }

        const [guildsettings] = await getGuildToggle(interaction.guild.id) // destructuring 'rows' array
            .catch(console.error);

        const lvltoggle = guildsettings.levelToggle;

        var atuser;

        if (interaction.options.getString('user')) {
            atuser = interaction.options.getString('user').replace(/[<@!>]/g, '');
        }

        var user = client.users.cache.find(user => user.id === atuser) || interaction.user

        let sql = `SELECT * FROM profile_level WHERE user_id = '${user.id}'`;
        connection.query(sql,  async function(err, results) {
            if (err) {
                return console.error(err.message);
            }

            if (user.bot) return interaction.reply(`Bots Don't Have XP System, Reasons as not supported for System`)
            const level = results[0].level;
            const currentXP = results[0].level_xp;
            const XPneeded = level * 2 * 350 + 350;
            
            
            // Rank Image
            let backgroundrank = results[0].backgroundrank;
            if (!backgroundrank) {
                const firstbackgroundranklink = 'https://i.imgur.com/SpcEOfc.jpg'
                interaction.reply(`Try Again, Was Loading Data And Image. Only 1 Time Process`)
                return
            }

            // Canvas
            const canvas = createCanvas(1500, 333) // Canvas Size
            const ctx = canvas.getContext('2d') // Making 2D
            let backgroundimage = await loadImage(backgroundrank)
            if (!backgroundimage || backgroundimage === null) {
                const firstbackgroundranklink = 'https://i.imgur.com/SpcEOfc.jpg'
                interaction.reply(`Try Again, Was Loading Data And Image. Only 1 Time Process`)
                return
            }
      
	        ctx.drawImage(backgroundimage, 0, 0, canvas.width, canvas.height) // For Making Image

            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.strokeStyle = '#90EE90'
            ctx.globalAlpha = 0.2
            ctx.fillStyle = '#0390c8'
            ctx.fillRect(180, 216, 1075, 65)
            ctx.fill()
            ctx.globalAlpha = 1
            ctx.strokeRect(180, 216, 1075, 65)
            ctx.stroke

            // XP Bar With Fill
            ctx.fillStyle = '00FFFF'
            ctx.globalAlpha = 0.6
            ctx.fillRect(200, 216, ((100 / (level * 2 * 250 + 250)) * currentXP) * 7.5, 65) // Filling According To Users Level, Number Same As `const XPneeded`
            ctx.fill()
            ctx.globalAlpha = 1

            // Box For XP Bar
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.fillStyle = '#00a9ec'
            ctx.strokeStyle = '#90EE90'
            ctx.globalAlpha = 0.2
            ctx.fillRect(300, 75, 1075, 120)
            ctx.fill()
            ctx.globalAlpha = 1
            ctx.strokeRect(300, 75, 1075, 120)
            ctx.stroke()

            // XP/XP Needed
            ctx.font = '35px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = '#FF0000'
            ctx.fillText(`${currentXP} / ${XPneeded}`, 600, 260)

            // UserName
            ctx.font = '50px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = '#00FFFF'
            ctx.fillText(user.username, 325, 155)

            // Level
            ctx.font = '40px sans-serif'
            ctx.fillStyle = '#ffa500'
            ctx.fillText('Level:', 1060, 150)
            ctx.fillText(`${level}`, 1175, 150)

            ctx.arc(170, 160, 120, 0, Math.PI * 2, true)
            ctx.lineWidth = 6
            ctx.strokeStyle = '00FFFF'
            ctx.stroke()
            ctx.closePath()
            ctx.clip()

            const avatar = await loadImage(user.displayAvatarURL({ format: 'jpg' }))
            ctx.drawImage(avatar, 40, 40, 250, 250)
           
            const attachment = new MessageAttachment(canvas.toBuffer(), 'rank.png')
       
            // With Embed
           if (lvltoggle != 0) {
            const embed = new MessageEmbed()
                .setColor(0x9900FF)
            	.setAuthor(client.user.username + "#" + client.user.discriminator, client.user.avatarURL, "")
                .setTitle(user.username + "#" + user.discriminator + " Profile Page")
                .setDescription("Your Personal Profile Page!")
                .setTimestamp()
                .addField('Level:', `${level}`)
                .addField('XP:', `${currentXP} / ${XPneeded}`)
                .addField("Balance: ", "$" + results[0].points, inline = true)
                .setThumbnail(user.avatarURL)
                .setImage('attachment://rank.png')
                .setFooter("Sent via " + client.user.username, client.user.avatarURL)
                interaction.followUp({ embeds: [embed], files: [attachment] })
         } else {
             const embed = new MessageEmbed()
             .setColor(0x9900FF)
            .setAuthor(client.user.username + "#" + client.user.discriminator, client.user.avatarURL, "")
            .setTitle(user.username + "#" + user.discriminator + " Profile Page")
            .setDescription("Your Personal Profile Page!")
            .addField("Level: ", `Disabled, You can turn on by **[Visit our Dashboard](https://botpanel.chisdealhd.co.uk/)**`, inline = true)
            .addField("XP: ", `Disabled, You can turn on by **[Visit our Dashboard](https://botpanel.chisdealhd.co.uk/)**`, inline = true)
            .addField("Balance: ", `Disabled, You can turn on by **[Visit our Dashboard](https://botpanel.chisdealhd.co.uk/)**`, inline = true)
            .setTimestamp()
            .setFooter("Sent via " + client.user.username, client.user.avatarURL)
            interaction.followUp({ embeds: [embed] })
            }
        });
   },
};