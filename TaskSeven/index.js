const fs = require('fs');

const textData = `The encoding can be any one of those accepted by <Buffer>. If autoClose is set to true (default behavior) on 'error' or 'finish' the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. By default, the stream will emit a 'close' event after it has been destroyed. Set the emitClose option to false to change this behavior. filehandle.datasync() #Added in: v10.0.0 Returns: <Promise> Fulfills with undefined upon success. Forces all currently queued I/O operations associated with the file to the operating system's synchronized I/O completion state. Refer to the POSIX fdatasync(2) documentation for details. Unlike filehandle.sync this method does not flush modified metadata.`

const sevenTask = "taskSeven.txt";

fs.writeFile(sevenTask, textData, (err, data) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("File created successfully");

    try {
        const data = fs.readFileSync(sevenTask, 'utf-8');
        const words = data.split(/\s+/);
        const wordCount = words.length;
        console.log("Total word of the file is", wordCount);
    } catch (error) {
        console.error("Error reading by the file:", error);
    }
});

