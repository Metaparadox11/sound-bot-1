module.exports = {
	name: 'play',
	description: 'Plays an attached message to the specified voice channel.',
  args: true,
  usage: '<voice channel>',
  guildOnly: true,
  cooldown: 0,
	async execute(client, message, args) {
    if (!message.member.roles.cache.some(role => role.name === 'GM') && !message.member.roles.cache.some(role => role.name === 'Head GM')) {
        return message.reply(`You don't have GM permissions.`);
      }

      try {
        const fs = require('fs');

        if (message.attachments) {
          let file_path = message.attachments.first().attachment;

          var request = require('request');
          request.get(file_path, async function (error, response, body) {
              if (!error && response.statusCode == 200) {
                return message.reply('Got file!');
              } else {
                return message.reply('File not found.');
              }
          });

        } else {
          return message.reply('You need to attach a .wav file to your message.');
        }
      }
      catch (e) {
        return message.reply(`Error reading file.`);
      }
	},
};
