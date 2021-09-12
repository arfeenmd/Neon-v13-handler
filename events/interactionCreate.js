const client = require("..");
const { MessageEmbed } = require('discord.js')

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
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
        const userperm = interaction.member.permissions.has(cmd.userperm || []);

        if (!userperm) {
            let userperm = new MessageEmbed().setDescription(
                `*<a:wrong:885815677091454986> You Need **${cmd.userperm}**  Permissions!*`
              );
         return interaction.followUp({embeds : [userperm]}); }

        const botperm = interaction.guild.me.permissions.has(cmd.botperm || []);
        if (!botperm) {
            let perms = new MessageEmbed().setDescription(
                `*<a:wrong:885815677091454986> I Need **${cmd.botperm}** Permissions!*`
              );
         return interaction.followUp({embeds : [perms]}); }

     const { owners } = require("../config/config.json");
     if (cmd) {
      if (cmd.ownerOnly) {
     if (!owners.includes(interaction.user.id)) {
     let ownerOnly = new MessageEmbed()
      .setDescription( "*<a:wrong:885815677091454986> Only Bot Developer can use this command!*" )
    return interaction.followUp({embeds : [ownerOnly] })
    }}
    }
       

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
}); 
