const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const { dev } = require("../../config/config");
const extractIdFromToken = require("../../helpers/auth/extractIdFromToken");
const exractUserInfo = require("../../helpers/auth/exractUserInfo");

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
        const { authorization } = req.headers;
        const { id, name, avatar } = exractUserInfo(authorization);

        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) return reject(err);

            const filename =
              buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
              filename,
              bucketName: "uploads",
              metadata: {
                user: {
                  id,
                  name,
                  avatar
                }
              }
            };
            resolve(fileInfo);
          });
        });
      }
    });
    const upload = multer({ storage });

    router.post("/upload", upload.single("file"), (req, res) => {
      const { file } = req;
      res.json({ file });
    });
  });
};
