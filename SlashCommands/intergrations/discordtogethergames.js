module.exports = {
   name: "discordtogethergames",
   description: "Play Video Games using Embeded Discord Web Browser",
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

    if (interaction.options.getString('apps') == "" || interaction.options.getString('apps') == null) return interaction.followUp("Invalid Command:\n\nLists:\npoker|betrayal|fishing|chess|checkers|lettertile|wordsnack|doodlecrew|spellcast|awkword|puttparty")

    if (interaction.options.getString('apps') == "poker") {

        if (interaction.member.voice.channel) {
            const { channelID } = interaction.member.voice;

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "betrayal") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'betrayal').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "fishing") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'fishing').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "chess") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "checkers") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'checkers').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "lettertile") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'lettertile').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "wordsnack") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'wordsnack').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "doodlecrew") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'doodlecrew').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "spellcast") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'spellcast').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "awkword") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'awkword').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else if (interaction.options.getString('apps') == "puttparty") {

        if (interaction.member.voice.channel) {

            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'puttparty').then(async invite => {

                return interaction.followUp(`${invite.code}`);

            });

        } else {

            interaction.followUp("You are not in any Voice Channels, make sure you inside voice channel")

        };

    } else {

        interaction.followUp("Invalid Command:\n\nLists:\npoker\nbetrayal\nfishing\nchess\ncheckers\nlettertile\nwordsnack\ndoodlecrew\nspellcast\nawkword\nputtparty")

    }

   },
};