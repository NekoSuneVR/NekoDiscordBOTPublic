module.exports = {
   name: "supportserver",
   description: "returns Discord Invite Link",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES"],
   cooldowns: 2000,
   run: async (client, interaction, args) => {
      interaction.followUp(`If need Support or Help or Bug Reports, Please Contact US ASAP @ https://discord.gg/UN92Gfz88j`)
   },
};