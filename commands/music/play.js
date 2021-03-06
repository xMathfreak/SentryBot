const { play } = require('../../utils/player.js');

module.exports = {
  name: 'play',
  aliases: ['p', 'playsong'],
  help: {
    name: 'Play',
    description: 'Plays a song in a voice channel',
    usage: '`s!play [parameters]`',
  },
  category: 'music',
  execute: async function(message, args) {
    play(message, args);
  },
};