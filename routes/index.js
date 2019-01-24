const router = require("express").Router();

require("./files/upload/documentUploader")(router);
require("./files/download/documentDownloader")(router);

module.exports = router;
