import fs from 'fs';

export function exportResultsToJson(outputName, outputObj) {
    fs.writeFile(`${outputName}.json`, JSON.stringify(outputObj, null, 4), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
