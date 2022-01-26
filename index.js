const Discord = require('discord.js')
const myBot = new Discord.Client({fetchAllMembers: true, partials: ['MESSAGE', 'REACTION']});
const config = require("./config.json")
const fs = require('fs')
const fivereborn = require('fivereborn-query')
const prefix = config.prefix

myBot.commandes = new Discord.Collection();


fs.readdir("./Commandes/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){return;}
  jsfile.forEach((f, i) =>{
  let props = require(`./Commandes/${f}`);
  console.log(`✔️  | ${f} loaded!`);
  myBot.commandes.set(props.help.name, props);
});
});

myBot.on("message", async message => { if(message.author.bot) return;  

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];let args = messageArray.slice(1);
  let commandfile = myBot.commandes.get(cmd.slice(prefix.length));
  if(commandfile && cmd.includes(prefix)){commandfile.run(myBot,message,args);}
});


myBot.on('ready', () => {
    console.log(`${myBot.user.tag} Opérationnel !`)
    function activity(){ 
        setTimeout(() => { 
            fivereborn.query(config.SERVER_IP,config.SERVER_PORT, (err, data) => {
                if (err) {
                    return console.log(err);
                } else { 
                    myBot.user.setActivity(`${data.clients} joueur sur ${config.SERVER_NAME}`, { type: "WATCHING" });
                }
            });
            activity();
        }, 1000);
    }
    activity();
});

myBot.on('guildMemberAdd', member => {
    let embedWelcome = new Discord.MessageEmbed()
    .setTitle('Bienvenue !')
    .setDescription(`Hey, ${member} bienvenue sur **${member.guild.name}**`)
    .setThumbnail(config.imageUrl)
    member.guild.channels.cache.get(config.idChannelWelcome).send(embedWelcome)
});

myBot.login(config.token)