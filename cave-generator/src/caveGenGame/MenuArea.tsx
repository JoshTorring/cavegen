import { Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";

import "./CaveGameWrapper.css"


type MenuAreaProps = {
    generateButtonClicked: (seed: string, width: number, height: number) => void
};

export const MenuArea: React.FC<MenuAreaProps> = ({
    generateButtonClicked
}) => {
    const [seed, setSeed] = useState('')
    const [width, setWidth] = useState('50')
    const [height, setHeight] = useState('50')

    useEffect(() => console.log(seed), [seed])
    
    return (
        <>
            <Grid item>
                <TextField 
                    size="small" 
                    label="Seed" 
                    onChange={(e) => {
                        setSeed(e.target.value)
                    }}
                    variant="outlined"
                    sx={{
                        width:"100%"
                    }}
                />
                <Button
                    onClick={() => {
                        generateButtonClicked(seed, parseInt(width), parseInt(height))
                    }}
                    sx={{
                        width: "100%"
                    }}
                    variant="outlined"
                >
                    GENERATE
                </Button>
            </Grid>
            <Grid item>
                <TextField 
                    size="small" 
                    label="Width" 
                    onChange={(e) => {
                        setWidth(e.target.value)
                    }}
                    variant="outlined"
                    sx={{
                        width:"100%"
                    }}
                    type="number"
                    value={width}
                    InputProps={{ inputProps: { min: 50, max: 200 } }}
                />
            </Grid>
            <Grid item>
                <TextField 
                    size="small" 
                    label="Height" 
                    onChange={(e) => {
                        setHeight(e.target.value)
                    }}
                    variant="outlined"
                    sx={{
                        width:"100%"
                    }}
                    type="number"
                    value={height}
                    InputProps={{ inputProps: { min: 50, max: 200 } }}
                />
            </Grid>
        </>
    )
}
