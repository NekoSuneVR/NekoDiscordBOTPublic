const settings = require("../../config/settings.json");

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: settings.API.OPENAI_API_KEY,
});
        
const openai = new OpenAIApi(configuration);

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) != - 1) {
         return true;
       }
    }
    return false; 
}

module.exports = {
   name: "ask-gpt",
   description: "ChatGPT SYSTEM (PATREON COMMAND ONLY) [ALPHA/BETA Testing]",
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
        
        if (containsAny(prompt, ["racial slurs", "@everyone", "@here"])) {
          let embed66 = new MessageEmbed()
                  .setAuthor("ChatGPT")
                  .addField("Output", `You Cannot Ask me That Question, Gents of TOS of Discord and Other places.`)
                  .setColor("RED");
          interaction.followUp({ embeds: [embed66] });
        } else {
        const response = await fetch(`https://api.chisdealhd.co.uk/v3/payments/api/patreon/check/${interaction.user.id}`);
        const patreoncheck = await response.json();
            
        if (interaction.user.id == "100463282099326976" || interaction.user.id == "124495978962092037" || interaction.user.id == "901415888060825681" || interaction.user.id == "588083360598065193") {
            try {
   
              const response = await openai.createCompletion({
                  model: "text-davinci-003",
                  prompt: prompt,
                  temperature: 0.5,
                  max_tokens: 1000,
              });

              const answer = response.data.choices[0].text;
              
              console.log(answer)
              
              let embed = new MessageEmbed()
                  .setAuthor("ChatGPT")
                  .addField("Output", `\`\`\`${answer}\`\`\``)
                  .setColor("GREEN");
              
              for(let i = 0; i < answer.length; i += 2000) {
                  setTimeout(() => {
                    console.log(i)
                 
                    const toSend = answer.substring(i, Math.min(answer.length, i + 2000));
                    let embed22 = new MessageEmbed()
                      .setColor("GREEN")
                      .setTitle(`ChatGPT`)
                      .setURL("https://openai.com/")
                      .setThumbnail('https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png')
                      .setDescription(toSend)
                      .setFooter({ text: 'This is Running From OpenAI API (Click Embed Title Point Website?)', iconURL: 'https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png' });
                    interaction.followUp({ embeds: [embed22] })
                  }, 5000);
              }
              
              //interaction.followUp({ content: answer });
              //interaction.followUp({ embeds: [embed] });
              
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
   
              const response = await openai.createCompletion({
                  model: "text-davinci-003",
                  prompt: prompt,
                  temperature: 0.5,
                  max_tokens: 1000,
              });

              const answer = response.data.choices[0].text;
              
              console.log(answer)
              
              let embed = new MessageEmbed()
                  .setAuthor("ChatGPT")
                  .addField("Output", `\`\`\`${answer}\`\`\``)
                  .setColor("GREEN");

              for(let i = 0; i < answer.length; i += 2000) {
                  setTimeout(() => {
                    console.log(i)
                 
                    const toSend = answer.substring(i, Math.min(answer.length, i + 2000));
                    let embed22 = new MessageEmbed()
                      .setColor("GREEN")
                      .setTitle(`ChatGPT`)
                      .setURL("https://openai.com/")
                      .setThumbnail('https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png')
                      .setDescription(toSend)
                      .setFooter({ text: 'This is Running From OpenAI API (Click Embed Title Point Website?)', iconURL: 'https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png' });
                    interaction.followUp({ embeds: [embed22] })
                  }, 5000);
              }
              
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
}