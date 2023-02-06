const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
   name: "unban",
   description: "Unban a user from the discord server",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["BAN_MEMBERS"],
   botpermissions: ["BAN_MEMBERS"],
   cooldowns: 2000,
   options: [{
    name: 'user',
    description: 'Select user by @USER',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return interaction.followUp("YOU DONT HAVE PERMISSION DO THIS!")

    var atuser;

	if (interaction.options.getString('user')) {
        atuser = interaction.options.getString('user').replace(/[<@!>]/g, '');
    }

    var user = client.users.cache.find(user => user.id === atuser)

    const bans = await interaction.guild.members;
    if (!bans.fetch(user)) return interaction.followUp('this User is not on Banned List');

    await interaction.guild.members.unban(user.id);

    const unbanembed = new MessageEmbed()
      .setColor('#99ff66')
      .setDescription(`✅ ${user} is now Unbanned from Server!`);
    interaction.followUp({
      embeds: [unbanembed]
    });

   }
}