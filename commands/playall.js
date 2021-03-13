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

			async function playTo(member, file_path) {
				await member.voice.connection.play(file_path);
			}

      function play(voiceChannels, file_path) {
				for (let i = 0; i < voiceChannels.length; i++) {
					let members = voiceChannels[i].members;
					for (let j = 0; j < members.length; j++) {
						try {
			        playTo(members[j], file_path);
			      } catch (e) {
			        console.log(e);
			      }
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
