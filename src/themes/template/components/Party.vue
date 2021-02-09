<script>
import "../css/reset.css";
import Client from "pokelink-client";
import { transformPokemon } from "pokelink-client/utils";
import config from "../theme.config";
import Pokemon from "./Pokemon";
import Pokeball from "./Pokeball";

export default {
  name: "Party",
  // Componentts used by this component
  components: {
    Pokemon,
    Pokeball,
  },

  // Class variabled for the component
  data() {
    return {
      connected: false,
      loaded: false,
      settings: {},
      party: [],
      players: {},
      party_count: 0,
      switchSpeed: "switchMedium",
    };
  },

  // onCreated lifecycle
  created: function () {
    this.loaded = true;
    this.connected = false;
    this.client = new Client("party", config.settings);
  },

  // onMounted lifecycle
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

  // Component methods
  methods: {
    updateTrainerStuffs(payload) {
      if (this.client.settings.debug) {
        console.log(`Trainer Update recieved for ${payload.username}`);
        console.log(payload, this.settings);
      }
      if (payload.username !== this.client.settings.currentUser) return;
    },
  },
};
</script>

<style lang="scss">
.pkmn-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  flex-wrap: wrap;
}

.pkmn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="pokes">
    <ul class="pkmn-list" v-if="connected && loaded">
      <li v-for="poke in party" :key="poke.pid" class="pkmn-wrapper">
        <Pokemon v-if="typeof poke == 'object'" :pokemon="poke" />
      </li>
      <li
        v-for="index in 6 - party_count"
        :key="index + 1"
        class="pkmn-wrapper pkmn-wrapper--empty"
      >
        <Pokeball />
      </li>
    </ul>
    <div v-else class="no-connection">
      <p>Waiting for successful connection to Pokélink...</p>
      <p>Attempting to connect on port {{ settings.port }}</p>
    </div>
  </div>
</template>
