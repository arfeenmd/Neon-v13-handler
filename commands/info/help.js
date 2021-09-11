const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
let color = "#36393f";
const prefix = require("../../config/config.json").prefix;

module.exports = {
  name: "help",
  aliases: ["hb", "helps"],
  emoji: "🚑",
  description: "Shows The Bot Available Commands",
  userperm: [],
  botperm: [],
  ownerOnly: false,
  cooldown : 5,
  usage: 'or -help {command name}',
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      let categories = [];

      let ignored = ["owner"];

      const emo = {
        info: "❓",
        other : "🔰",
        mod : "⚠"

      };

      readdirSync("./commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        let cats = new Object();

        cats = {
          name: name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
      });
    
      const embed = new MessageEmbed()
        .setTitle(`\`\`\`🔰 Help Menu \`\`\``)
        .setDescription(`\`❗ My Prefix is : ${prefix} \`\n\`❗ Parameter: {} Required || [] optional \` \n To check out a category, use command !help [category] For more information go to the next page by reacting! \n\n [🔴 Invite Me Now](https://discord.com/api/oauth2/authorize?client_id=885512086812237904&permissions=536837357047&scope=applications.commands%20bot)`)
        .addFields(categories)
        .setFooter(
          `© Neon`,
          message.client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(color);

      return message.channel.send({ embeds: [embed] });
    } else {
      let cots = [];
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = `${client.commands.get(name).description}`;
          let emo = `✅`;

          let obj = {
            cname: `${emo} \`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      // console.log(cots);

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`
          )
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color);

        return message.channel.send({ embeds: [combed] });
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `❌ Invalid command! Please Use \`${prefix}help\` To see my all commands`
          )
          .setColor("RED");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `© Neon`,
          message.client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        
        .setColor(color);
      return message.channel.send({ embeds: [embed] });
    }
  },
};
