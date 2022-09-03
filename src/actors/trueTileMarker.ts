import Phaser from "phaser";

export default class TrueTileMarker extends Phaser.GameObjects.Graphics {
  constructor(
    scene: Phaser.Scene,
    map: Phaser.Tilemaps.Tilemap,
    color?: number
  ) {
    super(scene);

    // add the graphics to the scene
    scene.add.existing(this);
    this.lineStyle(2, color ?? 0x00faff, 1);
    this.strokeRect(0, 0, map.tileWidth, map.tileHeight);
  }

  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
