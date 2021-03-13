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
          //console.log(file_path);
          let voiceChannel = client.channels.cache.get(args[0]);
          const connection = await voiceChannel.join();

          // when in the voice channel

          // Create an instance of a VoiceBroadcast
          const broadcast = client.voice.createBroadcast();
          // Play audio on the broadcast
          const dispatcher = broadcast.play(file_path);
          // Play this broadcast across multiple connections (subscribe to the broadcast)
          connection.play(broadcast);

          // Always remember to handle errors
          dispatcher.on('error', message.reply(`Error playing file.`));

          dispatcher.on('start', () => {
              console.log('mp3 is now playing!');
          });

          dispatcher.on('finish', () => {
              console.log('mp3 has finished playing!');
              voiceChannel.leave();
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
