const fs = require('fs');

const fileData = `The encoding can be any one of those accepted by <Buffer>. If autoClose is set to true (default behavior) on 'error' or 'finish' the file descriptor will be closed automatically. If autoClose is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. By default, the stream will emit a 'close' event after it has been destroyed. Set the emitClose option to false to change this behavior. filehandle.datasync() #Added in: v10.0.0 Returns: <Promise> Fulfills with undefined upon success. Forces all currently queued I/O operations associated with the file to the operating system's synchronized I/O completion state. Refer to the POSIX fdatasync(2) documentation for details. Unlike filehandle.sync this method does not flush modified metadata.`

const file = fs.writeFileSync("taskSix.txt", fileData);

const wordFile = fs.readFileSync("taskSix.txt", 'utf-8', (err, data) =>{
    console.log("Data:- ", data)
});

if (wordFile) {

    const words = wordFile.split(/\s+/);

    const tWords = words.filter(word => word.toLowerCase().startsWith('t'));

    const startTwords = tWords.join('\n'); // "\n" means new line giving method.

    fs.writeFile("startTLetter.txt", startTwords, (err, data) => {
        console.log("files data is : ", startTwords);
    });
} else {
    console.error("Failed to read the file.");
}


