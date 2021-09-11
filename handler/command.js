const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

/**
 * @param {Client} client
 */
//loading commands in log
module.exports = async (client) => {
  try {
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      for (let file of commands) {
        let pull = require(`../commands/${dir}/${file}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          table.addRow(file, "✅");
        } else {
          table.addRow(
            file,
            `❌ error -> missing a help.name, or help.name is not a string.`
          );
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
    console.log(table.toString().cyan);
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }

  // Starts the events file
  readdirSync("./events/").forEach((file) => {
    const events = readdirSync("./events/").filter((file) =>
      file.endsWith(".js")
    );
    for (let file of events) {
      let pull = require(`../events/${file}`);
      if (pull.name) {
        client.events.set(pull.name, pull);
      }
    }
    console.log((`✅ ${file} - Events Loads Success`).bgMagenta);
  });
  ////
 
  // starting the slashcommands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
);

const arrayOfSlashCommands = [];
slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);
    arrayOfSlashCommands.push(file);
});
client.on("ready", async () => {
    client.guilds.cache.forEach(async (g) => {
      await client.guilds.cache.get(g.id).commands.set(arrayOfSlashCommands);
    });

 
});

}; 