const { createReadStream } = require('fs');

const { join } = require('path');

const { joinVoiceChannel, createAudioPlayer, createAudioResource,
        NoSubscriberBehavior, StreamType } = require('@discordjs/voice');

const yt = require('../yt');

const state = {};
state.playing = true;
state.player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
  },
});

module.exports = {
  name: '!bop',
  description: 'Play music',
  async execute(msg, args) {
    // Validation

    if (args[0] == 'play') {
      if (args.length < 2) {
        await msg.reply("Invalid command.");
        return;
      }

      let new_args = args.slice(1, args.length);
      const song = new_args.join(" ");

      if (song.length == 0) {
        await msg.reply("Invalid song.");
      }

      await msg.reply(`Searching for \`${song}\``);

      const result = await yt.getRandomResult(song);

      var s = await yt.download(result.id);

      const channel = msg.member.voice.channel;

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });

      const resource = createAudioResource(s, {
        inputType: StreamType.Arbitrary
      });

      state.player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });

      state.player.play(resource);

      connection.subscribe(state.player);

      await msg.reply("Playing!");
    } else if (args[0] === 'pause') {
      state.player.pause();
    } else if (args[0] == 'resume') {
      state.player.unpause();
    } else {
      await msg.reply("Invalid command. Use 'play' or 'pause'.");
    }

  }
}
