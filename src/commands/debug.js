module.exports = {
  name: '!debug',
  description: 'Debugging',
  async execute(msg, args) {
    await msg.reply("Debugging...");
    console.log(args);
  }
}
