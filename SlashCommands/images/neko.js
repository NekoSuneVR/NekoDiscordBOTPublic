const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
   name: "neko",
   description: "NEKO Images ***(Totally Randomly Selected)***",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES"],
   cooldowns: 2000,

   run: async (client, interaction, args) => {

        const { url } = await fetch("https://nekos.life/api/v2/img/neko")
        .then((res) => res.json());

        let embed = new MessageEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle("Neko Images")
        embed.setDescription("NEKO Images Random Generated if do Commands")
        embed.setImage(url);
        embed.setFooter("Requested by " + interaction.user.username + " | Powered by nekos.life", client.user.avatarURL)
        embed.setTimestamp()

        interaction.followUp({
            embeds: [embed]
        })
   }
}