const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('KICK_MEMBERS')) return;
    message.delete()
    let argss = message.content.trim().split(/ +/g);
    let User = message.mentions.members.first();
    let raison = argss.slice(2).join(" ");
    if (!raison) raison = "Aucune raison spécifiée"
    if (!User) return message.channel.send('Vous devez mentionner un utilisateur !');
    if (!User.kickable) return message.reply('Vous ne pouvez pas kick ' + User.displayName);
    User.kick();
    await client.channels.cache.get(config.logsIdChannel).send(`🦵 → ${message.author} a **expulsé** ${User} pour : ${raison}`)
}

module.exports.help = {
    name: 'kick'
}