const { Client, Message, MessageEmbed, Discord, MessageActionRow, MessageSelectMenu } = require('discord.js');
const ms = require("ms");
module.exports = {
    name: 'slowmode',
    aliases: ['sm'], 
    categories: 'mod', 
    userperm: ['MANAGE_CHANNELS'],
    botperm: ['MANAGE_CHANNELS'],
    ownerOnly: false,
    description: 'Set Slowmode to channel',
    cooldown: 5,
    usage: 'Select a slow-mode delay using the menu',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 

        const menu = new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Click to select delay')
        .addOptions([
            {label: 'OFF',value: 'OFF',},
            {label: '5s',value: '5s',},
            {label: '10s',value: '10s',},
            {label: '15s',value: '15s',},
            {label: '30s',value: '30s',},
            {label: '1m',value: '1m',},
            {label: '2m',value: '2m',},
            {label: '5m',value: '5m',},
            {label: '10m',value: '10m',},
            {label: '15m',value: '15m',},
            {label: '30m',value: '30m',},
            {label: '1h',value: '1h',},
            {label: '2h',value: '2h',},
            {label: '6h',value: '6h',}
        ]);
    let row = new MessageActionRow().addComponents(menu);

    const slowmoEmbed = new MessageEmbed()
        
        //.setTitle('Slow-Mode')
        .setImage('https://discord.onl/wp-content/uploads/2019/01/Discord-Slowmode.jpg')
      
    message.channel.send({embeds:[slowmoEmbed],components:[row]}).then(sent => {

        const filter = (interaction) => {
            interaction.deferUpdate();
            if (interaction.user.id === message.author.id) return true;
            return;
        }

        const collector = sent.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 30e3 });
    
        collector.on('collect', collected => {
            collector.resetTimer({ time: 30e3 });
            menu.setPlaceholder(`Setted to: ${collected.values[0]}`);
            row = new MessageActionRow().addComponents(menu);
            if (collected.values[0] !== 'OFF') {
                slowmoEmbed
                    .setDescription('<a:738334453415411751:885967393342496859> Successfully Enabled')
                    
            }
            else {
                slowmoEmbed
                    .setDescription('<a:738334453415411751:885967393342496859> Successfully Disabled')
                    
            }
            message.channel.setRateLimitPerUser(isNaN(ms(collected.values[0])/1e3) ? 0 : ms(collected.values[0])/1e3 );
            return sent.edit({ embeds:[slowmoEmbed], components:[row] });
        });

        collector.on('end', collected => {
            menu.setDisabled(true);
            row = new MessageActionRow().addComponents(menu);
            return sent.edit({ components:[row] });
        });

    })


}}