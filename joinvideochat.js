"use strict";

const Plugin = require("../plugin");

module.exports = new Plugin({
    name: "Join Video Chat Button",
    author: "Natalie Fearnley",
    description: "Adds the a button to the toolbar to join a voice channel's video chat",
    color: "red",
    load: async function() {
        const getChannel = findModule("getChannel").getChannel;
        const getChannelId = findModule("getChannelId").getChannelId;
        const sendBotMessage = findModule("sendBotMessage").sendBotMessage;

        function updateVideoLink(v) {
            if (!(v.guildId && v.channelId)) {
                return;
            }
            var videolinkHref = `https://discordapp.com/channels/${v.guildId}/${v.channelId}`;
            console.log(videolinkHref);

            var voiceChannel = getChannel(v.channelId);

            sendBotMessage(getChannelId(), `${voiceChannel.name} Video - ${videolinkHref}`);
        }

        findModule("subscribe").subscribe("VOICE_CHANNEL_SELECT", updateVideoLink);
    },
    unload: function() {
    }
});
