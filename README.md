<h1 align="center">
Discord V13 handler with slash Command Support</h1><br/>

# **🎀Support**

If you having any problem with these code join our support server.
<br>
> Developer: TOM WNL#7402
 <br>
Server Link: https://discord.gg/jREkuabwJ7 <br>
Invite Our Music bot: https://discord.com/oauth2/authorize?client_id=821336810277175327&scope=bot&permissions=3761732945


<br/>

# **🚨Requirements**

 **1.** node.js v16 or higher

 **2.** Discord version V13
 
 **3.** configure your self in  **`config.json`**

 **4.** then run the file  **`install.bat`**
 
 **5.** Start the bot with **`start.bat`**
 <br/>
 <br>

# 🖥️ <b>How to enable slash ?
```
Make sure to select bot & application.commands in Bot Auth
```
<b>

# ❗***configure - config.json file located in config folder***

```javascript
{
   "token": "BOT_TOKEN_HERE",
    "prefix": "-",
    "mongoUrl": "MONGO_URL_HERE",
    "owners": [
        "OWNER: 1",
       "OWNER: 2"]
}        
```
<br/>


<br/>




# ❗***Error :***

*If having problem with your code type : `npm init` then try*

<br/>


# ***Normal command handler***

```javascript
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: '',
    aliases: [''], 
    categories: '', 
    userperm: [],
    botperm: [],
    ownerOnly: false,
    description: '',
    cooldown: 5,
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => { 



}}      
```
<br/>


<br/>

# ***Slash command handler***

```javascript
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: '',
    aliases: [''], 
    categories: ' ', 
    description: '',
    userperm: [],
    botperm: [],
    usage: '',
   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {



}}    
```
<br/>


<br/>

# Links:

<h2> Discord:<h2>
<p align="center">
<a href="https://discord.gg/jREkuabwJ7">
    <img src="https://user-images.githubusercontent.com/59381835/92191514-d649ad80-ee18-11ea-9bc4-e95c7a122a99.png" alt="Discord" width="100" ">
  </a>
  
<h2> Music Bot:<h2>
<p align="center">
<a href="https://discord.com/oauth2/authorize?client_id=821336810277175327&scope=bot&permissions=3761732945">
    <img src="https://cdn.discordapp.com/attachments/845787601881530370/886186625917419560/photo-1614680376573-df3480f0c6ff.jpg" alt="bot" width="100" ">
  </a>
