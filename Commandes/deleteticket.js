const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = (client, message, args) => {
    if(message.author.bot) return;
    if(message.channel.parentID !== config.parentTicket) return;
    message.channel.send('Suppression du channel...');
    message.guild.channels.cache.get(config.logsIdChannel).send(`🔒 → **${message.author}** à fermer le ticket de **${message.guild.members.cache.get(message.channel.topic).user}**`)
    setTimeout(() => {
        message.channel.delete();
    }, 5000);
}

module.exports.help = {
  name: "xticket",
};