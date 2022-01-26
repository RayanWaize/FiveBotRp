const Discord = require('discord.js');
const config = require("../config.json");

function embedTicket(raison){
  const embedpanelinticket = new Discord.MessageEmbed()
  .setColor('2f3136')
  .setDescription(`Bonjour, \n\nMerci d'avoir contacter l'équipe de support.\nUn membre de l'équipe répondra à ta demande dans les plus brefs délais. Pendant ce temps, n'hésites pas à fournir plus d'informations.\n\n\nMerci !`)
  .setFooter(`Raison : ${raison}`, config.imageUrl);
  return embedpanelinticket
}

module.exports.run = (client, message, args) => {
    let raison = args.join(" ");
    if(!raison) raison = "Aucune défini"
    if(message.author.bot) return;
    if(message.channel.id !== config.channelTicket) return;
    message.delete();
    message.guild.channels.create(`ticket ${message.author.username}`, {
        type: 'text',
        parent: config.parentTicket,
        topic:message.author.id,
        permissionOverwrites:[
            {
                id:message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
                id:message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
            {
                id:config.roleSupport,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
            },
        ]
      }).then(ticket => ticket.send(message.author, embedTicket(raison)))
      message.guild.channels.cache.get(config.logsIdChannel).send(`🔓 → **${message.author.username}** viens d'ouvrir un ticket`)
}

module.exports.help = {
  name: "ticket",
};