var defaultSettings = {
  game: {
    // only 3 4 and 5 supported atm
    generation: null,

    // supported values are:
    // firered, leafgreen, soulsilver, heartgold, diamond, pearl, platinum, black, white, black2, white2
    game: null,
  },

  pokeImg: {
    // will use species name instead (eg Bulbasaur.gif instead of 1.gif),
    useDexNumbers: false,
    // valid image types include: gif, jpg, jpeg, png etc
    fileType: 'gif',
    ignoreShinies: false,
    ignoreForms: true,
    determineEggs: true,

    // customizations, only 1 can be active at once
    routeColor: true,
    pokemonColor: false,
    typeColor: false,
  },

  imgPaths: {
    normal: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen6/animated/',
    shiny: 'https://pokelink.cybershade.org/assets/sprites/pokemon/gen6/animated-shiny/',
    party: 'https://pokelink.cybershade.org/assets/sprites/party/',
    egg: 'https://pokelink.cybershade.org/assets/sprites/egg.gif',
    unknown: 'https://pokelink.cybershade.org/assets/sprites/',
    status: 'https://pokelink.cybershade.org/assets/sprites/status/',
    types: 'https://pokelink.cybershade.org/assets/sprites/types/',
    items: 'https://pokelink.cybershade.org/assets/sprites/items/',
  },

  typeColors: {
    'bug': '#a8b820', 'dark': '#c02020', 'dragon': '#7038f8',
    'electric': '#f8d030', 'fairy': '#ee99ac', 'fighting': '#c03028',
    'fire': '#f08030', 'flying': '#a890f0', 'ghost': '#705898',
    'grass': '#78c850', 'ground': '#e0c068', 'ice': '#98d8d8',
    'normal': '#a8a878', 'poison': '#a040a0', 'psychic': '#f85888',
    'rock': '#b8a038', 'steel': '#b8b8d0', '???': '#68a090', 'water': '#6890f0',
  },

  statusColors: {
    'psn': '#c060c0', 'par': '#b8b818', 'slp': '#a0a088',
    'frz': '#88b0e0', 'brn': '#e07050',
    'pkrs': '#c060c0', 'fnt': '#e85038',
  },

  pokemonForms: {
    'unown': {
      'a': 'unown-a', 'b': 'unown-b',
      'c': 'unown-c', 'd': 'unown-d',
      'e': 'unown-e', 'f': 'unown-f',
      'g': 'unown-g', 'h': 'unown-h',
      'i': 'unown-i', 'j': 'unown-j',
      'k': 'unown-k', 'l': 'unown-l',
      'm': 'unown-m', 'n': 'unown-n',
      'o': 'unown-o', 'p': 'unown-p',
      'q': 'unown-q', 'r': 'unown-r',
      's': 'unown-s', 't': 'unown-t',
      'u': 'unown-u', 'v': 'unown-v',
      'w': 'unown-w', 'x': 'unown-x',
      'y': 'unown-y', 'z': 'unown-z',
      '!': 'unown-!', '?': 'unown-?',
    },

    'castform': {
      'normal': 'castform', 'sunny': 'castform-sunny',
      'rainy': 'castform-rainy', 'snowy': 'castform-snowy',
    },

    'deoxys': {
      'normal': 'deoxys','attack': 'deoxys-attack',
      'defence': 'deoxys-defence', 'speed': 'deoxys-speed',
    },

    'burmy': {
      'plant': 'burmy', 'sandy': 'burmy-sandy',
      'trash': 'burmy-trash',
    },

    'wormadam': {
      'plant': 'wormadam', 'sandy': 'wormadam-sandy',
      'trash': 'wormadam-trash',
    },

    'cherrim': {
      'overcast': 'cherrim', 'sunshine': 'cherrim-sunshine',
    },

    'shellos': {
      'west': 'shellos', 'east': 'shellos-east',
    },

    'gastrodon': {
      'west': 'gastrodon', 'east': 'gastrodon-east',
    },

    'rotom': {
      'normal': 'rotom', 'heat': 'rotom-heat',
      'wash': 'rotom-wash', 'frost': 'rotom-frost',
      'fan': 'rotom-fan', 'mow': 'rotom-mow',
    },

    'giratina': {
      'altered': 'giratina', 'origin': 'giratina-origin',
    },

    'shaymin': {
      'land': 'shaymin', 'sky': 'shaymin-sky',
    },

    'arceus': {
      'normal': 'arceus', 'fire': 'arceus-fire',
      'water': 'arceus-water', 'electric': 'arceus-electric',
      'grass': 'arceus-grass', 'ice': 'arceus-ice',
      'fighting': 'arceus-fighting', 'poison': 'arceus-poison',
      'ground': 'arceus-ground', 'flying': 'arceus-flying',
      'psychic': 'arceus-psychic', 'bug': 'arceus-bug',
      'rock': 'arceus-rock', 'ghost': 'arceus-ghost',
      'dragon': 'arceus-dragon', 'dark': 'arceus-dark',
      'steel': 'arceus-steel', 'fairy': 'arceus-fairy',
    },

    'basculin': {
      'redstriped': 'basculin',
      'bluestriped': 'basculin-bluestriped',
    },

    'darmanitan': {
      'standard': 'darmanitan', 'zen': 'darmanitan-zen',
    },

    'deerling': {
      'spring': 'deerling-spring', 'summer': 'deerling-summer',
      'autumn': 'deerling-autumn', 'winter': 'deerling-winter',
    },

    'sawsbuck': {
      'spring': 'sawsbuck-spring', 'summer': 'sawsbuck-summer',
      'autumn': 'sawsbuck-autumn', 'winter': 'sawsbuck-winter',
    },

    'tornadus': {
      'incarnate': 'tornadus', 'therian': 'tornadus-therian',
    },
    'thunderus': {
      'incarnate': 'thunderus', 'therian': 'thunderus-therian',
    },
    'landorus': {
      'incarnate': 'landorus', 'therian': 'landorus-therian',
    },

    'kyurem': {
      'normal': 'kyurem', 'white': 'kyurem-white',
      'black': 'kyurem-black',
    },

    'keldeo': {
      'ordinary': 'keldeo', 'resolute': 'keldeo-resolute',
    },

    'meloetta': {
      'aria': 'meloetta', 'pirouette': 'meloetta-pirouette',
    },

    'genesect': {
      'normal': 'genesect', 'shock': 'genesect-shock',
      'burn': 'genesect-burn', 'chill': 'genesect-chill',
      'douse': 'genesect-douse',
    },

    'greninja': {
      'ash': 'greninja-ash',
    },

    'vivillon': {
      'archipelago': 'vivillon-archipelago', 'continental': 'vivillon-continental',
      'elegant': 'vivillon-elegant', 'garden': 'vivillon-garden',
      'highplains': 'vivillon-highplains', 'icysnow': 'vivillon-icysnow',
      'jungle': 'vivillon-jungle', 'marine': 'vivillon-marine',
      'meadow': 'vivillon-meadow', 'modern': 'vivillon-modern',
      'monsoon': 'vivillon-monsoon', 'ocean': 'vivillon-ocean',
      'polar': 'vivillon-polar', 'river': 'vivillon-river',
      'sandstorm': 'vivillon-sandstorm', 'savanna': 'vivillon-savanna',
      'sun': 'vivillon-sun', 'tundra': 'vivillon-tundra',
      'fancy': 'vivillon-fancy', 'pokeball': 'vivillon-pokeball',
    },

    'flabebe': {
      'red': 'flabebe', 'blue': 'flabebe-blue',
      'orange': 'flabebe-orange', 'white': 'flabebe-white',
      'yellow': 'flabebe-yellow',
    },

    'floette': {
      'red': 'floette', 'blue': 'floette-blue',
      'orange': 'floette-orange', 'white': 'floette-white',
      'yellow': 'floette-yellow',
    },

    'florges': {
      'red': 'florges', 'blue': 'florges-blue',
      'orange': 'florges-orange', 'white': 'florges-white',
      'yellow': 'florges-yellow',
    },

    'furfrou': {
      'natural': 'furfrou', 'heart': 'furfrou-heart',
      'star': 'furfrou-star', 'diamond': 'furfrou-diamond',
      'debutante': 'furfrou-debutante', 'matron': 'furfrou-matron',
      'dandy': 'furfrou-dandy', 'lareine': 'furfrou-lareine',
      'kabuki': 'furfrou-kabuki', 'pharaoh': 'furfrou-pharaoh',
    },

    'aegislash': {
      'shield': 'aegislash', 'blade': 'aegislash-blade',
    },

    'pumpkaboo': {
      'average': 'pumpkaboo', 'small': 'pumpkaboo-small',
      'super': 'pumpkaboo-super', 'large': 'pumpkaboo-large',
    },

    'gourgeist': {
      'average': 'gourgeist', 'small': 'gourgeist-small',
      'super': 'gourgeist-super', 'large': 'gourgeist-large',
    },

    'xerneas': {
      'neutral': 'xerneas-neutral', 'active': 'xerneas-active',
    },

    'zygarde': {
      '10': 'zygarde-10', 'normal': 'zygarde', 'complete': 'zygarde-complete',
    },

    'hoopa': {
      'confined': 'hoopa', 'unbound': 'hoopa-unbound', 'mega': 'hoopa-mega',
    },

    'oricorio': {
      'baile': 'oricorio', 'pompom': 'oricorio-pompom',
      'pau': 'oricorio-pau', 'sensu': 'oricorio-sensu',
    },

    'lycanroc': {
      'midday': 'lycanroc', 'midnight': 'lycanroc-midnight',
      'dusk': 'lycanroc-dusk',
    },

    'wishiwashi': {
      'solo': 'wishiwashi', 'school': 'wishiwashi-school',
    },

    'silvally': {
      'normal': 'silvally', 'fire': 'silvally-fire',
      'water': 'silvally-water', 'electric': 'silvally-electric',
      'grass': 'silvally-grass', 'ice': 'silvally-ice',
      'fighting': 'silvally-fighting', 'poison': 'silvally-poison',
      'ground': 'silvally-ground', 'flying': 'silvally-flying',
      'psychic': 'silvally-psychic', 'bug': 'silvally-bug',
      'rock': 'silvally-rock', 'ghost': 'silvally-ghost',
      'dragon': 'silvally-dragon', 'dark': 'silvally-dark',
      'steel': 'silvally-steel', 'fairy': 'silvally-fairy',
    },

    'minior': {
      'meteor': 'minior', 'core': 'minior-core',
      'red': 'minior-red', 'orange': 'minior-orange',
      'yellow': 'minior-yellow', 'green': 'minior-green',
      'blue': 'minior-blue', 'indigo': 'minior-indigo',
      'violet': 'minior-violet',
    },

    'mimikyu': {
      'disguised': 'mimikyu', 'busted': 'mimikyu-busted',
    },

    'necrozma': {
      'duskmane': 'necrozma-duskmane', 'ultra': 'necrozma-ultra',
      'dawnwings': 'necrozma-dawnwings',
    },

    // fix some issues in the nameing schemes
    '<gen5': {
      'clefairy': 'normal',
      'clefable': 'normal',
      'jigglypuff': 'normal',
      'wigglytuff': 'normal',
      'mime jr.': 'psychic',
      'mr. mime': 'psychic',
      'cleffa': 'normal',
      'igglybuff': 'normal',
      'togepi': 'normal',
      'togetic': 'normal',
      'togekiss': 'normal',
      'azurill': 'water',
      'marill': 'water',
      'azumarill': 'water',
      'snubbull': 'normal',
      'granbull': 'normal',
      'ralts': 'psychic',
      'kirlia': 'psychic',
      'gardevoir': 'psychic',
      'cottonee': 'grass',
      'whimsicott': 'grass',
    },


    // add support for female forms
    'female': [
      'venasaur', 'butterfree', 'rattata', 'raticate', 'pikachu',
      'raichu', 'nidoran', 'zubat', 'golbat', 'gloom', 'vileplume',
      'kadabra', 'alakazam', 'dodrio', 'hypno', 'rhyhorn', 'rhydon',
      'goldeen', 'seaking', 'scyther', 'magikarp', 'gyarados',

      'meganium', 'ledyba', 'ledian', 'xatu', 'sudowoodo', 'politoed',
      'aipom', 'wooper', 'quagsire', 'murkrow', 'wobbuffet', 'girafarig',
      'gligar', 'steelix', 'scizor', 'heracross', 'sneasel', 'ursaring',
      'piloswine', 'octillery', 'houndoom', 'donphan',

      'torchic', 'combusken', 'blaziken', 'beautifly', 'dustox', 'ludicolo',
      'nuzleaf', 'shiftry', 'meditite', 'medicham', 'roselia', 'gulpin',
      'swalot', 'numel', 'camerupt', 'cacturne', 'milotic', 'relicanth',

      'starly', 'staravia', 'staraptor', 'bidoof', 'bibarel', 'kricketot',
      'kricketune', 'shinx', 'luxio', 'luxray', 'roserade', 'combee',
      'pachirisu', 'buizel', 'floatzel', 'ambipom', 'gible', 'gabite',
      'garchomp', 'hippopotas', 'hippowdon', 'croagunk', 'toxicroak',
      'finneon', 'limineon', 'snover', 'weavile', 'rhyperior', 'tangrowth',
      'mamoswine',

      'unfezant', 'frillish', 'jellicent',

      'pyroar', 'meowstic'
    ]
  },

  natures: {
    'hardy': { increase: 'atk', decrease: 'atk' },
    'lonely': { increase: 'atk', decrease: 'def' },
    'brave': { increase: 'atk', decrease: 'spd' },
    'adamant': { increase: 'atk', decrease: 'spatk' },
    'naughty': { increase: 'atk', decrease: 'spdef' },
    'bold': { increase: 'def', decrease: 'atk' },
    'docile': { increase: 'def', decrease: 'def' },
    'relaxed': { increase: 'def', decrease: 'spd' },
    'impish': { increase: 'def', decrease: 'spatk' },
    'lax': { increase: 'def', decrease: 'spdef' },
    'timid': { increase: 'spd', decrease: 'atk' },
    'hasty': { increase: 'spd', decrease: 'def' },
    'serious': { increase: 'speed', decrease: 'speed' },
    'jolly': { increase: 'spd', decrease: 'spatk' },
    'naive': { increase: 'spd', decrease: 'spdef' },
    'modest': { increase: 'spatk', decrease: 'atk' },
    'mild': { increase: 'spatk', decrease: 'def' },
    'quiet': { increase: 'spatk', decrease: 'spd' },
    'bashful': { increase: 'spatk', decrease: 'spatk' },
    'rash': { increase: 'spatk', decrease: 'spdef' },
    'calm': { increase: 'spdef', decrease: 'atk' },
    'gentle': { increase: 'spdef', decrease: 'def' },
    'sassy': { increase: 'spdef', decrease: 'spd' },
    'careful': { increase: 'spdef', decrease: 'spatk' },
    'quirky': { increase: 'spdef', decrease: 'spdef' },
  },


  htmlColors: {'aliceblue':'#f0f8ff','antiquewhite':'#faebd7','aqua':'#00ffff','aquamarine':'#7fffd4','azure':'#f0ffff',
    'beige':'#f5f5dc','bisque':'#ffe4c4','black':'#000000','blanchedalmond':'#ffebcd','blue':'#0000ff','blueviolet':'#8a2be2','brown':'#a52a2a','burlywood':'#deb887',
    'cadetblue':'#5f9ea0','chartreuse':'#7fff00','chocolate':'#d2691e','coral':'#ff7f50','cornflowerblue':'#6495ed','cornsilk':'#fff8dc','crimson':'#dc143c','cyan':'#00ffff',
    'darkblue':'#00008b','darkcyan':'#008b8b','darkgoldenrod':'#b8860b','darkgray':'#a9a9a9','darkgreen':'#006400','darkkhaki':'#bdb76b','darkmagenta':'#8b008b','darkolivegreen':'#556b2f',
    'darkorange':'#ff8c00','darkorchid':'#9932cc','darkred':'#8b0000','darksalmon':'#e9967a','darkseagreen':'#8fbc8f','darkslateblue':'#483d8b','darkslategray':'#2f4f4f','darkturquoise':'#00ced1',
    'darkviolet':'#9400d3','deeppink':'#ff1493','deepskyblue':'#00bfff','dimgray':'#696969','dodgerblue':'#1e90ff',
    'firebrick':'#b22222','floralwhite':'#fffaf0','forestgreen':'#228b22','fuchsia':'#ff00ff',
    'gainsboro':'#dcdcdc','ghostwhite':'#f8f8ff','gold':'#ffd700','goldenrod':'#daa520','gray':'#808080','green':'#008000','greenyellow':'#adff2f',
    'honeydew':'#f0fff0','hotpink':'#ff69b4',
    'indianred ':'#cd5c5c','indigo':'#4b0082','ivory':'#fffff0','khaki':'#f0e68c',
    'lavender':'#e6e6fa','lavenderblush':'#fff0f5','lawngreen':'#7cfc00','lemonchiffon':'#fffacd','lightblue':'#add8e6','lightcoral':'#f08080','lightcyan':'#e0ffff','lightgoldenrodyellow':'#fafad2',
    'lightgrey':'#d3d3d3','lightgreen':'#90ee90','lightpink':'#ffb6c1','lightsalmon':'#ffa07a','lightseagreen':'#20b2aa','lightskyblue':'#87cefa','lightslategray':'#778899','lightsteelblue':'#b0c4de',
    'lightyellow':'#ffffe0','lime':'#00ff00','limegreen':'#32cd32','linen':'#faf0e6',
    'magenta':'#ff00ff','maroon':'#800000','mediumaquamarine':'#66cdaa','mediumblue':'#0000cd','mediumorchid':'#ba55d3','mediumpurple':'#9370d8','mediumseagreen':'#3cb371','mediumslateblue':'#7b68ee',
    'mediumspringgreen':'#00fa9a','mediumturquoise':'#48d1cc','mediumvioletred':'#c71585','midnightblue':'#191970','mintcream':'#f5fffa','mistyrose':'#ffe4e1','moccasin':'#ffe4b5',
    'navajowhite':'#ffdead','navy':'#000080',
    'oldlace':'#fdf5e6','olive':'#808000','olivedrab':'#6b8e23','orange':'#ffa500','orangered':'#ff4500','orchid':'#da70d6',
    'palegoldenrod':'#eee8aa','palegreen':'#98fb98','paleturquoise':'#afeeee','palevioletred':'#d87093','papayawhip':'#ffefd5','peachpuff':'#ffdab9','peru':'#cd853f','pink':'#ffc0cb','plum':'#dda0dd','powderblue':'#b0e0e6','purple':'#800080',
    'rebeccapurple':'#663399','red':'#ff0000','rosybrown':'#bc8f8f','royalblue':'#4169e1',
    'saddlebrown':'#8b4513','salmon':'#fa8072','sandybrown':'#f4a460','seagreen':'#2e8b57','seashell':'#fff5ee','sienna':'#a0522d','silver':'#c0c0c0','skyblue':'#87ceeb','slateblue':'#6a5acd','slategray':'#708090','snow':'#fffafa','springgreen':'#00ff7f','steelblue':'#4682b4',
    'tan':'#d2b48c','teal':'#008080','thistle':'#d8bfd8','tomato':'#ff6347','turquoise':'#40e0d0',
    'violet':'#ee82ee',
    'wheat':'#f5deb3','white':'#ffffff','whitesmoke':'#f5f5f5',
    'yellow':'#ffff00','yellowgreen':'#9acd32'
  }
};
