const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports = router => {
  router.get("/:id/images", async (req, res) => {
    const { id } = req.params;
    const { images } = await User.findById(id);

    res.json({ images });
  });
};
