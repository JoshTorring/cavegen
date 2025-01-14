import { MapTile } from "./cavegen2";

type MapTileProps = {
  tile: MapTile;
  yPos: number;
  xPos: number;
};

export const MapTileDisplay: React.FC<MapTileProps> = ({
  tile,
  xPos,
  yPos,
}) => {
  console.log(tile)
  const isYellow = (xPos + yPos) % 2 === 0;
  const backgroundColor = isYellow ? "yellow" : "red";

  return (
    <div
      className="mapTile"
      style={{
        width: 5,
        height: 5,
        backgroundColor,
      }}
    ></div>
  );
};
