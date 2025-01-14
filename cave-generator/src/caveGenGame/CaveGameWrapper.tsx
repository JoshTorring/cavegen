import "./CaveGameWrapper.tsx";

import { useEffect, useRef, useState } from "react";
import { GameArea } from "./GameArea.tsx";
import { MenuArea } from "./MenuArea.tsx";
import { Grid } from "@mui/material";
import { MapTile, generateCave } from "./cavegen2.ts";

export const CaveGameWrapper: React.FC = () => {
  const [caveSeed, setCaveSeed] = useState("");
  const [reloadGenBlocker, setReloadGenBlocker] = useState(false)
  const [currentMap, setCurrentMap] = useState([[new MapTile()]])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // const gameAreaRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const observer = new ResizeObserver((entries) => {
  //     if (entries[0]) {
  //       const { width, height } = entries[0].contentRect;
  //       setDimensions({ width, height });
  //     }
  //   });

  //   if (gameAreaRef.current) {
  //     observer.observe(gameAreaRef.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  const generateButtonClicked = (seed: string, newWidth: number, newHeight: number) => {
    setReloadGenBlocker(true)
    setDimensions({width: newWidth, height: newHeight})
    setCaveSeed(seed)
  }

  useEffect(() => {
    if (reloadGenBlocker)
      setCurrentMap(generateCave(dimensions))
      console.log(caveSeed)
      console.log(dimensions)
  }, [caveSeed])

  useEffect(() => {
    console.log(currentMap)
  }, [currentMap])

  return (
    <>
      <Grid container>
        <Grid item xs color={"Menu"} sx={{ backgroundColor: "" }}>
          <MenuArea generateButtonClicked={generateButtonClicked}/>
        </Grid>
        <Grid item xs={10} sx={{ backgroundColor: "gray" }}>
          <GameArea map={currentMap} dimensions={dimensions} />
        </Grid>
      </Grid>
    </>
  );
};
