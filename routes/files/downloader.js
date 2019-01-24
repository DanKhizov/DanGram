const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const isImage = require("../../helpers/files/isImage");
const isEmpty = require("../../helpers/files/isEmpty");

module.exports = router => {
  const conn = mongoose.connection;
  Grid.mongo = mongoose.mongo;
  let gfs;

  conn.once("open", () => {
    gfs = Grid(conn.db);
    gfs.collection("uploads");

    router
      .get("/allFiles", (req, res) => {
        gfs.files.find().toArray((err, files) => {
          if (isEmpty(files)) return res.json({ files: false });

          files.map(file => {
            if (isImage(file)) return (file.isImage = true);
            file.isImage = false;
          });

          return res.json({ files });
        });
      })

      .get("/:filename", (req, res) => {
        const { filename } = req.params;

        gfs.files.findOne({ filename }, (err, file) => {
          if (isEmpty(file)) {
            return res.status(404).json({ err: "No file exists" });
          }

          if (isImage(file)) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({ err: "Not an image" });
          }
        });
      });
  });
};
