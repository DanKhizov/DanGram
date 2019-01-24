const express = require("express");
const app = express();
const config = require("./config/config");

require("./config/express.config")(app);
require("./config/mongoose.config")(config);

const PORT = config.dev.port;
app.listen(PORT, () => `Server running on port ${PORT}`);
