const path = require("path");
const fs = require("fs");

const buildThemeIndex = () => {
  const THEMES_PATH = path.resolve(__dirname, "../src/themes");
  const themes = fs.readdirSync(THEMES_PATH).filter((t) => {
    return !path.extname(t);
  });

  return themes.reduce((allThemes, currentTheme) => {
    const themeConfig = require(path.resolve(
      THEMES_PATH,
      currentTheme,
      "theme.config.js"
    ));

    allThemes.push({
      name: themeConfig.settings.theme.name,
      path: currentTheme,
    });

    if (themeConfig.variants) {
      themeConfig.variants.forEach((variant) => {
        allThemes.push({
          name: `${themeConfig.settings.theme.name} (${variant.name})`,
          path: currentTheme,
          params: variant.params,
        });
      });
    }

    return allThemes;
  }, []);
};

module.exports = { buildThemeIndex };
