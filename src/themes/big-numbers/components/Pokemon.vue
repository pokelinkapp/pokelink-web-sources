<script>
import exp_groups_table from "pokelink-client/data/exp-groups";
import experience_table from "pokelink-client/data/experience";

export default {
  name: "Pokemon",
  props: {
    pokemon: {},
    slotId: null,
    settings: {},
  },
  data() {
    return {
      justTookDamage: false,
      customCardArt: null,
      pokeIsChanging: false,
      isFresh: true,
      newCardArt: null,
      sets: [],
    };
  },
  created() {
    this.sets = this.settings.theme.pokemonTCGCardSets();
  },
  mounted() {
    this.pokeIsChanging = false;
    if (this.pokemonExists && this.settings.pokeImg.useCardArtBackground)
      this.getNewCardArt(this.pokemon);
  },
  methods: {
    getNewCardArt(poke) {
      if (!this.isFresh) {
        this.pokeIsChanging = true;
      }
      if (!this.settings.pokeImg.useCardArtBackground) {
        setTimeout(() => {
          this.pokeIsChanging = false;
        }, 1400);
        return false;
      }

      let isFresh = this.customCardArt === null && this.isFresh === true;
      if (!this.isFresh) {
        this.pokeIsChanging = true;
      }
      this.isFresh = false;

      fetch(
        "https://api.pokemontcg.io/v1/cards?setCode=" +
          this.sets.join("|") +
          "&supertype=pokemon&nationalPokedexNumber=" +
          poke.species
      )
        .then((response) => response.json())
        .then((cards) => {
          let setOrder = this.sets;
          // try {
          let cardImages = cards.cards.sort((a, b) => {
            return (
              setOrder.findIndex((set) => set === a.setCode) -
              setOrder.findIndex((set) => set === b.setCode)
            );
          });

          cardImages = cardImages.find(
            (card) => card.nationalPokedexNumber === poke.species
          );
          this.newCardArt = cardImages.imageUrl;

          if (!isFresh) {
            setTimeout(() => {
              this.customCardArt = this.newCardArt;
              this.pokeIsChanging = false;
            }, 1400);
          } else {
            this.customCardArt = cardImages.imageUrl;
            this.pokeIsChanging = false;
          }
        });
    },
  },
  computed: {
    pokemonExists() {
      if (!this.pokemon || !this.pokemon.hasOwnProperty("hp")) return false;
      return true;
    },
    isActive() {
      if (!this.settings.pokeImg.useCardArtBackground) {
        return !this.pokeIsChanging;
      }
      return this.customCardArt && !this.pokeIsChanging;
    },
    isClosing() {
      return this.pokeIsChanging === true;
    },
    healthPercent() {
      if (!this.pokemon || !this.pokemon.hasOwnProperty("hp")) return "0%";
      return (100 / this.pokemon.hp.max) * this.pokemon.hp.current + "%";
    },
    isDead() {
      if (this.pokemonExists === false) {
        return false;
      }

      return parseFloat(this.healthPercent) === 0;
    },
    isSleeping() {
      if (this.pokemonExists === false) {
        return false;
      }

      return this.pokemon.status.slp === 1;
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
      if (this.pokemonExists === false) {
        return null;
      }
      return this.pokemon.species;
    },
    opacity() {
      if (this.pokemonExists === false) {
        return "0.4";
      }
      return "1";
    },
    hasItem() {
      if (this.pokemonExists === false) {
        return false;
      }
      if (typeof this.pokemon.heldItem === "undefined") {
        return false;
      }
      return this.pokemon.heldItem.id !== 0;
    },
    sprite() {
      if (this.pokemonExists === false) {
        return "";
      }
      if (this.pokemon.img) {
        return this.pokemon.img;
      }

      return "";
    },
    experienceRemaining() {
      if (this.pokemonExists === false) {
        return false;
      }
      const expGroup = exp_groups_table.find(
        (group) => this.pokemon.species === group.id
      );
      const levelExp = experience_table.filter((expRange) => {
        return (
          expRange.level === this.pokemon.level + 1 ||
          expRange.level === this.pokemon.level
        );
      });

      const totalExpForThisRange =
        levelExp[1][expGroup["levelling_type"]] -
        levelExp[0][expGroup["levelling_type"]];
      const expLeftInThisRange =
        this.pokemon.exp - levelExp[0][expGroup["levelling_type"]];

      return (100 / totalExpForThisRange) * expLeftInThisRange + "%";
    },

    typeColorBackgroundStyle() {
      if (this.pokemonExists === false) {
        return false;
      }
      if (this.settings.pokeImg.useTypesGradient === false) return false;
      let styles = {
        opacity: this.opacity,
      };

      if (this.pokemon) {
        let primaryType = this.pokemon.types[0].label.toLowerCase();
        let secondaryType = primaryType;
        // if (this.pokemon.types.length > 1) {
        //   secondaryType = this.pokemon.types[1].label.toLowerCase()
        // }

        styles = {
          ...styles,
          "background-image":
            "linear-gradient(90deg, " +
            this.settings.typeColors[primaryType] +
            ", " +
            this.settings.typeColors[secondaryType] +
            ")",
        };
      }

      return styles;
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
  watch: {
    pokemon(newVal, oldVal) {
      try {
        if (
          (!oldVal.hasOwnProperty("hp") && newVal.hasOwnProperty("hp")) ||
          newVal.species !== oldVal.species
        ) {
          this.getNewCardArt(newVal);
        }

        if (!newVal.hasOwnProperty("hp")) {
          this.customCardArt = null;
        }

        if (newVal.hp.current < oldVal.hp.current) {
          this.justTookDamage = true;
          setTimeout(() => {
            this.justTookDamage = false;
          }, 3000);
        }
      } catch (e) {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.pokemon__list .pokemon {
  width: 260px;
  height: 144px;
  margin-bottom: 15px;
  margin-right: 15px;
  position: relative;
  padding-top: 40px;
  overflow: hidden;
  margin-top: -40px;
}

.pokemon__container {
  height: 144px;
  position: relative;
}

.pokemon__list .pokemon .slot_id {
  position: absolute;
  right: 2px;
  top: 40px;
  font-size: 14rem;
  color: transparent;
  -webkit-text-stroke: 7px rgb(255, 255, 255 / 38%);
  font-family: fantasy;
  height: 143px;
  line-height: 168px;
  z-index: 5;
  font-family: "RifficFree";
  overflow: hidden;
}

.pokemon__list.flipped .pokemon .slot_id {
  left: -2px;
  top: 40px;
  font-size: 14rem;
  color: transparent;
  -webkit-text-stroke: 7px rgb(255, 255, 255 / 38%);
  font-family: fantasy;
  height: 143px;
  line-height: 168px;
  z-index: 5;
  font-family: "RifficFree";
  overflow: hidden;
}
.pokemon__card-art {
  left: 260px;
  animation-fill-mode: forwards;
}

.pokemon.active .pokemon__card-art {
  left: 0px;
  animation: slideInLeft 0.4s linear forwards;
}

.pokemon.closing .pokemon__card-art {
  left: 0px;
  animation: slideOutRight 0.4s linear forwards;
}

.pokemon.active .pokemon__row {
  animation: slideInLeft 0.4s linear forwards;
}

.pokemon.closing .pokemon__row {
  left: 260px;
  animation: slideOutRight 0.4s linear forwards;
}

.pokemon__list .pokemon:nth-child(1) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #37005b);
}
.pokemon__list .pokemon:nth-child(2) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #00b703);
}
.pokemon__list .pokemon:nth-child(3) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #ffe800);
}
.pokemon__list .pokemon:nth-child(4) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #ff7200);
}
.pokemon__list .pokemon:nth-child(5) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #ff0000);
}
.pokemon__list .pokemon:nth-child(6) .pokemon__container {
  background-image: linear-gradient(90deg, #6800d4, #ff00fb);
}

.pokemon__list.flipped .pokemon:nth-child(1) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #37005b);
}
.pokemon__list.flipped .pokemon:nth-child(2) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #00b703);
}
.pokemon__list.flipped .pokemon:nth-child(3) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #ffe800);
}
.pokemon__list.flipped .pokemon:nth-child(4) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #ff7200);
}
.pokemon__list.flipped .pokemon:nth-child(5) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #ff0000);
}
.pokemon__list.flipped .pokemon:nth-child(6) .pokemon__container {
  background-image: linear-gradient(270deg, #6800d4, #ff00fb);
}
/*
.pokemon__list .pokemon:nth-child(1) .pokemon__container,
.pokemon__list .pokemon:nth-child(1) .pokemon__card-art {
  border-top-left-radius: 20px;
}
.pokemon__list.flipped .pokemon:nth-child(1) .pokemon__container,
.pokemon__list.flipped .pokemon:nth-child(1) .pokemon__card-art {
  border-top-right-radius: 20px;
  border-top-left-radius: 0px;
}

.pokemon__list .pokemon:nth-child(6) .pokemon__container,
.pokemon__list .pokemon:nth-child(6) .pokemon__card-art {
  border-bottom-left-radius: 20px;
}
.pokemon__list.flipped .pokemon:nth-child(6) .pokemon__container,
.pokemon__list.flipped .pokemon:nth-child(6) .pokemon__card-art {
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 0px;
} */

.pokemon .pokemon__card-art {
  /* background-image: url(https://images.pokemontcg.io/sm8/19_hires.png); */
  height: 144px;
  background-size: 330px;
  background-position: -34px -58px;
  position: absolute;
  top: 40px;
  /* left: 0px; */
  width: 100%;
  z-index: 3;
  opacity: 0.2;
}

.pokemon__row {
  position: relative;
  height: 144px;
  left: 260px;
}

.pokemon__image {
  position: relative;
  height: 144px;
  text-align: center;
}

.pokemon__list .pokemon .pokemon__row .pokemon__image .sprite {
  height: 120%;
  position: relative;
  bottom: 20px;
  z-index: 6;
}
.pokemon__list.flipped .pokemon .pokemon__row .pokemon__image .sprite {
  transform: scaleX(-1);
}

.pokemon__level {
  font-family: "PokemonGB";
  bottom: 9px;
  position: absolute;
  left: 9px;
  color: white;
  text-shadow: 1px 1px black;
  z-index: 10;
}

.pokemon__list.flipped .pokemon__level {
  right: 9px;
  left: unset;
}

.pokemon__list .pokemon .hp .hp__inner {
  background: linear-gradient(to right, lime, #8bf500);
  transition: width 2s;
  height: 100%;
}

.pokemon .hp .hp__inner.low {
  background: linear-gradient(to right, #ffcc00, #f1f500);
}
.pokemon .hp .hp__inner.critical {
  background: linear-gradient(to right, #d20000, #f51700);
}

.pokemon__list .pokemon .exp {
  position: absolute;
  bottom: 0px;
  width: calc(100% - 160px);
  height: 2px;
  background: transparent;
  z-index: 5;
  right: 0;
}

.pokemon__heldItem {
  position: absolute;
  left: 6px;
  bottom: 20px;
}

.pokemon .exp .exp__inner {
  background-color: cyan;
  height: 3px;
  transition: width 2s;
}

.pokemon__list .pokemon .pokemon__details .details__hp {
  border: 1px solid #000000;
  height: 5px;
  width: 100%;
}

.pokemon__list .pokemon .pokemon__details .details__hp .hp__bar {
  background-color: #ff0000;
  height: 5px;
}

/* transitions stuffs */
.switchSlow-move {
  transition: transform 2s;
}

.switchMedium-move {
  transition: transform 1s;
}

.switchFast-move {
  transition: transform 0.5s;
}

@keyframes takeDamage {
  0% {
    -webkit-filter: none;
    filter: none;
  }
  50% {
    -webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%)
      hue-rotate(-50deg) saturate(400%) contrast(2);
    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg)
      saturate(600%) contrast(0.8);
  }
  100% {
    -webkit-filter: none;
    filter: none;
  }
}

@keyframes poisoned {
  0% {
    -webkit-filter: none;
    filter: none;
  }
  50% {
    -webkit-filter: invert(40%) grayscale(100%) brightness(40%) sepia(100%)
      hue-rotate(-106deg) saturate(400%) contrast(2);
    filter: grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-106deg)
      saturate(600%) contrast(0.8);
  }
  100% {
    -webkit-filter: none;
    filter: none;
  }
}

@keyframes shake {
  10%,
  90% {
    transform: scale(2) translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: scale(2) translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: scale(2) translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: scale(2) translate3d(4px, 0, 0);
  }
}

@keyframes slideInLeft {
  from {
    left: 260px;
  }

  to {
    left: 0px;
  }
}
@keyframes slideOutRight {
  from {
    left: 0px;
  }

  to {
    left: 260px;
  }
}

.sleeping {
  width: 144px;
  height: 144px;
  position: absolute;
  top: -50px;
  left: 94%;
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 11;
}

.sleeping span {
  font-family: "RifficFree";
  color: #d4d4d4;
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 23pt;
  opacity: 0;
  -moz-animation: sleep 9s infinite linear;
  -webkit-animation: sleep 9s infinite linear;
  animation: sleep 9s infinite linear;
}
.sleeping span:nth-child(2n) {
  -moz-animation-delay: 3s;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}
.sleeping span:nth-child(3n) {
  -moz-animation-delay: 6s;
  -webkit-animation-delay: 6s;
  animation-delay: 6s;
}

@-webkit-keyframes sleep {
  0% {
    -moz-transform: translate(0, 0) scale(0.3);
    -ms-transform: translate(0, 0) scale(0.3);
    -webkit-transform: translate(0, 0) scale(0.3);
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    -moz-transform: translate(90%, -50%) scale(0.65);
    -ms-transform: translate(90%, -50%) scale(0.65);
    -webkit-transform: translate(90%, -50%) scale(0.65);
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(180%, -100%) scale(1);
    -ms-transform: translate(180%, -100%) scale(1);
    -webkit-transform: translate(180%, -100%) scale(1);
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  }
}
@-moz-keyframes sleep {
  0% {
    -moz-transform: translate(0, 0) scale(0.3);
    -ms-transform: translate(0, 0) scale(0.3);
    -webkit-transform: translate(0, 0) scale(0.3);
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    -moz-transform: translate(90%, -50%) scale(0.65);
    -ms-transform: translate(90%, -50%) scale(0.65);
    -webkit-transform: translate(90%, -50%) scale(0.65);
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(180%, -100%) scale(1);
    -ms-transform: translate(180%, -100%) scale(1);
    -webkit-transform: translate(180%, -100%) scale(1);
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  }
}
@-ms-keyframes sleep {
  0% {
    -moz-transform: translate(0, 0) scale(0.3);
    -ms-transform: translate(0, 0) scale(0.3);
    -webkit-transform: translate(0, 0) scale(0.3);
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    -moz-transform: translate(90%, -50%) scale(0.65);
    -ms-transform: translate(90%, -50%) scale(0.65);
    -webkit-transform: translate(90%, -50%) scale(0.65);
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(180%, -100%) scale(1);
    -ms-transform: translate(180%, -100%) scale(1);
    -webkit-transform: translate(180%, -100%) scale(1);
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  }
}
@keyframes sleep {
  0% {
    -moz-transform: translate(0, 0) scale(0.3);
    -ms-transform: translate(0, 0) scale(0.3);
    -webkit-transform: translate(0, 0) scale(0.3);
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    -moz-transform: translate(90%, -50%) scale(0.65);
    -ms-transform: translate(90%, -50%) scale(0.65);
    -webkit-transform: translate(90%, -50%) scale(0.65);
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    -moz-transform: translate(180%, -100%) scale(1);
    -ms-transform: translate(180%, -100%) scale(1);
    -webkit-transform: translate(180%, -100%) scale(1);
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  }
}
</style>

<template>
  <div
    :class="{
      pokemon: true,
      isDead: isDead,
      isDamaged: justTookDamage,
      closing: isClosing,
      active: isActive,
    }"
  >
    <div class="slot_id">{{ slotId }}</div>
    <div
      class="pokemon__card-art"
      :style="{ 'background-image': 'url(' + customCardArt + ')' }"
    ></div>
    <div class="pokemon__container" :style="typeColorBackgroundStyle">
      <div class="hp" v-if="pokemonExists && !pokemon.isEgg">
        <div
          :style="{ width: healthPercent }"
          :class="{
            hp__inner: true,
            low: parseFloat(healthPercent) <= 50,
            critical: parseFloat(healthPercent) <= 15,
          }"
        ></div>
      </div>

      <div class="sleeping" v-if="isSleeping">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </div>

      <div class="pokemon__row" v-if="pokemonExists">
        <div class="pokemon__level" v-if="pokemon.level">
          <small>Lv.</small>{{ pokemon.level }}
        </div>
        <div class="pokemon__image">
          <img
            v-if="pokemon.isEgg"
            class="sprite"
            :src="pokemon.img"
            style="transform: scale(0.8); bottom: 0px"
          />
          <img v-else class="sprite" :src="pokemon.img" />
        </div>
      </div>

      <!--<div class="pokemon__name" :style="nameStyle" v-if="pokemonExists">
          {{pokemon.nickname}}
        </div>-->

      <!--<div class="pokemon__heldItem" v-if="hasItem"><img :src="pokemon.heldItem.img" /></div>-->

      <!--<div class="exp" v-if="pokemonExists && !pokemon.isEgg">
          <div :style="{width:experienceRemaining}" class="exp__inner"></div>
        </div>-->
    </div>
  </div>
</template>
