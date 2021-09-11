const client = require("../index");
const mongoose = require("mongoose");
const chalk = require("chalk");
const { mongoUrl } = require("../config/config.json"); 

client.on("ready", () => {
   
  
/// connecting mongo db
    mongoose
    .connect(mongoUrl, {
        useUnifiedTopology : true,
        useNewUrlParser : true,
    }).then(
        console.log(
          chalk.bgGreenBright.black(
            ` ${client.user.username} connected to Mongo DB `
          )
        )
      )
      .catch((err) =>
        console.log(
          chalk.bgRedBright.black(
            ` ${client.user.username} could not connect to mongo DB `
          )
        )
      );
      let allMembers = new Set();
      client.guilds.cache.forEach((guild) => {
        guild.members.cache.forEach((member) => {
          allMembers.add(member.user.id);
        });
      });
    
      let allChannels = new Set();
      client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
          allChannels.add(channel.id);
        });
      });
    
      console.log(
        chalk.bgMagentaBright.black(` ${client.guilds.cache.size} servers `),
        chalk.bgMagentaBright.black(` ${client.channels.cache.size} channels `),
        chalk.bgMagentaBright.black(` ${allMembers.size} members `)
      );
      
/// loading bot
console.log(`${client.user.tag} is Online!`.bgRed)
client.user.setActivity(`Under Developement!`)
});
