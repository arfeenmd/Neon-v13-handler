const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bmi',
    description: 'Calculate your BMI. Please enter your weight in Kg format and your Height in cm format!',
    userperm: [],
    botperm: [],
    options: [
         {
            type: 'STRING',
            description: 'Please enter you weight in Kilogram format!',
            name: 'weight',
            required: true,
        },
        {
            type: 'STRING',
            description: 'Please enter you height in centimeter format!',
            name: 'height',
            required: true,
        },
    ],

   
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        const weight = args[0];
        const height = args[1];

     

        const bmi = (weight / ((height * height) / 10000)).toFixed(2);

        let category;
        if(bmi < 18.5) category = "Underweight"
        if(bmi > 24.9) category = "Overweight"
        if(bmi > 30) category = "Obesity"
        if(bmi < 24.9 && bmi > 18.5) category = "Normal"

        const embed = new MessageEmbed()
        .setTitle(`${interaction.user.username}\'s BMI`)
        .addField('💪 Weight', weight)
        .addField('🧍 Height', height)
        .addField('🗜️ BMI' , bmi)
        .addField('🗓️ Category' , category)
        .setColor('BLUE')
        

        interaction.followUp({ embeds: [embed] })

  }
}
