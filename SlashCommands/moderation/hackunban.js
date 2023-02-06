const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
   name: "hackunban",
   description: "UnBan a user from the discord server with a certain reason and Warns User been Unbanned on DM",
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
   },
   {
    name: 'reason',
    description: 'give us Reasons',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return interaction.followUp("YOU DONT HAVE PERMISSION DO THIS!")
	const reason = interaction.options.getString('reason');
    
    var atuser;

	if (interaction.options.getString('user')) {
        atuser = interaction.options.getString('user').replace(/[<@!>]/g, '');
    }

    var user = client.users.cache.find(user => user.id === atuser)

    if (!user) {
      try {
        const fetchedUser = await client.users.fetch(args.slice(0, 1).join(' '));
        if (!fetchedUser) throw new Error('User not found!');
        user = fetchedUser;
      }
      catch (error) {
        return interaction.followUp('Invalid ID Check');
      }
    }

    if (user === interaction.user) return interaction.followUp('You cant Ban Yourself');
    if (!reason) return interaction.followUp('There is no Input reasons');


    //var ownerid = client.users.cache.get(interaction.guild.ownerId)
    /* const banembeddm = new MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ ${user} You have Temporary Banned On ${interaction.guild.name} Server Because your account sending Malware or Treats / BOTNET or you Been Hacked.\n\nWe Banned / Kicked You Provent Hackers Try take more Accounts, More Welcome Come Back by Contact OWNER **__${ownerid.username}#${ownerid.discriminator}__** to be Unbanned.\n\nthis already been Logged to staff Team For Noticed..`);
        user.send({ embeds: [banembeddm] });*/	   
	 
    interaction.guild.members.unban(user, {
        reason
    }).then(async () => {

        const banembed = new MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ ${user} is now Banned from Server!\n\nReason: ${reason}`);
        interaction.followUp({ embeds: [banembed] });

    }).catch(() => interaction.followUp('YOU DONT HAVE PERMS TO BAN USERS ON SERVER!'));

   }
}