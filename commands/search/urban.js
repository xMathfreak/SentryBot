const {MessageEmbed} = require('discord.js');
const { errorMessage } = require('../../utils/errors');
const request = require('request');

module.exports = {
  name: "urban",
  help: {
    name: "Urban Dictionary Search",
    description: "Searches up a word from Urban Dictionary",
    usage: "`s!urban [parameters]`"
  },
  category: "search",
  aliases: ["urbandict", "urbandictionary", "udict", "udictionary", "urbansearch"],
  execute: async function (message, args) {
    if (!args[0]) return errorMessage(message, "You need to specify a word to search for");

    var options = {
      url: "http://api.urbandictionary.com/v0/define?term=" + args.join(' '),
      method: "GET",
      headers: {
        "Accept": "text/html",
        "User-Agent": "Chrome"
      }
    };
  
    request(options, function (error, response, responseBody) {
      if (error) return;
  
      var data = JSON.parse(responseBody);
  
      if (!data) return errorMessage(message, "There was an error retrieving the definition");
      if (!data.list || !data.list[0]) return errorMessage(message, "The word could not be found");
  
      const definitionEmbed = new MessageEmbed()
        .setTitle(`Word: ${data.list[0].word}`)
        .setDescription(`**Definition:** \n ${data.list[0].definition.replace(/\[|\]/g, "**")}`)
        .setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send(definitionEmbed);
    });
  }
}