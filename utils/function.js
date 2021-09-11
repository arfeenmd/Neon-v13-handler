const { Client, Message, MessageEmbed , Collection} = require('discord.js');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */


module.exports.escapeRegex = escapeRegex;
module.exports.onCoolDown = onCoolDown;

function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
        console.log(String(e.stack).bgRed);
    }
}

/**
 * 
 * @param {*} message A DiscordMessage, with the client, information
 * @param {*} command The Command with the command.name
 * @returns BOOLEAN
 */
 function onCoolDown(message, command) {
    if(!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if(!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
    const client = message.client;
    if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
      client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now(); //get the current time
    const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
    const cooldownAmount = (command.cooldown) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
    if (timestamps.has(message.author.id)) { //if the user is on cooldown
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
      if (now < expirationTime) { //if he is still on cooldonw
        const timeLeft = (expirationTime - now) / 1000; //get the lefttime
        //return true
        return timeLeft
      }
      else {
       
        timestamps.set(message.author.id, now); 
       
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
       
        return false;
      }
    }
    else {
     
      timestamps.set(message.author.id, now); 
     
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
      
      return false;
    }
  }