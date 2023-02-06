const client = require("../index");
const i18n = require("i18n");
i18n.setLocale("en");
const chalk = require("chalk");
const ms = require("ms");
const fetch = require("node-fetch");
const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");
const { developerID } = require("../config/settings.json");
const { clientavatar } = require("../config/settings.json");
const { clientname } = require("../config/settings.json");
const connection = client.sqlconn;

client.on("interactionCreate", async (interaction) => {

   // ———————————————[Slash Commands]———————————————
   if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false }).catch(() => {});

      const cmd = client.slashCommands.get(interaction.commandName.toLowerCase());
      if (!cmd)
         return interaction.followUp({ content: "An error has occured " });

      const args = [];

      for (let option of interaction.options.data) {
         if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
               if (x.value) args.push(x.value);
            });
         } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
         interaction.user.id
      );
      
      if (cmd && cmd.voiceChannel) {
        if (!interaction.member.voice.channel) return interaction.followUp({ content: `You are not connected to an audio channel. ❌`, ephemeral: true});
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: `You are not on the same audio channel as me. ❌`, ephemeral: true});
      }

   if (cmd.toggleOff) {
      let toggleoff_embed = new MessageEmbed()
         .setTitle(
            `:x: | That Command Has Been Disabled By The Developers! Please Try Later.`
         )
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [toggleoff_embed] });
   } else if (!interaction.member.permissions.has(cmd.userpermissions || [])) {
      let userperms_embed = new MessageEmbed()
         .setTitle(`:x: | You Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [userperms_embed] });
   } else if (!interaction.guild.me.permissions.has(cmd.botpermissions || [])) {
      let botperms_embed = new MessageEmbed()
         .setTitle(`:x: | I Don't Have Permissions To Use The Command!`)
         .setColor("RED")
         .setFooter(`${clientname}`, `${clientavatar}`)
         .setTimestamp();
      return interaction.followUp({ embeds: [botperms_embed] });
   } else if (cmd.developersOnly) {
      if (!developerID.includes(interaction.member.id)) {
         let developersOnly_embed = new MessageEmbed()
            .setTitle(`:x: | Only Developers Can Use That Command!`)
            .setDescription(
               `Developers: ${developerID.map((v) => `<@${v}>`).join(",")}`
            )
            .setColor("RED")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();
         return interaction.followUp({ embeds: [developersOnly_embed] });
      }
   } else if (cmd.cooldowns) {
      if (client.cooldowns.has(`${cmd.name}${interaction.member.id}`)) {
         let cooldown_embed = new MessageEmbed()
            .setTitle(
               `${
                  randomMessages_Cooldown[
                     Math.floor(Math.random() * randomMessages_Cooldown.length)
                  ]
               }`
            )
            .setDescription(
               `You Need To Wait \`${ms(
                  client.cooldowns.get(`${cmd.name}${interaction.member.id}`) -
                     Date.now(),
                  { long: true }
               )}\` To Use \`/${cmd.name}\` again!`
            )
            .setColor("BLUE")
            .setFooter(`${clientname}`, `${clientavatar}`)
            .setTimestamp();

         return interaction.followUp({ embeds: [cooldown_embed] });
      }

      client.cooldowns.set(
         `${cmd.name}${interaction.member.id}`,
         Date.now() + cmd.cooldowns
      );

      setTimeout(() => {
         client.cooldowns.delete(`${cmd.name}${interaction.member.id}`);
      }, cmd.cooldowns);
   }

      cmd.run(client, interaction, args);
   }
   // ———————————————[Buttons]———————————————
   if (interaction.isButton()) {
     //BUTTON SELCTED
   }
   // ———————————————[Select Menu]———————————————
   if (interaction.isSelectMenu()) {
   }
   // ———————————————[Context Menu]———————————————
   if (interaction.isContextMenu()) {
      await interaction.deferReply({ ephemeral: false });
      const command = client.slashCommands.get(interaction.commandName);
      if (command) command.run(client, interaction);
   }
});
