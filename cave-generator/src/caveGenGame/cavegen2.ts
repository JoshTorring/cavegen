import { type } from "os";

const caveSize: number = 200;
// const caveWidth: number = 200;
// const caveHeight: number = 100;
const spaceFactor: number = 0.53;
// const gameWidth: number = caveContainerWidth >= caveContainerHeight ? caveContainerHeight : caveContainerWidth
// const tileWidth: number = (gameWidth - (gameWidth % caveSize)) / caveSize

type Dimensions = {
  width: number,
  height: number
}

enum Tiles {
  empty = 0,
  floor = 1,
  wall = 2,
}

const tileColour = {
  floor: { red: "a3", green: "8a", blue: "7f" },
  wall: { red: "42", green: "3b", blue: "37" },
  enemy: { red: "ff", green: "00", blue: "ff" },
};

export class MapTile {
  colour: {
    red: string;
    green: string;
    blue: string;
  };
  tileType: Tiles;

  constructor(
    red: string = "88",
    green: string = "88",
    blue: string = "88",
    tileType: Tiles = Tiles.floor
  ) {
    this.colour = { red, green, blue };
    this.tileType = tileType;
  }
}

const genInitialCave = (dimensions: Dimensions): MapTile[][] => {
  const {width, height} = dimensions
  const cave: MapTile[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => new MapTile())
  );
  cave.forEach((_, h) => {
    cave.forEach((tile, w) => {
      if (h === 0 || h === height - 1 || w === 0 || w === width - 1) {
        tile[0].tileType = Tiles.wall;
        tile[0].colour = tileColour.wall;
      } else {
        const pseudoRandom: number = Math.random();
        pseudoRandom > spaceFactor
          ? (tile[0].tileType = Tiles.wall)
          : (tile[0].tileType = Tiles.floor);
        pseudoRandom > spaceFactor
          ? (tile[0].colour = tileColour.wall)
          : (tile[0].colour = tileColour.floor);
      }
    });
  });
  return cave;
};

export const generateCave = (dimensions: Dimensions) => {
  const cave: MapTile[][] = genInitialCave(dimensions) 
  return cave
}
