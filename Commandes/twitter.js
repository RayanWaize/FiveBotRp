const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = (client, message, args) => {
    if(message.author.bot) return;
    if(message.channel.id !== config.channelTwitter) return;
    message.delete();
    if(!args[0]) return message.channel.send("Veuillez écrire votre Tweet").then(message => message.delete({ timeout: 05000 }));
    let embedTwitter = new Discord.MessageEmbed()
    .setColor('#00acee')
    .setAuthor('Twitter', 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png')
    .setDescription(args.join(" "))
    .setFooter(message.author.username)
    .setTimestamp()
    message.channel.send(embedTwitter).then(m => {
      m.react('❤️')
      m.react('🔁')
    })
}

module.exports.help = {
  name: "twt",
};