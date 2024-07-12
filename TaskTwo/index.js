const fs = require('fs');

const first = 'firstFile.txt';
const initialData = "In this task, I created a file and this file's text is transformed to another newFile and also delete the first data.";

fs.writeFile(first, initialData, (err) => { // writeFile create a file and save the data in this file by the value of initial data. 
  if (err) {
    return console.error(`Error creating and writing to file ${first}:`, err);
  }
  console.log(`File ${first} created and data written successfully.`);
  fs.readFile(first, 'utf-8', (err, data) => { // read the first file data and then add these data into secFile.txt by the wwriteFile method
    if (err) {
      return console.error(`Error reading file ${first}:`, err);
    }
    console.log(`Data read from ${first}:`, data);
    const second = 'secFile.txt';
    fs.writeFile(second, data, (err) => {
      if (err) {
        return console.error(`Error writing to file ${second}:`, err);
      }
      console.log(`Data successfully written to ${second}`);
      fs.writeFile(first, "", (err) => { // clear the first file's data by the blank ""
        if (err) {
          return console.error(`Error clearing data from file ${first}:`, err);
        }
        console.log(`Data successfully cleared from ${first}`);
      });
    });
  });
});


