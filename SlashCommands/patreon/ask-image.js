const settings = require("../../config/settings.json");

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: settings.API.OPENAI_API_KEY,
});
        
const openai = new OpenAIApi(configuration);

module.exports = {
   name: "ask-image",
   description: "ChatImage SYSTEM (PATREON COMMAND ONLY) [ALPHA/BETA Testing]",
   type: "CHAT_INPUT",
   toggleOff: false,
   developersOnly: false,
   userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   botpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
   cooldowns: 2000,
   options: [{
    name: 'prompt',
    description: 'Search What You Looking For!',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

        var prompt = interaction.options.getString('prompt');
        
        const response = await fetch(`https://api.chisdealhd.co.uk/v3/payments/api/patreon/check/${interaction.user.id}`);
        const patreoncheck = await response.json();
            
        if (interaction.user.id == "100463282099326976" || interaction.user.id == "124495978962092037" || interaction.user.id == "901415888060825681" || interaction.user.id == "588083360598065193") {
            try {
   
              const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "1024x1024",
              })

              const answer = response.data.data[0].url;
              
              let embed22 = new MessageEmbed()
                  .setColor("GREEN")
                  .setTitle(`ChatImage`)
                  .setURL("https://openai.com/")
                  .setThumbnail('https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png')
                  .setDescription(prompt)
                  .setImage(answer)
                  .setFooter({ text: 'This is Running From OpenAI API (Click Embed Title Point Website?)', iconURL: 'https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png' });
              interaction.followUp({ embeds: [embed22] })
              
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }

                interaction.followUp({ content: "The answer could not be generated, Try again"});
            }
        } else if (patreoncheck.currently_entitled_tier_id == "1349135" || patreoncheck.currently_entitled_tier_id == "7239440" || patreoncheck.currently_entitled_tier_id == "7239442" || patreoncheck.currently_entitled_tier_id == "7239446") {
            try {
   
              const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "1024x1024",
              })

              const answer = response.data.data[0].url;
              
              let embed22 = new MessageEmbed()
                  .setColor("GREEN")
                  .setTitle(`ChatImage`)
                  .setURL("https://openai.com/")
                  .setThumbnail('https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png')
                  .setDescription(prompt)
                  .setImage(answer)
                  .setFooter({ text: 'This is Running From OpenAI API (Click Embed Title Point Website?)', iconURL: 'https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png' });
                  
              interaction.followUp({ embeds: [embed22] })
              
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }

                interaction.followUp({ content: "The answer could not be generated, Try again"});
            }       
        } else {
          let embed = new MessageEmbed()
                  .setAuthor("ChatGPT")
                  .addField("Output", `\`\`\`You are not a Patreon User, Check if Paid us and Check if got Discord Linked!\`\`\`\n**[CLICK HERE FOR PATREON SITE](https://www.patreon.com/NekoSuneVR/membership)**\nIf want Access You only need pay £1 a Monthly and You keep Access this, any higher then donator will still have Access but more Features too. keep mind sometimes wont Wrok so Try Again when get Errors, in BETA/ALPHA Testing.\n\n**If you find any Bugs Contact US on Discord by doing "/supportserver" command`)
                  .setColor("RED");
          interaction.followUp({ embeds: [embed] });
        }
            
    
   }
}