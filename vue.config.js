const path = require("path");
const config = require("./src/themes/themes.config");

const basePath = "./src/themes";
const templateFile = "./src/public/index.html";

const fallbackSettings = (name) => ({
  badges: {
    entry: "./src/themes/template/badges.js",
    title: `${name} - Badges`,
    template: templateFile,
  },
});

const pages = config.themes.reduce((themes, theme) => {
  const { name, path: themePath } = theme;
  const themeBasePath = `${basePath}/${themePath}`;
  const themeSettingsFile = `${themeBasePath}/theme.config.js`;
  try {
    const settings = require(themeSettingsFile);
    const { party, badges } = settings.templates;

    if (!party) {
      console.error(
        `You're trying to build the ${name} theme, but no party template was provided. Make sure to specify one on ${themeSettingsFile}`
      );
      process.exit(1);
    }

    themes[`${themePath}/index`] = {
      entry: path.resolve(themeBasePath, party),
      title: `${name} - Party`,
      template: templateFile,
    };

    themes[`${themePath}/badges`] = badges
      ? {
          entry: path.resolve(themeBasePath, badges),
          title: `${name} - Badges`,
          template: templateFile,
        }
      : fallbackSettings(name).badges;

    return themes;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}, {});

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/themes/" : "/",
  pages,
};
