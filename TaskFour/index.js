const fs = require('fs');

const firstText = "first.txt";
const secondText = "second.txt";
const thirdText = "third.txt";
const mainText = "main.txt";
const firstJson = "first.json";
const secondJson = "second.json";
const thirdJson = "third.json";
const mainJson = "main.json";
const firstCsv = "first.csv";
const secondCsv = "second.csv";
const thirdCsv = "third.csv";
const mainCsv = "main.csv";

const initialText = "In the third task, I'm doing first, second, third file's data will transfer into main blank file by the node js";
const initialJson1 = {
    "description": "In the third task, I'm doing first, second, third file's data will transfer into main blank file by the node js",
};
const initialJson2 = {
    "description": "this is second file's data",
};
const initialJson3 = {
    "description": "this is third file's data",
};
const initialCsv = `description, fourthTask, firstFile`; 

fs.writeFileSync(firstText, `${initialText};`);
fs.writeFileSync(secondText, `${initialText}, this is second file's data;`);
fs.writeFileSync(thirdText, `${initialText}, this is third file's data.`);

const readFile = (filePath) => {
    return new Promise((resolve) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

Promise.all([readFile(firstText), readFile(secondText), readFile(thirdText)])
    .then((data) => {
        const combinedText = data.join('\n');
        fs.writeFile(mainText, combinedText, (err) => {
            if (err) {
                console.error(`Error writing to file ${mainText}:`, err);
            } else {
                console.log(`Data successfully written to ${mainText}`);
            }
        })
    })
    .catch((err) => {
        console.error(`Error reading files:`, err);
    });

// ______________ for json______________
fs.writeFileSync(firstJson, JSON.stringify(initialJson1, null, 2));
fs.writeFileSync(secondJson, JSON.stringify(initialJson2, null, 2));
fs.writeFileSync(thirdJson, JSON.stringify(initialJson3, null, 2));
// fs.writeFileSync(firstCsv, `${Object.keys(initialJson[0]).join(',')}\n`);
console.log(`Files ${firstJson}, ${secondJson}, and ${thirdJson} created with initialJson data.`);
const readJson = (file) => {
    return new Promise((resolve) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                resolve(JSON.parse(data));
            };
        });
    });
}

Promise.all([readJson(firstJson), readJson(secondJson), readJson(thirdJson)])
.then((data) =>{
    const combineJson = [].concat(...data);
    fs.writeFile(mainJson, JSON.stringify(combineJson, null, 2), (err) => {
        if(err){
            console.error(`Error writing to file ${mainJson}:`, err);
        } else {
            console.log(`Data successfully written to ${mainJson}`);
        }
    })
})
.catch((err) => {
    console.error(`Error reading files:`, err);
})

// ______________ for csv______________
fs.writeFileSync(firstCsv, initialCsv);
fs.writeFileSync(secondCsv, `${initialCsv}, secondFile`);
fs.writeFileSync(thirdCsv, `${initialCsv}, thirdFile`);

console.log(`CSV files ${firstCsv}, ${secondCsv}, and ${thirdCsv} created with initialCsv data`)

const readCsv = (file) => {
    return new Promise((resolve) =>{
        fs.readFile(file, "utf-8", (err, data) => {
            if(err){
                console.log(err);
            } else {
                resolve(data)
            }
        });
    });
};

Promise.all([readCsv(firstCsv), readCsv(secondCsv), readCsv(thirdCsv)])
.then((data) => {
    const combineCsv = data.join('\n');
    fs.writeFile(mainCsv, combineCsv, (err) => {
        if(err){
            console.error(`Error writing to file ${mainCsv}:`, err);
        } else {
            console.log(`Data successfully written to ${mainCsv}`);
        }
    });
})
.catch((err) => {
    console.error(`Error reading files:`, err);
})


