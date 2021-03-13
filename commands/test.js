module.exports = {
	name: 'test',
	description: 'Prints a test message.',
  args: false,
  usage: '',
  guildOnly: true,
  cooldown: 0,
	async execute(client, message, args) {
        return message.reply('Test message.');
	},
};
