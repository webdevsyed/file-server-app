const express = require("express");
const router = express.Router();

const { checkSession } = require('../controllers/authController')
const { upload, uploadController,listController,deleteController,downloadController } = require('../controllers/fileController')

router.post("/upload", checkSession, upload.single("file"),uploadController, );
router.get("/list", checkSession, listController);
router.delete("/delete", checkSession,deleteController);
router.get("/download", checkSession, downloadController);

module.exports = router;
