const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

module.exports = router => {
  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  let gfs;

  conn.once("open", () => {
    gfs = Grid(conn.db);
    gfs.collection("uploads");

    router.get("/allFiles", (req, res) => {
      gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.json({ files: false });
        }

        files.map(file => {
          if (
            file.contentType === "image/jpeg" ||
            file.contentType === "image/png"
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });

        return res.json({ files });
      });
    });

    router.get("/:filename", (req, res) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists"
          });
        }

        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: "Not an image"
          });
        }
      });
    });
  });
};
