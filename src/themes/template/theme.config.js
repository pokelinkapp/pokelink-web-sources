const { getParam } = require("pokelink-client/utils");
module.exports = {
  templates: {
    party: "./party.js",
    badges: "./badges.js",
  },
  settings: {
    theme: {
      name: "Base Template",
      gymAces: function () {
        const userGymAces = getParam("gymAces");
        if (userGymAces !== null && userGymAces.length > 0) {
          return userGymAces.split(",");
        }

        return [];
      },
    },
    debug: false,

    imgPaths: {
      normal:
        "https://assets.pokelink.xyz/assets/sprites/pokemon/gen7/animated/",
      shiny:
        "https://assets.pokelink.xyz/assets/sprites/pokemon/gen7/animated-shiny/",
      party: "https://assets.pokelink.xyz/assets/sprites/pokemon/gen8/party/",
      animatedEgg: "https://assets.pokelink.xyz/assets/sprites/egg.gif",
      staticEgg: "https://assets.pokelink.xyz/assets/sprites/egg.png",
      unknown: "https://assets.pokelink.xyz/assets/sprites/",
      badges: "https://assets.pokelink.xyz/assets/sprites/badges/",
      status: "https://assets.pokelink.xyz/assets/sprites/status/",
      types: "https://assets.pokelink.xyz/assets/sprites/types/",
      items: "https://assets.pokelink.xyz/assets/sprites/items/",
    },
  },
};
