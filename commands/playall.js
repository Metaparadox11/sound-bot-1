module.exports = {
	name: 'playall',
	description: 'Plays an attached message to the all voice channels.',
  args: false,
  usage: '',
  guildOnly: true,
  cooldown: 0,
	async execute(client, message, args) {
    if (!message.member.roles.cache.some(role => role.name === 'GM') && !message.member.roles.cache.some(role => role.name === 'Head GM')) {
        return message.reply(`You don't have GM permissions.`);
      }

      //get all voice channels
			let voiceChannels = message.member.guild.channels.cache.filter(c => c.type === 'voice');

      let file_path = "";
      if (message.attachments) {
        file_path = message.attachments.first().attachment;
      } else {
        return message.reply("You need to attach an mp3.");
      }

      async function play(voiceChannels) {
				// Create an instance of a VoiceBroadcast
				const broadcast = client.voice.createBroadcast();
				// Play audio on the broadcast
				const dispatcher = broadcast.play(file_path);
				// Play this broadcast across multiple connections (subscribe to the broadcast)

				// get all users in voice voiceChannels
				for (let i = 0; i < voiceChannels.length; i++) {
					let members = voiceChannels[i].members;
					for (let j = 0; j < members.length; j++) {
						members[i].voice.connection.play(broadcast);
					}
				}

      }

      try {
        play(voiceChannels);
      } catch (e) {
        console.log(e);
      }

	},
};
