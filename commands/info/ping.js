
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['pi', 'ms'], 
    categories: 'info', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: 'Show Bot Ping',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
    

      let circles = {
        green: "<a:Online_Ping:878245782019522590",
        yellow: "<a:yellowloading:865563744162283541>",
        red: "<a:red:865563826123964416>"
    }
   
    const pingEmbed = new MessageEmbed()
        
        .setDescription(
            `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
        )
        message.reply({embeds : [pingEmbed],
        allowedMentions: {
            repliedUser: false
        } })
               
    }
}