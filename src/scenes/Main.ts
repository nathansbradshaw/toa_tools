import Phaser from "phaser";
import TrueTileMarker from "../actors/trueTileMarker";

import { key } from "../data/key";

export default class Main extends Phaser.Scene {
  private marker!: Phaser.GameObjects.Graphics;
  private map!: Phaser.Tilemaps.Tilemap;
  private trueTileMarker!: TrueTileMarker;
  private goalTileMarker!: TrueTileMarker;
  private tick = 0;

  constructor() {
    super({ key: key.scene.main });
  }

  create() {
    console.log("create map");
    this.map = this.make.tilemap({ key: key.tilemap.map });
    console.log("create tileset");
    const tiles = this.map.addTilesetImage(
      "toa_tile_set",
      key.image.toa_tile_set
    );
    console.log("tile", tiles);
    const layer = this.map.createLayer("Ground", tiles, 0, 0);
    console.log("layer", layer);

    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    this.trueTileMarker = new TrueTileMarker(this, this.map);
    this.goalTileMarker = new TrueTileMarker(this, this.map, 0x00ff00);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setZoom(2.68);

    this.marker = this.add.graphics();
    this.marker.lineStyle(2, 0x000000, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
  }

  update() {
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );
    const pointerTileX = this.map.worldToTileX(worldPoint.x);
    const pointerTileY = this.map.worldToTileY(worldPoint.y);
    // console.log("update");
    this.marker.update();
    this.goalTileMarker.update(
      this.map.tileToWorldX(pointerTileX),
      this.map.tileToWorldY(pointerTileY)
    );
    if (this.input.activePointer.isDown) {
    }
  }
}
