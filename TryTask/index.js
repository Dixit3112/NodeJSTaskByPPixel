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
const mergeFiles = async (dir, main) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if (filePath === path.resolve(main)) {
            continue;
        }
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursively process folders
            await mergeFiles(filePath, main);
        } else if (path.extname(file) !== '.js' && file !== path.basename(main)) {
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
            // Write the parent folder's and file's path, file data
            const contentToAppend = `Parent Folder: ${folderName}\nFile's Path: ${filePath}\nFile's Data:${data}\n\n`;

            new Promise((resolve, reject) => {
                fs.appendFile(main, contentToAppend, (err) => {
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

// Main function to execute the script
const mainFunction = async () => {
    try {
        const main = 'main.txt';
        await new Promise((resolve, reject) => {
            fs.writeFile(main, "", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Main file created successfully.');
                }
            });
        });

        // Start merging files from the current directory
        await mergeFiles('.', main);

        console.log("All files' data paste into main.txt successfully.");
    } catch (error) {
        console.log("Error:", error);
    }
};

mainFunction();
