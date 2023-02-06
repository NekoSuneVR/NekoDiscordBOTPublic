const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
   name: "clearchat",
   description: "Clears your Text Channel",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["MANAGE_MESSAGES"],
   botpermissions: ["MANAGE_MESSAGES"],
   cooldowns: 2000,
   options: [{
    name: 'amount',
    description: 'Select amount to Clear',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (interaction.deletable) {
        interaction.delete();
    }
    const permissions = interaction.channel.permissionsFor(client.user);

    // Member doesn't have permissions
    if (!permissions.has(["MANAGE_MESSAGES"])) {
        return interaction.reply("You can't delete messages....").then(m => m.delete(5000));
    }

    // Check if args[0] is a number
    if (isNaN(interaction.options.getString('amount')) || parseInt(interaction.options.getString('amount')) <= 0) {
        return interaction.reply("Yeah.... That's not a numer? I also can't delete 0 messages by the way.").then(m => m.delete(5000));
    }

    // Maybe the bot can't delete messages
    if (!permissions.has(["MANAGE_MESSAGES"])) {
        return interaction.reply("Sorryy... I can't delete messages.").then(m => m.delete(5000));
    }

    let deleteAmount;

    if (parseInt(interaction.options.getString('amount')) > 100) {
        deleteAmount = 100;
    } else {
        deleteAmount = parseInt(interaction.options.getString('amount'));
    }

    interaction.channel.bulkDelete(deleteAmount, true)
        .then(deleted => interaction.followUp(`I deleted \`${deleted.size}\` messages.`))
        .catch(err => interaction.reply(`Something went wrong... ${err}`));

   }
}