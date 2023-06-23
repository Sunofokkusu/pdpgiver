const {token} = require('./config.json');

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const fac = require('fast-average-color-node');
let name = "";
client.on("ready", () => { 
    console.log(`Logged in as ${client.user.tag}!`) 
}) 
client.on("messageCreate", message => {
    if (message.content.includes("!pdp")) {
      let memberMention = message.mentions.members.first();
      if(memberMention != undefined){
        if(memberMention.nickname !== null){
          name = memberMention.nickname
        }else{
          name = memberMention.user.username
        }
        fac.getAverageColor(memberMention.user.avatarURL()).then(color => {
          let em = new Discord.MessageEmbed()
            .setTitle(`${name}'s profile picture`)
            .setColor(color.hex)
            .setImage(`${memberMention.displayAvatarURL({ dynamic : true }) }`)
          message.channel.send({ embeds: [em] });
        });
      }else{
        if(message.member.nickname !== null){
          name = message.member.nickname
        }else{
          name = message.member.user.username
        }
        fac.getAverageColor(message.member.user.avatarURL()).then(color => {
          let em = new Discord.MessageEmbed()
            .setTitle(`${name}'s profile picture`)
            .setColor(color.hex)
            .setImage(`${message.author.displayAvatarURL({ dynamic : true }) }`)
          message.channel.send({ embeds: [em] });
        });
      }
    }
})
client.login(token)