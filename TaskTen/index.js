// simple Text file data to CSV file and JSON file.
// const fs = require('fs');
// const path = require('path');

// const data = "In this Part, JSX render kari ne GUI show kare che project details, available projects, done projects, add project form, ane modals for selected project detail ane project edit";

// const textFile = path.join(__dirname, 'text.txt');
// const csvFile = path.join(__dirname, 'text.csv');
// const jsonFile = path.join(__dirname, 'text.json');

// // Write data to text.txt file
// fs.writeFile(textFile, data, (err) => {
//     if (err) {
//         console.error("Error writing to text.txt:", err);
//         return;
//     }
//     console.log("Data written successfully to text.txt");

//     // Convert text.txt to text.csv
//     fs.writeFile(csvFile, data, (err) => {
//         if (err) {
//             console.error("Error writing to text.csv:", err);
//             return;
//         }
//         console.log("Data written successfully to text.csv");

//         // Read text.csv and convert to JSON
//         fs.readFile(csvFile, 'utf-8', (err, csvData) => {
//             if (err) {
//                 console.error("Error reading from text.csv:", err);
//                 return;
//             }
//             console.log("Data read successfully from text.csv");

//             const jsonData = {
//                 content: csvData
//             };

//             // Write JSON data to text.json
//             fs.writeFile(jsonFile, JSON.stringify(jsonData, null, 2), (err) => {
//                 if (err) {
//                     console.error("Error writing to text.json:", err);
//                     return;
//                 }
//                 console.log("Data written successfully to text.json");
//             });
//         });
//     });
// });

// variable value convert into object and then it convert into json file.

const fs = require('fs');
const path = require('path');

// Define the data
const data = "In this Part";
const data1 = "JSX render kari ne GUI show kare che project details";
const data2 = "available projects, done projects";
const data3 = "add project form";
const data4 = "ane modals for selected project detail ane project edit";

// Define the object
const mainData = { data, data1, data2, data3, data4 };

// Define the path for the JSON file
const jsonFile = path.join(__dirname, 'text.json');

// Write the mainData object to the JSON file
fs.writeFile(jsonFile, JSON.stringify(mainData, null, 2), (err) => {
    if (err) {
        console.error("Error writing to text.json:", err);
        return;
    }
    console.log("Data written successfully to text.json");
});

// csv to Json file

