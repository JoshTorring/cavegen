import * as fs from 'fs';

const caveWidth: number = 100
const caveHeight: number = 100

const spaceFactor: number = 0.5

const cave: string[][] = []

const genInitialCave = (cave: string[][]): string[][] => {
    for (let h = 0; h < caveHeight; h++) {
        cave.push([])
        for (let w = 0; w < caveWidth; w++) {
            if (h === 0 || h === caveHeight - 1 || w === 0 || w === caveWidth - 1) {
                cave[h].push('#')
            } else {
                const pseudoRandom: number = Math.random()
                pseudoRandom > spaceFactor ? cave[h].push('#') : cave[h].push(' ')
            }
        }      
    }
    return cave
}

const writeCave = (cave: string[][]):void => {
    fs.writeFile('output.txt', (cave.map(row => row.join(''))).join('\n'), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    })
}

const smoothCave = (cave: string[][]): string[][] => {
    return cave
}


genInitialCave(cave)
for (let i = 0; i < 5; i++) {
    smoothCave(cave)
}
writeCave(cave)
