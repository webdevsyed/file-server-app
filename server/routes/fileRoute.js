const express = require("express");
const router = express.Router();

const { checkToken } = require('../controllers/authController')
const { upload, uploadController, listController, deleteController, downloadController } = require('../controllers/fileController')

router.post("/upload", checkToken, upload.single("file"), uploadController,);
router.get("/list", checkToken, listController);
router.delete("/delete", checkToken, deleteController);
router.get("/download", checkToken, downloadController);

module.exports = router;
