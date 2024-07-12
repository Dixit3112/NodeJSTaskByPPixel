const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify');
const { parse } = require('csv-parse');

const txtFile = path.join(__dirname, 'text.txt');
const csvFile = path.join(__dirname, 'text.csv');
const jsonFile = path.join(__dirname, 'text.json');

// Read the text file then convert to CSV
fs.readFile(txtFile, 'utf-8', (err, data) => {
    if (err) {
        console.error("Error reading the text file:", err);
        return;
    }

    // Split the file content by line
    const lines = data.split('\n');

    // by the split method it will 
    // Parse each line and create an array of objects
    const records = lines.map(line => {
        const obj = {};
        line.split(',').forEach(objData => {
            const [key, value] = objData.split(':').map(item => item.trim());
            obj[key] = value;
        });
        console.log("Object***", obj);
        return obj;
    });

    // Create a CSV string from the array of objects
    stringify(records, { header: true }, (err, csvData) => {
        if (err) {
            console.error("Error generating CSV data:", err);
            return;
        }

        // Write the CSV data to the file
        fs.writeFile(csvFile, csvData, (err) => {
            if (err) {
                console.error("Error writing to the CSV file:", err);
                return;
            }
            console.log("Data written successfully to text.csv");

            // CSV file read and convert to JSON
            fs.readFile(csvFile, 'utf-8', (err, csvData) => {
                if (err) {
                    console.error("Error reading the CSV file:", err);
                    return;
                }

                // Parse the CSV data for convert into json type array of objects 
                parse(csvData, {
                    columns: true,
                    // skip_empty_lines: true // this function is use fro when in any file is having blank line in between two line then it will become a blank line' empty data.
                }, (err, output) => {
                    if (err) {
                        console.error("Error parsing the CSV file:", err);
                        return;
                    }

                    // Write the object's data convert into JSON data to the file
                    fs.writeFile(jsonFile, JSON.stringify(output, null, 2), (err) => {
                        if (err) {
                            console.error("Error writing to the JSON file:", err);
                            return;
                        }
                        console.log("Data written successfully to text.json");
                    });
                });
            });
        });
    });
});


