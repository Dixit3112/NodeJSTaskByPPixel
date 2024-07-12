const fs = require('fs');

// if the file is not exist then this appendFile method create the file and write the text.  
const file = fs.appendFileSync("taskOne.txt", "I am getting a task about applying node js functionality to create a new file."); 

console.log("file data value:-", file); 


fs.copyFile("taskOne.txt", "fileCopy.txt");

fs.rename("fileCopy.txt", "newFile.txt"); // rename the file => from filecopy.txt to newFile.txt

fs.readFile("newFile.txt", 'utf-8', (err, data) => { 
    console.log(data)
})
