// Logic
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const { dev } = require("../../../config/config");

module.exports = router => {
  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  let gfs;

  conn.once("open", () => {
    gfs = Grid(conn.db);
    gfs.collection("uploads");

    const storage = new GridFsStorage({
      url: dev.dbURI,
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename =
              buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: "uploads"
            };
            resolve(fileInfo);
          });
        });
      }
    });
    const upload = multer({ storage });

    router.post("/upload", upload.single("file"), (req, res) => {
      res.json({ file: req.file });
      // res.redirect('/');
    });
  });
};
