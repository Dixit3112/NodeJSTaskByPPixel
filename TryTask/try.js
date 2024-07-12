const fs = require('fs');
const path = require('path');

// Function to ensure directory exists
const ensureDirectoryExistence = (filePath) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};

// Set to store processed file data
const processedData = new Set();

// Function to read and merge files
const mergeFiles = async (dir, mainFilePath) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursively process folders
            await mergeFiles(filePath, mainFilePath);
        } else if (path.extname(file) !== '.js') {
            // Read file data
            const data = await new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            // Generate unique identifier for this file's content
            const contentIdentifier = `${path.basename(filePath)}:${data}`;

            // Check if this content has been processed already
            if (!processedData.has(contentIdentifier)) {
                const folderName = path.basename(path.dirname(filePath));
                const contentToAppend = `\nParent Folder: ${folderName}\nFile's Path: ${filePath}\nFile's Data:\n${data}\n`;

                // Append content to the main file
                await new Promise((resolve, reject) => {
                    fs.appendFile(mainFilePath, contentToAppend, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`Data from ${filePath} appended successfully.`);
                        }
                    });
                });

                // Add content identifier to processed set
                // processedData.add(contentIdentifier);
            }
        }
    }
};

// Main function to execute the script
const mainFunction = async () => {
    const mainFilePath = 'main.txt';

    try {
        // Ensure the main file exists
        ensureDirectoryExistence(mainFilePath);
        await new Promise((resolve, reject) => {
            fs.writeFile(mainFilePath, "", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Main file created successfully.');
                }
            });
        });

        // Start merging files from the current directory
        await mergeFiles('.', mainFilePath);

        console.log("All unique files' data copied to main.txt successfully.");
    } catch (error) {
        console.log("Error:", error);
    }
};

mainFunction();


