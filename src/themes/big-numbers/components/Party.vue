<script>
import Pokemon from "./Pokemon";
import Client from "pokelink-client";
import { getParam, transformPokemon } from "pokelink-client/utils";
import config from "../theme.config";

export default {
  name: "Party",
  components: {
    Pokemon,
  },
  data() {
    return {
      connected: false,
      loaded: false,
      settings: {},
      party: [],
      players: {},
      party_count: 0,
      switchSpeed: "switchMedium",
      flipped: false,
    };
  },
  created: function () {
    this.loaded = true;
    this.flipped = !!getParam("flipped");
    this.client = new Client("party", config.settings);
  },
  mounted: function () {
    const settings = this.client.settings;
    this.client
      .setup((username, party) => {
        this.connected = true;
        this.players[username] = party.map(function (pokemonWrapper) {
          let mon = pokemonWrapper.pokemon;
          if (mon == null) {
            return false;
          }

          return transformPokemon(mon, settings);
        });

        if (username == this.client.currentUser) {
          this.party = this.players[username];
          this.party_count = this.party.filter(function (value) {
            return typeof value == "object";
          }).length;
        }
      })
      .on("player:trainer:updated", (payload) => {
        this.updateTrainerStuffs(payload);
      });
  },
  methods: {
    updateTrainerStuffs(payload) {
      if (this.client.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`);
        console.log(payload, this.client.settings);
      }
      if (payload.username !== this.client.settings.currentUser) return;
    },
  },
  computed: {
    partySlots() {
      return [...new Array(6).keys()].map((slot) => {
        return this.party[slot] || {};
      });
    },
  },
};
</script>

<style lang="scss">
.browser-connected {
  display: block !important;
}

.pokemon__list {
  display: flex;
  /* display: grid; */
  width: 100%;
  /* grid-template-columns: repeat(6, 128px); */
  /* grid-template-rows: repeat(1, 115px); */
  /* column-gap: 20px; */
  /* display: block; */
  flex-direction: column;

  &.horizontal {
    flex-direction: row;
  }
}
</style>

<template>
  <div
    style="display: none"
    :class="{ 'browser-connected': true }"
    class="pokes"
  >
    <transition-group
      :name="switchSpeed"
      tag="div"
      :class="[
        'pokemon__list',
        {
          flipped: flipped === true,
          horizontal: this.client.settings.theme.horizontal,
        },
      ]"
      v-if="loaded"
    >
      <Pokemon
        v-for="(poke, idx) in partySlots"
        :slotId="idx + 1"
        :key="'slot' + idx"
        :pokemon="poke"
        :settings="client.settings"
      >
      </Pokemon>
    </transition-group>
    <div class="no-connection" v-if="!connected">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{ settings.port }}</p>
    </div>
  </div>
</template>
