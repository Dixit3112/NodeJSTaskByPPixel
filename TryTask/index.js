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
            // Read file data and append to the main file if it's not a .js file
            const data = await new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            const folderName = path.basename(path.dirname(filePath));
            // Write the parent folder, file path, and file data
            const contentToAppend = `\nParent Folder: ${folderName}\nFile's Path: ${filePath}\nFile's Data:${data}\n`;

            await new Promise((resolve, reject) => {
                fs.appendFile(mainFilePath, contentToAppend, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(`Data from ${filePath} appended successfully.`);
                    }
                });
            });
        }
    }
};

// Flag to ensure the function is called only once
let isFunctionCalled = false;

// Main function to execute the script
const mainFunction = async () => {
    if (isFunctionCalled) return;
    isFunctionCalled = true;

    try {
        const mainFilePath = 'main.txt';

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

        console.log("All files' data copied to main.txt successfully.");
    } catch (error) {
        console.log("Error:", error);
    }
};

mainFunction();
