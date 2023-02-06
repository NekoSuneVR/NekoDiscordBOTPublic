const settings = require("../../config/settings.json");
const i18n = require("i18n");
const { MessageEmbed } = require("discord.js");
const Client = require('fortnite');
const fortnite = new Client(settings.gameapis.fortnite);
const fetch = require("node-fetch");

module.exports = {
   name: "fortnite",
   description: "Fortnite Status e.g /fortnite profile solo pc ChisVR",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES"],
   cooldowns: 2000,
   options: [{
    name: 'data',
    description: 'what type Data want see profile|shop',
    type: 'STRING',
    required: true
   },
   {
    name: 'gamemode',
    description: 'Select Gamemode solo|duo|squad|lifetime',
    type: 'STRING',
    required: false
   },
   {
    name: 'user',
    description: 'Type Username',
    type: 'STRING',
    required: false
   },
   {
    name: 'platform',
    description: 'Type Platform  psn|xbl|pc',
    type: 'STRING',
    required: false
   }],

   run: async (client, interaction, args) => {

    let embederr1 = new MessageEmbed();
    embederr1.setColor(0x9900FF)
       embederr1.setTitle(`Fortnite Stats (ERROR)`)
       embederr1.setDescription(`ERROR: Didn't Defined what Program want use, "shop|profile"`)
       embederr1.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
       embederr1.setTimestamp()
       
   if (interaction.options.getString('data') == "" || interaction.options.getString('data') == null) return  interaction.followUp({ embeds: [embederr1] })  

       if (interaction.options.getString('data') == "profile") {
       
           let embederr2 = new MessageEmbed();
       embederr2.setColor(0x9900FF)
           embederr2.setTitle(`Fortnite Stats (ERROR)`)
           embederr2.setDescription(`ERROR: Didn't Defined what platform, "solo|duo|squad|lifetime"`)
           embederr2.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
           embederr2.setTimestamp()
       
      if (interaction.options.getString('gamemode') == "" || interaction.options.getString('gamemode') == null) return  interaction.followUp({ embeds: [embederr2] }) 

           if (interaction.options.getString('gamemode') == "solo") {

               const plat = interaction.options.getString('platform');
               const search = interaction.options.getString('user');
               fortnite.user(search, plat).then(data => {

                   let embed = new MessageEmbed();
                   embed.setColor(0x9900FF)
                   embed.setTitle(`${search}'s Fortnite Stats (SOLO)`)
                   embed.setDescription(`Score: ${data.stats.solo.score}\n\n KD: ${data.stats.solo.kd}\n\nMatches: ${data.stats.solo.matches}\n\nKills: ${data.stats.solo.kills}\n\nWins: ${data.stats.solo.wins}`)
                   embed.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
                   embed.setTimestamp()

                   interaction.followUp({
                       embeds: [embed]
                   })

               });

           } else if (interaction.options.getString('gamemode') == "duo") {

               const plat = interaction.options.getString('platform');
               const search = interaction.options.getString('user');
               fortnite.user(search, plat).then(data => {

                   let embed = new MessageEmbed();
                   embed.setColor(0x9900FF)
                   embed.setTitle(`${search}'s Fortnite Stats (DUO)`)
                   embed.setDescription(`Score: ${data.stats.duo.score}\n\n KD: ${data.stats.duo.kd}\n\nMatches: ${data.stats.duo.matches}\n\nKills: ${data.stats.duo.kills}\n\nWins: ${data.stats.duo.wins}`)
                   embed.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
                   embed.setTimestamp()

                   interaction.followUp({
                       embeds: [embed]
                   })

               });

           } else if (interaction.options.getString('gamemode') == "squad") {

               const plat = interaction.options.getString('platform');
               const search = interaction.options.getString('user');
               fortnite.user(search, plat).then(data => {

                   let embed = new MessageEmbed();
                   embed.setColor(0x9900FF)
                   embed.setTitle(`${search}'s Fortnite Stats (SQUAD)`)
                   embed.setDescription(`Score: ${data.stats.squad.score}\n\n KD: ${data.stats.squad.kd}\n\nMatches: ${data.stats.squad.matches}\n\nKills: ${data.stats.squad.kills}\n\nWins: ${data.stats.squad.wins}`)
                   embed.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
                   embed.setTimestamp()

                   interaction.followUp({
                       embeds: [embed]
                   })

               });

           } else if (interaction.options.getString('gamemode') == "lifetime") {

               const plat = interaction.options.getString('platform');
               const search = interaction.options.getString('user');
               fortnite.user(search, plat).then(data => {

                   let embed = new MessageEmbed();
                   embed.setColor(0x9900FF)
                   embed.setTitle(`${search}'s Fortnite Stats (LIFETIME)`)
                   embed.setDescription(`Score: ${data.stats.lifetime.score}\n\n KD: ${data.stats.lifetime.kd}\n\nMatches: ${data.stats.lifetime.matches}\n\nKills: ${data.stats.lifetime.kills}\n\nWins: ${data.stats.lifetime.wins}`)
                   embed.setFooter("Requested by " + interaction.user.username + " | Powered by Fortnite Tracker API (TRN Tracker)", client.user.avatarURL)
                   embed.setTimestamp()

                   interaction.followUp({
                       embeds: [embed]
                   })

               });

           }
   } else if (interaction.options.getString('data') == "shop") {

           fortnite.store().then(async(data) => {

               let currentPage = 0;
               const embeds = generateQueueEmbed(interaction, data);

               const queueEmbed = await interaction.followUp({
                   content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                   embeds: [embeds[currentPage]]
               });

               try {
                   await queueEmbed.react("⬅️");
                   await queueEmbed.react("⏹");
                   await queueEmbed.react("➡️");
               } catch (error) {
                   console.error(error);
                   interaction.followUp(error.message).catch(console.error);
               }

               const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
               const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

               collector.on("collect", async(reaction, user) => {
                   try {
                       if (reaction.emoji.name === "➡️") {
                           if (currentPage < embeds.length - 1) {
                               currentPage++;
                               interaction.editReply({
                                   content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                                   embeds: [embeds[currentPage]]
                               });
                           }
                       } else if (reaction.emoji.name === "⬅️") {
                           if (currentPage !== 0) {
                               --currentPage;
                               interaction.editReply({
                                   content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                                   embeds: [embeds[currentPage]]
                               });
                           }
                       } else {
                           collector.stop();
                           reaction.message.reactions.removeAll();
                       }
                       await reaction.users.remove(interaction.user.id);
                   } catch (error) {
                       console.error(error);
                       return interaction.followUp(error.message).catch(console.error);
                   }
               });

           });

       }
   },
};

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        const info = current.map((track) => `Item: **${track.name}**\nRarity: **${track.rarity}**\nPrice: **${track.vbucks} VBucks**`).join("\n\n");

        const embed = new MessageEmbed()
            .setTitle("Fortnite SHOP Lists")
            .setThumbnail(message.guild.iconURL())
            .setColor("#F8AA2A")
            .setDescription("API Powered by Fortnite Tracker (TRN Tracker)\n\n" + info)
            .setTimestamp();
        embeds.push(embed);
    }

    return embeds;
}