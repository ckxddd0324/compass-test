import fs from 'fs';

export function exportResultsToJson(outputName, outputObj) {
    checkIfFolderExists('results');
    fs.writeFile(`results/${outputName}.json`, JSON.stringify(outputObj, null, 4), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function checkIfFolderExists(folderName) {
    if (!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
    } 
}