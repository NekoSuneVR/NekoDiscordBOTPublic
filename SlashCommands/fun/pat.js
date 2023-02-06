const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
   name: "pat",
   description: "HeadPats to User by (prefix)pat @tagnamehere",
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
    required: true
   }],

   run: async (client, interaction, args) => {

    var suffix = interaction.options.getString('user');
    if (suffix == "" || suffix == null) return interaction.followUp("You are Missing a TAG or Name of USER to **HEADPATS**");


    const { url } = await fetch("https://nekos.life/api/v2/img/pat")
        .then((res) => res.json());

    let embed = new MessageEmbed();
    embed.setColor(0x9900FF)
    embed.setTitle("HEADPATS")
    embed.setDescription(`**${suffix}**, you just got pats from **<@${interaction.user.id}>**`)
    embed.setImage(url);
    embed.setFooter("Requested by " + interaction.user.username + " | Powered by nekos.life", client.user.avatarURL)
    embed.setTimestamp()

    interaction.followUp({
        embeds: [embed]
    })
   },
};