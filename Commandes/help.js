const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = (client, message, args) => {
  if(message.author.bot) return;
  message.delete();
  let embedHelp = new Discord.MessageEmbed()
  .setColor('2f3136')
  .setTitle(`Voici les commandes disponibles de ${client.user.username}`)
  .addField('Commandes de Modération', `${config.prefix}ban [Utilisateur] [Raison] : Permets de bannir un membre du serveur.\n${config.prefix}clear [Combien] : Permets de supprimer des messages en masse.\n${config.prefix}kick [Utilisateur] [Raison] : Permets de exclure un membre du serveur.\n${config.prefix}unban [ID] : Permets de unban un membre.\n${config.prefix}tempban [Utilisateur] [Jours] [Raison] : Permets de bannir temporairement un membre du serveur.`)
  .addField("Commandes d'Informations & Intéraction", `${config.prefix}ticket [Raison] : Permets d'ouvrir un ticket (<#${config.channelTicket}>).\n${config.prefix}xticket : Permets de fermer un ticket.\n${config.prefix}ano [Message] : Permets de faire un message anonyme.\n${config.prefix}twt [Message] : Permets de faire un tweet.`)
  .setFooter(message.guild.name, config.imageUrl)
  message.channel.send(embedHelp)
}

module.exports.help = {
  name: "help",
};