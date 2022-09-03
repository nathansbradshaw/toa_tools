import Phaser from "phaser";

import scenes from "./scenes";

const isProduction = process.env.NODE_ENV === "production";

/**
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
new Phaser.Game({
  width: 600, // 1024
  height: 600, // 768
  zoom: 1,
  title: "Toa solver",
  url: "https://remarkablegames.org/phaser-rpg/",
  version: "0.0.1",
  scene: scenes,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: !isProduction,
    },
  },
  disableContextMenu: isProduction,
  backgroundColor: "#0ff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
});
