import "./CaveGameWrapper.css";
import { Box } from "@mui/material";
import { MapTile } from "./cavegen2";
import { MapTileDisplay } from "./MapTile";

type GameAreaProps = {
  map: MapTile[][];
  dimensions: {
    width: number;
    height: number;
  };
};

export const GameArea: React.FC<GameAreaProps> = ({ map, dimensions }) => {
  const tilePixelWidth: number = 5;
  return (
    <>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          gridTemplateColumns: `repeat(${dimensions.width}, ${5}px)`,
          height: `${dimensions.height * tilePixelWidth}px`,
          width: `${dimensions.width * tilePixelWidth}px`,
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        {map.map((row, rowIndex) =>
          row.map((tile, tileIndex) => (
            <>
              <MapTileDisplay tile={tile} yPos={rowIndex} xPos={tileIndex} key={`tile${rowIndex}${tileIndex}`}/>
            </>
          ))
        )}
      </Box>
    </>
  );
};
