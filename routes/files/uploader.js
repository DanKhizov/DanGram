const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const path = require("path");
const User = require("../../models/User");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const { dev } = require("../../config/config");
const exractUserInfo = require("../../helpers/auth/exractUserInfo");
const randomString = require("crypto-random-string");

module.exports = router => {
  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  let gfs;

  conn.once("open", () => {
    gfs = Grid(conn.db);
    gfs.collection("uploads");

    const storage = new GridFsStorage({
      url: dev.dbURI,
      file: async (req, file) => {
        const filename = randomString(32) + path.extname(file.originalname);
        const { authorization } = req.headers;
        const { id, name } = exractUserInfo(authorization);

        const user = { id, name };
        const userDb = await User.findById({ _id: id });

        const fileInfo = {
          filename,
          bucketName: "uploads",
          metadata: { user }
        };

        userDb.images.unshift(filename);

        await userDb.save();

        return fileInfo;
      }
    });

    const upload = multer({ storage });

    router.post("/upload", upload.single("file"), async (req, res) => {
      const { authorization } = req.headers;
      const { name: userName } = exractUserInfo(authorization);

      const user = await User.findOne({ name: userName });

      if (!user) return res.status(404).json({ error: "Not found" });

      const { content, name, avatar, status, images } = user;
      const data = {
        name,
        avatar,
        content,
        status,
        images
      };

      res.json(data);
    });
  });
};
