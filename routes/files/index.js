const router = require("express").Router();

require("./uploader")(router);
require("./downloader")(router);

module.exports = router;
