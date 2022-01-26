const Discord = require('discord.js');
const config = require("../config.json");
const ms = require('ms');

const embedlock = new Discord.MessageEmbed()
    .setColor('#D30000')
    .setDescription(`❌ Vous n'avez pas la permission de faire cette commande !`)

module.exports.run = async (client, message, args) => {
    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(embedlock)
    message.delete();
    let argss = message.content.trim().split(/ +/g);
    let Utilisateur = message.mentions.members.first();
    let Time = argss[2]
    let raison = argss.slice(3).join(" ");
    if(!Utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
    if(!Time) return message.channel.send('Vous n \'avez pas précisé votre heure !');
    if(!Time.endsWith('d')) return message.channel.send('Vous devez utiliser `d` (jours)');
    if(!raison) raison = "Aucune raison spécifiée"
    if(!Utilisateur.bannable) return message.reply('Vous ne pouvez pas ban ' + Utilisateur.displayName);
    message.channel.send(Utilisateur.displayName + " a été tempban pendant : " + Time).then(message => message.delete({ timeout: 05000 }));
    message.guild.members.ban(Utilisateur.id, {reason: raison});
    await client.channels.cache.get(config.logsIdChannel).send(`🔴 → ${message.author} a **temporairement banni** ${Utilisateur} pour : ${raison} pendant : ${Time}`);
    setTimeout(() => {
      message.guild.members.unban(Utilisateur.id);
      client.channels.cache.get(config.logsIdChannel).send(`🔵 →  ${Utilisateur} viens d'être débanni par le système raison : ban temporaire terminer`);
    }, ms(Time));
}

module.exports.help = {
  name: "tempban",
};