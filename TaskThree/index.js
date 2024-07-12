const fs = require('fs');

const first = "firstFile.txt";
const second = "secondFile.txt";
const third = "thirdFile.txt";
const initial = "In the third task, I'm doing first, second, third file's data will transfer into main blank file by the node js"; 
const main = "main.txt";

fs.writeFileSync(first, `${initial};`);
fs.writeFileSync(second, `${initial}, this secondFile's Data;`);
fs.writeFileSync(third, `${initial}, this third File's Data.`);

console.log(`Files ${first}, ${second}, and ${third} created with initial data.`);

// read the all file's data by the promise function.

const readFile = (filePath) => {
  try {
    return fs,fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error("Writing file is having error", error);
  }
};

const firstFile = readFile('firstFile.txt');
const secondFile = readFile('secondFile.txt');
const thirdFile = readFile('thirdFile.txt');

const combineData = `${firstFile}\n ${secondFile}\n ${thirdFile}`;

fs.writeFileSync(main, combineData, (err, data) => {
  console.log(err);
  console.log("CombineData is written successfully :- ", data);
})

