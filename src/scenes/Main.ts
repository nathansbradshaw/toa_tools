import Phaser from "phaser";
import TrueTileMarker from "../actors/trueTileMarker";

import { key } from "../data/key";
import { handleMove } from "../data/moves";

export default class Main extends Phaser.Scene {
  private marker!: Phaser.GameObjects.Graphics;
  private map!: Phaser.Tilemaps.Tilemap;
  private trueTileMarker!: TrueTileMarker;
  private goalTileMarker!: TrueTileMarker;
  private tick = 0;
  private debouncer = 0;
  grid = [1, 1, 1, 1, 1, 1, 1, 1];
  solution = [1, 1, 1, 1, 1, 1, 1, 1];
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
    this.input.mouse.disableContextMenu();
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
    this.solveGrid();

    // set the graphics based on the values of the grid
    for (let i = 0; i < this.tilesToGrid.length; i++) {
      if (this.solution[i] === 1) {
        this.map.putTileAt(
          this.grid[i] + 1,
          this.tilesToGrid[i].x,
          this.tilesToGrid[i].y
        );
      } else {
        this.map.putTileAt(
          this.grid[i] ? 5 : 4,
          this.tilesToGrid[i].x,
          this.tilesToGrid[i].y
        );
      }
    }

    // console.log(this.grid);
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
      if (this.input.activePointer.rightButtonDown()) {
        const tile = this.map.getTileAt(pointerTileX, pointerTileY);
        const gridLocation = this.gridLocation(tile.x, tile.y);

        if (gridLocation !== -1) {
          this.grid = handleMove(gridLocation, this.grid);
        } else {
          this.solveGrid();
        }
        console.log("right click");
      } else {
        const tile = this.map.getTileAt(pointerTileX, pointerTileY);
        const gridLocation = this.gridLocation(tile.x, tile.y);
        if (gridLocation !== -1) {
          this.grid[gridLocation] = this.grid[gridLocation] === 0 ? 1 : 0;
        }
      }
      this.debouncer = 10;
    }
    if (this.debouncer > 0) {
      this.debouncer--;
    }
  }

  gridLocation(x: number, y: number) {
    for (let i = 0; i < this.tilesToGrid.length; i++) {
      if (x === this.tilesToGrid[i].x && y === this.tilesToGrid[i].y) {
        return i;
      }
    }
    return -1;
  }

  solveGrid() {
    const A00 =
      (this.grid[0] +
        this.grid[2] +
        this.grid[4] +
        this.grid[5] +
        this.grid[6]) %
      2;
    const A01 = (this.grid[5] + this.grid[6] + this.grid[7]) % 2;
    const A02 =
      (this.grid[0] +
        this.grid[2] +
        this.grid[3] +
        this.grid[6] +
        this.grid[7]) %
      2;
    const A10 = (this.grid[2] + this.grid[4] + this.grid[7]) % 2;
    const A12 = (this.grid[0] + this.grid[3] + this.grid[5]) % 2;
    const A20 =
      (this.grid[0] +
        this.grid[1] +
        this.grid[4] +
        this.grid[5] +
        this.grid[7]) %
      2;
    const A21 = (this.grid[0] + this.grid[1] + this.grid[2]) % 2;
    const A23 =
      (this.grid[1] +
        this.grid[2] +
        this.grid[3] +
        this.grid[5] +
        this.grid[7]) %
      2;
    const solution = [A00, A01, A02, A10, A12, A20, A21, A23];
    console.log(" solution", solution);
    this.solution = solution;
    return solution;
    // TODO
  }
}
