const { Client, Message, MessageEmbed } = require("discord.js");
var ee = require('../../config/embed.json');
var config = require('../../config/config.json');

module.exports = {
  name: "avatar",
  aliases: ["av"],
  categories: "other",
  userperm: [],
  botperm: [],
  description: "Show Your Avatar",
  ownerOnly: false,
  cooldown : 5,
  usage: '[mention author || message author]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
      let user = message.author || message.mentions.users.first();
    let avs = new MessageEmbed()
      .setAuthor(
        `${user.username}`,
        user.displayAvatarURL({ dynamic: true })
      )
      .setColor(ee.color)
      .addField(
        "📸 PNG",
        `[\`LINK\`](${user.displayAvatarURL({ format: "png" })})`,
        true
      )
      .addField(
        "📸 JPEG",
        `[\`LINK\`](${user.displayAvatarURL({ format: "jpg" })})`,
        true
      )
      .addField(
        "📸 WEBP",
        `[\`LINK\`](${user.displayAvatarURL({ format: "webp" })})`,
        true
      )
      .setURL(
        user.displayAvatarURL({
          dynamic: true,
        })
      )
      .setFooter(ee.footertext, ee.footericon)
      .setImage(
        user.displayAvatarURL({
          dynamic: true,
          size: 512,
        })
      );

      message.reply({embeds : [avs],
        allowedMentions: {
          repliedUser: false
      } })
  },
};
