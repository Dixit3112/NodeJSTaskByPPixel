const fs = require('fs');
const path = require("path");

const ensurDirExist = (filePath) =>{
    const dirName = path.dirname(filePath); // path.dirname() = it gives directory of the file's
    if(fs.existsSync(dirName)) {    //  fs.existsSync() = it is check the folder's / file's path is exist or not.
        return true;
    }
    ensurDirExist(dirName);
    fs.mkdirSync(dirName);  // fs.mkdirSync() = it is produce the folder if it is not available in the given path.
};

const mergeFiles = async (dir, mainFile) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        if(filePath === path.resolve(mainFile)){
            continue;
        }
        const stat = fs.statSync(filePath);
        // console.log(stat) // give's status of that directory for when it will produced and when it's done.

        if(stat.isDirectory()) {
            await mergeFiles(filePath, mainFile);
        } else if (path.extname(file) !== '.js' && file !== path.basename(mainFile)) {  // it will check the .js extention if it is arrive in any folder than it is not copied because of that code data is not worked in the basic data of the files.

        //  in this file I am done the mistake of not compaire the task5.txt file's so that i am getting whole data is paste in task5.txt file but when it check from starting at that time this file is copied and paste again in this file so that I'm getting same data two times in this file.
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

            const contentToAppend = `ParentFolder:=> ${folderName}\nFile's Path:=>${filePath}\nFile's Value:=>${data}\n\n`;

            new Promise((resolve, reject) => {
                fs.appendFile(mainFile, contentToAppend, (err)=> {
                    if(err) reject(err);
                    else resolve(`Data from ${filePath} appended successfully.`);
                });
            });
        }
    }
};

const mainFunc = async () => {
    try {
        const mainFile = 'task5.txt';
        await new Promise ((resolve, reject) => {
            fs.writeFile(mainFile, '', (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(`Main file ${mainFile} created successfully.`);
                }
            });
        });

        await mergeFiles('.', mainFile);
        console.log("All files' data copied to task5.txt file.")
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

mainFunc();


