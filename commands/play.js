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

      let voiceChannel = message.member.guild.channels.cache.find(voiceChannel => voiceChannel.name === args[0]);
      if (!voiceChannel) return message.reply(`The channel ${args[0]} does not exist!`);
      if (voiceChannel.type !== 'voice') return message.reply(`That channel isn't a voice channel.`);

      let file_path = "";
      if (message.attachments) {
        file_path = message.attachments.first().attachment;
      } else {
        return message.reply("You need to attach an mp3.");
      }

      async function play(voiceChannel) {
        await voiceChannel.join().then(async (connection) => {
          let dispatcher = await connection.playFile(file_path);

          // Always remember to handle errors
          await dispatcher.on('error', () => {
            message.reply(`There was a problem playing the file.`);
            voiceChannel.leave();
          });

          await dispatcher.on('start', () => {
              console.log('mp3 is now playing!');
          });

          await dispatcher.on('end', function () {
            console.log('mp3 has finished playing!');
            voiceChannel.leave();
          });
        });
      }

      play(voiceChannel);

	},
};
