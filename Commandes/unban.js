const Discord = require('discord.js');
const config = require("../config.json")

const embedlock = new Discord.MessageEmbed()
    .setColor('#D30000')
    .setDescription(`❌ Vous n'avez pas la permission de faire cette commande !`)

module.exports.run = async (client, message) => {
    if(message.author.bot) return;
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(embedlock)
    message.delete()
    let args = message.content.trim().split(/ +/g)
    let userId = args[1];
    const banList = await message.guild.fetchBans();
    const bannedUser = banList.find(user => user.id = userId);
    if (bannedUser) {
      message.guild.members.unban(userId)
      message.channel.send("Unban a été effectuée avec succès").then(message => message.delete({ timeout: 05000 }));
      client.channels.cache.get(config.logsIdChannel).send(`🔵 → ${message.author} a **unban** <@${userId}>`)
    }else{
      message.channel.send('Utilisateur introuvable').then(message => message.delete({ timeout: 05000 }));
    }
}

module.exports.help = {
  name: "unban",
};