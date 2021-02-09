<script>
import "../css/reset.css";
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
      gymAces: [],
    };
  },

  // onCreated Lifecycle
  created: function () {
    this.loaded = true;
    this.connected = false;
    this.client = new Client("badges", config.settings);
    this.gymAces = this.client.settings.theme.gymAces();
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

      this.badges = payload.trainer.badges.map((badge) => {
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

<style lang="scss">
.badges {
  display: flex;
  flex-wrap: wrap;
  font-family: sans-serif;
}

.badge {
  &__slot {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img {
      width: 100%;
    }

    &--inactive img {
      -webkit-filter: grayscale(100%) brightness(0);
      filter: grayscale(100%) brightness(0);
      opacity: 0.6;
    }

    &--inactive .badge__level {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__level {
    font-size: 80px;
    color: white;
    -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: black;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    font-weight: bold;
  }
}
</style>

<template>
  <div id="badges">
    <ul class="badges" v-if="connected && loaded">
      <li
        v-for="(badge, idx) in badges"
        :key="badge.img"
        :class="{ badge__slot: true, 'badge__slot--inactive': !badge.active }"
      >
        <img :src="badge.img" :alt="badge.label" />
        <p v-if="gymAces && gymAces[idx]" class="badge__level">
          {{ gymAces[idx] }}
        </p>
      </li>
    </ul>
    <div v-else class="no-connection">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{ settings.port }}</p>
    </div>
  </div>
</template>
