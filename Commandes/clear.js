const Discord = require('discord.js');
const config = require("../config.json")

module.exports.run = (client, message) => {
    if(message.channel.type === 'dm') return;
    let args = message.content.split(" ");
    let nbr = args[1];
    const embedlock = new Discord.MessageEmbed()
    .setColor('#D30000')
    .setDescription(`❌ Vous n'avez pas la permission de faire cette commande !`)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedlock);
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas les permissions requises pour exécuter cette commande");
    if (!nbr) return message.channel.send(":x: Vous devez indiquer le nombre de messages à supprimer");
    if (isNaN(nbr)) return message.channel.send(":x: Vous devez indiquer le nombre de messages à supprimer");
    if (nbr < 1 || nbr > 100) return message.channel.send(":x: Vous devez indiquer un nombre entre `1` et `100` .");

    message.delete().then(message => {
      message.channel.bulkDelete(nbr, true ).then(messages => {
        message.channel.send(`:wastebasket: ${message.author}, Vous avez supprimé **${messages.size} message(s)**.`).then(message => message.delete({ timeout: 05000 }));
        client.channels.cache.get(config.logsIdChannel).send(`🧹 → ${message.author} a **supprimé** ${messages.size} message(s)`)
      });
    });;
}

module.exports.help = {
  name: "clear",
};