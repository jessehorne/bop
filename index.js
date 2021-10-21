require('dotenv').config();

const fs = require('fs');

const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commands = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commands) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bop is ready!');
});

client.on('messageCreate', async function (msg) {
  const user = msg.author;

  if (msg.author.bot) {
    return;
  }

  var who = msg.author.id;

  // if (who == process.env.DISCORD_CLIENT_ID) {
  //   return;
  // }

  var me = msg.content.substr(0, 1);

  if (me !== "!") return;

  // All good.

  var data = msg.content.split(" ");

  const command = data[0];
  const args = data.slice(1, data.length);

  if (!client.commands.has(command)) return;

  try {

    await client.commands.get(command).execute(msg, args);
  } catch (error) {
      console.error(error);
      await msg.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
