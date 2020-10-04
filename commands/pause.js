const player = require('../include/player.js');

module.exports = {
  name: "pause",
  help: {
    name: "Pause",
    description: "Pauses the queue",
    usage: "`s!pause`"
  },
  category: "music",
  execute: async function (message) {
    player.pause(message);
  }
}