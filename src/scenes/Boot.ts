import Phaser from "phaser";

import * as assets from "../assets";
import { key } from "../data/key";

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: key.scene.boot });
  }

  preload() {
    this.load.image(key.image.toa_tile_set, assets.tiles.toa_tile_set);
    this.load.tilemapTiledJSON(key.tilemap.map, assets.tiles.map);
    console.log("preload");
  }

  create() {
    this.scene.start(key.scene.main);
    console.log("create");
  }
}
