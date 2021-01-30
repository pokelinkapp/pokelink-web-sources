<script>
import Client from "pokelink-client";
import config from "../theme.config";

export default {
  name: "Badges",

  // Class variables
  data: function () {
    return {
      connected: false,
      loaded: false,
      settings: {},
      badges: [],
    };
  },

  // onCreated Lifecycle
  created: function () {
    this.loaded = true;
    this.connected = false;
    this.client = new Client("badges", config.settings);
  },

  // onMounted lifecycle
  mounted: function () {
    this.client
      .setup(() => {
        this.connected = true;
      })
      .on("player:trainer:updated", (payload) => {
        this.updateBadges(payload);
      })
      .on("client:players:list", (users) => {
        users.forEach((user) => {
          this.updateBadges(user);
        });
      });
  },

  // Component methods
  methods: {
    updateBadges(payload) {
      if (this.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`);
        console.log(payload, this.settings);
      }
      if (payload.username !== this.client.settings.currentUser) return;

      this.badges = payload.trainer.badges.map(function (badge) {
        var badgeObj = {};
        badgeObj.img =
          this.client.settings.imgPaths.badges +
          badge.name.toLowerCase() +
          ".png";
        badgeObj.label = badge.name + " Badge";
        badgeObj.active = badge.value;
        return badgeObj;
      });
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div id="badges">
    <ul class="badges" v-if="connected && loaded">
      <li
        v-for="badge in badges"
        :key="badge.img"
        :class="{ badge__slot: true, 'badge__slot--inactive': !badge.active }"
      >
        <img :src="badge.img" :alt="badge.label" />
      </li>
    </ul>
    <div v-else class="no-connection">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{ settings.port }}</p>
    </div>
  </div>
</template>
