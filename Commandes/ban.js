const Discord = require('discord.js');
const config = require("../config.json")

const embedlock = new Discord.MessageEmbed()
    .setColor('#D30000')
    .setDescription(`❌ Vous n'avez pas la permission de faire cette commande !`)

module.exports.run = async (client, message, args) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(embedlock);
    message.delete()
    let argss = message.content.trim().split(/ +/g);
    let utilisateur = message.mentions.members.first() || message.guild.members.cache.get(argss[1]);
    let raison = argss.slice(2).join(" ");
    if (!raison) raison = "Aucune raison spécifiée"
    if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    if (!raison) return message.channel.send('Vous devez indiquer une raison du ban !');
    if (!utilisateur.bannable) return message.reply('Vous ne pouvez pas ban ' + utilisateur.displayName)
    message.channel.send(utilisateur.displayName + " a été ban avec succès").then(message => message.delete({ timeout: 05000 }));
    message.guild.members.ban(utilisateur.id, {reason: raison});
    await client.channels.cache.get(config.logsIdChannel).send(`🔴 → ${message.author} a **banni** ${utilisateur} pour : ${raison}`)
}

module.exports.help = {
  name: "ban",
};