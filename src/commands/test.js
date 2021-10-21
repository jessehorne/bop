const { createReadStream } = require('fs');

const { join } = require('path');

const { joinVoiceChannel, createAudioPlayer, createAudioResource,
        NoSubscriberBehavior, StreamType } = require('@discordjs/voice');

module.exports = {
  name: '!test',
  description: 'Test music',
  async execute(msg, args) {
    const channel = msg.member.voice.channel;

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    console.log('Connection', connection);

    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });

    console.log('Player', player);

    var testPath = join(__dirname, '../../tmp/test.ogg');

    console.log("TEST PATH: ", testPath);

    const resource = createAudioResource(createReadStream(testPath), {
      inputType: StreamType.Arbitrary
    });

    connection.subscribe(player);

    player.play(resource);


    await msg.reply("Testing...");
    console.log(args);
  }
}
