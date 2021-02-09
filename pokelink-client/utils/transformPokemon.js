const collect = require("collect.js");
const { unCamelCase } = require("./unCamelCase");
const pokedex = require("../data/pokedex").default;
const movedex = require("../data/movedex").default;
const itemdex = require("../data/itemdex").default;
const locationdex = require("../data/locationdex").default;

const transformPokemon = (pokemon, settings) => {
  let entry;
  let types;

  if (typeof pokemon.transformed != "undefined") {
    return pokemon;
  }
  if (settings.debug) {
    console.info(pokemon);
  }
  // try and get pokedex info
  if (typeof pokedex !== "undefined") {
    entry = pokedex.where("id", pokemon.species).first();
    if (typeof entry === "undefined") {
      entry = {};
    }
  }
  pokemon.transformed = true;

  // handle shinies
  var url = settings.imgPaths[settings.pokeImg.usePath];
  if (settings.pokeImg.ignoreShinies === false && pokemon.isShiny == 1) {
    url = settings.imgPaths.shiny;
  }
  if (pokemon.species === -1) {
    url = settings.imgPaths.missingno;
  }

  // normalize name
  pokemon.normalizeName = pokemon.speciesName
    .toLowerCase()
    .replace(/[é]/g, "e")
    .replace(/[^a-zA-Z0-9♀]/g, "")
    .replace(/[♀]/g, "-f"); // nidoran female// nidoran male

  // figure out which version of the filename we wanna use
  var filename = settings.pokeImg.useDexNumbers
    ? pokemon.species
    : pokemon.normalizeName;

  var backupFilename = filename;

  // handle forms
  if (settings.pokeImg.ignoreForms === false) {
    if (
      pokemon.alternateForm !== "" &&
      typeof pokemon.alternateForm !== "undefined"
    ) {
      try {
        switch (pokemon.alternateForm) {
          case "gmax":
          case "mega":
          case "megay":
          case "megax":
            filename += "-" + pokemon.alternateForm;
            break;

          case "normal":
            break;

          default:
            filename =
              settings.pokemonForms[pokemon.speciesName.toLowerCase()][
                pokemon.alternateForm
              ];
        }
      } catch (e) {
        filename = backupFilename;
      }
    } else if (
      (pokemon.isFemale == true || pokemon.is_female === true) &&
      settings.pokemonForms["female"].indexOf(
        pokemon.speciesName.toLowerCase()
      ) !== -1 &&
      settings.pokeImg.ignoreFemaleForms !== true
    ) {
      filename += "-f";
    }
  }

  pokemon.img = url;
  if (pokemon.species !== -1) {
    pokemon.img += filename + "." + settings.pokeImg.fileType;
  }
  if (settings.pokeImg.determineEggs === false && pokemon.isEgg == true) {
    pokemon.img =
      settings.pokeImg.eggType === "static"
        ? settings.imgPaths.staticEgg
        : settings.imgPaths.animatedEgg;
    pokemon.nickname = "Egg";
  }

  // normalize species name
  if (
    typeof pokemon.nickname === "undefined" ||
    pokemon.nickname == "" ||
    pokemon.nickname === null
  ) {
    pokemon.nickname = pokemon.speciesName;
  }

  pokemon.nickname = pokemon.nickname.replace(/\\u\{ffff\}.*$/, "");

  // setup status imgs
  pokemon.status.img = "0";
  if (pokemon.status.psn === 1) {
    pokemon.status.img = "psn".toUpperCase();
  }
  if (pokemon.status.slp === 1) {
    pokemon.status.img = "slp".toUpperCase();
  }
  if (pokemon.status.par === 1) {
    pokemon.status.img = "par".toUpperCase();
  }
  if (pokemon.status.frz === 1) {
    pokemon.status.img = "frz".toUpperCase();
  }
  if (pokemon.status.brn === 1) {
    pokemon.status.img = "brn".toUpperCase();
  }
  if (pokemon.dead === true) {
    pokemon.status.img = "fnt".toUpperCase();
  }

  // get data from pokedex
  if (typeof pokedex !== "undefined") {
    if (typeof pokemon.types === "undefined") {
      pokemon.types = [];
    }

    if (pokemon.types.length === 0 && typeof entry.type !== "undefined") {
      types = entry.type;

      // handle the non-fairy varient of the pokemon
      var gen5Typing =
        settings.pokemonForms["<gen5"][pokemon.speciesName.toLowerCase()];
      if (typeof gen5Typing != "undefined" && settings.game.generation <= 5) {
        types = [gen5Typing];
      }

      types.forEach(function (type) {
        pokemon.types.push({
          label: type,
          img: settings.imgPaths.types + type.toLowerCase() + ".png",
        });
      });
    } else {
      types = pokemon.types;
      pokemon.types = [];

      types.forEach(function (type) {
        if (type.label === null) {
          return;
        }
        pokemon.types.push({
          label: type.label,
          img: settings.imgPaths.types + type.label.toLowerCase() + ".png",
        });
      });
    }

    if (entry.length > 0 && entry.color.length) {
      pokemon.color = entry.color;
    }

    ["move1", "move2", "move3", "move4"].forEach(function (move) {
      if (pokemon[move].name === "--") {
        return;
      }
      var moveEntry = movedex
        .where("ename", unCamelCase(pokemon[move].name))
        .first();
      if (typeof moveEntry !== "undefined") {
        pokemon[move].max_pp = moveEntry.pp;
        pokemon[move].type = moveEntry.type;
      }
    });
  }

  // handle item stuff
  pokemon.heldItem = {
    id: pokemon.heldItem,
    img:
      settings.imgPaths.items +
      "gen" +
      settings.game.generation +
      "/" +
      pokemon.heldItem +
      ".png",
  };
  if (
    typeof itemdex !== "undefined" &&
    itemdex.has("gen" + settings.game.generation)
  ) {
    var item = collect(itemdex.get("gen" + settings.game.generation))
      .filter((row) => {
        return row.id == pokemon.heldItem.id;
      })
      .first();
    pokemon.heldItem.name = typeof item !== "undefined" ? item.name : "Unknown";
  }

  // replace the location id with text
  if (typeof pokemon.locationMet === "undefined") {
    pokemon.locationMet = 0;
  }

  if (typeof locationdex !== "undefined") {
    let game = settings.game.name || "";

    game = game.replace("Pokémon ", "");
    let locations = [];

    if (
      ["Fire Red", "Leaf Green", "Ruby", "Sapphire", "Emerald"].indexOf(
        game
      ) !== -1
    ) {
      locations = collect(locationdex.gen3);
    }

    if (locations.length !== 0) {
      pokemon.locationMet = locations
        .where("id", pokemon.locationMet)
        .first().name;
    }
  }

  return pokemon;
};

module.exports = { transformPokemon };
