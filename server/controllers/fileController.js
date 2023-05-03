const multer = require("multer");
const path = require("node:path");
const fs = require("fs");

//UPLOAD LOGIC STARTS HERE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = path.join(path.dirname(__dirname), "uploads", req.googleId)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "__" + file.originalname);
    },
});
const upload = multer({ storage: storage });
const uploadController = (req, res) => {
    res.status(200).json({ success: true, message: "Your file has been uploaded successfully." });
}


// LIST LOGIC STARTS HERE
const listController = (req, res) => {
    try {
        const folderPath = path.join(path.dirname(__dirname), "uploads", req.googleId);
        const files = fs.readdirSync(folderPath);
        const filesData = [];
        let totalSize = 0;

        for (let file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            const fileSizeInKB = parseInt(stats.size / 1000);
            totalSize += fileSizeInKB;
            const fileDate = new Date(parseInt(file.split("__")[0]));
            const uploadDate = `${fileDate.getDate()}-${fileDate.toLocaleString(
                "default",
                { month: "short" }
            )}-${fileDate.getFullYear()}`;
            const actualFilename = file.split("__")[1];

            filesData.push({
                serverName: file,
                name: actualFilename,
                date: uploadDate,
                size: fileSizeInKB,
            });
        }

        const fileDetails = {
            totalFiles: filesData.length,
            totalSize: totalSize,
            filesData: filesData,
        };
        res.send(fileDetails).status("Successfully recd file list");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error getting file list");
    }
}

// DELETE LOGIC STARTS HERE
const deleteController = (req, res) => {
    const serverName = req.query.serverName;
    const folderPath = path.join(path.dirname(__dirname), "uploads", req.googleId);
    const filePath = path.join(folderPath, serverName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to delete file");
            return;
        }
        // console.log("File has been deleted");
        res.status(200).send(`${serverName} has been deleted`);
    });
}

// DOWNLOAD LOGIC STARTS HERE
const downloadController = (req, res) => {
    const googleId = req.googleId
    const serverName = req.query.serverName;
    const filePath = path.join(path.dirname(__dirname), "uploads", googleId, serverName);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            res.status(404).send("File not found");
            return;
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error downloading file' });
            }
        });
    });
}

module.exports = { upload, uploadController, listController, deleteController, downloadController }