const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports = router => {
  router.get("/:id/images", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json(user);
  });
};
