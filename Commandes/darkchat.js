const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = (client, message, args) => {
    if(message.author.bot) return;
    if(message.channel.id !== config.channelDarkChat) return;
    message.delete();
    if(!args[0]) return message.channel.send("Veuillez écrire votre Message").then(message => message.delete({ timeout: 05000 }));
    let EmbedDark = new Discord.MessageEmbed()
    .setColor('#0000')
    .setAuthor('Dark Chat', 'https://cdn.iconscout.com/icon/free/png-256/list-message-2367725-1976875.png')
    .setDescription(args.join(" "))
    .setTimestamp()
    message.channel.send(EmbedDark).then(m => {
      m.react('❤️')
    })
}

module.exports.help = {
  name: "ano",
};