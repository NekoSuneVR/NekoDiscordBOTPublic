module.exports = {
   name: "discordtogetherapps",
   description: "Open Embeded Apps using Embeded Discord Web Browser",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES"],
   cooldowns: 2000,
   options: [{
    name: 'apps',
    description: 'Select apps',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (interaction.options.getString('apps') == "" || interaction.options.getString('apps') == null) return interaction.followUp("Invalid Command:\n\nLists:\nyoutube")

    if (interaction.options.getString('apps') == "youtube") {

        if (interaction.member.voice.channel) {
            const { channelID } = interaction.member.voice;
            
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else {

        interaction.followUp("Invalid Command:\n\nLists:\nyoutube")

    }
    
   },
};