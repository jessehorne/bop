module.exports = {
  name: '!ping',
  description: 'Should reply with "PONG!" if the bot is online.',
  async execute(msg, args) {
    await msg.reply("PONG!");
    console.log(args);
  }
}
