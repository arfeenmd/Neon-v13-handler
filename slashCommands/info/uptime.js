const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");


module.exports = {
    name: 'uptime',
    aliases: [''], 
    categories: ' ', 
    description: 'show\'s bot uptime',
    userperm: [],
    botperm: [],
    usage: '',
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

    const uptime = moment
      .duration(client.uptime)
      .format(" D [Days] - H [Hours] - m [Minutes] - s [Seconds]");

      const upvalue = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);

      const up = new MessageEmbed()
      .setDescription(`${uptime}\n\n <a:Online_Ping:866085733534269440> Since: <t:${upvalue}:T>`)
     
      return interaction.followUp({ ephemeral: true, embeds: [up], allowedMentions: { repliedUser: false } });

    
  }
};