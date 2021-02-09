<script>
export default {
  name: "Pokemon",
  props: {
    pokemon: {},
  },
  computed: {
    isEmptySlot() {
      return typeof this.pokemon === "undefined";
    },
    healthPercent() {
      return (100 / this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    nickname() {
      return this.pokemon.nickname || this.pokemon.speciesName;
    },
    sex() {
      return this.pokemon.isGenderless
        ? ""
        : this.pokemon.isFemale
        ? "female"
        : "male";
    },
    ident() {
      if (this.isEmptySlot) {
        return null;
      }
      return this.pokemon.species;
    },
    opacity() {
      if (this.isEmptySlot) {
        return "0.4";
      }
      return "1";
    },
    hasItem() {
      if (this.isEmptySlot) {
        return false;
      }
      if (typeof this.pokemon.heldItem === "undefined") {
        return false;
      }
      return this.pokemon.heldItem.id !== 0;
    },

    selectedPokemon: {
      get: function () {
        return this.nickname;
      },
      set: function () {
        this.$emit("change", this.nickname);
      },
    },
  },
};
</script>

<style lang="scss">
.pokemon {
  text-align: center;

  &__sprite-wrapper {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__sprite {
    max-height: 95%;
  }

  &__details {
    display: block;

    .details__name {
      font-weight: bold;
      color: #c0c0c0;
    }

    .details__hp {
      border: 1px solid #000000;
      height: 5px;
      width: 100%;

      .hp__bar {
        background-color: #ff0000;
        height: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="pokemon" :style="{ opacity: opacity }">
    <div class="pokemon__sprite-wrapper" v-if="pokemon.isEgg">
      <img
        class="pokemon__sprite"
        :src="pokemon.img"
        style="max-height: 80px"
      />
    </div>
    <div class="pokemon__sprite-wrapper" v-else>
      <img class="pokemon__sprite" :src="pokemon.img" />
    </div>
    <div class="pokemon__details">
      <div class="details__name">
        {{ pokemon.nickname }} Lv.<span>{{ pokemon.level }}</span>
      </div>
      <div class="details__hp hp">
        <div class="hp__bar" :style="{ width: healthPercent }"></div>
      </div>
    </div>
  </div>
</template>
