const { MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");

module.exports = {
  name: "menu",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  botperm: ["EMBED_LINKS"],
  ownerOnly: true,
  run: async (client, message, args) => {

    let helpMenu = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot settings",
          value: "settings",
          emoji: "866085733534269440"
        },
        {
          label: "Fun",
          description: "Shows all the fun commands",
          value: "fun",
          emoji: "🎲"
        },
        {
          label: "Image",
          description: "Shows all the image commands",
          value: "image",
          emoji: "🖼"
        },
        {
          label: "Information",
          description: "Shows all the information commands",
          value: "info",
          emoji: "📢"
        },
        {
          label: "Moderation",
          description: "Shows all the moderation commands",
          value: "moderation",
          emoji: "🔒"
        },
        {
          label: "NSFW",
          description: "Shows all the NSFW commands",
          value: "nsfw",
          emoji: "🔞"
        },
        {
          label: "Utility",
          description: "Shows all the utility commands",
          value: "utility",
          emoji: "🔧"
        },
        {
          label: "Games",
          description: "Shows all the game commands",
          value: "game",
          emoji: "🎮"
        }
      ])
    )

    let editEmbed = new MessageEmbed()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("GREEN")

    const msg = message.channel.send({ embeds: [editEmbed], components: [helpMenu]})

    setTimeout(function(){
      msg.edit("Menu Timed Out!")
    }, 180000)
  }
};