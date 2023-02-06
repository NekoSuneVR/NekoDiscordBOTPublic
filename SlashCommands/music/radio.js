const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const twitch = require("twitch-m3u8");


const {
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');


module.exports = {
    name: "radio",
    description: "Play Global Radio Stations, runs on ChisdealHDYT API",
    type: "CHAT_INPUT",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["CONNECT", "SPEAK", "SEND_MESSAGES", "VIEW_CHANNEL"],
    cooldowns: 2000,
    options: [{
        name: 'start',
        description: 'Command to start music play|stop|np|requestradio',
        type: 'STRING',
        required: true
    },
    {
        name: 'search',
        description: 'Search Radio if Listed',
        type: 'STRING',
        required: true
    }],
 
    run: async (client, interaction, args) => {
    
        var connection = client.sqlconn;

    function getGuildToggle(guildID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM guild_command_toggle WHERE guild_id = '${guildID}'`, (err, rows) => {
                if (err) return reject(err);

                resolve(rows);
            });
        });
    }

    const [guildsettingstoggle] = await getGuildToggle(interaction.guild.id) // destructuring 'rows' array
        .catch(console.error);


    if (guildsettingstoggle.musicToggle != 0) {
        if (interaction.options.getString('start') == "play") {

            const search = interaction.options.getString('search');
            
            if (interaction.options.getString('search') == "monstercat") {
            
                twitch.getStream('monstercat').then(data => {
                
                    var channel = interaction.member.voice;
                
                    connection1 = joinVoiceChannel({
                        channelId: channel.channelId,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                
                    let resource = createAudioResource(data[0].url, {
                        inlineVolume : true
                    });

                    resource.volume.setVolume(0.2);
                
                    const player = createAudioPlayer();
                    connection1.subscribe(player)
                    player.play(resource);
                    interaction.followUp(`${search} is Live on Twitch`)
                    
                }).catch(err => {
                
                    interaction.followUp(`${search} is not Live on Twitch`)
                    
                })
            
            } else if (interaction.options.getString('search') == "nocopyrightsounds") {
            
                twitch.getStream('nocopyrightsounds').then(data => {
                
                    var channel = interaction.member.voice;
                
                    connection1 = joinVoiceChannel({
                        channelId: channel.channelId,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                
                    let resource = createAudioResource(data[0].url, {
                        inlineVolume : true
                    });

                    resource.volume.setVolume(0.2);
                
                    const player = createAudioPlayer();
                    connection1.subscribe(player)
                    player.play(resource);
                    interaction.followUp(`${search} is Live on Twitch`)
                    
                }).catch(err => {
                
                    interaction.followUp(`${search} is not Live on Twitch`)
                    
                })
            
            } else if (interaction.options.getString('search') == "lofitwitch") {
            
                twitch.getStream('kaioura').then(data => {
                
                    var channel = interaction.member.voice;
                
                    connection1 = joinVoiceChannel({
                        channelId: channel.channelId,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                
                    let resource = createAudioResource(data[0].url, {
                        inlineVolume : true
                    });

                    resource.volume.setVolume(0.2);
                
                    const player = createAudioPlayer();
                    connection1.subscribe(player)
                    player.play(resource);
                    interaction.followUp(`${search} is Live on Twitch`)
                    
                }).catch(err => {
                
                    interaction.followUp(`kaioura is not Live on Twitch`)
                    
                })
            
            } else if (interaction.options.getString('search') == "thencsshifters") {
            
                twitch.getStream('the_ncs_shifters').then(data => {
                
                    var channel = interaction.member.voice;
                
                    connection1 = joinVoiceChannel({
                        channelId: channel.channelId,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    });
                
                    let resource = createAudioResource(data[0].url, {
                        inlineVolume : true
                    });

                    resource.volume.setVolume(0.2);
                
                    const player = createAudioPlayer();
                    connection1.subscribe(player)
                    player.play(resource);
                    interaction.followUp(`${search} is Live on Twitch`)
                    
                }).catch(err => {
                
                    interaction.followUp(`kaioura is not Live on Twitch`)
                    
                })
            
            } else {

              const response = await fetch(`https://api.chisdealhd.co.uk/v3/public/radio/${search}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })

              const json = await response.json()

              if (!search) {
                  interaction.followUp({
                     embeds: [new MessageEmbed()
                     .setColor('#F8AA2A')
                     .setDescription(`You didn\'t provide a Radio name`)]})
                  return
              }

              if (json.status == "success") {
                
                var channel = interaction.member.voice;
                
                connection1 = joinVoiceChannel({
                    channelId: channel.channelId,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                
                let resource = createAudioResource(json.radioURL, {
                    inlineVolume : true
                });

                resource.volume.setVolume(0.2);
                
                const player = createAudioPlayer();
                connection1.subscribe(player)
                player.play(resource);
                
                interaction.followUp(`Playing: ${json.radioName}`);

              } else {

                interaction.followUp({
                embeds: [new MessageEmbed()
                .setColor('#F8AA2A')
                .setDescription(`Invald Lists, List API: ${json.listradios} / Twitch Streams: monstercat|thencsshifters|nocopyrightsounds|lofitwitch`)]})

              }
            }
        } else if (interaction.options.getString('start') == "stop") {


            if (!interaction.member.voice.channel) return
            var channel = interaction.member.voice;
                
            connection1 = joinVoiceChannel({
                channelId: channel.channelId,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
                
            let resource = createAudioResource("", {
                inlineVolume : true
            });

            resource.volume.setVolume(0.2);
                
            const player = createAudioPlayer();
            connection1.destroy();
            player.stop(resource);
            message.delete().catch(O_o => {})
            return

        } else if (interaction.options.getString('start') == "np") {

            const search = interaction.options.getString('search');

            const response = await fetch(`https://api.chisdealhd.co.uk/v3/public/radio/${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            if (!search) {
                interaction.followUp({
                    embeds: [new MessageEmbed()
                    .setColor('#F8AA2A')
                .setDescription(`You didn\'t provide a Radio name`)]})
                return
            }

            if (json.status == "success") {

                if (json.nowPlaying.song == null) return interaction.followUp("This Radio doesnt have Now Playing API, Sorry about this Actions. if has API Please contact us");
                const playingEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${json.radioName} - Now Playing`)
                    .setTimestamp()
                    .addField("Current Song:", json.nowPlaying.song)
                    .setImage(json.nowPlaying.art)
                //message.delete().catch(O_o => {})
                interaction.followUp({
                    embeds: [playingEmbed]
                });

            } else {

                interaction.followUp({
                    embeds: [new MessageEmbed()
                    .setColor('#F8AA2A')
                    .setDescription(`Invald Lists, List: ${json.listradios}`)]})

            }
        } else if (interaction.options.getString('start') == "requestradio") {

            interaction.followUp("To Request Radio Listing Please contact us on our Discord Server with following Radio Name, Radio URL, Radio API if has 1 @ https://discord.gg/RYscPHc");

        } else {

            interaction.followUp("Invalid Command, Valid command is `play` & `stop` & `np` & `requestradio`");

        }
    } else {

        interaction.followUp("Server Adminstrator Disabled Music Intergration on this Server. If want Renable it, please go to our Dashboard and Re-enable it");

    }
  }
}