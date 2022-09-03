import Phaser from "phaser";
import TrueTileMarker from "../actors/trueTileMarker";

import { key } from "../data/key";

export default class Main extends Phaser.Scene {
  private marker!: Phaser.GameObjects.Graphics;
  private map!: Phaser.Tilemaps.Tilemap;
  private trueTileMarker!: TrueTileMarker;
  private goalTileMarker!: TrueTileMarker;
  private tick = 0;
  private debouncer = 0;
  grid = [0, 0, 0, 0, 0, 0, 0, 0];
  tilesToGrid = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 1, y: 3 },
    { x: 5, y: 3 },
    { x: 1, y: 5 },
    { x: 3, y: 5 },
    { x: 5, y: 5 },
  ];

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

    // this.trueTileMarker = new TrueTileMarker(this, this.map);
    this.goalTileMarker = new TrueTileMarker(this, this.map, 0x00ff00);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setZoom(2.68);
  }

  update() {
    for (let i = 0; i < this.tilesToGrid.length; i++) {
      const tile = this.tilesToGrid[i];
      const tileIndex = this.map.getTileAt(tile.x, tile.y)?.index;
      if (tileIndex === 1) {
        this.grid[i] = 1;
      } else {
        this.grid[i] = 0;
      }
    }

    console.log(this.grid);
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );
    const pointerTileX = this.map.worldToTileX(worldPoint.x);
    const pointerTileY = this.map.worldToTileY(worldPoint.y);
    // console.log("update");
    this.goalTileMarker.update(
      this.map.tileToWorldX(pointerTileX),
      this.map.tileToWorldY(pointerTileY)
    );
    if (this.input.activePointer.isDown && this.debouncer <= 0) {
      if (this.map.getTileAt(pointerTileX, pointerTileY)?.index === 2) {
        this.map.putTileAt(1, pointerTileX, pointerTileY);
      } else if (this.map.getTileAt(pointerTileX, pointerTileY)?.index === 1) {
        this.map.putTileAt(2, pointerTileX, pointerTileY);
      }
      this.debouncer = 10;
    }
    if (this.debouncer > 0) {
      this.debouncer--;
    }
  }
}
